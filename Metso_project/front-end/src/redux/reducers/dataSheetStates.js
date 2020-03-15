export const pinion_temperature = {
   select_Helix: "single", temperatureDropdownOpen: false,  // left_select : "Select", middle_select: "Select", right_select: "Select", 
    pinion_temperatures_single: {
        left_drive: 'Select',
        drive_pinion: 'Select',
        right_drive: 'Select',
        temperature_readings : [{
        Date:"",
        HRES:"",
        T_P_1:0,
        T_1:0,
        T_2:0,
        T_3:0,
        T_4:0,
        T_5:0,
        T_P_2:0,
        CHARGE_KVA:0,
        Delta_T:0,
        Notes:""
    }]} ,
    pinion_temperatures_double: {
        left_drive: 'Select',
        drive_pinion: 'Select',
        right_drive: 'Select',
        temperature_readings : [{
        Date:"",
        HRES:"",
        T_P_1:0,
        T_1:0,
        T_2:0,
        T_3:0,
        T_4:0,
        T_5:0,
        T_6:0,
        T_P_2:0,
        CHARGE_KVA:0,
        Left_Delta_T:0,
        Right_Delta_T:0,
        Notes:""
    }] }
};

export const pinion_gear_alignment = {

gear_pinion_contact_backlash : {
    
    station_number_start:"",
    station_number_90:"",
    station_number_180:"",
    station_number_270:"",

    contact_left_start:"",
    contact_left_90:"",
    contact_left_180:"",
    contact_left_270:"",

    contact_CL_start:"",
    contact_CL_90:"",
    contact_CL_180:"",
    contact_CL_270:"",

    contact_right_start:"",
    contact_right_90:"",
    contact_right_180:"",
    contact_right_270:"",

    contact_CR_start:"",
    contact_CR_90:"",
    contact_CR_180:"",
    contact_CR_270:"",
    
    backlash_left_start:"",
    backlash_left_90:"",
    backlash_left_180:"",
    backlash_left_270:"",

    backlash_BL_start:"",
    backlash_BL_90:"",
    backlash_BL_180:"",
    backlash_BL_270:"",
    
    backlash_right_start:"",
    backlash_right_90:"",
    backlash_right_180:"",
    backlash_right_270:"",

    backlash_BR_start:"",
    backlash_BR_90:"",
    backlash_BR_180:"",
    backlash_BR_270:"",

    root_left_start:"",
    root_left_90:"",
    root_left_180:"",
    root_left_270:"",

    root_RL_start:"",
    root_RL_90:"",
    root_RL_180:"",
    root_RL_270:"",

    root_right_start:"",
    root_right_90:"",
    root_right_180:"",
    root_right_270:"",

    root_RR_start:"",
    root_RR_90:"",
    root_RR_180:"",
    root_RR_270:""
  },

  gear_pinion_contact_pattern: {
      
      station_number1: "",
      gear_contact_pattern1: "",
      pinion_contact_pattern1: "",

      station_number2: "",
      gear_contact_pattern2: "",
      pinion_contact_pattern2: "",

      station_number3: "",
      gear_contact_pattern3: "",
      pinion_contact_pattern3: ""
  },

  pinion_offset: {
      
      side1: "" , leftValue: "" ,
      side2: "" , rightValue: ""
  }
};

export const coupling_alignment =       
{  couplingDropdownOpen: false, select_Coupling: "",

coupling_alignment_inputs: {
    mtr_offSetLeftUpInput: '0.000',
    mtr_offSetRightUpInput:'0.000',
    mtr_offSetLeftDownInput:'0.000',
    mtr_offSetRightDownInput:'0.000',
    
    mtr_AngularLeftUpInput:'0.0000',
    mtr_AngularRightUpInput:'0.0000',
    mtr_AngularLeftDownInput:'0.0000',
    mtr_AngularRightDownInput:'0.0000',

    rtp_offSetLeftUpInput: '0.000',
    rtp_offSetRightUpInput:'0.000',
    rtp_offSetLeftDownInput:'0.000',
    rtp_offSetRightDownInput:'0.000',
    
    rtp_AngularLeftUpInput:'0.0000',
    rtp_AngularRightUpInput:'0.0000',
    rtp_AngularLeftDownInput:'0.0000',
    rtp_AngularRightDownInput:'0.0000'
}
};

