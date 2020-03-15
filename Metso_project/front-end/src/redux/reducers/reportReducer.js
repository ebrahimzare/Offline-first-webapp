const DEFAULT_STATES = {
    report_list: [],
    reports: [],
    isReverse: false,
    report_id:"",
    contact_type: "Email",
    introduction:"",
    visit_reason: "",
    work_performed: "",
    recommendation: "",
    report_status:false,
    fields: {}, 
    select_value: "Introduction"
};

const reportReducer = (state = DEFAULT_STATES, action) => { 

    switch(action.type) {
        case 'FETCH_REPORTS_LIST_BY_EQUIP_SERIAL_SUCCESS':
            return{...state,
                report_list:action.report_list,
            };
        case 'FETCH_REPORTS_BY_EQUIP_SERIAL_SUCCESS':
            return{...state,
                reports:action.reports,
            };
        case 'FETCH_REPORT_BY_EQUIP_SERIAL_SUCCESS':
            return{ 
                ...state,
               
                };     
        case 'FETCH_REPORT_BY_REPORT_ID_SUCCESS':
            return{ 
                ...state,
                fields: action.fields,
                
                };     
        case 'UPDATE_REPORT_SUCCESS':
            return{ 
                ...state,
                fields: action.fields
                };             
        case 'CREATE_REPORT_SUCCESS':
            return{ 
                ...state,
                fields: action.fields
                };   
        case 'REVERSE_REPORTS_LIST':
            return{ 
                ...state,
                isReverse: action.isReverse
                };           
        case 'SET_REPORT_ID': 
             return{ 
                 ...state,
                 report_id: action.report_id,
                 }; 
        case 'SET_REPORT_DATE': 
             return{ 
                 ...state,
                 date: action.date,
                 };   
        case 'SET_CONTACT_TYPE':
             return{ 
                 ...state,
                 contact_type: action.contact_type,
                 };         
        case 'SET_FIELDS':
             return{ 
                 ...state,
                 fields: action.fields,
                 };    
        case 'SET_SELECT_VALUE':
             return{ 
                 ...state,
                 select_value: action.select_value,
                 };                                
        default:
             return state    
    };
};
export default reportReducer;

