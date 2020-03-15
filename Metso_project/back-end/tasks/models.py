from django.db import models

class Task(models.Model):
    __tablename__ = 'tasks_task'
    report_id =  models.IntegerField("Report ID", null=False)
    equipment_serial_number = models.CharField("S/N", max_length=255, null=False)
    job_number =  models.IntegerField("Job Number")
    work_order_number = models.IntegerField("Work Order Number")
    project_number = models.IntegerField("Project Number", null=True)
    representative_name = models.CharField("Representative Name", max_length=255 , blank=True,null=True)
    contact_info = models.CharField("Contact Info", max_length=255,blank=True, null=True)
    date = models.TextField("Date", blank=True, null=True)
    introduction=models.TextField("Introduction", blank=True, null=True) 
    visit_reason=models.TextField("Visit Reason", blank=True, null=True)
    work_performed=models.TextField("Work Performed", blank=True, null=True)    
    recommendation=models.TextField("Recommendation", blank=True, null=True)
    report_status = models.BooleanField("Report Status")

    def __str__(self): 
        return '%s %s %s %s %s %s %s %s %s %s %s %s %s' % (self.report_id,self.equipment_serial_number, self.job_number, self.work_order_number, self.representative_name, self.contact_info,
         self.project_number, self.date, self.introduction, self.visit_reason, self.work_performed, self.recommendation, self.report_status)

class MillCondition(models.Model):
    __tablename__= 'tasks_millcondition'
    mill_id = models.CharField("Mill_ID", max_length=255, null=False)
    version = models.IntegerField("Version")
    component = models.CharField("Component", max_length=255, null=True)
    condition = models.CharField("Condition", max_length=255, null=True)
    work_to_be_scheduled = models.CharField("WTBS", max_length=255, null=True)
   
    def __str__(self): 
        return '%s %s %s %s %s' % (self.mill_id, self.version, self.component, self.condition, self.work_to_be_scheduled)


class EquipClients(models.Model):
    __tablename__= 'tasks_equipclients'
    client_id = models.IntegerField("Client ID", null=False)
    name = models.CharField("Name", max_length=255, null=False)
    phone = models.CharField("Phone", max_length=45, null=False)
    address = models.CharField("Address", max_length=255, null=False)
    logo = models.CharField("Logo Link", max_length=255, null=False)
    equip_type = models.CharField("Equipment Type", max_length=255, null=True)
    model = models.CharField("Model", max_length=255, null=True)
    customer_reference = models.CharField("Customer Reference", max_length=255, null=True)
    equipment_serial_number = models.CharField("S/N", max_length=255, null=True)
   
    def __str__(self): 
        return '%s %s %s %s %s %s %s %s %s' % (self.client_id, self.name, self.phone, self.address, self.logo, self.equip_type, self.model, self.customer_reference, self.equipment_serial_number)

class Equipments(models.Model):
    __tablename__= 'tasks_equipments'
    owner = models.ForeignKey("Clients", on_delete=models.PROTECT)
    equip_type = models.CharField("Equipment Type", max_length=255, null=True)
    model = models.CharField("Model", max_length=255, null=True)
    customer_reference = models.CharField("Customer Reference", max_length=255, null=True)
    serial_number = models.CharField("S/N", max_length=255, null=True)
   
    def __str__(self): 
        return '%s %s %s %s %s' % (self.owner, self.equip_type, self.model, self.customer_reference, self.serial_number)

class Clients(models.Model):
    __tablename__= 'tasks_clients'
    client_id = models.CharField("Client ID", max_length=255, null=False)
    name = models.CharField("Name", max_length=255, null=True)
    phone = models.CharField("Phone", max_length=45, null=True)
    address = models.CharField("Address", max_length=255, null=True)
    image_link = models.CharField("Image Link", max_length=255, null=True)
    equip_ownership = models.ForeignKey("Equipments", on_delete=models.PROTECT)
   
    def __str__(self): 
        return '%s %s %s %s %s %s' % (self.client_id, self.name, self.phone, self.address, self.image_link, self.equip_ownership)

class Photos(models.Model):
    __tablename__= 'tasks_photos'
    report_id = models.IntegerField("Report ID", null=False)
    name = models.CharField("Name", max_length=255, null=True)
    image=models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return '%s %s %s' % str(self.report_id, self.name, self.image)

class Photos1(models.Model):
    __tablename__= 'tasks_photos1'
    report_id = models.IntegerField("Report ID", null=False)
    name = models.CharField("Name", max_length=255, null=True)
    image=models.FileField(upload_to='images/', null=True) 
    comments=models.TextField("Comments", null=True)

    def __str__(self):
        return '%s %s %s %s' % str(self.report_id, self.name, self.image, self.comments)

class PinionTemperatureSingleHelix(models.Model):
  
    __tablename__= 'tasks_piniontemperaturesinglehelix'
    report_id = models.IntegerField("report_id", null=False)
    Date = models.DateField ("Date" , blank=True)
    HRES = models.TimeField ("HRES" , blank=True)
    T_P_1 = models.IntegerField("T_P_1" , null=True)
    T_1 = models.IntegerField("T_1" , null=True)
    T_2 = models.IntegerField("T_2" , null=True)
    T_3 = models.IntegerField("T_3" , null=True)
    T_4 = models.IntegerField("T_4" , null=True)
    T_5 = models.IntegerField("T_5" , null=True)
    T_P_2 = models.IntegerField("T_P_2" , null=True)
    CHARGE_KVA = models.IntegerField("CHARGE_KVA" , null=True)
    Delta_T = models.IntegerField("Delta_T" , null=True)
    Notes = models.TextField("Notes" , null=True)   
       
    def __str__(self):
        return '%s %s %s %s %s %s %s %s %s %s %s %s %s' % str(self.report_id,self.Date,self.HRES,self.T_P_1,self.T_1,self.T_2,self.T_3,self.T_4,self.T_5,self.T_P_2,self.CHARGE_KVA,self.Delta_T,self.Notes)         