export const electric_motor_alignment = {
//Opposite_Drive_End: ODE , Drive_End: DE
    radialTable:{
        ODE_A:"",
        ODE_B:"",
        ODE_C:"",
        ODE_D:"",
        DE_E:"",
        DE_F:"",
        DE_G:"",
        DE_H:"",       
      },

    AxialTable: {
        initialRow1:"Stopped",
        ODE_Stopped1:"",
        ODE_Stopped2:"",
        ODE_Stopped3:"",
        ODE_Stopped4:"",
        ODE_Stopped_dist_cplg:"",
        ODE_Stopped_magn_center:"",

        initialRow2:"Running",
        ODE_Running1:"",
        ODE_Running2:"",
        ODE_Running3:"",
        ODE_Running4:"",
        ODE_Running_dist_cplg:"",
        ODE_Running_magn_center:"",
        
        initialRow3:"Stopped",
        DE_Stopped5:"",
        DE_Stopped6:"",
        DE_Stopped7:"",
        DE_Stopped8:"",
        DE_Stopped_dist_cplg:"",
        DE_Stopped_magn_center:"",

        initialRow4:"Running",
        DE_Running5:"",
        DE_Running6:"",
        DE_Running7:"",
        DE_Running8:"",
        DE_Running_dist_cplg:"",
        DE_Running_magn_center:"", 
    },
    
    AirGapTable: {
        initialRow1: "D.E",
        Exiter_DE_12:"",
        Exiter_DE_03:"",
        Exiter_DE_06:"",
        Exiter_DE_09:"",

        initialRow2: "O.D.E",
        Exiter_ODE_12:"",
        Exiter_ODE_03:"",
        Exiter_ODE_06:"",
        Exiter_ODE_09:"",

        initialRow3: "D.E",
        Stator_DE_12:"",
        Stator_DE_03:"",
        Stator_DE_06:"",
        Stator_DE_09:"",

        initialRow4: "O.D.E",
        Stator_ODE_12:"",
        Stator_ODE_03:"",
        Stator_ODE_06:"",
        Stator_ODE_09:""
    },

    electric_motor_notes: ""
};

export const pinion_bearing_housing = {
   
    housingSelectLeft: "Select",
    housingSelectRight: "Select",
    PinionBearingHousingInputs:{
        housing_ID_A1:0,
        housing_ID_B1:0,
        housing_ID_C1:0,
        housing_ID_D1:0,
       
        housing_ID_A2:0,
        housing_ID_B2:0,
        housing_ID_C2:0,
        housing_ID_D2:0,
        
        housing_ID_A3:0,
        housing_ID_B3:0,
        housing_ID_C3:0,
        housing_ID_D3:0,
      },
      PinionBearingHousingNote:""
};

export const pinion_bearing_installation = {
    
    fixedPinionBearingInstall:{
        internal_bearing_clearance_left_fixed:'',
        radial_clearance_top_left_fixed:'',
        axial_clearance_outer_top_left_fixed:'',
        axial_location_top_left_fixed:'',
        radial_location_top_left_fixed:'',
      
        radial_clearance_bottom_left_fixed:'',
        axial_clearance_outer_bottom_left_fixed:'',
        axial_location_bottom_left_fixed:'',
        radial_location_bottom_left_fixed:'',
      
        internal_bearing_clearance_right_fixed:'',
        radial_clearance_top_right_fixed:'',
        axial_clearance_outer_top_right_fixed:'',
        radial_location_top_right_fixed:'',
        axial_clearance_inner_top_right_fixed:'',
      
        radial_clearance_bottom_right_fixed:'',
        axial_clearance_outer_bottom_right_fixed:'',
        radial_location_bottom_right_fixed:'',
        axial_clearance_inner_bottom_right_fixed:'',

        labyrinth_seal_left_fixed:'',
        labyrinth_seal_right_fixed:'',
        taconite_seal_left_fixed:'',
        taconite_seal_right_fixed:''},
  
    freePinionBearingInstall:{
        internal_bearing_clearance_left_free: '',
        radial_clearance_top_left_free: '',
        axial_clearance_outer_top_left_free: '',
        radial_location_top_left_free: '',
        axial_clearance_inner_top_left_free: '',
      
        radial_clearance_bottom_left_free: '',
        axial_clearance_outer_bottom_left_free: '',
        radial_location_bottom_left_free: '',
        axial_clearance_inner_bottom_left_free: '',
      
        internal_bearing_clearance_top_right_free: '', 
        radial_clearance_top_right_free: '',
        axial_clearance_outer_top_right_free: '',
        axial_location_top_right_free: '',
        radial_location_top_right_free: '',
      
        radial_clearance_bottom_right_free: '',
        axial_clearance_bottom_right_free: '',
        axial_location_bottom_right_free: '',
        radial_location_bottom_right_free: '',
      
        labyrinth_seal_left_free: '',
        labyrinth_seal_right_free: '',
        taconite_seal_left_free: '',
        taconite_seal_right_free: ''
      }
};

