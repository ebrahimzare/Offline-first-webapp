import axios from "axios";
import { Backend_API_URL } from "../components/serviceWorkerHome/constants/fakeDatabase";

export default class JobsServices {
  getReportByReportID = async report_id => {
    try {
      const url = `${Backend_API_URL}/api/tasks/report/${report_id}`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //list of reports report
  getReportsByEquipmentSerial = async equipment_serial_number => {
    try {
      const url = `${Backend_API_URL}/api/tasks/equipment/${equipment_serial_number}/`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(error);
    }
  };

  updateReport = async new_data => {
    const url = `${Backend_API_URL}/api/tasks/report/update/${new_data.report_id}`;
    return await axios.put(url, new_data);
  };

  createReport = async report => {
    const url = `${Backend_API_URL}/api/tasks/`;
    return await axios.post(url, report);
  };

  //list of report ids by equipment serial number
  getListOfReports = async equipment_serial_number => {
    try {
      const url = `${Backend_API_URL}/api/reportID/equipment/${equipment_serial_number}`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(error);
    }
  };

  createPhoto = async photo => {
    let form_data = new FormData();
    form_data.append("report_id", photo.report_id);
    form_data.append("image", photo.image);
    form_data.append("name", photo.name);
    const url = `${Backend_API_URL}/api/photos/`;
    return await axios.post(url, form_data, {
      headers: { "content-type": "multiple/form-data" }
    });
  };

  getPhotoByReportID = async report_id => {
    try {
      const url = `${Backend_API_URL}/api/photos/report/${report_id}`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(`No photos for ${report_id}
        ${error}`);
    }
  };

  createPhoto1 = async photo => {
    let form_data = new FormData();

    form_data.append("report_id", photo.report_id);
    form_data.append("image", photo.image);
    form_data.append("name", photo.name);
    form_data.append("comments", photo.comments);
    const url = `${Backend_API_URL}/api/photos1/`;
    return await axios.post(url, form_data, {
      headers: { "content-type": "multiple/form-data" }
    });
  };

 
  getPhoto1ByReportID = async report_id => {
    try {
      const url = `${Backend_API_URL}/api/photos1/report/${report_id}`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(`No photos for ${report_id}
        ${error}`);
    }
  };

  //not used
  getEquipmentBySerialNumber = async equipment_serial_number => {
    try {
      const url = `${Backend_API_URL}/api/equipments/sn/${equipment_serial_number}`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteReport = async report => {
    const url = `${Backend_API_URL}/api/tasks/${report.report_id}`;
    return await axios.delete(url);
  };

  getPhoto = async id => {
    try {
      const url = `${Backend_API_URL}/api/photos/${id}`;
      return await axios.get(url).then(response => response.data);
    } catch (error) {
      console.log(`Invalid photo
        ${error}`);
    }
  };

  getPhotos = async () => {
    const url = `${Backend_API_URL}/api/photos/`;
    return await axios.get(url).then(response => response.data);
  };
};
