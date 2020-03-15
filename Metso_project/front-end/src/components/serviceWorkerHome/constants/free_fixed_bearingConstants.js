export const fixed_free_inputs = [
    {
        class_name:"lift_input_block",
        inputs: [ {type:"number" ,name:"fixed_lift_input"},
                  {type:"number" ,name:"free_lift_input"}]
    },
    {
        class_name:"radial_clearance_input_top_block",
        inputs: [ {type:"number" ,name:"fixed_radial_clearance_top_input1"},
                  {type:"number" ,name:"fixed_radial_clearance_top_input2"},
                  {type:"number" ,name:"fixed_radial_clearance_top_input3"},
                  {type:"number" ,name:"fixed_radial_clearance_top_input4"},
                  {type:"number" ,name:"free_radial_clearance_top_input1"},
                  {type:"number" ,name:"free_radial_clearance_top_input2"},
                  {type:"number" ,name:"free_radial_clearance_top_input3"},
                  {type:"number" ,name:"free_radial_clearance_top_input4"}]
    },
    {
        class_name:"pump1_input_block_top",
        inputs: [ {type:"number" ,name:"fixed_pump1_input_top_input1"},
                  {type:"number" ,name:"fixed_pump1_input_top_input2"},
                  {type:"number" ,name:"fixed_pump1_input_top_input3"},
                
                  {type:"number" ,name:"free_pump1_input_top_input1"},
                  {type:"number" ,name:"free_pump1_input_top_input2"},
                  {type:"number" ,name:"free_pump1_input_top_input3"}]
    },
    {
        class_name:"pump2_input_block_top",
        inputs: [ {type:"number" ,name:"fixed_pump2_input_top_input1"},
                  {type:"number" ,name:"fixed_pump2_input_top_input2"},
                  {type:"number" ,name:"fixed_pump2_input_top_input3"},
                
                  {type:"number" ,name:"free_pump2_input_top_input1"},
                  {type:"number" ,name:"free_pump2_input_top_input2"},
                  {type:"number" ,name:"free_pump2_input_top_input3"}]
    },
    {
        class_name:"pump3_input_block_top",
        inputs: [ {type:"number" ,name:"fixed_pump3_input_top_input1"},
                  {type:"number" ,name:"fixed_pump3_input_top_input2"},
                
                  {type:"number" ,name:"free_pump3_input_top_input1"},
                  {type:"number" ,name:"free_pump3_input_top_input2"}]
    },
    {
        class_name:"pump_dimensions",
        inputs: [ {type:"number" ,name:"fixed_pump_dimension_width"},
                  {type:"number" ,name:"fixed_pump_dimension_height"},
                
                  {type:"number" ,name:"free_pump_dimension_width"},
                  {type:"number" ,name:"free_pump_dimension_height"}]
    },
    {
        class_name:"pump3_input_block_bottom",
        inputs: [ 
            {type:"number" ,name:"fixed_pump3_input_bottom_input1"},
            {type:"number" ,name:"fixed_pump3_input_bottom_input2"},
        
            {type:"number" ,name:"free_pump3_input_bottom_input1"},
            {type:"number" ,name:"free_pump3_input_bottom_input2"}]
    },
    {
        class_name:"pump2_input_block_bottom",
        inputs: [ {type:"number" ,name:"fixed_pump2_input_bottom_input1"},
                  {type:"number" ,name:"fixed_pump2_input_bottom_input2"},
                  {type:"number" ,name:"fixed_pump2_input_bottom_input3"},
                
                  {type: "number" ,name:"free_pump2_input_bottom_input1"},
                  {type: "number" ,name:"free_pump2_input_bottom_input2"},
                  {type: "number" ,name:"free_pump2_input_bottom_input3"}]
    },
    {
        class_name:"pump1_input_block_bottom",
        inputs: [ {type:"number" ,name:"fixed_pump1_input_bottom_input1"},
                  {type:"number" ,name:"fixed_pump1_input_bottom_input2"},
                  {type:"number" ,name:"fixed_pump1_input_bottom_input3"},
                
                  {type:"number" ,name:"free_pump1_input_bottom_input1"},
                  {type: "number" ,name:"free_pump1_input_bottom_input2"},
                  {type:"number" ,name:"free_pump1_input_bottom_input3"}]
    },
    {
        class_name:"radial_clearance_input_bottom_block",
        inputs: [{type:"number" ,name:"fixed_radial_clearance_bottom_input1"},
                 {type:"number" ,name:"fixed_radial_clearance_bottom_input2"},
                 {type:"number" ,name:"fixed_radial_clearance_bottom_input3"},
                 {type:"number" ,name:"fixed_radial_clearance_bottom_input4"},
    
                 {type:"number" ,name:"free_radial_clearance_bottom_input1"},
                 {type:"number" ,name:"free_radial_clearance_bottom_input2"},
                 {type:"number" ,name:"free_radial_clearance_bottom_input3"},
                 {type:"number" ,name:"free_radial_clearance_bottom_input4"}]
    }
];