//mill_alignment
export const mill_alignments = {
    driveSelect: 'single_right',
    millAlignmentsDropdownOpen: false, 
    mill_bearing_rotation_direction_select: "Select \u25BC",
    mill_bearing_thrust_direction_select: "Select \u25BC",
    fixed_mill_alignment_inputs: {
        fixed_lift_input: '',
        fixed_radial_clearance_top_input1: '',
        fixed_radial_clearance_top_input2: '',
        fixed_radial_clearance_top_input3: '',
        fixed_radial_clearance_top_input4: '',

        //blue
        fixed_pump1_input_top_input1: '',
        fixed_pump1_input_top_input2: '',
        fixed_pump1_input_top_input3: '',

        //yellow
        fixed_pump2_input_top_input1: '',
        fixed_pump2_input_top_input2: '',
        fixed_pump2_input_top_input3: '',

        //red
        fixed_pump3_input_top_input1: '',
        fixed_pump3_input_top_input2: '',

        fixed_pump_type_select: 'Select \u25BC',

        fixed_pump_dimension_width: '',
        fixed_pump_dimension_height: '',

        //red
        fixed_pump3_input_bottom_input1: '',
        fixed_pump3_input_bottom_input2: '',

        //yellow
        fixed_pump2_input_bottom_input1: '',
        fixed_pump2_input_bottom_input2: '',
        fixed_pump2_input_bottom_input3: '',

        //blue
        fixed_pump1_input_bottom_input1: '',
        fixed_pump1_input_bottom_input2: '',
        fixed_pump1_input_bottom_input3: '',

        fixed_radial_clearance_bottom_input1: '',
        fixed_radial_clearance_bottom_input2: '',
        fixed_radial_clearance_bottom_input3: '',
        fixed_radial_clearance_bottom_input4: ''
    },
    free_mill_alignment_inputs: {
        free_lift_input: '',
        free_radial_clearance_top_input1: '',
        free_radial_clearance_top_input2: '',
        free_radial_clearance_top_input3: '',
        free_radial_clearance_top_input4: '',

        //blue
        free_pump1_input_top_input1: '',
        free_pump1_input_top_input2: '',
        free_pump1_input_top_input3: '',

        //yellow
        free_pump2_input_top_input1: '',
        free_pump2_input_top_input2: '',
        free_pump2_input_top_input3: '',

        //red
        free_pump3_input_top_input1: '',
        free_pump3_input_top_input2: '',

        free_pump_type_select: 'Select \u25BC',

        free_pump_dimension_width: '',
        free_pump_dimension_height: '',

        //red
        free_pump3_input_bottom_input1: '',
        free_pump3_input_bottom_input2: '',

        //yellow
        free_pump2_input_bottom_input1: '',
        free_pump2_input_bottom_input2: '',
        free_pump2_input_bottom_input3: '',

        //blue
        free_pump1_input_bottom_input1: '',
        free_pump1_input_bottom_input2: '',
        free_pump1_input_bottom_input3: '',

        free_radial_clearance_bottom_input1: '',
        free_radial_clearance_bottom_input2: '',
        free_radial_clearance_bottom_input3: '',
        free_radial_clearance_bottom_input4: ''
    },
    left_pinion: {
        pinion_offset_left_input: '',
        pinion_offset_left_direction: "Select \u25BC",
        pinion_offset_left_root: {pinion_offset_left_root_left_side: '',
                           pinion_offset_left_root_right_side: ''}
    },
    right_pinion: {
        pinion_offset_right_input: '',
        pinion_offset_right_direction: "Select \u25BC",
        pinion_offset_right_root:{pinion_offset_right_root_left_side: '',
                           pinion_offset_right_root_right_side: ''}
    },
    pump_open_closed: '',
    mill_alignment_notes: ""
    
};