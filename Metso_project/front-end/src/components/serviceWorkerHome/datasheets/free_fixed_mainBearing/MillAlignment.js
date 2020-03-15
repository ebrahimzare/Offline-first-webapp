import React, { PureComponent } from "react";
import {fixed_free_inputs,rotation_direction,thrust_direction,fixed_pump_select,free_pump_select,pump_dimensions,left_pinion,right_pinion} from "../../constants/free_fixed_bearingConstants";
import "../../../../css/MillAlignmentStyle.css";

/**
 * This is the datasheets for the free(floating) and fixed main bearing with 3 drive types. 
 * Since all the inputs are at the same position and the images are vastly similar except for the pinion position. 
 */
class MillAlignment extends PureComponent {

  /**
   * @param {string} mill_alignment_type - the type of the mill alignment sheet
   * this function determines the correct image to show. , if client, go back a route.
   */
  determineMillAlignmentData = (mill_alignment_type) =>{
    
    const millImageToReturn = {
      'single_right': './photos/MillAlignmentSingleRight.png',
      'single_left': './photos/MillAlignmentSingleLeft.png',
      'dual': './photos/MillAlignmentDual.png'
    };

    return (this.props.isService === true) ? millImageToReturn[mill_alignment_type] : `.${millImageToReturn[mill_alignment_type]}`;
  }; 

//onchange, name, value
  returnSelect = (select,prop_type) =>{
    return(
    <select className={this.isDisabled(this.props.part_type, select.class_name) === false ? select.class_name : `${select.class_name} disabled`} defaultValue = {prop_type[select.class_name]} name={select.class_name} onChange={this.props.handleChange} disabled={this.isDisabled(this.props.part_type, select.class_name)}>
      {select.options.map(x=> 
    <option key={x.name} name={x.name}>{x.value}</option>
      )}
    </select> 
    );
  };

  /**
   * This function will determine if the input should be disabled. When select Free main bearing the Fixed inputs should be diabled and vice versa.  
   */
  isDisabled = (part_type, name) =>{
    if((part_type.split(" ")[0].toLowerCase() === 'free' && name.split("_")[0] === 'fixed') || (part_type.split(" ")[0].toLowerCase() === 'fixed' && name.split("_")[0] === 'free')){
      return true
    }
    else return false
  };

  /**
   * boolean function that returns if the part type is free
   */
  isFree = part_type => part_type.split(" ")[0].toLowerCase() === 'free';
  
  /**
   * boolean function that returns if the part type is fixed
   */
  isFixed = part_type => part_type.split(" ")[0].toLowerCase() === 'fixed';
  
  //if free and name is free disabled={false}, else disabled={true} 
  /**
   * input Array will come from the constants, this is to reduce code repetition. 
   * would be equivalent to a bunch of input fields, here we are ajust mapping it in an array.
   */
  returnInputs = (inputArray, prop_type)=>{
    return(
      inputArray.map((x,key) =>{
        return(
        <div key={key} className={x.class_name}>
         {x.inputs.map(y=> 
          <input readOnly = {this.props.isService=== false ? true : false}key={y.name} defaultValue = {prop_type[y.name]} type={y.type} id={this.isDisabled(this.props.part_type,y.name) === false ? y.name: `${y.name}_disabled`} name={y.name} onChange={this.props.handleChange} disabled={this.isDisabled(this.props.part_type, y.name)}></input>
       )}
      </div>
    )}));
  };

  /*
  This function handles the pinoff inputs that should show based on the drive selected.
  side = right_pinion or left_pinion from constants an object
  */
  pinionOff = (side, prop_type) =>{

    return(
      <div>
      <input type={side.offset_input.type} id={side.offset_input.name} defaultValue = {prop_type[side.offset_input.name]} name={side.offset_input.name} onChange={this.props.handleChange}></input>
      {this.returnSelect(side.offset_select,prop_type)}
      {this.returnInputs(side.offset_root_inputs.value,prop_type[side.offset_root_inputs.name])}
     </div>
    );
  };

  render = () => {
 
    return (
      <div className="container millAlignmentClass">
        <div className="image-container-flex">
        <img
            className="millAlignment-image"
            src={this.determineMillAlignmentData(this.props.mill_alignment_type)}
            alt="mill-alignment-diagram"
          />
        {this.props.mill_alignment_type !== "single_right" &&
          this.pinionOff(left_pinion, this.props.mill_alignments.left_pinion)
        }
         
        {this.props.mill_alignment_type !== "single_left" &&
          this.pinionOff(right_pinion, this.props.mill_alignments.right_pinion)
        }
      
        {/* free fixed inputs */}
        {this.returnInputs(fixed_free_inputs, this.isFixed(this.props.part_type) === true ? this.props.mill_alignments.fixed_mill_alignment_inputs : this.props.mill_alignments.free_mill_alignment_inputs)}
      
        {this.returnSelect(rotation_direction,this.props.mill_alignments)}
        {this.returnSelect(thrust_direction,this.props.mill_alignments)}
      
        <div className="pump-type">
        {this.returnSelect(fixed_pump_select,this.isFixed(this.props.part_type) === true ? this.props.mill_alignments.fixed_mill_alignment_inputs : this.props.mill_alignments.free_mill_alignment_inputs)}
        {this.returnSelect(free_pump_select,this.isFixed(this.props.part_type) === true ? this.props.mill_alignments.fixed_mill_alignment_inputs : this.props.mill_alignments.free_mill_alignment_inputs)}
        </div>

        {this.returnInputs(pump_dimensions,this.isFixed(this.props.part_type) === true ? this.props.mill_alignments.fixed_mill_alignment_inputs : this.props.mill_alignments.free_mill_alignment_inputs)}

        <div className="mill-alignment-flex">   
        <div id="label-background">
          <label id="mill-alignment-notes">Notes:</label>
          <ul >
          <li id="note-lists"> - The radial clearances were taken at 8 inch depth </li>
          <li id="note-lists"> - Measurements were taken with the pump <select name="pump_open_closed" onChange={this.props.handleChange} defaultValue={this.props.mill_alignments.pump_open_closed}><option name="pump_open">Open</option><option name="pump_closed">Closed</option> </select></li>
          <li id="note-lists"> - All measurements are in INCHES </li>
          <li id="note-lists"> - If a check box is blank, measurements could not be taken or was </li>
          <li id="note-lists">  {"not required during this specific inspection"} </li>
          </ul>
        </div>
            <textarea name="mill_alignment_notes" rows="10" cols="150"  onChange={this.props.handleChange} /> 
        </div>
        {this.props.isService === true &&
             <div className="button-flex">
             <button className="btn btn-success center" type="submit"  onClick={this.props.handleSubmit}> Submit Report</button> 
             </div>
            }
      </div>
    
      </div>
    );
  };
};

export default MillAlignment
