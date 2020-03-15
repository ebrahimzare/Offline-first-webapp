/**
 * getEquipmentByClientID
 * @param {Document} doc - couch document
 */
function (doc) {
    var equipments = doc.equipments.map(function(equipment){
    return {'equipment_serial_number' : equipment.equipment_serial_number,
                      'equip_type': equipment.equip_type,
                      'model': equipment.model,
                      'customer_reference': equipment.customer_reference};
    }); 
    emit(doc.client_id, equipments);
  }

/**
 * getEquipmentBySerialNumber
 *  @param {Document} doc - couch document
 */
function (doc) {
    var list_of_equipment = doc.equipments.map(function(equipment){return{'client_id': doc.client_id,
                                                                          'equipment_serial_number' : equipment.equipment_serial_number,
                                                                                 'equip_type': equipment.equip_type,
                                                                                      'model': equipment.model,
                                                                         'customer_reference': equipment.customer_reference}});
  for (var i in list_of_equipment){
    emit(list_of_equipment[i].equipment_serial_number, list_of_equipment[i] );
  }
  }