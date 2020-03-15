const DEFAULT_STATES = {
    photos_list:[], 
    image_fields:{ report_id: "" , name: "", image: null },
    image_fieldsDatasheet:{ report_id: "" , name: "", image: null, comments: "" }
    };

const photosReducer = (state = DEFAULT_STATES, action) => { 

    switch(action.type) {
        case 'SET_IMAGE_FIELDS':
            return{...state,
                image_fields:action.image_fields,
            };
        case 'SET_IMAGE_FIELDS_DATASHEET':
            return{...state,
                image_fieldsDatasheet: action.image_fieldsDatasheet,
            };
        case 'FETCH_PHOTOS_BY_REPORT_ID_SUCCESS':
            return{...state,
                photos_list:action.photos_list,
            };   
        case 'ADD_TO_REPORT_PHOTO_SUCCESS':
            return{...state,
               photos_list:action.photos_list,
            }; 
        case 'DATASHEET_FILE_SUCCESS':
            return {...state,
                image_fieldsDatasheet:action.image_fieldsDatasheet
            }    
                    
        default:
             return state    
    };
};
export default photosReducer;

