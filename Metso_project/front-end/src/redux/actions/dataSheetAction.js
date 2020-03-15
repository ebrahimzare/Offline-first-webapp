import {DataSheet} from './types';
import DataSheetServices from "../../services/DataSheetServices";
const dataSheetServices = new DataSheetServices();

export const setPartType = part_type => {
    return {type: DataSheet.SET_PART_TYPE , part_type};
};

export const setActiveTab = activeTab => {
    return {
        type: DataSheet.SET_ACTIVE_TAB ,activeTab
    };
};

export const setSelectHelix = select_Helix => {
    return {
        type: DataSheet.SET_SELECT_HELIX ,select_Helix
    };
};

export const setTemperatureDropDownOpen = temperatureDropdownOpen => {
    return {
        type: DataSheet.SET_TEMPERATURE_DROPDOWN_OPEN ,temperatureDropdownOpen
    };
};

export const setPinionTemperaturesSingle = pinion_temperatures_single => {
    return {
        type: DataSheet.SET_PINION_TEMPERATURE_SINGLE ,pinion_temperatures_single
    };
};

export const setPinionTemperaturesDouble = pinion_temperatures_double => {
    return {
        type: DataSheet.SET_PINION_TEMPERATURE_DOUBLE ,pinion_temperatures_double
    };
};

export const setTemperatureLeftSelect = (left_drive, helix_type) => {
    return {
        type: DataSheet.SET_TEMPERATURE_LEFT_SELECT ,left_drive,helix_type
    };
};

export const setTemperatureMiddleSelect = (drive_pinion, helix_type) => {
    return {
        type: DataSheet.SET_TEMPERATURE_MIDDLE_SELECT ,drive_pinion,helix_type
    };
};

export const setTemperatureRightSelect = (right_drive, helix_type) => {
    return {
        type: DataSheet.SET_TEMPERATURE_RIGHT_SELECT ,right_drive,helix_type
    };
};

export const setGearPinionContactBacklash = gear_pinion_contact_backlash => {
    return {
        type: DataSheet.SET_GEAR_PINION_CONTACT_BACKLASH ,gear_pinion_contact_backlash
    };
};

export const setGearPinionContactPattern = gear_pinion_contact_pattern => {
    return {
        type: DataSheet.SET_GEAR_PINION_CONTACT_PATTERN ,gear_pinion_contact_pattern
    };
};

export const setPinionOffset = pinion_offset => {
    return {
        type: DataSheet.SET_PINION_OFFSET ,pinion_offset
    };
};

export const setCouplingType = (select_Coupling) => {

    return{
        type: DataSheet.SET_COUPLING_TYPE ,select_Coupling
    };
};

export const setCouplingInputs = (coupling_alignment_inputs,select_Coupling )=> {
    return{
        type: DataSheet.SET_COUPLING_ALIGNMENT_SUCCESS ,coupling_alignment_inputs,select_Coupling
    };
};

export const setCouplingDropDown = couplingDropdownOpen => {
    return{
        type: DataSheet.SET_COUPLING_DROPDOWN_OPEN ,couplingDropdownOpen
    };
};

export const setRadialClearanceTable = radialTable => {
    return{
        type: DataSheet.SET_RADIAL_CLEARANCE_TABLE ,radialTable
    };
};

export const setAxialClearanceTable = AxialTable => {
    return{
        type: DataSheet.SET_AXIAL_CLEARANCE_TABLE ,AxialTable
    };
};

export const setAirGapTable = AirGapTable => {
    return{
        type: DataSheet.SET_AIR_GAP_TABLE ,AirGapTable
    };
};

export const setElectricMotorNotes = electric_motor_notes => {
    return{
        type: DataSheet.SET_ELECTRIC_MOTOR_NOTES ,electric_motor_notes
    };
};

export const setLeftHousingSelect = housingSelectLeft => {
    return{
        type: DataSheet.SET_LEFT_HOUSING_SELECT ,housingSelectLeft
    };
};

export const setRighttHousingSelect = housingSelectRight => {
    return{
        type: DataSheet.SET_RIGHT_HOUSING_SELECT ,housingSelectRight
    };
};

