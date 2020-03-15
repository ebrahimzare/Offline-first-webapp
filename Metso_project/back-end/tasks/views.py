import couchdb
import json
import os
# import mimetypes
from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.conf import settings
from django.http import JsonResponse,HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.files.storage import FileSystemStorage
from .models import Task , MillCondition , Clients , Equipments , EquipClients , Photos, Photos1, PinionTemperatureSingleHelix
from .serializers import TaskSerializer , MillConditionSerializer, ClientsSerializer ,EquipClientsSerializer , PhotosSerializer , Photos1Serializer ,ReportSerializer,PinionTemperatureSingleHelixSerializer
from .constants import part, datasheet_filter, sub_section

server = couchdb.Server(settings.COUCHDB_SERVER)
DB_METSO = server['metso_app']

# get all documents of database (our customers)
#we have a document for each customer in our database
def getView():
    try:
        allDocs=DB_METSO.view('_all_docs', include_docs=True)
        return allDocs
    except:
        return json.loads('{"Message":"Docs Not Found", "status": 404}')
        # return {response: 404, value: null, message:"Docs not found"}

#return document with specefic report_id
def get_doc_by_reports(key, value):
    try:
        for i in getView():
            if ('_design/' not in i.doc['_id']):
                for j in i.doc['equipments']:
                    for k in j['reports']:
                        if k[key]==int(value) :
                            return i.doc
    except:
        return json.loads('{"Message":"Invalid report_id", "status": 404}') 
        #  return JsonResponse({'message':"Document not found",'explanation':explanation}, status=404)           

#return document with equipment_serial_number
def get_doc_by_equipmentSerialNumber(equipment_serial_number):
    try:
        for i in getView():
            if ('_design/' not in i.doc['_id']):
                for j in i.doc['equipments']:
                    if j["equipment_serial_number"] == equipment_serial_number :
                        return i.doc                           
    except:
        return json.loads('{"Message":"Document Not Found", "status": 404}')

#http://localhost:5984/metso_app/_design/getEquipmentNumbers/_view/serial_number?include_docs=false
@api_view(['GET'])
def testGetEquipments(request):
    toReturn  = DB_METSO.view('_design/getEquipmentNumbers/_view/serial_number', include_docs=False)
    return Response({'data': toReturn.rows})


@api_view([ 'POST', 'GET'])
def getALLPhotos(request):      
    if request.method == 'GET':  
        images_list = []              
        for i in getView():            
            if ('_design/' not in i.doc['_id']): 
                for j in DB_METSO.get(i.doc['_id'])['equipments']:
                    for k in j['reports']: 
                        for d in k['photos']:
                            images_list.append(d)                    
                      

        return Response({'data': images_list })

    elif request.method == 'POST': 
        request_copy=request
        data=(request_copy.data)
        report_id=data.get('report_id')
        #get the file 
        myfile = request.FILES['image']
        fs = FileSystemStorage()
        myPhotos = []
        #get the name of saved file
        filename = fs.save(myfile.name, myfile)
        #get the local url of saved file
        uploaded_file_url = fs.url(filename)            
        name = data.get('name')
        img={"image": "http://localhost:8000"+uploaded_file_url,
        "name": name}
        doc=get_doc_by_reports('report_id',int(report_id))
        if (doc is not None):
            for j in doc['equipments']:
                for k in j['reports']: 
                    if (k["report_id"] == int(report_id)):
                        indexOfReport = j['reports'].index(k)  
                        if "photos" not in j['reports'][indexOfReport]: 
                            j['reports'][indexOfReport] = {**k, "photos": []}
                        j['reports'][indexOfReport]["photos"].append(img)
                        myPhotos = j['reports'][indexOfReport]["photos"]
                        docid, rev = DB_METSO.save(doc)
         
            content = myfile.read()
            DB_METSO.put_attachment(doc,content , name, 'image') 
            return Response(myPhotos)
        else: 
            return JsonResponse({'Message':"Report Id Not Found", 'status':404}, status=404)   

