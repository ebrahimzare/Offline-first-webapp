export const metso_logo = './photos/metsoLogo.png';

export const fixedPinionBearingInputs= [
  {class_name : "leftUp1fixed" , name : "internal_bearing_clearance_left_fixed"},
  {class_name : "leftUp2fixed" , name : "radial_clearance_top_left_fixed"},
  {class_name : "leftUp3fixed" , name : "axial_clearance_outer_top_left_fixed"},
  {class_name : "leftUp4fixed" , name : "axial_location_top_left_fixed"},
  {class_name : "leftUp5fixed" , name : "radial_location_top_left_fixed"},

  {class_name : "leftBottom2fixed" , name : "radial_clearance_bottom_left_fixed"},
  {class_name : "leftBottom3fixed" , name : "axial_clearance_outer_bottom_left_fixed"},
  {class_name : "leftBottom4fixed" , name : "axial_location_bottom_left_fixed"},
  {class_name : "leftBottom5fixed" , name : "radial_location_bottom_left_fixed"},

  {class_name : "rightUp1fixed" , name : "internal_bearing_clearance_right_fixed"},
  {class_name : "rightUp2fixed" , name : "radial_clearance_top_right_fixed"},
  {class_name : "rightUp3fixed" , name : "axial_clearance_outer_top_right_fixed"},
  {class_name : "rightUp5fixed" , name : "radial_location_top_right_fixed"},
  {class_name : "rightUp6fixed" , name : "axial_clearance_inner_top_right_fixed"},

  {class_name : "rightBottom2fixed" , name : "radial_clearance_bottom_right_fixed"},
  {class_name : "rightBottom3fixed" , name : "axial_clearance_outer_bottom_right_fixed"},
  {class_name : "rightBottom5fixed" , name : "radial_location_bottom_right_fixed"},
  {class_name : "rightBottom6fixed" , name : "axial_clearance_inner_bottom_right_fixed"},

  {class_name : "labSealLeftFixed" , name : "labyrinth_seal_left_fixed"},
  {class_name : "labSealRightFixed" , name : "labyrinth_seal_right_fixed"},
  {class_name : "tacSealLeftFixed" , name : "taconite_seal_left_fixed"},
  {class_name : "tacSealrightFixed" , name : "taconite_seal_right_fixed"},
];

export const freePinionBearingInputs = [
  {class_name : "leftUp1free" , name : "internal_bearing_clearance_left_free"},
  {class_name : "leftUp2free" , name : "radial_clearance_top_left_free"},
  {class_name : "leftUp3free" , name : "axial_clearance_outer_top_left_free"},
  {class_name : "leftUp5free" , name : "radial_location_top_left_free"},
  {class_name : "leftUp6free" , name : "axial_clearance_inner_top_left_free"},

  {class_name : "leftBottom2free" , name : "radial_clearance_bottom_left_free"},
  {class_name : "leftBottom3free" , name : "axial_clearance_outer_bottom_left_free"},
  {class_name : "leftBottom5free" , name : "radial_location_bottom_left_free"},
  {class_name : "leftBottom6free" , name : "axial_clearance_inner_bottom_left_free"},

  {class_name : "rightUp1free" , name : "internal_bearing_clearance_top_right_free"},
  {class_name : "rightUp2free" , name : "radial_clearance_top_right_free"},
  {class_name : "rightUp3free" , name : "axial_clearance_outer_top_right_free"},
  {class_name : "rightUp4free" , name : "axial_location_top_right_free"},
  {class_name : "rightUp5free" , name : "radial_location_top_right_free"},

  {class_name : "rightBottom2free" , name : "radial_clearance_bottom_right_free"},
  {class_name : "rightBottom3free" , name : "axial_clearance_bottom_right_free"},
  {class_name : "rightBottom4free" , name : "axial_location_bottom_right_free"},
  {class_name : "rightBottom5free" , name : "radial_location_bottom_right_free"},

  {class_name : "labSealLeftFree" , name : "labyrinth_seal_left_free"},
  {class_name : "labSealRightFree" , name : "labyrinth_seal_right_free"},
  {class_name : "tacSealLeftFree" , name : "taconite_seal_left_free"},
  {class_name : "tacSealrightFree" , name : "taconite_seal_right_free"},
  
];

