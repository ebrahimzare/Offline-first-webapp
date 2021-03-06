export const GLOBAL ={
    UPDATE_HEADER:'UPDATE_HEADER', //global actions
    UPDATE_USER_TYPE:'UPDATE_USER_TYPE',
    ADD_VISITED_PAGE_SUCCESS: 'ADD_VISITED_PAGE_SUCCESS',
    RETURN_VISITED_PAGE: 'RETURN_VISITED_PAGE'
};

export const EQUIPMENT = {
    FETCH_EQUIPMENTS_SUCCESS:'FETCH_EQUIPMENTS_SUCCESS',
    FETCH_EQUIPMENT_ERROR: 'FETCH_EQUIPMENT_ERROR',
    SET_CURRENT_EQUIPMENT_SUCCESS: 'SET_CURRENT_EQUIPMENT_SUCCESS'
};

export const CLIENT = {
    FETCH_CLIENTS_SUCCESS: 'FETCH_CLIENTS_SUCCESS',
    FETCH_CLIENTS_SEARCH_SUCCESS: 'FETCH_CLIENTS_SEARCH_SUCCESS',
    FETCH_CLIENT_BY_SEARCH_SUCCESS: 'FETCH_CLIENT_BY_SEARCH_SUCCESS',
    SET_CLIENT_SUCCESS: 'SET_CLIENT_SUCCESS',
    INVALID_SEARCH: 'INVALID_SEARCH',
    UPDATE_CLIENT_ID:'UPDATE_CLIENT_ID'
};

export const REPORTS = {
    FETCH_REPORTS_LIST_BY_EQUIP_SERIAL_SUCCESS: 'FETCH_REPORTS_LIST_BY_EQUIP_SERIAL_SUCCESS', //list of report ID
    FETCH_REPORTS_BY_EQUIP_SERIAL_SUCCESS: 'FETCH_REPORTS_BY_EQUIP_SERIAL_SUCCESS', //array of report objects
    FETCH_REPORT_BY_EQUIP_SERIAL_SUCCESS: 'FETCH_REPORT_BY_EQUIP_SERIAL_SUCCESS',
    FETCH_REPORT_BY_REPORT_ID_SUCCESS: 'FETCH_REPORT_BY_REPORT_ID_SUCCESS',
    UPDATE_REPORT_SUCCESS: 'UPDATE_REPORT_SUCCESS',
    CREATE_REPORT_SUCCESS: 'CREATE_REPORT_SUCCESS',
    SET_REPORT_ID: 'SET_REPORT_ID',
    SET_CONTACT_TYPE: 'SET_CONTACT_TYPE',
    REVERSE_REPORTS_LIST: 'REVERSE_REPORTS_LIST',
    SET_FIELDS: 'SET_FIELDS',
    SET_SELECT_VALUE: 'SET_SELECT_VALUE',
    SET_REPORT_DATE: 'SET_REPORT_DATE'
};

export const PHOTOS = {
    ADD_TO_REPORT_PHOTO_SUCCESS: 'ADD_TO_REPORT_PHOTO_SUCCESS',
    DATASHEET_FILE_SUCCESS: 'DATASHEET_FILE_SUCCESS',
    FETCH_PHOTOS_BY_REPORT_ID_SUCCESS: 'FETCH_PHOTOS_BY_REPORT_ID_SUCCESS',
    FETCH_PHOTOS_DATASHEET_BY_REPORT_ID: 'FETCH_PHOTOS_DATASHEET_BY_REPORT_ID',
    SET_IMAGE_FIELDS:'SET_IMAGE_FIELDS',
    SET_IMAGE_FIELDS_DATASHEET: 'SET_IMAGE_FIELDS_DATASHEET'
};

export const MILL_CONDITION = {
    FETCH_MILL_CONDITION_SUCCESS: 'FETCH_MILL_CONDITION_SUCCESS',
    SET_MILL_ID: 'SET_MILL_ID',
    SET_CLICKED_UPDATE: 'SET_CLICKED_UPDATE',
    ADD_MILL_CONDITION_SUCCESS: 'ADD_MILL_CONDITION_SUCCESS',
    UPDATE_MILL_CONDITION_SUCCESS: 'UPDATE_MILL_CONDITION_SUCCESS',
    SET_TABLEDATA: 'SET_TABLEDATA',
    FETCH_MILL_CONDITION_DNE: 'FETCH_MILL_CONDITION_DNE'
};