export const setBearingtHousingTable = PinionBearingHousingInputs => {
    return{
        type: DataSheet.SET_BEARING_HOUSING_TABLE ,PinionBearingHousingInputs
    };
};

export const setHousingNotes = PinionBearingHousingNote => {
    return{
        type: DataSheet.SET_HOUSING_NOTES ,PinionBearingHousingNote
    };
};

export const setFixedPinionInstallation = fixedPinionBearingInstall => {
    return{
        type: DataSheet.SET_FIXED_BEARING_INPUTS ,fixedPinionBearingInstall
    };
};

export const setFreePinionInstallation = freePinionBearingInstall => {
    return{
        type: DataSheet.SET_FREE_BEARING_INPUTS ,freePinionBearingInstall
    };
};

export const setMillAlignmentDropDown = millAlignmentsDropdownOpen => {
    return{
        type: DataSheet.SET_MILL_ALIGNMENT_DROP_DOWN ,millAlignmentsDropdownOpen
    };
};

export const setDriveSelectSuccess = driveSelect => {
    return{
        type: DataSheet.SET_DRIVE_SELECT ,driveSelect
    };
};


export const setDriveSelect = (report_id,driveSelect,part_type) => dispatch =>{
    if(part_type === "Free main bearing"){
        if(driveSelect === "single_right")
            dispatch(get_and_set_right_freeBearing(report_id));
        if(driveSelect === "single_left")    
            dispatch(get_and_set_left_freeBearing(report_id));
        if(driveSelect === "dual")    
            dispatch(get_and_set_dual_freeBearing(report_id));
    }
    if(part_type === "Fixed main bearing"){
        if(driveSelect === "single_right")
            dispatch(get_and_set_right_fixedBearing(report_id));
        if(driveSelect === "single_left")    
            dispatch(get_and_set_left_fixedBearing(report_id));
        if(driveSelect === "dual")    
            dispatch(get_and_set_dual_fixedBearing(report_id));
    }

    dispatch(setDriveSelectSuccess(driveSelect));
};

// ---------------------------------------------------------
export const setLeftPinion = left_pinion => {
    return{
        type: DataSheet.SET_LEFT_PINION ,left_pinion
    };
};

export const setRightPinion = right_pinion => {
    return{
        type: DataSheet.SET_RIGHT_PINION ,right_pinion
    };
};

export const setFixedMillAlignmentInputs = fixed_mill_alignment_inputs => {
    return{
        type: DataSheet.SET_FIXED_MILL_ALIGNMENT_INPUTS ,fixed_mill_alignment_inputs
    };
};

export const setFreeMillAlignmentInputs = free_mill_alignment_inputs => {
    return{
        type: DataSheet.SET_FREE_MILL_ALIGNMENT_INPUTS ,free_mill_alignment_inputs
    };
};

export const setMillRotationDirection = mill_bearing_rotation_direction_select => {
    return{
        type: DataSheet.SET_ROTATION_DIRECTION ,mill_bearing_rotation_direction_select
    };
};

export const setMillThrustDirection = mill_bearing_thrust_direction_select => {
    return{
        type: DataSheet.SET_THRUST_DIRECTION ,mill_bearing_thrust_direction_select
    };
};

export const setPumpOpenClosed = pump_open_closed => {
    return{
        type: DataSheet.SET_PUMP_OPEN_CLOSED ,pump_open_closed
    };
};

export const setMillAlignmentNotes = mill_alignment_notes => {
    return{
        type: DataSheet.SET_MILL_ALIGNMENT_NOTES ,mill_alignment_notes
    };
};

export const addDataSheetCategorySuccess = (data,category_type) => { 
    if(category_type === 'single')
    return{
        type: DataSheet.ADD_PINION_TEMPERATURE_SINGLE_SUCCESS, 
        pinion_temperatures_single: data
    };
    if(category_type === 'double')
        return{
            type: DataSheet.ADD_PINION_TEMPERATURE_DOUBLE_SUCCESS, 
            pinion_temperatures_double:data
    };
    if(category_type === 'mtr')
    return{
        type: DataSheet.ADD_MOTOR_TO_REDUCER_SUCCESS, 
        motor_to_reducer: data
    };
    if(category_type === 'rtp')
    return{
        type: DataSheet.ADD_REDUCER_TO_PINION_SUCCESS, 
        reducer_to_pinion: data
    };
};