export const fixedBearingBoxParagraph = [
  "Internal bearing clearance (between rollers and outer race); 2 places per bearing @ 12:00 position",
  "Radial clearance from outer ring to housing bore; 4 places per bearing @ housing split flange ",
  "Axial clearance between bearing outer ring (or spacer) and housing; 4 places per bearing ",
  "Axial location of bearing (inner ring to shaft shoulder); 2 places per bearing @ housing split flange",
  "Radial location of housing relative to pinion shaft; 4 places per bearing @ housing split flange (see detail)  ",
  "Axial clearance (inner ring to locknut); 2 places per bearing @ housing split flange"
  ];

export const couplingReducerToPinionPhotos = [
  ["offSetUpR2P", "offSetDownR2P"   ],
   ["angularUpR2P",
  "angularDownR2P"]
   
];

 export const couplingMotorToReducerPhotos = [
  ["offSetUpM2R", "offSetDownM2R"], [ "angularUpM2R" , "angularDownM2R"]
 ];

 export const couplingInputsLeftCol= [
  {global_class_name: "coupling-up-input",  class_name : "offSetLeftUpInput" , name : "offSetLeftUpInput"},
  {global_class_name: "coupling-up-input", class_name : "offSetRightUpInput" , name : "offSetRightUpInput"},
  {global_class_name: "coupling-down-input", class_name : "offSetLeftDownInput" , name : "offSetLeftDownInput" },
  {global_class_name: "coupling-down-input", class_name : "offSetRightDownInput" , name : "offSetRightDownInput"},
  
];

export const couplingInputsRightCol= [
  {global_class_name: "coupling-up-input", class_name : "AngularLeftUpInput" , name : "AngularLeftUpInput"},
  {global_class_name: "coupling-up-input", class_name : "AngularRightUpInput" , name : "AngularRightUpInput" },
  {global_class_name: "coupling-down-input", class_name : "AngularLeftDownInput" , name : "AngularLeftDownInput" },
  {global_class_name: "coupling-down-input", class_name : "AngularRightDownInput" , name : "AngularRightDownInput"},
  
];
export const couplingInputsLeftColConst= 
  [ "offSetLeftUpInput",
  "offSetRightUpInput",
  "offSetLeftDownInput",
   "offSetRightDownInput"
];

 export const couplingInputsRightColConst=[ "AngularLeftUpInput",
 "AngularRightUpInput",
 "AngularLeftDownInput",
 "AngularRightDownInput"];
  
 
 export const pinionBearingtableHead  =  `Pinion Bearing Housing ID Measurement`;
 export const pinionBearingtableData = [
  ["housing_ID_A1", "housing_ID_B1", "housing_ID_C1", "housing_ID_D1"],
  ["housing_ID_A2", "housing_ID_B2", "housing_ID_C2", "housing_ID_D2"],
  ["housing_ID_A3", "housing_ID_B3", "housing_ID_C3", "housing_ID_D3"],
 ];

 export const pinion_housing_measurements_columns = [
    "Measurement #", "A", "B", "C", "D"
  ];

  export const pinion_housing_measurements_rows = [
    "1", "2", "3"
 ];

export const secondtableHead = [
  "Date",
  "HRES",
  "T' P-1",
  "T' 1",
  "T' 2",
  "T' 3",
  "T' 4",
  "T' 5",
  "T' P-2",
  "CHARGE kVA",
  "Delta T'",
  "Notes"
 ];

 export const secondtableHeadDouble = [
  "Date",
  "HRES",
  "T' P-1",
  "T' 1",
  "T' 2",
  "T' 3",
  "Left Delta T'",
  "T' 4",
  "T' 5",
  "T' 6",
  "Right Delta T'",
  "T' P-2",
  "CHARGE kVA",
  "Notes"
 ];

 export const temperatureTableData = [
  "Date",
  "HRES",
  "T_P_1",
  "T_1",
  "T_2",
  "T_3",
  "T_4",
  "T_5",
  "T_P_2",
  "CHARGE_KVA",
  "Delta_T",
  "Notes"
 ];

 export const temperatureTableDataDouble = [
  "Date",
  "HRES",
  "T_P_1",
  "T_1",
  "T_2",
  "T_3",
  "Left_Delta_T",
  "T_4",
  "T_5",
  "T_6",
  "Right_Delta_T",
  "T_P_2",
  "CHARGE_KVA",
  "Notes"
 ];


