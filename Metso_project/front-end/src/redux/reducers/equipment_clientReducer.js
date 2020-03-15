const DEFAULT_CLIENTS = { client_id:1, validSearch:true, clients: [] , active_customer: [true, false, false, false, false, false, false], equipments:[], error:""};

const clientReducer = (state = DEFAULT_CLIENTS, action) => { 

    switch(action.type) {
        case 'FETCH_CLIENTS_SUCCESS': //stuck in this switch case
            return{...state,
                clients:action.clients,
                active_customer: action.active_customer
            };
        case 'FETCH_CLIENTS_SEARCH_SUCCESS':
            return{
               ...state,
               current_customer: action.current_customer,
               active_customer: action.active_customer
                }; 
        case 'UPDATE_CLIENT_ID':
            return {
                ...state,
                client_id: action.client_id
                };
        case 'FETCH_CLIENT_BY_SEARCH_SUCCESS':
            return{
                ...state,
                client_id: action.client_id,
                name:action.name,
                phone:action.phone,
                address:action.address,
                logo: action.logo,
                current_customer: action.current_customer,
                active_customer: action.active_customer
            };      
        case 'FETCH_EQUIPMENTS_SUCCESS':
                return {...state ,
                    equipments: action.equipments 
                };  
        case 'SET_CLIENT_SUCCESS':
             return { 
                 ...state,
                 current_customer: action.customer
             };     
        case 'SET_CURRENT_EQUIPMENT_SUCCESS':
            return { 
                ...state,
                current_equipment: action.current_equipment,
                equipment_serial_number: action.equipment_serial_number
        }; 
             
        case 'FETCH_EQUIPMENTS_ERROR':
                return {...state ,
                    error: action.error 
                };           
        case 'INVALID_SEARCH':
            return{
                ...state,
                valid_search: action.validSearch 
            };   
        default:
             return state    
    }

};

export default clientReducer;

