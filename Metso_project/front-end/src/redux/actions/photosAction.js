
import {PHOTOS} from './types';
import JobsServices from "../../services/JobsServices";
import DataSheetServices from "../../services/DataSheetServices";

const jobServices = new JobsServices();
const dataSheetServices = new DataSheetServices();

export const uploadPhotoSuccess = (image_fields) => {
    return{
        type: PHOTOS.ADD_TO_REPORT_PHOTO_SUCCESS,
        image_fields
    };
};

export const uploadPhoto = (image_fields) => dispatch =>{
 jobServices
.createPhoto(image_fields)
.then(result => {
  dispatch(uploadPhotoSuccess(result));
})
.catch(error => {
  alert(`There was an error submitting the photo! ${error}`);
});
};

export const setImageFields = (report_id, name, image)=> {
    return {
        type: PHOTOS.SET_IMAGE_FIELDS,
        image_fields: { report_id, name , image} 
    };
};

export const uploadPhotoDatasheet = (image_fields, part_type , datasheet_type) => dispatch =>{
    dataSheetServices
   .addDataSheetByType(image_fields ,part_type, datasheet_type) //
   .then(result => {
    //  alert(result)
     dispatch(uploadPhotoDatasheetSuccess(result));
   })
   .catch(error => {
     alert(`There was an error submitting the file or photo! ${error}`);
   });
};

export const uploadPhotoDatasheetSuccess = (image_fieldsDatasheet) => {
    return{
        type: PHOTOS.DATASHEET_FILE_SUCCESS,
        image_fieldsDatasheet
    };
};
   
export const setImageFieldsDatasheet = (report_id, name, image,comments)=> {
       return {
           type: PHOTOS.SET_IMAGE_FIELDS_DATASHEET,
           image_fieldsDatasheet: { report_id, name , image, comments}       
    };
};

export const fetchPhotosATRByReportSuccess = photos_list =>{
    return {
        type: PHOTOS.FETCH_PHOTOS_BY_REPORT_ID_SUCCESS,
        photos_list 
    };
};
 
export const fetchPhotosATRByReport = (report_id) => dispatch => {

    jobServices.getPhotoByReportID(report_id).then((result) => {
        if(result.data !== undefined)
        dispatch(fetchPhotosATRByReportSuccess(result.data)); 
    });
};

