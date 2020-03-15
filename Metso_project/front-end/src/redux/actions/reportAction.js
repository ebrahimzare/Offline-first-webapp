import {REPORTS} from './types';
import JobsServices from "../../services/JobsServices";

const jobServices = new JobsServices();

export const setReportID = (report_id) =>{
    return {
        type: REPORTS.SET_REPORT_ID , report_id
    };
};

export const setReportDate = date => {
    return {
        type: REPORTS.SET_REPORT_DATE , date
    };
};

export const setSelectValue = (select_value) =>{
    return {
        type: REPORTS.SET_SELECT_VALUE , select_value
    };
};

export const createReportSuccess = (fields) => {
    return {type: REPORTS.CREATE_REPORT_SUCCESS, fields: fields};
   };

export const createReport = (fields) => dispatch => {
    
    jobServices
    .createReport(fields)
    .then(result => {
     dispatch(createReportSuccess(result.data))
    })
    .catch(error => {
      alert(`There was an error submitting the form! ${error}`);
    });
    
};

export const updateReportSuccess = fields => {
    return {type: REPORTS.UPDATE_REPORT_SUCCESS, fields: fields};
};

export const updateReport = fields => dispatch => {
     jobServices
    .updateReport(fields)
    .then(result => {
      dispatch(updateReportSuccess(result.data))
      
    })
    .catch(error => {
      alert(`There was an error updating the form! ${error}`);
    });
}


export const fetchReportsListSerialNumberSuccess = (list) => {
    return {type: REPORTS.FETCH_REPORTS_LIST_BY_EQUIP_SERIAL_SUCCESS , report_list: list};
};

export const fetchReportsListSerialNumber = (serial_number) => dispatch => {
     jobServices
    .getListOfReports(serial_number)
    .then(function(result) {
      if(result !== undefined)
      dispatch(fetchReportsListSerialNumberSuccess(result.report_id_list))
    });
};

export const fetchReportsSerialNumberSuccess = (reports) => {
    return {type: REPORTS.FETCH_REPORTS_BY_EQUIP_SERIAL_SUCCESS , reports };
};

export const fetchReportsSerialNumber = (serial_number) => dispatch => {
     jobServices
          .getReportsByEquipmentSerial(serial_number) 
          .then( (result) => { 
            if(result !== undefined)
            dispatch(fetchReportsSerialNumberSuccess(result.data));
          });
};

export const fetchReportByReportIDSuccess = (report) =>{
    return { type: REPORTS.FETCH_REPORT_BY_REPORT_ID_SUCCESS  , fields: report};
};

export const fetchReportByReportID = report_id => dispatch => {
     jobServices
        .getReportByReportID(report_id)
        .then(result => {
            if(result !== undefined)
            dispatch(fetchReportByReportIDSuccess(result));
        })
};

export const reverseList = (isReverse) => {
    return {
        type: REPORTS.REVERSE_REPORTS_LIST, isReverse : !isReverse
    };
};

export const setContactType = contact_type => {
    return {
        type: REPORTS.SET_CONTACT_TYPE , contact_type: contact_type
    };
}; 

export const setFields = fields => {
    return {
        type: REPORTS.SET_FIELDS , fields: fields
    };
}; 