#get all photo by report_id (in the add to report section)
@api_view(['GET'])
def photos_by_reportID(request, report_id):
    if request.method == 'GET':
        doc=get_doc_by_reports('report_id',int(report_id))
        if (doc is not None):
            images_list = [] 
            for j in DB_METSO.get(doc['_id'])['equipments']:
                for k in j['reports']: 
                    if (k["report_id"]== int(report_id)):
                        images_list= k["photos"]
            return Response({'data': images_list})
        else:
            return JsonResponse({'Message':"Report Id " + report_id + " Not Found", 'status':404}, status=404)    

#find list of report ids by equipment serial number    
def list_of_reports_by_equipment(equipment_serial_number):
    try:
        doc= get_doc_by_equipmentSerialNumber(equipment_serial_number)   
        list_of_report_id = []
        for j in doc['equipments']:
            if j['equipment_serial_number']== equipment_serial_number:
                for k in j['reports']:
                    list_of_report_id.append(k['report_id'])
                return list_of_report_id  
    except:
        return {"Message":"Equipment Serial Number " + equipment_serial_number + " Not Found ", "status": 404}
#http://localhost:5984/metso_app/_design/reports/_view/getAllReports?include_docs=false
#get all reports or create a new report  
@api_view(['GET', 'POST'])
def tasks_list(request):
    if request.method == 'GET':
        view  = DB_METSO.view('_design/reports/_view/getAllReports', include_docs=False)
        if (view):
            tasks_list = []
            for i in view.rows :
                tasks_list.append(i['value']) 
            return Response({'Message': 'success', 'status': 200, 'data': tasks_list})
        else:
            return JsonResponse({'Message':"No Documents Found", 'status':404}, status=404)  
        
    elif request.method == 'POST':
        data = json.loads(request.body)
        SN = data.get('equipment_serial_number')
        doc = get_doc_by_equipmentSerialNumber(SN) #get the doc #DB_METSO.get(view.rows[0]["id"])
        for i in doc['equipments']: #loop through the equipments
            if i['equipment_serial_number'] == SN : #if same equipment                
                if ( data['report_id'] not in list_of_reports_by_equipment(SN) ): 
                    data.pop("equipment_serial_number")
                    for j in ['report_id', 'job_number', 'work_order_number','project_number']: #make values an integer
                        data[j] = int(data[j]) #data is request
                    data = {**data , 'datasheets':{} , 'photos': [], 'files': []}
                    i["reports"].append(data) #append new data to reports , doesn't work if view result is only equipment. 
                    docid, rev = DB_METSO.save(doc) #save document
                    return HttpResponse(json.dumps(doc), 'application/json')
                else:
                    return Response("Report Id Already Exists")    

#get report by report id, using the couch db view.
#http://localhost:5984/metso_app/_design/reports/_view/getAllReports?include_docs=false&key=report_id
def getReportById(report_id):
    try: 
        view  = DB_METSO.view('_design/reports/_view/getAllReports', include_docs=False, key = int(report_id)) 
        task = {'Message': 'success', 'status': 200,**view.rows[0]['value']}
        return task
    except:
        return {"Message":"Report with id " + str(report_id) + " not Found", "status": 404}

def appendTasks(tasks, report, key, value):
     for task in report['reports']:
        if 'datasheets' in task:
            del task['datasheets']
        if key != 'equipment_serial_number':
            value = int(value)
            if task[key]== value:  
                task = {'equipment_serial_number': report['equipment_serial_number'],**task}
                tasks.append(task)   
        if key == 'equipment_serial_number':
            if report[key] == value:
                task = {'equipment_serial_number': report['equipment_serial_number'],**task}
                tasks.append(task)   

def getTasks(key,value):
    try:
        tasks = []  
        if key == 'equipment_serial_number':
            doc = get_doc_by_equipmentSerialNumber(value)
        else: 
            doc = get_doc_by_reports(key,int(value))     
        for j in doc['equipments']:
            appendTasks(tasks,j,key,value)
        return {'Message': 'success', 'status': 200, 'tasks': tasks}    
    except:
        return {"Message": key + " " + str(value)  + " not Found ", "status": 404}

