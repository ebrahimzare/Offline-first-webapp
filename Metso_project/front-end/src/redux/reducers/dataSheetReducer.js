import {pinion_temperature,pinion_gear_alignment,coupling_alignment,electric_motor_alignment,pinion_bearing_housing,pinion_bearing_installation,mill_alignments} from './dataSheetStates';
const DEFAULT_CLIENTS = { part_type: "" ,activeTab:'0',pinion_temperature,pinion_gear_alignment , coupling_alignment,electric_motor_alignment,pinion_bearing_housing,pinion_bearing_installation,mill_alignments};

const dataSheetReducer = (state = DEFAULT_CLIENTS, action) => { 

    switch(action.type) {
        case 'SET_PART_TYPE': 
            return{...state,
                part_type:action.part_type,
            };  
        case 'SET_ACTIVE_TAB': 
            return{...state,
                activeTab:action.activeTab,
        }; 
        case 'SET_TEMPERATURE_DROPDOWN_OPEN':
                return{
                    ...state,
                    pinion_temperature: {...state.pinion_temperature, temperatureDropdownOpen: action.temperatureDropdownOpen}
                }; 
        case 'SET_SELECT_HELIX':
            return{
                ...state,
                pinion_temperature: {...state.pinion_temperature, select_Helix: action.select_Helix}
            };   
        case 'SET_PINION_TEMPERATURE_SINGLE':
            return{
                ...state,
                pinion_temperature: {...state.pinion_temperature, pinion_temperatures_single: action.pinion_temperatures_single}
            };  
        case 'SET_PINION_TEMPERATURE_DOUBLE':
            return{
                ...state,
                pinion_temperature: {...state.pinion_temperature, pinion_temperatures_double: action.pinion_temperatures_double}
            };     
        case 'SET_TEMPERATURE_LEFT_SELECT':
            return{
                ...state,
                pinion_temperature: action.helix_type === 'single' ? {...state.pinion_temperature, pinion_temperatures_single: {...state.pinion_temperature.pinion_temperatures_single , left_drive: action.left_drive}} :
                {...state.pinion_temperature, pinion_temperatures_double: {...state.pinion_temperature.pinion_temperatures_double , left_drive: action.left_drive}}
            };  
           
        case 'SET_TEMPERATURE_MIDDLE_SELECT':
                return{
                    ...state,
                    pinion_temperature: action.helix_type === 'single' ? {...state.pinion_temperature, pinion_temperatures_single: {...state.pinion_temperature.pinion_temperatures_single , drive_pinion: action.drive_pinion}}:
                    {...state.pinion_temperature, pinion_temperatures_double: {...state.pinion_temperature.pinion_temperatures_double , drive_pinion: action.drive_pinion}}
                };  
                 
        case 'SET_TEMPERATURE_RIGHT_SELECT':
                return{
                    ...state,
                    pinion_temperature: action.helix_type === 'single' ? {...state.pinion_temperature, pinion_temperatures_single: {...state.pinion_temperature.pinion_temperatures_single , right_drive: action.right_drive}}:
                    {...state.pinion_temperature, pinion_temperatures_double: {...state.pinion_temperature.pinion_temperatures_double , right_drive: action.right_drive}}
                };  
                
        case 'ADD_PINION_TEMPERATURE_SINGLE_SUCCESS':
                return{
                    ...state,
                    pinion_temperature:{...state.pinion_temperature, pinion_temperatures_single: action.pinion_temperatures_single}
                }; 
        case 'ADD_PINION_TEMPERATURE_DOUBLE_SUCCESS':
                return{
                    ...state,
                    pinion_temperature:{...state.pinion_temperature, pinion_temperatures_double: action.pinion_temperatures_double}
                }; 
        case 'ADD_PINION_TO_GEAR_ALIGNMENT_SUCCESS':
            return{
                ...state,
                pinion_gear_alignment: action.pinion_gear_alignment
            };        
        case 'SET_GEAR_PINION_CONTACT_BACKLASH':
            return{
                ...state,
                pinion_gear_alignment: {...state.pinion_gear_alignment, gear_pinion_contact_backlash: action.gear_pinion_contact_backlash}
            };     
        case 'SET_GEAR_PINION_CONTACT_PATTERN': 
            return{
                ...state,
                pinion_gear_alignment: {...state.pinion_gear_alignment, gear_pinion_contact_pattern: action.gear_pinion_contact_pattern}
            };  
        case 'SET_PINION_OFFSET': 
            return{
                ...state,
                pinion_gear_alignment: {...state.pinion_gear_alignment, pinion_offset: action.pinion_offset}
            };
        case 'SET_COUPLING_TYPE': 
            return{
                ...state,
                coupling_alignment: {...state.coupling_alignment, select_Coupling: action.select_Coupling}
            };  
        case 'SET_COUPLING_ALIGNMENT_SUCCESS': 
            return{
                ...state,
                coupling_alignment: {...state.coupling_alignment, coupling_alignment_inputs : action.coupling_alignment_inputs, select_Coupling: action.select_Coupling }
            };  
        case 'SET_COUPLING_DROPDOWN_OPEN': 
            return{
                ...state,
                coupling_alignment: {...state.coupling_alignment, couplingDropdownOpen: action.couplingDropdownOpen}
            };  
        case 'SET_RADIAL_CLEARANCE_TABLE': 
            return{
                ...state,
                electric_motor_alignment: {...state.electric_motor_alignment, radialTable: action.radialTable}
            };  
        case 'SET_AXIAL_CLEARANCE_TABLE': 
            return{
                ...state,
                electric_motor_alignment: {...state.electric_motor_alignment, AxialTable: action.AxialTable}
            };  
        case 'SET_AIR_GAP_TABLE': 
            return{
                ...state,
                electric_motor_alignment: {...state.electric_motor_alignment, AirGapTable: action.AirGapTable}
            };  
        case 'SET_ELECTRIC_MOTOR_NOTES': 
            return{
                ...state,
                electric_motor_alignment: {...state.electric_motor_alignment, electric_motor_notes: action.electric_motor_notes}
            }; 
        case 'ADD_ELECTRIC_MOTOR_ALIGNMENT_SUCCESS':
            return{
                ...state,
                electric_motor_alignment: action.electric_motor_alignment
            };     
        case 'SET_LEFT_HOUSING_SELECT': 
            return{
                ...state,
                pinion_bearing_housing: {...state.pinion_bearing_housing, housingSelectLeft: action.housingSelectLeft}
            };  
        case 'SET_RIGHT_HOUSING_SELECT': 
            return{
                ...state,
                pinion_bearing_housing: {...state.pinion_bearing_housing, housingSelectRight: action.housingSelectRight}
            };  
        case 'SET_BEARING_HOUSING_TABLE': 
            return{
                ...state,
                pinion_bearing_housing: {...state.pinion_bearing_housing, PinionBearingHousingInputs: action.PinionBearingHousingInputs}
            };  
        case 'SET_HOUSING_NOTES': 
            return{
                ...state,
                pinion_bearing_housing: {...state.pinion_bearing_housing, PinionBearingHousingNote: action.PinionBearingHousingNote}
            };  
        case 'ADD_PINION_HOUSING_SUCCESS':
            return{
                ...state,
                pinion_bearing_housing: action.pinion_bearing_housing
            }; 
        case 'SET_FIXED_BEARING_INPUTS': 
            return{
                ...state,
                pinion_bearing_installation: {...state.pinion_bearing_installation, fixedPinionBearingInstall: action.fixedPinionBearingInstall}
            }; 
        case 'SET_FREE_BEARING_INPUTS': 
            return{
                ...state,
                pinion_bearing_installation: {...state.pinion_bearing_installation, freePinionBearingInstall: action.freePinionBearingInstall}
            }; 
        case 'ADD_PINION_INSTALL_SUCCESS':
            return{
                ...state,
                pinion_bearing_installation: action.pinion_bearing_installation
            }; 
        case 'SET_MILL_ALIGNMENT_DROP_DOWN':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, millAlignmentsDropdownOpen: action.millAlignmentsDropdownOpen}
            }; 
        case 'SET_DRIVE_SELECT':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, driveSelect: action.driveSelect}
            }; 
            // ---------------------------------------------------------------------------------------
        case 'SET_LEFT_PINION':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, left_pinion: action.left_pinion}
            }; 
        case 'SET_RIGHT_PINION':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, right_pinion: action.right_pinion}
            }; 
        case 'SET_FIXED_MILL_ALIGNMENT_INPUTS':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, fixed_mill_alignment_inputs: action.fixed_mill_alignment_inputs}
            }; 
        case 'SET_FREE_MILL_ALIGNMENT_INPUTS':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, free_mill_alignment_inputs: action.free_mill_alignment_inputs}
            }; 
        case 'SET_ROTATION_DIRECTION':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, mill_bearing_rotation_direction_select: action.mill_bearing_rotation_direction_select}
            }; 
        case 'SET_THRUST_DIRECTION':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, mill_bearing_thrust_direction_select: action.mill_bearing_thrust_direction_select}
            }; 
             case 'SET_PUMP_OPEN_CLOSED':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, pump_open_closed: action.pump_open_closed}
            }; 
             case 'SET_MILL_ALIGNMENT_NOTES':
            return{
                ...state,
                mill_alignments: {...state.mill_alignments, mill_alignment_notes: action.mill_alignment_notes}
            }; 
        default:
             return state    
    };
};

export default dataSheetReducer;

