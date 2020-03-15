/**
 * get all reports
 * http://localhost:5984/metso_app/_design/reports/_view/getAllReports?include_docs=false
 */
function (doc) {
  var list_of_equipment = doc.equipments.map(function(equipment){return{'equipment_serial_number': equipment.equipment_serial_number ,'reports': equipment.reports}});
  for (var i in list_of_equipment){
    var list_of_reports = list_of_equipment[i].reports.map(function(report){
      return {'equipment_serial_number': list_of_equipment[i].equipment_serial_number,
              'report_id': report.report_id,
              'job_number': report.job_number,
              'work_order_number': report.work_order_number,
              'project_number': report.project_number,
              'contact_info': report.contact_info,
              'representative_name': report.representative_name,
              'introduction': report.introduction,
              'visit_reason': report.visit_reason,
              'recommendation': report.recommendation,  
              'work_performed': report.work_performed,
              'date': report.date,
              'report_status': report.report_status
            }
    })
    for(var j in list_of_reports){
    emit(list_of_reports[j].report_id, list_of_reports[j]);
   }
  }
}