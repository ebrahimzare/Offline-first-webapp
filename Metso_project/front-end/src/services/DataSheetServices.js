import axios from "axios";
import { Backend_API_URL } from "../components/serviceWorkerHome/constants/fakeDatabase";

export default class DataSheetServices {
    //all datasheets 
    getDataSheetByID = async(report_id) => {
        const url = `${Backend_API_URL}/api/datasheet/report/${report_id}`;
        return await axios.get(url).then(response => response);
    };  
    //datasheets by part type: , drivetrain, free-fixed main bearing 
    getDataSheetByPartTypeByID = async(report_id,part_type) => {
        const url = `${Backend_API_URL}/api/datasheet/${part_type}/report/${report_id}`;
        return await axios.get(url).then(response => response);
    };
    //temperature, coupling, pinion gear ... 
    getDataSheetByDataSheetTypeByID = async(report_id,part_type, datasheet_type) => {
        const url = `${Backend_API_URL}/api/datasheet/${part_type}/${datasheet_type}/report/${report_id}`;
        return await axios.get(url).then(response => response);
    };  
    //single helix , double helix , motor to reducer, reducer to pinion... 
    getDataSheetBySubSectionByID = async(report_id, part_type, datasheet_type, subsection_type) => {
        const url = `${Backend_API_URL}/api/datasheet/${part_type}/${datasheet_type}/${subsection_type}/report/${report_id}`;
        return await axios.get(url).then(response => response);
    };  

    addDataSheetByType = async(data, part_type, datasheet_type) => {
        if(datasheet_type === 'image' || datasheet_type === 'application'){
            let form_data = new FormData();
            form_data.append("report_id", data.report_id);
            form_data.append("image", data.image);
            form_data.append("name", data.name);
            form_data.append("comments", data.comments);
            const url = `${Backend_API_URL}/api/datasheet/${part_type}/${datasheet_type}/`; 
            return await axios.post(url, form_data, {
                headers: { "content-type": "multiple/form-data" }
              });}
        else{
            const url = `${Backend_API_URL}/api/datasheet/${part_type}/${datasheet_type}/`; 
            return await axios.post(url,data);}
    };

    addDataSheetByCategory = async(data, part_type, datasheet_type, category_type) => {
        const url = `${Backend_API_URL}/api/datasheet/${part_type}/${datasheet_type}/${category_type}/`; 
        return await axios.post(url,data);
    };
};