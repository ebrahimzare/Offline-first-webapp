import {MILL_CONDITION} from './types'
import MillServices from "../../services/MillServices";

const millServices = new MillServices();

export const setMillID = (mill_id) => {
    return { type: MILL_CONDITION.SET_MILL_ID , mill_id: mill_id
    };
};

export const setClickedUpdate = clickedUpdate => {
    return {
        type: MILL_CONDITION.SET_CLICKED_UPDATE,
        clickedUpdate
    };
};

export const fetchMillConditionByIDSUCCESS = (tableData, mill_id) => {
    for(let i = 0 ; i< tableData.length ;i++){
        tableData[i].mill_id = mill_id;
    }
    return { type: MILL_CONDITION.FETCH_MILL_CONDITION_SUCCESS , 
        tableData,
        conditionExists: true,
        mill_condition_version: tableData[0]["version"],
        mill_id: mill_id
    };
};

export const setTableData = (tableData, mill_id) => {
    for(let i = 0 ; i< tableData.length ;i++){
        tableData[i].mill_id = mill_id;
    }
    return {
        type: MILL_CONDITION.SET_TABLEDATA,
        tableData
    };
};

export const fetchMillConditionDNE = (mill_id) => {
    return {
        type: MILL_CONDITION.FETCH_MILL_CONDITION_DNE,
        mill_id
    };
};

export const fetchMillConditionByID = mill_id => dispatch =>{
     millServices
    .getMillByID(mill_id)
    .then(response => {
      if(response.length > 0)
      dispatch(fetchMillConditionByIDSUCCESS(response, mill_id));
      else 
      dispatch(fetchMillConditionDNE(mill_id));
    })
    .catch(error => {
      console.log(error);
    });
};

export const addMillConditionSuccess = tableData => {
    return{
        type: MILL_CONDITION.ADD_MILL_CONDITION_SUCCESS , 
        tableData,
        conditionExists:true
    };
};

export const addMillCondition = tableData => dispatch => {
    millServices
    .addMill(tableData)
    .then(result => {
        dispatch(addMillConditionSuccess(result));
    })
    .catch(error => {
      alert(`There was an error submitting the form! ${error}`);
    });
};

export const updateMillConditionSuccess = tableData => {
    return{
        type: MILL_CONDITION.UPDATE_MILL_CONDITION_SUCCESS , 
        tableData,
        conditionExists:true
    };
};

export const updateMillCondition = (tableData, mill_id) => dispatch => {
    millServices
    .updateMillById(tableData, mill_id)
    .then(result => {
        dispatch(updateMillConditionSuccess(result));
    })
    .catch(error => {
      alert(`There was an error submitting the form! ${error}`);
    });
};

    

  