const pinion_offset_right_root = [
    {
        class_name:"pinion_root_inputs_right",
        inputs: [{type:"number" ,name:"pinion_offset_right_root_left_side"},
                 {type:"number" ,name:"pinion_offset_right_root_right_side"} ]
    }
];

const pinion_offset_left_root = [
    {
        class_name:"pinion_root_inputs_left",
        inputs: [{type:"number" ,name:"pinion_offset_left_root_left_side"},
                 {type:"number" ,name:"pinion_offset_left_root_right_side"} ]
    }
];

const pinion_left_select = {
    class_name:"pinion_offset_left_direction",
    options:[{name:"select_left", value:"Select \u25BC"},{name:"rightward_left", value:">>>>"},{name:"leftward_left", value:"<<<<"},{name:"bi_directional_left", value:">><<"}]
};

const pinion_right_select = {
    class_name:"pinion_offset_right_direction",
    options:[{name:"select_right", value:"Select \u25BC"},{name:"rightward_right", value:">>>>"},{name:"leftward_right", value:"<<<<"},{name:"bi_directional_right", value:">><<"}]
};

export const left_pinion = {
    offset_input:  {type:"number" ,name:"pinion_offset_left_input"},
    offset_select: pinion_left_select,
    offset_root_inputs: {name: 'pinion_offset_left_root' , value: pinion_offset_left_root}
};

export const right_pinion = {
    offset_input:  {type:"number" ,name:"pinion_offset_right_input"},
    offset_select: pinion_right_select,
    offset_root_inputs: {name: 'pinion_offset_right_root' , value: pinion_offset_right_root}
};


export const pump_dimensions = [
    {
        class_name:"pump_dimensions",
        inputs: [{type:"number" ,name:"fixed_pump_dimension_width"},
                 {type:"number" ,name:"fixed_pump_dimension_height"},
                 {type:"number" ,name:"free_pump_dimension_width"},
                 {type:"number" ,name:"free_pump_dimension_height"} ]
    }
];


export const rotation_direction = {
    class_name:"mill_bearing_rotation_direction_select",
    options:[{name:"select_rotation", value:"Select \u25BC"},{name:"upwards_rotation", value:"↑"},{name:"downwards_rotation", value:"↓"}]
};

export const thrust_direction = {
    class_name:"mill_bearing_thrust_direction_select",
    options:[{name:"select_thrust", value:"Select \u25BC"},{name:"rightwards_thrust", value:"→"},{name:"leftwards_thrust", value:"←"}]
};

export const fixed_pump_select = {
    class_name:"fixed_pump_type_select",
    options:[{name:"select_fixed", value:"Select \u25BC"},{name:"discharge_fixed", value:"Discharge"},{name:"feed_fixed", value:"Feed"}]
};
export const free_pump_select = {
    class_name:"free_pump_type_select",
    options:[{name:"select_free", value:"Select \u25BC"},{name:"discharge_free", value:"Discharge"},{name:"feed_free", value:"Feed"}]
};
