import axios from 'axios';
import {Backend_API_URL} from "../components/serviceWorkerHome/constants/fakeDatabase";

export default class MillServices{

    getAllMill = async() => {
        const url = `${Backend_API_URL}/api/mill/`;
        return await axios.get(url).then(response => response.data);
    };  

    getMillByID = async(mill_id) => {
        const url = `${Backend_API_URL}/api/mill_condition/mill/${mill_id}`;
        return await axios.get(url).then(response => response.data);
    };

    addMill = async(data) => {
        const url = `${Backend_API_URL}/api/mill_condition/mill/add/`; 
        return await axios.post(url,data);
    };

    updateMillById = async(new_data , mill_id) =>{
  
        const url = `${Backend_API_URL}/api/mill_condition/update/${mill_id}`;
        return await axios.put(url,new_data);
    };

};