export const DataSheet = {
    SET_PART_TYPE: 'SET_PART_TYPE',
    SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',

    GET_AND_SET_ALL_DATASHEETS: 'GET_AND_SET_ALL_DATASHEETS',

    //temperature
    SET_SELECT_HELIX: 'SET_SELECT_HELIX',
    SET_TEMPERATURE_DROPDOWN_OPEN: 'SET_TEMPERATURE_DROPDOWN_OPEN',
    SET_PINION_TEMPERATURE_SINGLE: 'SET_PINION_TEMPERATURE_SINGLE',
    SET_PINION_TEMPERATURE_DOUBLE: 'SET_PINION_TEMPERATURE_DOUBLE',
    SET_TEMPERATURE_LEFT_SELECT: 'SET_TEMPERATURE_LEFT_SELECT',
    SET_TEMPERATURE_MIDDLE_SELECT: 'SET_TEMPERATURE_MIDDLE_SELECT',
    SET_TEMPERATURE_RIGHT_SELECT: 'SET_TEMPERATURE_RIGHT_SELECT',
    ADD_PINION_TEMPERATURE_SINGLE_SUCCESS: 'ADD_PINION_TEMPERATURE_SINGLE_SUCCESS',
    ADD_PINION_TEMPERATURE_DOUBLE_SUCCESS: 'ADD_PINION_TEMPERATURE_DOUBLE_SUCCESS',
    //pinion gear
    SET_GEAR_PINION_CONTACT_BACKLASH: 'SET_GEAR_PINION_CONTACT_BACKLASH',
    SET_GEAR_PINION_CONTACT_PATTERN: 'SET_GEAR_PINION_CONTACT_PATTERN',
    SET_PINION_OFFSET: 'SET_PINION_OFFSET',
    ADD_PINION_TO_GEAR_ALIGNMENT_SUCCESS: 'ADD_PINION_TO_GEAR_ALIGNMENT_SUCCESS',
    //coupling alignment
    SET_COUPLING_DROPDOWN_OPEN: 'SET_COUPLING_DROPDOWN_OPEN',
    SET_COUPLING_ALIGNMENT_SUCCESS: 'SET_COUPLING_ALIGNMENT_SUCCESS',
    SET_COUPLING_TYPE: 'SET_COUPLING_TYPE' ,
    ADD_MOTOR_TO_REDUCER_SUCCESS: 'ADD_MOTOR_TO_REDUCER_SUCCESS',
    ADD_REDUCER_TO_PINION_SUCCESS: 'ADD_REDUCER_TO_PINION_SUCCESS',
    //electric motor
    SET_RADIAL_CLEARANCE_TABLE: 'SET_RADIAL_CLEARANCE_TABLE',
    SET_AXIAL_CLEARANCE_TABLE: 'SET_AXIAL_CLEARANCE_TABLE',
    SET_AIR_GAP_TABLE: 'SET_AIR_GAP_TABLE',
    SET_ELECTRIC_MOTOR_NOTES: 'SET_ELECTRIC_MOTOR_NOTES',
    ADD_ELECTRIC_MOTOR_ALIGNMENT_SUCCESS: 'ADD_ELECTRIC_MOTOR_ALIGNMENT_SUCCESS',
    //pinion housing
    SET_LEFT_HOUSING_SELECT: 'SET_LEFT_HOUSING_SELECT',
    SET_RIGHT_HOUSING_SELECT: 'SET_RIGHT_HOUSING_SELECT',
    SET_BEARING_HOUSING_TABLE: 'SET_BEARING_HOUSING_TABLE',
    SET_HOUSING_NOTES: 'SET_HOUSING_NOTES',
    ADD_PINION_HOUSING_SUCCESS: 'ADD_PINION_HOUSING_SUCCESS',
    
    //pinion install bearing
    SET_FIXED_BEARING_INPUTS: 'SET_FIXED_BEARING_INPUTS',
    SET_FREE_BEARING_INPUTS:  'SET_FREE_BEARING_INPUTS',
    ADD_PINION_INSTALL_SUCCESS: 'ADD_PINION_INSTALL_SUCCESS',
    //mill alignment free fixed
    SET_MILL_ALIGNMENT_DROP_DOWN: 'SET_MILL_ALIGNMENT_DROP_DOWN', //dropdown open or closed
    SET_DRIVE_SELECT: 'SET_DRIVE_SELECT', //single right, single left, dual
    //pinions
    SET_LEFT_PINION: 'SET_LEFT_PINION',
    SET_RIGHT_PINION: 'SET_RIGHT_PINION',

    SET_FIXED_MILL_ALIGNMENT_INPUTS: 'SET_FIXED_MILL_ALIGNMENT_INPUTS',
    SET_FREE_MILL_ALIGNMENT_INPUTS: 'SET_FREE_MILL_ALIGNMENT_INPUTS',

    SET_ROTATION_DIRECTION:'SET_ROTATION_DIRECTION',
    SET_THRUST_DIRECTION:'SET_THRUST_DIRECTION',

    SET_PUMP_OPEN_CLOSED:'SET_PUMP_OPEN_CLOSED',
    SET_MILL_ALIGNMENT_NOTES:'SET_MILL_ALIGNMENT_NOTES',

    ADD_SINGLE_DRIVE_RIGHT_SUCCESS: 'ADD_SINGLE_DRIVE_RIGHT_SUCCESS',
    ADD_SINGLE_DRIVE_LEFT_SUCCESS: 'ADD_SINGLE_DRIVE_LEFT_SUCCESS',
    ADD_DUAL_DRIVE_SUCCESS: 'ADD_DUAL_DRIVE_SUCCESS',
    //fileupload
    UPLOAD_FILE_SUCCESS: 'UPLOAD_FILE_SUCCESS',
     //Upload Files or images
    
};