@api_view(['GET'])
def tasks_by_integer(request, integer_type, integer_value):
    if request.method == 'GET':
        try:
            functionToReturn = None
            if(integer_type == 'report'):
                functionToReturn = getReportById(int(integer_value))
            if(integer_type == 'jobs'):
                functionToReturn = getTasks('job_number',int(integer_value)) #functionToReturn.tasks is a list
            if(integer_type == 'won'):
                functionToReturn = getTasks('work_order_number',int(integer_value))
            if(functionToReturn['status'] != 200):
                raise Exception(functionToReturn)
            del functionToReturn['status']
            del functionToReturn['Message']   

            return Response(data=functionToReturn)  
        except:
            return JsonResponse(functionToReturn, status=404)     

@api_view(['GET'])
def tasks_find_by_equipment(request, equipment_serial_number):
    if request.method == 'GET':    
        try:   
            tasks = getTasks('equipment_serial_number',equipment_serial_number)['tasks']                  
            tasks = sorted(tasks, key=lambda date: datetime.strptime(date['date'], '%Y-%m-%d'))          
            return Response({'data': tasks}) 
        except:
            return JsonResponse({'Message':"No equipment with serial number " +equipment_serial_number+ " exists in our system", 'status':404}, status=404)      

#Return a list of report ids for an equipment.
@api_view(['GET'])
def get_list_report_id_by_equipment(request, equipment_serial_number):
    list_of_report_id = []    
    if request.method == 'GET':
        try:
            list_of_report_id=  list_of_reports_by_equipment(equipment_serial_number)
            if(type(list_of_report_id) is list):
                response = {"report_id_list": list_of_report_id}
                return Response(data=response)
            else:
                raise Exception(list_of_report_id)    
        except Exception as error:
            return JsonResponse(error.args[0], status=404)    

#update report
@api_view(['PUT'])
def tasks_update_by_report_id(request, report_id): 
    doc =  get_doc_by_reports('report_id',int(report_id))
    if(doc):
        if request.method == 'PUT':
            data = json.loads(request.body)
            for i in doc['equipments']:
                equipment_index = doc['equipments'].index(i)
                for j in i['reports']:
                    if j['report_id'] == data['report_id']:          
                        report_index = doc['equipments'][equipment_index]['reports'].index(j)
                        del data['equipment_serial_number']
                        doc['equipments'][equipment_index]['reports'][report_index] = data
                        docid, rev =  DB_METSO.save(doc)
                        return HttpResponse(json.dumps(doc['equipments'][equipment_index]['reports'][report_index]), 'application/json')  
    else:
        return JsonResponse({'Message':"Report Not Found", 'status':404}, status=404)               
            
