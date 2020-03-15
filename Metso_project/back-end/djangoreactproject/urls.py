"""djangoreactproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from tasks import views
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # url(r'^api/testclients$', views.testGetClients), #to test something else
    url(r'^api/testequipments$', views.testGetEquipments),
    url(r'^api/tasks/$', views.tasks_list), #done
    url(r'^api/mill_condition/mill/$',views.get_all_mills),#done
    url(r'^api/clients$', views.getALLCustomers), #done
    url(r'^api/equipments$', views.getAllEquipments), #done
    url(r'^api/tasks/report/update/(?P<report_id>[0-9]+)$',views.tasks_update_by_report_id),#done
    url(r'^api/tasks/(?P<integer_type>[a-z]+)/(?P<integer_value>[0-9]+)$',views.tasks_by_integer),#done
    url(r'^api/tasks/equipment/(?P<equipment_serial_number>[0-9]+-{0,1}[a-zA-Z0-9]*)/$',views.tasks_find_by_equipment),#done
    url(r'^api/reportID/equipment/(?P<equipment_serial_number>[0-9]+-{0,1}[a-zA-Z0-9]*)$',views.get_list_report_id_by_equipment),#done
    url(r'^api/equipments/sn/(?P<equipment_serial_number>[0-9]+-{0,1}[a-zA-Z0-9]*)$',views.getEquipmentBySerialNumber),#done
    url(r'^api/mill_condition/mill/(?P<mill_id>[0-9]+-{0,1}[a-zA-Z0-9]*)$',views.find_mill_by_id),#done
    url(r'^api/mill_condition/update/(?P<mill_id>[0-9]+-{0,1}[a-zA-Z0-9]*)$', views.update_mill),#done
    url(r'^api/mill_condition/mill/add/$',views.add_mill_condition),#done
    url(r'^api/clients/(?P<client_id>[0-9]+)$',views.getClientByID),#done
    url(r'^api/clients/name/(?P<name>[a-zA-Z]+( )*[a-zA-Z]*)$',views.getClientByname),#done
    url(r'^api/equipments/client/(?P<client_id>[0-9]+)$',views.getEquipmentByCustomerID),#done
    url(r'^api/photos/$', views.getALLPhotos),#done
    url(r'^api/photos/report/(?P<report_id>[0-9]+)$', views.photos_by_reportID),#done
    #datasheets
    url(r'^api/datasheet/report/(?P<report_id>[0-9]+)$', views.get_all_datasheet_by_reportID),#done
    url(r'^api/datasheet/(?P<part_type>[a-z]+)/report/(?P<report_id>[0-9]+)$', views.get_all_datasheet_by_part_type_by_reportID),#done
    url(r'^api/datasheet/(?P<part_type>[a-z]+)/(?P<datasheet_type>[a-zA-Z+_{0,1}a-zA-Z*]+)/report/(?P<report_id>[0-9]+)$', views.get_dataSheetCategory_reportID),#done
    url(r'^api/datasheet/(?P<part_type>[a-z]+)/(?P<datasheet_type>[a-zA-Z+_{0,1}a-zA-Z*]+)/(?P<sub_section_type>[a-zA-Z+_{0,1}a-zA-Z*]+)/report/(?P<report_id>[0-9]+)$', views.get_dataSheetSubSection),#done
    url(r'^api/datasheet/(?P<part_type>[a-z]+)/(?P<datasheet_type>[a-zA-Z+_{0,1}a-zA-Z*]+)/$', views.addToDatasheetByType),#done
    url(r'^api/datasheet/(?P<part_type>[a-z]+)/(?P<datasheet_type>[a-zA-Z+_{0,1}a-zA-Z*]+)/(?P<sub_section_type>[a-zA-Z+_{0,1}a-zA-Z*]+)/$', views.addToDatasheetByCategory)#done
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 