export const uploadToDataSheetByCategory = (data,part_type,datasheet_type,category_type) => dispatch =>{
    dataSheetServices
      .addDataSheetByCategory(data,part_type,datasheet_type,category_type)
      .then(result => {dispatch(addDataSheetCategorySuccess(result.data,category_type))})
      .catch(error => alert(`There was an error submitting the ${datasheet_type} form! ${error}`)
      );
};

export const addDatasheetByTypeSuccess = (data,part_type,datasheet_type)=> {

    const toReturn = {
        'free' : {'right':  {type: DataSheet.ADD_SINGLE_DRIVE_RIGHT_SUCCESS, 
                             single_drive_right: data,
                             free_fixed: part_type },
                  'left':   {type: DataSheet.ADD_SINGLE_DRIVE_LEFT_SUCCESS, 
                             single_drive_left: data,
                             free_fixed: part_type},
                  'dual':   {type: DataSheet.ADD_DUAL_DRIVE_SUCCESS, 
                             dual_drive: data,
                             free_fixed: part_type}
                 },
        'fixed' : {'right': {type: DataSheet.ADD_SINGLE_DRIVE_RIGHT_SUCCESS, 
                             single_drive_right: data,
                             free_fixed: part_type},
                  'left':   {type: DataSheet.ADD_SINGLE_DRIVE_LEFT_SUCCESS, 
                             single_drive_left: data,
                             free_fixed: part_type},
                  'dual':   {type: DataSheet.ADD_DUAL_DRIVE_SUCCESS, 
                             dual_drive: data,
                             free_fixed: part_type}}, 
        'drivetrain' : {'pinionGear':       {type: DataSheet.ADD_PINION_TO_GEAR_ALIGNMENT_SUCCESS, 
                                             pinion_gear_alignment: data},
                        'electric_motor':   {type: DataSheet.ADD_ELECTRIC_MOTOR_ALIGNMENT_SUCCESS, 
                                             electric_motor_alignment: data},
                        'pinion_housing':   {type: DataSheet.ADD_PINION_HOUSING_SUCCESS, 
                                             pinion_bearing_housing: data},
                        'pinion_install':   {type: DataSheet.ADD_PINION_INSTALL_SUCCESS, 
                                             pinion_bearing_installation: data}}
    };

    return toReturn[part_type][datasheet_type];
};

export const addDatasheetByType = (data,part_type,datasheet_type)=> dispatch => {
    dataSheetServices
    .addDataSheetByType(data,part_type,datasheet_type)
    .then(result => {dispatch(addDatasheetByTypeSuccess(result.data,part_type,datasheet_type))})
    .catch(error => alert(`There was an error submitting the ${datasheet_type} form! ${error}`)
    );
};