export const firstTableHead = 'INTERPRETATION OF THE PINION TEMPERATURE DIFFERENTIAL' ;

export const secondTableHeadNote =  `Note: All readings are in °F`;
export const firstTData = [
  "If temperature differential is within 8 deg.C (15 deg.F), pinion alignment is satisfactory",
  "If temperature differential is between 8 deg.C (15 deg.F) and 14 deg.C (25 deg.F), re-align within next few weeks",
  "If temperature differential is between 14 deg.C (25 deg.F) and 25 deg.C (45 deg.F), realign within next few days",
  "If temperature differential is higher than 25 deg.C (45 deg.F), shut down the mill and realign pinion",
  "Positive temperature differential is hot on motor side"
  ];

export const tempSheetInputsSingle = [
  {class_name : "tag-Date" , name : "Date", type:"date"},
  {class_name : "tag-HRES" , name : "HRES", type:"time"},
  {class_name : "tag-Temp Pinion" , name : "T_P_1", type:"number"},
  {class_name : "tag-Temp Delta1" , name : "T_1", type:"number"},
  {class_name : "tag-Temp" , name : "T_2", type:"number"},
  {class_name : "tag-Temp" , name : "T_3", type:"number"},
  {class_name : "tag-Temp" , name : "T_4", type:"number"},
  {class_name : "tag-Temp Delta1" , name : "T_5", type:"number"},
  {class_name : "tag-Temp Pinion" , name : "T_P_2", type:"number"},
  {class_name : "tag-Temp" , name : "CHARGE_KVA", type:"number"},
  {class_name : "tag-Temp Delta" , name : "Delta_T"},
  {class_name : "",name: "Notes"}
];

export const tempSheetInputsDouble = [
  {class_name : "tag-Date" , name : "Date", type:"date"},
  {class_name : "tag-HRES" , name : "HRES", type:"time"},
  {class_name : "tag-Temp Pinion" , name : "T_P_1", type:"number"},
  {class_name : "tag-Temp Delta1" , name : "T_1", type:"number"},
  {class_name : "tag-Temp" , name : "T_2", type:"number"},
  {class_name : "tag-Temp Delta1" , name : "T_3", type:"number"},
  {class_name : "tag-Temp Delta" , name : "Left_Delta_T"},
  {class_name : "tag-Temp Delta2" , name : "T_4", type:"number"},
  {class_name : "tag-Temp" , name : "T_5", type:"number"},
  {class_name : "tag-Temp Delta2" , name : "T_6", type:"number"},
  {class_name : "tag-Temp Delta" , name : "Right_Delta_T"},
  {class_name : "tag-Temp Pinion" , name : "T_P_2", type:"number"},
  {class_name : "tag-Temp" , name : "CHARGE_KVA", type:"number"},
  {class_name : "", name: "Notes"}
];


export const pinion_gear_alignment_table_header = [['LEFT', 'RIGHT','LEFT', 'RIGHT','LEFT', 'RIGHT'], ['CL','CR','BL','BR','RL','RR']];

export const pinion_gear_alignment_table_data = [ 
  ['contact_left' ,'contact_CL' ],
  ['contact_right' ,'contact_CR' ],
  ['backlash_left' ,'backlash_BL' ],
  ['backlash_right' ,'backlash_BR' ],
  ['root_left' ,'root_RL' ],
  ['root_right' ,'root_RR' ]
];

