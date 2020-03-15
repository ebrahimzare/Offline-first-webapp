import { tableData } from "../../components/serviceWorkerHome/constants/millConstants";
const DEFAULT_STATE = {
  tableData: tableData,
  clickedUpdate: false,
  conditionExists: false,
  mill_id: "",
  mill_condition_version: 1
};
const millConditionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "UPDATE_MILL_CONDITION":
      return { ...state, tableData: action.tableData };
    case "CREATE_MILL_CONDITION":
      return {
        ...state,
        tableData: action.tableData
      };
    case "SET_MILL_ID":
      return {
        ...state,
        mill_id: action.mill_id
      };
    case "SET_CLICKED_UPDATE":
      return {
        ...state,
        clickedUpdate: action.clickedUpdate
      };
    case "SET_TABLEDATA":
      return {
        ...state,
        tableData: action.tableData
      }; 
    case "FETCH_MILL_CONDITION_SUCCESS":
        return{
            ...state,
            tableData: action.tableData,
            conditionExists: action.conditionExists,
            mill_condition_version: action.mill_condition_version,
            mill_id: action.mill_id
        };
    case "FETCH_MILL_CONDITION_DNE":

        let copyDefaultTable = DEFAULT_STATE.tableData;
        copyDefaultTable.map((x) => x.mill_id = action.mill_id)
        
        return{
            ...state,
            tableData: copyDefaultTable,
            conditionExists: DEFAULT_STATE.conditionExists,
            mill_condition_version: DEFAULT_STATE.mill_condition_version,
            mill_id: action.mill_id
        };
    default:
      return state;
  }
};

export default millConditionReducer;