export const get_and_set_drivetrain = report_id => dispatch => {
    dataSheetServices
    .getDataSheetByPartTypeByID(report_id, 'drivetrain')
    .then(result => {
        if(result !== null){
        let drive_train = result.data;
        if(drive_train !== {}) {
        if(drive_train.pinion_temperatures){
        if(drive_train.pinion_temperatures.single.temperature_readings)    
        dispatch(setPinionTemperaturesSingle(drive_train.pinion_temperatures.single));
        if(drive_train.pinion_temperatures.double.hasOwnProperty('temperature_readings'))
        dispatch(setPinionTemperaturesDouble(drive_train.pinion_temperatures.double));
    }
        if(drive_train.pinion_gear){
        dispatch(setGearPinionContactBacklash(drive_train.pinion_gear.gear_pinion_contact_backlash));
        dispatch(setGearPinionContactPattern(drive_train.pinion_gear.gear_pinion_contact_pattern));
        dispatch(setPinionOffset(drive_train.pinion_gear.pinion_offset));
        }
        if(drive_train.coupling_alignment){
        const coupling_data = { ...drive_train.coupling_alignment.motor_to_reducer , ...drive_train.coupling_alignment.reducer_to_pinion  }  
        dispatch(setCouplingInputs(coupling_data));
        }
        
        if(drive_train.electric_motor_alignment){
        dispatch(setRadialClearanceTable(drive_train.electric_motor_alignment.radialTable));
        dispatch(setAxialClearanceTable(drive_train.electric_motor_alignment.AxialTable));
        dispatch(setAirGapTable(drive_train.electric_motor_alignment.AirGapTable));
        dispatch(setElectricMotorNotes(drive_train.electric_motor_alignment.electric_motor_notes));
        }

        if(drive_train.pinion_bearing_housing){
        dispatch(setLeftHousingSelect(drive_train.pinion_bearing_housing.housingSelectLeft));
        dispatch(setRighttHousingSelect(drive_train.pinion_bearing_housing.housingSelectRight));
        dispatch(setBearingtHousingTable(drive_train.pinion_bearing_housing.PinionBearingHousingInputs));
        dispatch(setHousingNotes(drive_train.pinion_bearing_housing.PinionBearingHousingNote));
        }

        if(drive_train.pinion_bearing_installation){
        dispatch(setFixedPinionInstallation(drive_train.pinion_bearing_installation.fixedPinionBearingInstall));
        dispatch(setFreePinionInstallation(drive_train.pinion_bearing_installation.freePinionBearingInstall));
        }
    }
        }
    })
    .catch(error => console.log(`report id not found  ${error}`));
};

export const get_and_set_right_freeBearing = report_id => dispatch => {
    dataSheetServices
    .getDataSheetByDataSheetTypeByID(report_id, 'free','right')
    .then(result => {
        if(result !== {}){
            let free_right = result.data;
            if(free_right !== {}) {
                    if(free_right.unique_inputs)    
                        dispatch(setFreeMillAlignmentInputs(free_right.unique_inputs));
                    if(free_right.right_pinion)    
                        dispatch(setRightPinion(free_right.right_pinion));
                    if(free_right['mill_bearing_thrust_direction_select'])    
                        dispatch(setMillThrustDirection(free_right.mill_bearing_thrust_direction_select));
                    if(free_right['mill_bearing_rotation_direction_select'])
                        dispatch(setMillRotationDirection(free_right.mill_bearing_rotation_direction_select));
                    if(free_right.setPumpOpenClosed) 
                        dispatch(setPumpOpenClosed(free_right.pump_open_closed));  
            };
        };
    })
    .catch(error => console.log(`report id not found  ${error}`));
};

export const get_and_set_left_freeBearing = report_id => dispatch => {
    dataSheetServices
    .getDataSheetByDataSheetTypeByID(report_id, 'free','left')
    .then(result => {
        if(result !== null){
            let free_left = result.data;
            if(free_left !== {}) {
                    if(free_left.unique_inputs)    
                        dispatch(setFreeMillAlignmentInputs(free_left.unique_inputs));
                    if(free_left.left_pinion)    
                        dispatch(setLeftPinion(free_left.left_pinion));
                    if(free_left['mill_bearing_thrust_direction_select'])    
                        dispatch(setMillThrustDirection(free_left.mill_bearing_thrust_direction_select));
                    if(free_left['mill_bearing_rotation_direction_select'])
                        dispatch(setMillRotationDirection(free_left.mill_bearing_rotation_direction_select));
                    if(free_left.setPumpOpenClosed) 
                        dispatch(setPumpOpenClosed(free_left.pump_open_closed));  
            };
        };
    })
    .catch(error => console.log(`report id not found  ${error}`));
};

