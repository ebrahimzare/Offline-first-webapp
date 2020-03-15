from rest_framework import serializers
from .models import Task , MillCondition ,EquipClients, Equipments , Clients, Photos , Photos1 , PinionTemperatureSingleHelix


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task 
        queryset = Task.objects.all()
        fields = ('report_id','job_number','work_order_number','project_number','representative_name','contact_info',
        'date','introduction','visit_reason','work_performed','recommendation','report_status')

class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task 
        queryset = Task.objects.all()
        fields = ('id','report_id')

class MillConditionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MillCondition 
        queryset = MillCondition.objects.all()
        fields = ('__all__')


class EquipClientsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EquipClients 
        queryset = EquipClients.objects.all()
        fields = ('client_id', 'equip_type', 'model', 'customer_reference', 'equipment_serial_number')
        

# class EquipmentsSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Equipments 
#         queryset = Equipments.objects.all()
#         fields = ('__all__')
        
class ClientsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EquipClients 
        queryset = EquipClients.objects.all()
        fields = ('client_id','name', 'phone', 'address', 'logo')
        
        
class PhotosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photos
        queryset = Photos.objects.all()
        fields = ('report_id','name','image')

class Photos1Serializer(serializers.ModelSerializer):

    class Meta:
        model = Photos1
        queryset = Photos1.objects.all()
        fields = ('__all__')

class PinionTemperatureSingleHelixSerializer(serializers.ModelSerializer):

    class Meta:
        model = PinionTemperatureSingleHelix
        queryset = PinionTemperatureSingleHelix.objects.all()
        fields = ('report_id','Date', 'HRES' , 'T_P_1', 'T_1', 'T_2', 'T_3', 'T_4', 'T_5', 'T_P_2', 'CHARGE_KVA', 'Delta_T', 'Notes')   