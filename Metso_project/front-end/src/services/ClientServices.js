import axios from "axios";
import { Backend_API_URL } from "../components/serviceWorkerHome/constants/fakeDatabase";

/**
 * Services as a class, so that only 1 export is neccesary, in the actions an object of such class is created and will call the function.
 * Service functions call with axios, a promist based HTTP client. This makes it easy to send asynchronous HTTP requests to REST endpoints, ( our backend server). 
 */
class ClientServices {
  /**
   * get all clients, client id, name , phone , address ,logo
   */
  getClients = async () => {
    try{
    const url = `${Backend_API_URL}/api/clients`;
    return await axios.get(url).then(response => response.data);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(error)
      };
    };
  };

  /**
   * get client information by name
   */
  getClientByName = async name => {
    const url = `${Backend_API_URL}/api/clients/name/${name}`;
    return await axios.get(url).then(response => response.data);
  };

  /**
   * get client information by id
   */
  getClientByID = async client_id => {
    const url = `${Backend_API_URL}/api/clients/${client_id}`;
    return await axios.get(url).then(response => response.data);
  }

  /**
   * get equipments by client id 
   */
  getEquipmentByCustomerID = async client_id => {
    try {
      const url = `${Backend_API_URL}/api/equipments/client/${client_id}`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(`${error} 
      This Owner does not have any equipments`);
    }
  };
}

export default ClientServices;