export const get_and_set_dual_freeBearing = report_id => dispatch => {
    dataSheetServices
    .getDataSheetByDataSheetTypeByID(report_id, 'free','dual')
    .then(result => {
        if(result !== null){
            let free_dual = result.data;
            if(free_dual !== {}) {
                    if(free_dual.unique_inputs)    
                        dispatch(setFreeMillAlignmentInputs(free_dual.unique_inputs));
                    if(free_dual.left_pinion)    
                        dispatch(setLeftPinion(free_dual.left_pinion));
                    if(free_dual.right_pinion)    
                        dispatch(setRightPinion(free_dual.right_pinion));
                    if(free_dual['mill_bearing_thrust_direction_select'])    
                        dispatch(setMillThrustDirection(free_dual.mill_bearing_thrust_direction_select));
                    if(free_dual['mill_bearing_rotation_direction_select'])
                        dispatch(setMillRotationDirection(free_dual.mill_bearing_rotation_direction_select));
                    if(free_dual.setPumpOpenClosed) 
                        dispatch(setPumpOpenClosed(free_dual.pump_open_closed));  
            }
        };
    })
    .catch(error => console.log(`report id not found  ${error}`));
};


 export const get_and_set_right_fixedBearing = report_id => dispatch => {
    dataSheetServices
    .getDataSheetByDataSheetTypeByID(report_id, 'fixed','right')
    .then(result => {
        if(result !== null){
            let fixed_right = result.data;
            if(fixed_right !== {}) {
                    if(fixed_right.unique_inputs)    
                        dispatch(setFixedMillAlignmentInputs(fixed_right.unique_inputs));
                    if(fixed_right.right_pinion)    
                        dispatch(setRightPinion(fixed_right.right_pinion));
                    if(fixed_right['mill_bearing_thrust_direction_select'])    
                        dispatch(setMillThrustDirection(fixed_right.mill_bearing_thrust_direction_select));
                    if(fixed_right['mill_bearing_rotation_direction_select'])
                        dispatch(setMillRotationDirection(fixed_right.mill_bearing_rotation_direction_select));
                    if(fixed_right.setPumpOpenClosed) 
                        dispatch(setPumpOpenClosed(fixed_right.pump_open_closed));  
            }
        };
    })
    .catch(error => console.log(`report id not found  ${error}`));
};

export const get_and_set_left_fixedBearing = report_id => dispatch => {
    dataSheetServices
    .getDataSheetByDataSheetTypeByID(report_id, 'fixed','left')
    .then(result => {
        if(result !== null){
            let fixed_left = result.data;
            if(fixed_left !== {}) {
                    if(fixed_left.unique_inputs)    
                        dispatch(setFixedMillAlignmentInputs(fixed_left.unique_inputs));
                    if(fixed_left.left_pinion)    
                        dispatch(setLeftPinion(fixed_left.left_pinion));
                    if(fixed_left['mill_bearing_thrust_direction_select'])    
                        dispatch(setMillThrustDirection(fixed_left.mill_bearing_thrust_direction_select));
                    if(fixed_left['mill_bearing_rotation_direction_select'])
                        dispatch(setMillRotationDirection(fixed_left.mill_bearing_rotation_direction_select));
                    if(fixed_left.setPumpOpenClosed) 
                        dispatch(setPumpOpenClosed(fixed_left.pump_open_closed));  
            }
        };
    })
    .catch(error => console.log(`report id not found  ${error}`));
};

export const get_and_set_dual_fixedBearing = report_id => dispatch => {
    dataSheetServices
    .getDataSheetByDataSheetTypeByID(report_id, 'fixed','dual')
    .then(result => {
        if(result !== null){
            let fixed_dual = result.data;
            if(fixed_dual !== {}) {
                    if(fixed_dual.unique_inputs)    
                        dispatch(setFixedMillAlignmentInputs(fixed_dual.unique_inputs));
                    if(fixed_dual.left_pinion)    
                        dispatch(setLeftPinion(fixed_dual.left_pinion));
                    if(fixed_dual.right_pinion)    
                        dispatch(setRightPinion(fixed_dual.right_pinion));
                    if(fixed_dual['mill_bearing_thrust_direction_select'])    
                        dispatch(setMillThrustDirection(fixed_dual.mill_bearing_thrust_direction_select));
                    if(fixed_dual['mill_bearing_rotation_direction_select'])
                        dispatch(setMillRotationDirection(fixed_dual.mill_bearing_rotation_direction_select));
                    if(fixed_dual.setPumpOpenClosed) 
                        dispatch(setPumpOpenClosed(fixed_dual.pump_open_closed));  
            }
        };
    })
    .catch(error => console.log(`report id not found  ${error}`));
};