@api_view(['GET'])
def get_all_mills(request):
    if request.method == 'GET':
        data = []
        mill_conditions = []
        nextPage = 1
        previousPage = 1
        docs = getView()
        if(docs):
            for i in docs:
                  if ('_design/' not in i.doc['_id']): 
                    equipments = i.doc['equipments']
                    for j in equipments:
                        for z in j['mill_condition']: 
                            mill_conditions.append({"mill_id": j['equipment_serial_number'], **z })      

            page = request.GET.get('page', 1)
            paginator = Paginator(mill_conditions, 50)
            try:
                data = paginator.page(page)
            except PageNotAnInteger:
                data = paginator.page(1)
            except EmptyPage:
                data = paginator.page(paginator.num_pages)

            if data.has_next():
                nextPage = data.next_page_number()
            if data.has_previous():
                previousPage = data.previous_page_number()
            return Response({'data': mill_conditions , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/mill_condition/mill/?page=' + str(nextPage), 'prevlink': '/api/mill_condition/mill/?page=' + str(previousPage)})
        else:
            return JsonResponse({'Message':"Database Not Found", 'status':404}, status=404)

def getmillByID(mill_id):
    try:
        mill_condition = []
        for j in get_doc_by_equipmentSerialNumber(mill_id)['equipments']:
                if j['equipment_serial_number'] == mill_id:
                    if len(j['mill_condition']) != 0:  
                        for z in j['mill_condition']:
                            mill_condition.append({"mill_id": mill_id, **z }) 
        return {"Message":"Success", "status": 200 , 'mill': mill_condition}
    except: 
        return {"Message":"Mill with id "+ mill_id +" not found", "status": 404}               

#find mill condition by mill id.
@api_view(['GET'])
def find_mill_by_id(request, mill_id):
    response = getmillByID(mill_id)
    if(response['status'] == 200):
        return Response(response['mill'])
    else:  
        return JsonResponse(response, status=404)

# edit a mill condition by mill_id or add a new mill condition. 
def editMillCondition(data, mill_id):
    try:
        doc = get_doc_by_equipmentSerialNumber(mill_id)
        for i in doc['equipments']:
            equipment_index = doc['equipments'].index(i)
            if i['equipment_serial_number'] == mill_id:
                mill_copy = data
                for j in mill_copy:
                    del j['mill_id']
                doc['equipments'][equipment_index]['mill_condition'] = mill_copy
                doc_id, rev =  DB_METSO.save(doc)
                mill_condition_list = doc['equipments'][equipment_index]['mill_condition']
        return mill_condition_list
    except :
        return {"Message":"Mill Id "+ mill_id + " not found" , "status": 404}      

@api_view(['POST'])
def add_mill_condition(request):
    try:
        if request.method == 'POST':
            return Response(editMillCondition(request.data,request.data[0]['mill_id']))
    except:
        return JsonResponse({'Message':"Mill Not Found", 'status':404}, status=404)    

        
@api_view(['PUT'])
def update_mill(request, mill_id):
    try:
        if request.method == 'PUT':
            return Response(editMillCondition(request.data,mill_id))   
    except:
        return JsonResponse({'Message':"Mill Not Found", 'status':404}, status=404)                          

#http://localhost:5984/metso_app/_design/clients/_view/getClientById?include_docs=false&key=client_id
@api_view(['GET'])
def getClientByID(request, client_id):
    try:
        if request.method == 'GET':
            client = DB_METSO.view('_design/clients/_view/getClientById', include_docs=False, key = int(client_id)).rows[0].value
            return HttpResponse(json.dumps(client), 'application/json')
    except:
        return JsonResponse({'Message':"Client with id "+ client_id +" Not Found", 'status':404}, status=404)  

#http://localhost:5984/metso_app/_design/clients/_view/getClientByName?include_docs=false&key="name"
@api_view(['GET'])
def getClientByname(request, name):
    try:
        if request.method == 'GET':
            client = DB_METSO.view('_design/clients/_view/getClientByName', include_docs=False, key = name).rows[0].value
            return HttpResponse(json.dumps(client), 'application/json')
    except:
        return JsonResponse({'Message':"Client with name "+ name +" Not Found", 'status':404}, status=404)         

#http://localhost:5984/metso_app/_design/clients/_view/getAllClients?include_docs=false
@api_view(['GET'])
def getALLCustomers(request):
    client_view  = DB_METSO.view('_design/clients/_view/getAllClients', include_docs=False)
    if(client_view and len(client_view.rows) > 0):
        clients = []
        for client in client_view.rows:
            clients.append({'doc_id': client.id, 'index': client.key, **client.value})
        return Response({'clients': clients})
    else:
        return JsonResponse({'Message':"No clients exists in our database", 'status':404}, status=404)    

#http://localhost:5984/metso_app/_design/equipments/_view/getEquipmentByClientID?include_docs=false
@api_view(['GET'])
def getAllEquipments(request):
    equipments = DB_METSO.view('_design/equipments/_view/getEquipmentByClientID', include_docs=False)
    if(equipments and len(equipments.rows) > 0):
        new_equipments = []
        for equipment in equipments.rows:
            for client_equipments in equipment.value: 
                new_equipments.append({'client_id': equipment.key, **client_equipments})
        response = {"equipments": new_equipments}
        return Response(data=response)
    else:
        return JsonResponse({'Message':"No equipments exists in our database", 'status':404}, status=404)        

#http://localhost:5984/metso_app/_design/equipments/_view/getEquipmentByClientID?include_docs=false&key=(int(client_id))
@api_view(['GET'])
def getEquipmentByCustomerID(request, client_id):
    equipments = DB_METSO.view('_design/equipments/_view/getEquipmentByClientID', include_docs=False, key = int(client_id))
    if(equipments and len(equipments.rows) > 0):
        new_equipments = []
        for equipment in equipments:
            for i in equipment.value:
                new_equipments.append({'client_id': equipment.key, **i})
    
        return HttpResponse(json.dumps(new_equipments), 'application/json')
    else:
        return JsonResponse({'Message':"No equipments for client " + str(client_id), 'status':404}, status=404)       
   
#http://localhost:5984/metso_app/_design/equipments/_view/getEquipmentBySerialNumber?include_docs=false&key=equipment_serial_number
@api_view(['GET'])
def getEquipmentBySerialNumber(request, equipment_serial_number):
    if request.method == 'GET':
        equipment = DB_METSO.view('_design/equipments/_view/getEquipmentBySerialNumber', include_docs=False, key = equipment_serial_number).rows
        if(len(equipment) == 1):
            return HttpResponse(json.dumps(equipment[0].value), 'application/json')                               
        else:
            return JsonResponse({'Message':"Equipment Serial Number " + equipment_serial_number +" Not Found", 'status':404}, status=404)       

def getALLDatasheet(report_id):
    try:
        doc = get_doc_by_reports('report_id',int(report_id))
        for i in doc['equipments']:
            for j in i['reports']:
                if 'datasheets' in j and j['report_id'] == int(report_id):
                    return {'Message': 'Success', 'status':200, 'data': j['datasheets']}
    except:
        return {"Message":"Datasheets Not Found", "status": 404}


def getDatasheetByPartType(report_id, part_type):
    data = getALLDatasheet(report_id)
    if(data['status'] == 200):
        data['data'] = data['data'][part_type]
    return data
 
def getDatasheetByCategory(report_id, datasheet_type, datasheet_name):
    try:
        data = getDatasheetByPartType(report_id,datasheet_type)
        if(data['status'] == 200):
            data['data'] = data['data'][datasheet_name]
        return data
    except: 
        return {}    

def getDatasheetBySubSection(report_id, datasheet_type, datasheet_name, subsection_name):
    data = getDatasheetByCategory(report_id,datasheet_type,datasheet_name)
    if(data['status'] == 200):
        data['data'] = data['data'][subsection_name]
    return data

@api_view(['GET'])
def get_all_datasheet_by_reportID(request, report_id):
    if request.method == 'GET':
        if(getALLDatasheet(report_id)['status'] == 200):
            return Response(getALLDatasheet(report_id)['data']) 
        else:    
            return JsonResponse(getALLDatasheet(report_id), status=404)     

@api_view(['GET'])
def get_all_datasheet_by_part_type_by_reportID(request, report_id, part_type):
    if request.method == 'GET':
        if(part_type not in part):
            return JsonResponse({"Message":"Key Error " + part_type + " not in datasheet", "status": 500}, status=500)

        response = getDatasheetByPartType(report_id,part[part_type])
        if(response['status'] == 200):
            return Response(response['data'])
        else:
            return JsonResponse(response, status=404)                     

@api_view(['GET'])
def get_dataSheetCategory_reportID(request, report_id ,part_type,datasheet_type ):
    if request.method == 'GET':
        if(part_type not in part or datasheet_type not in datasheet_filter):
            return JsonResponse({"Message":"Key Error " + part_type + " or "+ datasheet_type + " not in datasheet", "status": 500}, status=500)
        response = getDatasheetByCategory(report_id,part[part_type],datasheet_filter[datasheet_type])
        if(response['status'] == 200): 
            return Response(response['data'])
        else:
            return JsonResponse(response, status=404)       

@api_view(['GET'])
def get_dataSheetSubSection(request,report_id,part_type,datasheet_type,sub_section_type):
    if request.method == 'GET':
        if(part_type not in part or datasheet_type not in datasheet_filter or sub_section_type not in sub_section):
            return JsonResponse({"Message":"Key Error " + part_type + " or "+ datasheet_type + " or "+ sub_section_type +  " not in datasheet", "status": 500}, status=500)
        response = getDatasheetBySubSection(report_id,part[part_type],datasheet_filter[datasheet_type] , sub_section[sub_section_type])
        if(response['status'] == 200): 
            return Response(response['data'])
        else:
            return JsonResponse(response, status=404)           

"""
Condensed all the add datasheet into 1 function, since all it needs to do is insert into the datasheets key of the report object.
"""
@api_view(['POST'])
def addToDatasheetByType(request,part_type, datasheet_type):

    my_data = {"test": 'test'}
    report_id = request.data['report_id']
    del request.data['report_id']
    doc =  get_doc_by_reports('report_id',int(report_id))
    if(doc):
        for i in doc['equipments']:
            equipment_index = doc['equipments'].index(i) 
            for j in i['reports']:
                report_index = i['reports'].index(j) 
                if(not 'datasheets' in j):
                     j = {**j, 'datasheets': {}} #j is not in the doc
                if(j['report_id'] == int(report_id)):
                    if(part[part_type] not in j['datasheets']):
                        j['datasheets'] = { **j['datasheets'] ,part[part_type] : {}}
                    if(datasheet_type == 'image' or datasheet_type == 'application'):
                        myFile = request.FILES['image']
                        fs = FileSystemStorage()
                        filename = fs.save(myFile.name, myFile)
                        uploaded_file_url = fs.url(filename)
                        name = request.data['name'] 
                
                        _, file_extension = os.path.splitext(filename)
                        img={ 'image': "http://localhost:8000"+uploaded_file_url,
                                'name': name,
                                'comments': request.data['comments']}
                                # 'type': file_extension
                        content=myFile.read()
                        
                        if(datasheet_filter[datasheet_type] not in j['datasheets'][part[part_type]]):
                            j['datasheets'][part[part_type]] = {**j['datasheets'][part[part_type]] , datasheet_filter[datasheet_type] : []}
                        j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]].append(img)
                        DB_METSO.put_attachment(doc ,content ,filename ,datasheet_type)  
                        doc['equipments'][equipment_index]['reports'][report_index] = j  #overwrite the doc 
                    else:
                        if(datasheet_filter[datasheet_type] not in j['datasheets'][part[part_type]]):
                            j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]] = {}
                        j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]] = request.data
            
                    doc_id, rev = DB_METSO.save(doc) 
                    my_data = j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]]
        return Response(my_data)
    else:
        return JsonResponse({'Message':"report id " + str(report_id) +" Not Found", 'status':404}, status=404)     

