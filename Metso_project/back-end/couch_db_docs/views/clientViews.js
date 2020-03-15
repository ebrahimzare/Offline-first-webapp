/**
 * getAllClients
 */
function(doc) {
    emit(doc.client_id-1 , {"client_id" : doc.client_id, "name" : doc.name, "phone": doc.name , "address": doc.address, "logo": doc.logo} );
}
/**
 * getClientById
 */
function (doc) {
    emit(doc.client_id, {'client_id': doc.client_id , 'name': doc.name, 'phone': doc.phone, 'address': doc.address, 'logo': doc.logo});
  }

/**
 * getClientByName
 */
function (doc) {
    emit(doc.name, {'client_id': doc.client_id , 'name': doc.name, 'phone': doc.phone, 'address': doc.address, 'logo': doc.logo});
  }
  