export const pinion_gear_alignment_constants = [
  {
    header_name: "STARTING POSITION",
    station_number : "station_number_start",
    contact_left : "contact_left_start",
    contact_CL : "contact_CL_start",
    contact_right : "contact_right_start",
    contact_CR : "contact_CR_start",
    backlash_left: "backlash_left_start",
    backlash_BL:"backlash_BL_start",
    backlash_right:"backlash_right_start",
    backlash_BR: "backlash_BR_start",
    root_left: "root_left_start",
    root_RL: "root_RL_start",
    root_right: "root_right_start",
    root_RR: "root_RR_start"
  },
  {
    header_name: "90\u00b0 FROM START",
    station_number : "station_number_90",
    contact_left : "contact_left_90",
    contact_CL : "contact_CL_90",
    contact_right : "contact_right_90",
    contact_CR : "contact_CR_90",
    backlash_left: "backlash_left_90",
    backlash_BL:"backlash_BL_90",
    backlash_right:"backlash_right_90",
    backlash_BR: "backlash_BR_90",
    root_left: "root_left_90",
    root_RL: "root_RL_90",
    root_right: "root_right_90",
    root_RR: "root_RR_90"
  },
  {
    header_name: "180\u00b0 FROM START",
    station_number : "station_number_180",
    contact_left : "contact_left_180",
    contact_CL : "contact_CL_180",
    contact_right : "contact_right_180",
    contact_CR : "contact_CR_180",
    backlash_left: "backlash_left_180",
    backlash_BL:"backlash_BL_180",
    backlash_right:"backlash_right_180",
    backlash_BR: "backlash_BR_180",
    root_left: "root_left_180",
    root_RL: "root_RL_180",
    root_right: "root_right_180",
    root_RR: "root_RR_180"
  },
  {
    header_name: "270\u00b0 FROM START",
    station_number : "station_number_270",
    contact_left : "contact_left_270",
    contact_CL : "contact_CL_270",
    contact_right : "contact_right_270",
    contact_CR : "contact_CR_270",
    backlash_left: "backlash_left_270",
    backlash_BL:"backlash_BL_270",
    backlash_right:"backlash_right_270",
    backlash_BR: "backlash_BR_270",
    root_left: "root_left_270",
    root_RL: "root_RL_270",
    root_right: "root_right_270",
    root_RR: "root_RR_270"
  }
];

export const electric_motor_alignment_constants = [
  {
    header_name_left: "Radial Clearance",
    header_name_right: "",
    header_left:"Opp.drive end",
    header_right:"Drive end",
    tbl_left_header_1:"",
    tbl_left_header_2:"",
    tbl_right_header_1:"",
    tbl_right_header_2:"",
    row1_left : "A",
    row1_right: "B",
    row2_left : "C",
    row2_right : "D",
    row3_left : "E",
    row3_right : "F",
    row4_left : "G",
    row4_right: "H",
    row5_left : "",
    row5_right: "",
    row6_left : "",
    row6_right: ""
  },
  {
    header_name_left: "Axial Clearance",
    header_name_right: "",
    header_left:"Opp.drive end",
    header_right:"Drive end",
    tbl_left_header_1:"Stoped",
    tbl_left_header_2:"Running",
    tbl_right_header_1:"Stoped",
    tbl_right_header_2:"Runing",
    row1_left : "1",
    row1_right: "5",
    row2_left : "2",
    row2_right : "6",
    row3_left : "3",
    row3_right : "7",
    row4_left : "4",
    row4_right: "8",
    row5_left : "Dist.btw.cplg.",
    row5_right: "Dist.btw.cplg.",
    row6_left : "Magn.center",
    row6_right: "Magn.center"
  },
  {
    header_name_left: "Exiter",
    header_name_right: "Stator",
    header_left:"Air Grap",
    header_right:"Air Grap",
    tbl_left_col_1:"D.E.",
    tbl_left_col_2:"O.D.E.",
    tbl_right_col_1:"D.E.",
    tbl_right_col_2:"O.D.E.",
    row1_left : "12:00",
    row1_right: "12:00",
    row2_left : "3:00",
    row2_right : "3:00",
    row3_left : "6:00",
    row3_right : "6:00",
    row4_left : "9:00",
    row4_right: "9:00",
    row5_left : "",
    row5_right: "",
    row6_left : "",
    row6_right: "" 
  },

];