@api_view(['POST'])
def addToDatasheetByCategory(request,part_type, datasheet_type, sub_section_type):
    my_data = {}
    report_id = request.data['report_id']
    
    del request.data['report_id']
    doc =  get_doc_by_reports('report_id',int(report_id))
    if(doc):
        for i in doc['equipments']:
            for j in i['reports']:
                if ('datasheets' in j) and (j['report_id'] == report_id):
                    if(part[part_type] not in j['datasheets']):
                        j['datasheets'] = { **j['datasheets'] ,part[part_type] : {}}
                    if(datasheet_filter[datasheet_type] not in j['datasheets'][part[part_type]]):
                        j['datasheets'][part[part_type]] = {**j['datasheets'][part[part_type]] ,datasheet_filter[datasheet_type]: {}}    
                    if(hasattr(j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]],str([sub_section[sub_section_type]])) == False):
                        j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]] = {**j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]] ,sub_section[sub_section_type]: {}}       
                    j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]][sub_section[sub_section_type]] = request.data
                    doc_id, rev = DB_METSO.save(doc) 
                    my_data = j['datasheets'][part[part_type]][datasheet_filter[datasheet_type]][sub_section[sub_section_type]]

        return Response(my_data)
    else:
        return JsonResponse({'Message':"report id " + str(report_id) +" Not Found", 'status':404}, status=404)     
    
