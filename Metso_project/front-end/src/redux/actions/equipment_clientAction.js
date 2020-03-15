import ClientServices from "../../services/ClientServices";
import {EQUIPMENT, CLIENT} from './types';
const clientServices = new ClientServices();

export const fetchClientsSuccess = (clients, active_customer) => {
  //stuck in here
  return { type: CLIENT.FETCH_CLIENTS_SUCCESS, clients, active_customer };
};

export const fetchClientsSearchSuccess = (clients, active_customer) => {
  return {
    type: CLIENT.FETCH_CLIENTS_SEARCH_SUCCESS,
    current_customer: clients[0],
    active_customer
  };
};

export const fetchClientBySearchSuccess = (
  current_customer,
  active_customer
) => {
  const { client_id, name, phone, address, logo } = current_customer;
  return {
    type: CLIENT.FETCH_CLIENT_BY_SEARCH_SUCCESS,
    client_id,
    name,
    phone,
    address,
    logo,
    current_customer,
    active_customer: active_customer
  };
};

export const fetchEquipmentsSuccess = equipments => {
  //stuck in here
  return { type: EQUIPMENT.FETCH_EQUIPMENTS_SUCCESS, equipments };
};

export const fetchEquipmentsError = error => {
  //stuck in here
  return { type: EQUIPMENT.FETCH_EQUIPMENT_ERROR, error };
};

export const fetchClientByIDSuccess = customer =>{
  return { type: CLIENT.SET_CLIENT_SUCCESS , customer }
}

export const fetchEquipment = client_id => dispatch => {
  //console.log("hello")
  clientServices
    .getEquipmentByCustomerID(client_id)
    .then(response => {
      dispatch(fetchEquipmentsSuccess(response));
    })
    .catch(error => {
      dispatch(fetchEquipmentsError(error));
    });
};

export const invalidSearch = (validSearch) => {
  return { type: CLIENT.INVALID_SEARCH, validSearch: !validSearch };
};

//client logged in. by name
export const fetchClientByNameSearch = (
  client_name,
  validSearch,
  active_customer
) => dispatch => {
  //list of same client
  clientServices
    .getClientByName(client_name)
    .then(response => {
      if (response === undefined) {
        alert(`Client Named ${client_name} Not Found!`);
        dispatch(invalidSearch(validSearch));
      }
      if (validSearch !== false) {
        let tempArray = active_customer;
        tempArray.fill(false);
        tempArray[response.client_id - 1] = true;
        dispatch(fetchClientBySearchSuccess(response, tempArray));
        dispatch(fetchEquipment(response.client_id));
      }
    })
    .catch(error => {
      console.log(error);
    });
};

//updateClient ID Action
export const updateClientID = client_id => ({
  type: CLIENT.UPDATE_CLIENT_ID,
  client_id
});

export const setCurrentEquipment = current_equipment => ({
  type: EQUIPMENT.SET_CURRENT_EQUIPMENT_SUCCESS,
  current_equipment,
  equipment_serial_number: current_equipment['equipment_serial_number']
});

export const fetchClientByID = client_id => dispatch => {
  clientServices.getClientByID(client_id).then(response => {
      dispatch(fetchClientByIDSuccess(response));
    })
  .catch(error => {
    console.log(error);
  });
};

//valid search true works but inf loop, valid search false doesn't work still inf loop
export const fetchClientsList = (valid_search, active_customer) => dispatch => {
  clientServices
    .getClients()
    .then(response => {
      if (valid_search !== false) {
        dispatch(fetchClientsSuccess(response.clients, active_customer));
      } else {
        let tempArray = active_customer;
        tempArray.fill(false);
        tempArray[response.clients[0].index] = true;
        dispatch(fetchClientsSearchSuccess(response.clients, tempArray));
      }
    })
    .catch(error => {
      console.log(error);
    });
};

