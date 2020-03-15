const DEFAULT_STATES = { isServiceWorker: true, header_title: "Metso Service Report", visited_page: [{path_number: 0, page_path: '/', page_name: "Equipment Client"}]};

const globalReducer = (state = DEFAULT_STATES, action) => { 

    switch(action.type) {
        case 'UPDATE_HEADER':
            return{...state,
                header_title:action.header_title,
                
            };
        case 'UPDATE_USER_TYPE':
            return{ 
                ...state,
                isServiceWorker: action.isServiceWorker,
                };  
        case 'ADD_VISITED_PAGE_SUCCESS': 
            return {
                ...state,
                visited_page:action.visited_page 
                };
        case 'RETURN_VISITED_PAGE':
            return {
                ...state,
                visited_page:action.visited_page 
                };    
        default:
             return state    
    };
};

export default globalReducer;

/*
[...state.visited_page, {current_page_path : action.current_page_path , current_page_name : action.current_page_name } ]
*/

// [{page_path: '/', page_name: "Equipment Client"},
//  {page_path: '/DashBoard', page_name: "DashBoard"},
//  {page_path: '/PreviousVisit', page_name: "Previous Visit"},
//  {page_path: '/JobReport', page_name: "Job Report"},
//  {page_path: '/MillCondition', page_name: "Mill Condition"},
//  {page_path: '/Datasheets', page_name: "Drive Train Datasheet"}   ]