export const radial_clearance = [
{col1:'A',col2:{isInput: true , name: "ODE_A"},col3:'E',col4:{isInput: true , name: "DE_E"}},
{col1:'B',col2:{isInput: true , name: "ODE_B"},col3:'F',col4:{isInput: true , name: "DE_F"}},
{col1:'C',col2:{isInput: true , name: "ODE_C"},col3:'G',col4:{isInput: true , name: "DE_G"}},
{col1:'D',col2:{isInput: true , name: "ODE_D"},col3:'H',col4:{isInput: true , name: "DE_H"}}];

export const axial_clearance = [
{col1:'',col2:{isInput: false , name: "initialRow1"},col3:{isInput: false , name: "initialRow2"},col4:'', col5:{isInput: false , name: "initialRow3"}, col6:{isInput: false , name: "initialRow4"}},
{col1:'1',col2:{isInput: true , name: "ODE_Stopped1"},col3:{isInput: true , name: "ODE_Running1"},col4:'5', col5:{isInput: true , name: "DE_Stopped5"}, col6:{isInput: true , name: "DE_Running5"}},
{col1:'2',col2:{isInput: true , name: "ODE_Stopped2"},col3:{isInput: true , name: "ODE_Running2"},col4:'6', col5:{isInput: true , name: "DE_Stopped6"}, col6:{isInput: true , name: "DE_Running6"}},
{col1:'3',col2:{isInput: true , name: "ODE_Stopped3"},col3:{isInput: true , name: "ODE_Running3"},col4:'7', col5:{isInput: true , name: "DE_Stopped7"}, col6:{isInput: true , name: "DE_Running7"}},
{col1:'4',col2:{isInput: true , name: "ODE_Stopped4"},col3:{isInput: true , name: "ODE_Running4"},col4:'8', col5:{isInput: true , name: "DE_Stopped8"}, col6:{isInput: true , name: "DE_Running8"}},
{col1:'Dist.btw.cplg.',col2:{isInput: true , name: "ODE_Stopped_dist_cplg"},col3:{isInput: true , name: "ODE_Running_dist_cplg"},col4:'Dist.btw.cplg.', col5:{isInput: true , name: "DE_Stopped_dist_cplg"}, col6:{isInput: true , name: "DE_Running_dist_cplg"}},
{col1:'Magnetic center',col2:{isInput: true , name: "ODE_Stopped_magn_center"},col3:{isInput: true , name: "ODE_Running_magn_center"},col4:'Magnetic center', col5:{isInput: true , name: "DE_Stopped_magn_center"}, col6:{isInput: true , name: "DE_Running_magn_center"}}
];

export const air_gap_table = [
{col1:'Position',col2:{isInput: false , name: "initialRow1"},col3:{isInput: false , name: "initialRow2"},col4:'Position', col5:{isInput: false , name: "initialRow3"}, col6:{isInput: false , name: "initialRow4"}},
{col1:'12:00',col2:{isInput: true , name: "Exiter_DE_12"},col3:{isInput: true , name: "Exiter_ODE_12"},col4:'12:00', col5:{isInput: true , name: "Stator_DE_12"}, col6:{isInput: true , name: "Stator_ODE_12"}},
{col1:'3:00',col2:{isInput: true , name: "Exiter_DE_03"},col3:{isInput: true , name: "Exiter_ODE_03"},col4:'3:00', col5:{isInput: true , name: "Stator_DE_03"}, col6:{isInput: true , name: "Stator_ODE_03"}},
{col1:'6:00',col2:{isInput: true , name: "Exiter_DE_06"},col3:{isInput: true , name: "Exiter_ODE_06"},col4:'6:00', col5:{isInput: true , name: "Stator_DE_06"}, col6:{isInput: true , name: "Stator_ODE_06"}},
{col1:'9:00',col2:{isInput: true , name: "Exiter_DE_09"},col3:{isInput: true , name: "Exiter_ODE_09"},col4:'9:00', col5:{isInput: true , name: "Stator_DE_09"}, col6:{isInput: true , name: "Stator_ODE_09"}},
];