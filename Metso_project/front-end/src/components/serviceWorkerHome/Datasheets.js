import React, { PureComponent } from "react";
import classnames from "classnames";
import { connect } from 'react-redux';
import {withRouter } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import TemperatureSheet from "./datasheets/driveTrain/TemperatureSheet";
import PinionToGear from "./datasheets/driveTrain/PinionToGear";
import UploadPic from "./datasheets/UploadPic";
import ElectricMotorAlignment from "./datasheets/driveTrain/ElectricMotorAlignment";
import PinionBearingHousing from "./datasheets/driveTrain/PinionBearingHousing";
import CouplingAlignment from "./datasheets/driveTrain/CouplingAlignment";
import PinionBearingInstallation from "./datasheets/driveTrain/PinionBearingInstallation";
import MillAlignment from "./datasheets/free_fixed_mainBearing/MillAlignment";
import "../../css/DatasheetsStyle.css";

/**
 * Datasheets components contains all the logic and filtering for all datasheets.
 * For now its only for sag mills, later all the filtered data should exist outside so the file can handle multiple types of equipment and not only sag mills. 
 * Main takeaways: 
 * 1) page filters the part type selected, each part has their own sets of datasheets. 
 */
class Datasheets extends PureComponent {
 
  /**
   * Similarly to all other components, once page is mounted, the header is set and the visited page path is updated.
   */
  componentDidMount = async () => {
    const {dispatch} = this.props.action_props;
    const {changeHeaderTitle,addToVisitedPage} = this.props.action_props.global_action;
    const {get_and_set_right_freeBearing,get_and_set_right_fixedBearing} = this.props.action_props.datasheet_action;

    if(this.props.report_id){
    await dispatch(changeHeaderTitle(`${this.props.part_type} Datasheet`)); 
    const page_nav_content = {path_number:4 ,page_path: '/Datasheets', page_name: `${this.props.part_type} Datasheets` };    
    await dispatch(addToVisitedPage(this.props.visited_page , page_nav_content , page_nav_content.path_number ));
    if (this.props.part_type === 'Free main bearing')
      await dispatch(get_and_set_right_freeBearing(this.props.report_id));
    else if(this.props.part_type === 'Fixed main bearing')
      await dispatch(get_and_set_right_fixedBearing(this.props.report_id));  
  };

  
  };
  /** 
   @param {string} tab - this is simply the name of the tab
   This function sets the active tab to display the correct datasheet that the user selected. 
  **/
  toggle = (tab) => {
    const {dispatch} = this.props.action_props;
    const {setActiveTab} = this.props.action_props.datasheet_action;
    if (this.props.activeTab !== tab) {
      dispatch(setActiveTab(tab));
    }
  }

  /** 
   Attempted to combine these toggle functions as 1 function, encountered update stack call errors, too many set states triggered.  
  **/
 /** 
   This function sets the temperature dropDown open or closed , triggered by on onClick action. 
  **/
  temparature_dropdown_toggle = async () => {
    const {dispatch} = this.props.action_props;
    const {setTemperatureDropDownOpen} = this.props.action_props.datasheet_action;
    await dispatch(setTemperatureDropDownOpen(!this.props.pinion_temperature.temperatureDropdownOpen));
  };
 /** 
   This function sets the coupling alignment dropDown open or closed , triggered by on onClick action. 
  **/
  coupling_dropdown_toggle = async () => {
    const {dispatch} = this.props.action_props;
    const {setCouplingDropDown} = this.props.action_props.datasheet_action;
    await dispatch(setCouplingDropDown(!this.props.coupling_alignment.couplingDropdownOpen));
  };
  /** 
   This function sets the mill alignment dropDown open or closed , triggered by on onClick action. 
  **/
  mill_alignment_dropdown_toggle = async () => {
    const {dispatch} = this.props.action_props;
    const {setMillAlignmentDropDown} = this.props.action_props.datasheet_action;
    await dispatch(setMillAlignmentDropDown(!this.props.mill_alignments.millAlignmentsDropdownOpen));
  };

   /** 
    * @param {Event} event - events are occurences that happen in the HTML element. Here we take the event target's (input)
    * name and value to set our states. 
    * As seen in the code each electric motor tables contain all the inputs as an object, where each input has a unique name. 
    * Every onChange event will call an action to set the state.  
  **/
  handleElectricMotorChange = async event => {
    const {dispatch} = this.props.action_props;
    const {setRadialClearanceTable,setAxialClearanceTable,setAirGapTable,setElectricMotorNotes} = this.props.action_props.datasheet_action;
    const { name, value } = event.target;
    
    //radial
    if(name.length <= 5){
      const copyTable = {...this.props.electric_motor_alignment.radialTable, [name]:value};
      await dispatch(setRadialClearanceTable(copyTable));
    }
      //axial
    if(name.includes('Stopped')|| name.includes('Running')){
      const copyTable = {...this.props.electric_motor_alignment.AxialTable, [name]:value};
      await dispatch(setAxialClearanceTable(copyTable));
    }
    //air gap
    if(name.includes('Exiter')  || name.includes('Stator')){
      const copyTable = {...this.props.electric_motor_alignment.AirGapTable, [name]:value};
      await dispatch(setAirGapTable(copyTable));
    } 
    //notes
    if(name === "electric_motor_notes"){
      await dispatch(setElectricMotorNotes(value));
     }
};

  /** 
    * @param {Event} event -Here we take the event target's (input) name and value to set our states. 
    * The coupling change occurs when the user select Motor to Reducer or a Reducer to Pinion Datasheet.
    *  
    * Once the change has been made, we will re set the coupling inputs and the coupling type. 
    * Reason for re-setting the inputs is display the appropriate data.
    *
  **/
  handleCouplingChange = async event => {
    const {dispatch} = this.props.action_props;
    const {setCouplingInputs} = this.props.action_props.datasheet_action;
    const { name, value } = event.target;
    const coupling_type = this.props.coupling_alignment.select_Coupling; 
    const copy_coupling_alignment_inputs= { ...this.props.coupling_alignment.coupling_alignment_inputs,  report_id:this.props.report_id, [name]: value };

    await dispatch(setCouplingInputs(copy_coupling_alignment_inputs,coupling_type));
  }
  /** 
    * @param {Event} event -Event is user action, triggered by onChange. 
    * The pinion housing changes occurs when the user enters inputs for the pinion bearing housing measurements datasheet.
    * This function handles the side of the gear and housing measurements along with extra notes. 
    *
  **/
  pinionHousing_handleChange = async event =>{
    const {dispatch} = this.props.action_props;
    const {setLeftHousingSelect,setRighttHousingSelect,setBearingtHousingTable,setHousingNotes} = this.props.action_props.datasheet_action;
    const { name, value } = event.target;

    if (name === "housingLeftSelection") {      
      if(value === "mill-side" ){
      await dispatch(setLeftHousingSelect(value));
      await dispatch(setRighttHousingSelect("motor-side"));
    }
      if(value === "motor-side"){
        await dispatch(setLeftHousingSelect(value));
        await dispatch(setRighttHousingSelect("mill-side"));
      }
    };
    if (name === "housingRightSelection") {     
      if(value === "mill-side"){
        await dispatch(setRighttHousingSelect(value));
        await dispatch(setLeftHousingSelect("motor-side"));
      }
      if(value === "motor-side"){
        await dispatch(setRighttHousingSelect(value));
        await dispatch(setLeftHousingSelect("mill-side"));
      }
    };

    if(name.includes('housing_ID')){
      const copy_pinion_bearing_housing = { ...this.props.pinion_bearing_housing.PinionBearingHousingInputs, [name]: value };
      await dispatch(setBearingtHousingTable(copy_pinion_bearing_housing));
    };

    if (name === "PinionBearingHousingNote"){
      await dispatch(setHousingNotes(value));
    };
  };
/** 
    * @param {Event} event -Event is user action, triggered by onChange. 
    * The pinion installation changes occurs when the user enters inputs for the pinion bearing installation measurements datasheet.
    * This function handles inputs for both the fixed and free bearings. 
  **/
  pinion_Installation_handleChange = async event =>{
    const {dispatch} = this.props.action_props;
    const {setFixedPinionInstallation, setFreePinionInstallation } = this.props.action_props.datasheet_action;
    const { name, value } = event.target;

    if(name.includes('_fixed')){
      const copyFixedAlignment = { ...this.props.pinion_bearing_installation.fixedPinionBearingInstall, [name]: value };
      await dispatch(setFixedPinionInstallation(copyFixedAlignment));
    };

    if(name.includes('_free')){
      const copyFreeAlignment = { ...this.props.pinion_bearing_installation.freePinionBearingInstall, [name]: value };
      await dispatch(setFreePinionInstallation(copyFreeAlignment));
    };
  };

  /**
   * function handles the temperature changes, 
   * Handle the selection of the drive side of left, right pinion and the pinon type of the pinion  
   * As well as the temperature readings of pinion depending on type of pinion temperature sheet selected.
   * We have a single helix type T1 to T5 and a double helix type T1 to T6. 
  **/
  temperatureSheet_handleChange = async event => {
    const {dispatch} = this.props.action_props;
    const {setPinionTemperaturesSingle, setTemperatureRightSelect,setTemperatureLeftSelect,setTemperatureMiddleSelect,setPinionTemperaturesDouble} = this.props.action_props.datasheet_action;
    //no await uncaught in promise event.target is null
    
    let { name, value} = event.target;
    let index = 0;
    if(name.includes('-')){
    index = name.split('-')[1];
    name = name.split('-')[0];
    }
  
    /**
     * @param {string} name - The name is the name of the input type.
     * @param {string} value - The value of the input field.
     * Handling the change event of the drive selects, the left side must be opposite to the right side. 
     */
    if (name === "left_drive") {
      if (value === "drive-side"){
         await dispatch(setTemperatureLeftSelect(value,this.props.pinion_temperature.select_Helix)); 
         await dispatch(setTemperatureRightSelect('non-drive-side',this.props.pinion_temperature.select_Helix));             
       } else if(value === "non-drive-side") {
        await dispatch(setTemperatureLeftSelect(value,this.props.pinion_temperature.select_Helix));
        await dispatch(setTemperatureRightSelect('drive-side',this.props.pinion_temperature.select_Helix));           
       }
    };
    if (name === "right_drive") {
      if (value === "drive-side"){
        await dispatch(setTemperatureRightSelect(value,this.props.pinion_temperature.select_Helix));
        await dispatch(setTemperatureLeftSelect("non-drive-side",this.props.pinion_temperature.select_Helix));
       } else if (value === "non-drive-side"){
        await dispatch(setTemperatureRightSelect(value,this.props.pinion_temperature.select_Helix));
        await dispatch(setTemperatureLeftSelect("drive-side",this.props.pinion_temperature.select_Helix));
        }
    };
    if (name === "drive_pinion") {
      await dispatch(setTemperatureMiddleSelect(value,this.props.pinion_temperature.select_Helix));
    };

let copyData = {}

/**
 * make a copy of the current temperature table data and assign the inputs based on the name and value. 
 * do the neccesary (difference/ change) calculations of the temperatures. 
 * Issue facing: props change but not rendered quick enough for the change to show. 
 */

if(name !== "left_drive" && name !== "drive_pinion"  && name !== "right_drive"  ){
     if (this.props.pinion_temperature.select_Helix === "single") {
      copyData = {...this.props.pinion_temperatures_single}
      let copyArray = copyData.temperature_readings;
      
      copyArray[parseInt(index,10)].Delta_T = Math.abs(copyArray[parseInt(index,10)].T_5 - copyArray[parseInt(index,10)].T_1);
      copyArray[parseInt(index,10)][name] = (name.includes('T') || name.includes('KVA')) ? parseInt(value,10) : value;

      copyData = {...copyData , temperature_readings:copyArray};
      await dispatch(setPinionTemperaturesSingle(copyData));
      }
      else if (this.props.pinion_temperature.select_Helix === "double") {
        copyData = {...this.props.pinion_temperatures_double}
        let copyArray = copyData.temperature_readings;
        copyArray[parseInt(index,10)].Left_Delta_T = Math.abs(copyArray[parseInt(index,10)].T_3 - copyArray[parseInt(index,10)].T_1);
        copyArray[parseInt(index,10)].Right_Delta_T = Math.abs(copyArray[parseInt(index,10)].T_6 - copyArray[parseInt(index,10)].T_4);
        copyArray[parseInt(index,10)][name] = (name.includes('T') || name.includes('KVA')) ? parseInt(value,10) : value;
     
        copyData = {...copyData , temperature_readings:copyArray};
        await dispatch(setPinionTemperaturesDouble(copyData));
      } 
    } 
};

/**
 * This function selects the type of datasheet based on the dropdown selections. (Pinion Temperature, Coupling Alignment, and Mill Alignment)
 */
  selectHandler = async event => {
    const {dispatch} = this.props.action_props;
    const {setSelectHelix,setDriveSelect,setTemperatureRightSelect,setTemperatureLeftSelect,setTemperatureMiddleSelect,setCouplingType} = this.props.action_props.datasheet_action;
    
    if(this.props.pinion_temperature.temperatureDropdownOpen === true){
    await dispatch(setSelectHelix(event.target.name));
    this.toggle("0");
    if(this.props.pinion_temperature.select_Helix === 'single'){
       dispatch(setTemperatureRightSelect(this.props.pinion_temperatures_single.right_drive,this.props.pinion_temperature.select_Helix ));
       dispatch(setTemperatureLeftSelect(this.props.pinion_temperatures_single.left_drive,this.props.pinion_temperature.select_Helix));
       dispatch(setTemperatureMiddleSelect(this.props.pinion_temperatures_single.drive_pinion,this.props.pinion_temperature.select_Helix));
    };
    if(this.props.pinion_temperature.select_Helix === 'double'){
      if(this.props.pinion_temperatures_double.right_drive && this.props.pinion_temperatures_double.left_drive && this.props.pinion_temperatures_double.drive_pinion){
       dispatch(setTemperatureRightSelect(this.props.pinion_temperatures_double.right_drive,this.props.pinion_temperature.select_Helix));
       dispatch(setTemperatureLeftSelect(this.props.pinion_temperatures_double.left_drive,this.props.pinion_temperature.select_Helix));
       dispatch(setTemperatureMiddleSelect(this.props.pinion_temperatures_double.drive_pinion,this.props.pinion_temperature.select_Helix));
        }
    };
    window.location.href = this.props.isService === true ? '/Datasheets' :'/Client/Datasheets' ;
  };

    if(this.props.coupling_alignment.couplingDropdownOpen === true){
     await dispatch(setCouplingType(event.target.name));
     this.toggle("3");
     window.location.href = this.props.isService === true ? '/Datasheets' :'/Client/Datasheets' ;
  }
    if(this.props.mill_alignments.millAlignmentsDropdownOpen === true){
      await dispatch(setDriveSelect(this.props.report_id, event.target.name, this.props.part_type));
      this.toggle("0");
    }
     
  };

  handle_ImageChange = event => {
    const {dispatch} = this.props.action_props;
    const {setImageFieldsDatasheet} = this.props.action_props.photos_action;
    
    //async await event.target is null
    if (event.target.name === "comments") {
      dispatch(setImageFieldsDatasheet( this.props.report_id,
         this.props.photosReducer.image_fieldsDatasheet.name,
         this.props.photosReducer.image_fieldsDatasheet.image,
         event.target.value
      ));
    }
    if (event.target.name === "name") {
      dispatch(setImageFieldsDatasheet(this.props.report_id,
        event.target.value,
        this.props.photosReducer.image_fieldsDatasheet.image,
        this.props.photosReducer.image_fieldsDatasheet.comments
      ));
    }
    if (event.target.name === "image") {
       dispatch(setImageFieldsDatasheet(this.props.report_id,
       this.props.photosReducer.image_fieldsDatasheet.name,
       event.target.files[0],
       this.props.photosReducer.image_fieldsDatasheet.comments
      ));
    }
  };

  handlePinionToGearChange = event => { 
    const {dispatch} = this.props.action_props;
    const {setGearPinionContactBacklash,setGearPinionContactPattern, setPinionOffset} = this.props.action_props.datasheet_action;

    const { name, value } = event.target;
    const contact_backlash_inclusions = ['_start','_90' , '_180' , '_270'];  
    
    let contactBacklashBool = false; 
    let contactPatternBool = false;
    for (let i = 0 ; i < contact_backlash_inclusions.length;i++){
      if(name.includes(contact_backlash_inclusions[i])){
        contactBacklashBool = true;
      }
    }

    if(contactBacklashBool === false && name.includes('_')){
      contactPatternBool = true;
    }

    if(contactPatternBool === true  ){
      const copy_gear_pinion_contact_pattern = { ...this.props.gear_pinion_contact_pattern, [name]: value };
      dispatch(setGearPinionContactPattern(copy_gear_pinion_contact_pattern));

    } else if(contactBacklashBool === true){
      const copy_gear_pinion_contact_backlash = { ...this.props.gear_pinion_contact_backlash, [name]: value };
    dispatch(setGearPinionContactBacklash(copy_gear_pinion_contact_backlash));
    }
    else {
      const copy_pinion_offset = { ...this.props.pinion_offset, [name]: value };
      dispatch(setPinionOffset(copy_pinion_offset));
    };
  };

  handleMillAlignmentChange = event => { //add report_id on submit
    const {dispatch} = this.props.action_props;
    const {setLeftPinion,setRightPinion,setFixedMillAlignmentInputs,setFreeMillAlignmentInputs,
      setMillRotationDirection,setMillThrustDirection,
      setPumpOpenClosed,setMillAlignmentNotes} = this.props.action_props.datasheet_action;

    const {name,value} = event.target;
    
    if(name.includes('fixed')){
      const copyFixedMillAlignment = {...this.props.mill_alignments.fixed_mill_alignment_inputs, [name]: value};
      dispatch(setFixedMillAlignmentInputs(copyFixedMillAlignment));
    }
    if(name.includes('free')){ //set disabled true or false
      const copyFreeMillAlignment = {...this.props.mill_alignments.free_mill_alignment_inputs, [name]: value};
      dispatch(setFreeMillAlignmentInputs(copyFreeMillAlignment));
    }
    if(name.includes('notes')){ 
      dispatch(setMillAlignmentNotes(value));
    }
    if(name === 'pump_open_closed'){ 
      dispatch(setPumpOpenClosed(value));
    }
    if(name.includes('rotation_direction')){ 
      dispatch(setMillRotationDirection(value));
    }
    if(name.includes('thrust_direction')){ 
      dispatch(setMillThrustDirection(value));
    }
    if(name.includes('pinion_offset_left_')){
      let left_pinion_copy = {...this.props.mill_alignments.left_pinion};
      if(name.includes('_side')){
        left_pinion_copy = {...left_pinion_copy, pinion_offset_left_root: {...left_pinion_copy.pinion_offset_left_root, [name]: value}}
      }
      else{
        left_pinion_copy= {...left_pinion_copy, [name]: value}
      }
      dispatch(setLeftPinion(left_pinion_copy));
    }
    if(name.includes('pinion_offset_right_')){
      let right_pinion_copy = {...this.props.mill_alignments.right_pinion};
      if(name.includes('_side')){
        right_pinion_copy = {...right_pinion_copy, pinion_offset_right_root: {...right_pinion_copy.pinion_offset_right_root, [name]: value}}
      }
      else{
        right_pinion_copy= {...right_pinion_copy, [name]: value}
      }
      dispatch(setRightPinion(right_pinion_copy));
    }
  };

  /**
   * Add a row to the temperature sheet, Temperature readings is an array of objects,
   * adding a row means adding an object to the array.
   */
  handleAddRow = e => {
    const {dispatch} = this.props.action_props;
    const {setPinionTemperaturesSingle , setPinionTemperaturesDouble} = this.props.action_props.datasheet_action;
    e.preventDefault();

    if (this.props.pinion_temperature.select_Helix === "single")
      {
     const tempSingleTemp = [...this.props.pinion_temperatures_single.temperature_readings,
       
      {     
            Date: this.props.pinion_temperatures_single.temperature_readings[this.props.pinion_temperatures_single.temperature_readings.length -1].Date,
            HRES: this.props.pinion_temperatures_single.temperature_readings[this.props.pinion_temperatures_single.temperature_readings.length -1].HRES,
            T_P_1: "",
            T_1: "",
            T_2: "",
            T_3: "",
            T_4: "",
            T_5: "",
            T_P_2: "",
            CHARGE_KVA: "",
            Delta_T: 0,
            Notes: ""
          }]
    dispatch(setPinionTemperaturesSingle({...this.props.pinion_temperatures_single,temperature_readings : tempSingleTemp}));

         } else if (this.props.pinion_temperature.select_Helix === "double"){
      
      const tempDoubleTemp =   [ 
        ...this.props.pinion_temperatures_double.temperature_readings,
        { 
            Date: this.props.pinion_temperatures_double.temperature_readings[this.props.pinion_temperatures_double.temperature_readings.length - 1].Date,
            HRES: this.props.pinion_temperatures_double.temperature_readings[this.props.pinion_temperatures_double.temperature_readings.length - 1].HRES,
            T_P_1: "",
            T_1: "",
            T_2: "",
            T_3: "",
            T_4: "",
            T_5: "",
            T_6: "",
            T_P_2: "",
            Left_Delta_T: 0,
            Right_Delta_T: 0,
            CHARGE_KVA: "",
            Notes: ""
          }]
     dispatch(setPinionTemperaturesDouble({...this.props.pinion_temperatures_single,temperature_readings : tempDoubleTemp}));
          }
  };

  /**
   * @param {string} part_type - The name of the part type
   * Returns the filtered name of the part type
   */
  filter_part_type = (part_type) => {
    const parts = {
      "Fixed main bearing" : 'fixed',
      "Free main bearing" : 'free',
      "Drivetrain" : 'drivetrain'
    };
    return parts[part_type];
  };

  /**
   * Upload the file or photo, takes in the file filed from photoReducer.
   * Filter the datasheet type, image for images or application for files
   */
  handleAddPhoto = async () => {
   
   const {dispatch} = this.props.action_props;
   const {uploadPhotoDatasheet} = this.props.action_props.photos_action;
    //undefined
   const datasheetType = this.props.photosReducer.image_fieldsDatasheet.image.type.split('/')[0].toString();

   await dispatch(uploadPhotoDatasheet(this.props.photosReducer.image_fieldsDatasheet,this.filter_part_type(this.props.part_type),datasheetType));
  
  };

  /**
   * Function to call the add photo / file function, for asynchronous. register the prop change?. 
   */
  callHandlePhotoFile = event => {
    this.handleAddPhoto();
    event.preventDefault();
    alert(`SUCCESS Image or File Uploaded`);
  };

   /**
   * Filter the drive side name for the mill alignment. Mill Alignment sheet contains 3 datasheets.
   */
  determineDriveSideMillAlignment = (drive_side) => {
    const sideToReturn = {
      'single_right': 'right',
      'single_left': 'left',
      'dual': 'dual'
    };
    return sideToReturn[drive_side];
  };

  /**
   * Filter the Datasheet type name based on tab id, this is important for the backend, as we have reduced functions so that they share a same function.
   */
  filterDatasheetByTab = (part_type, tab_id) => {

    const dataToReturn = {
      "fixed":{'0': this.determineDriveSideMillAlignment(this.props.mill_alignments.driveSelect)},
      "free": {'0': this.determineDriveSideMillAlignment(this.props.mill_alignments.driveSelect)},
      "drivetrain": { '0': 'temperature',
                      '1': 'pinionGear', 
                      '3': 'coupling',
                      '4': 'electric_motor',
                      '5': 'pinion_housing',
                      '6': 'pinion_install'}
    };
    return dataToReturn[part_type][tab_id]
  };

  /**
   * Submit the temperature sheet, 
   */
  handleSubmitTemperature = e => {
    e.preventDefault();
    const {dispatch} = this.props.action_props;
    const {uploadToDataSheetByCategory} = this.props.action_props.datasheet_action;
    const part_type = this.filter_part_type(this.props.part_type);
    if (
      this.props.pinion_temperature.left_select === "Select" ||
      this.props.pinion_temperature.middle_select === "Select" ||
      this.props.pinion_temperature.right_select === "Select"
    )
      alert("You must select the side position on the image");
    else{
     /**
      * ternary condition to submit the proper data depending if its a single or double helix.
      */
    const dataToSubmit = {
       report_id: this.props.report_id,
       left_drive: (this.props.pinion_temperature.select_Helix === "single") ? this.props.pinion_temperatures_single.left_drive : this.props.pinion_temperatures_double.left_drive,
       drive_pinion: (this.props.pinion_temperature.select_Helix === "single") ? this.props.pinion_temperatures_single.drive_pinion : this.props.pinion_temperatures_double.drive_pinion,
       right_drive: (this.props.pinion_temperature.select_Helix === "single") ? this.props.pinion_temperatures_single.right_drive : this.props.pinion_temperatures_double.right_drive,
       temperature_readings : (this.props.pinion_temperature.select_Helix === "single") ? this.props.pinion_temperatures_single.temperature_readings : this.props.pinion_temperatures_double.temperature_readings
       }
    
    dispatch(uploadToDataSheetByCategory(dataToSubmit,part_type,this.filterDatasheetByTab(part_type, this.props.activeTab),this.props.pinion_temperature.select_Helix));
    alert(`SUCCESS ${this.props.pinion_temperature.select_Helix} helix temperature sheet Uploaded`);
    }
  };

  handleSubmitCoupling = event => {
    event.preventDefault();
    const {dispatch} = this.props.action_props;
    const {uploadToDataSheetByCategory} = this.props.action_props.datasheet_action;
    let coupling_type = this.props.coupling_alignment.select_Coupling;
    const oppositeCoupling = {'mtr' : 'rtp_',
                               'rtp' : 'mtr_'};
    let copyCoupling = {...this.props.coupling_alignment.coupling_alignment_inputs};
    const keysArray = Object.keys(copyCoupling);
      for (let i in keysArray){
        if (keysArray[i].includes(oppositeCoupling[coupling_type]))
          delete copyCoupling[keysArray[i]];
      }
      console.log('copyCoupling is ' , copyCoupling )
    dispatch(uploadToDataSheetByCategory(copyCoupling,this.filter_part_type(this.props.part_type), 'coupling',coupling_type));
    alert(`SUCCESS ${coupling_type} Sheet Uploaded`);
  };


  /**
   * A combining function that submits into the datasheet object in our couchDB database. 
   * simply creates a new json object and overwrites the current key if it exists. 
   * else it creates it. 
   */
  handleSubmitByType = (event)=> {
    event.preventDefault();
    const {dispatch} = this.props.action_props;
    const {addDatasheetByType} = this.props.action_props.datasheet_action;
    const part_type = this.filter_part_type(this.props.part_type);
    const dataSheetType = this.filterDatasheetByTab(part_type,this.props.activeTab);
    let leftDriveData = {}, rightDriveData = {}, dualDriveData = {};
    if(part_type === 'fixed' || part_type === 'free'){
      const free_fixed_inputs = (part_type === 'fixed') ? this.props.mill_alignments.fixed_mill_alignment_inputs : this.props.mill_alignments.free_mill_alignment_inputs;  
      const sharedMillAlignment = { 
        unique_inputs: free_fixed_inputs,
        mill_bearing_rotation_direction_select : this.props.mill_alignments.mill_bearing_rotation_direction_select,
        mill_bearing_thrust_direction_select : this.props.mill_alignments.mill_bearing_thrust_direction_select,
        pump_open_closed:  this.props.mill_alignments.pump_open_closed,
        notes: this.props.mill_alignments.mill_algnment_notes
      }

      if(dataSheetType === 'left')
        leftDriveData = { ...sharedMillAlignment,
         left_pinion: this.props.mill_alignments.left_pinion
      }
      if(dataSheetType === 'right')
        rightDriveData = { ...sharedMillAlignment,
         right_pinion: this.props.mill_alignments.right_pinion
      }
      if(dataSheetType === 'dual')
        dualDriveData = { ...sharedMillAlignment,
         left_pinion: this.props.mill_alignments.left_pinion,
         right_pinion: this.props.mill_alignments.right_pinion
      }
    };

    /**
     * The data of the datasheets are in our redux store, simply setting the new key name to the redux value equivalent.
     */
    const dataFromRedux = {
      'left': leftDriveData,
      'right': rightDriveData,
      'dual': dualDriveData,
      'pinionGear': this.props.dataSheetReducer.pinion_gear_alignment,
      'electric_motor':this.props.electric_motor_alignment,
      'pinion_housing':this.props.pinion_bearing_housing,
      'pinion_install': this.props.pinion_bearing_installation
    };
   
    let dataToSubmit = dataFromRedux[dataSheetType];
    dataToSubmit = {...dataToSubmit, report_id: this.props.report_id};

    dispatch(addDatasheetByType(dataToSubmit,part_type,dataSheetType));
    alert(`SUCCESS ${dataSheetType} Sheet Uploaded`);
  };

  /**
   * A function that returns the correct datasheets depending on the part selected.
   */
  determine_correct_datasheets = (part_type) => {
    //Fixed main bearing,Free main bearing didn't do the sheets yet

    if(part_type === "Fixed main bearing" || part_type === "Free main bearing"){
      part_type = "Free fixed main bearing";
    }
    
    switch(part_type){
      case "Drivetrain":
        return {tab: [
          { tab_id: "0",
            component:  <TemperatureSheet handleChange={this.temperatureSheet_handleChange}
                                          jobs1={this.props.pinion_temperatures_single}
                                          jobs1Double = {this.props.pinion_temperatures_double}
                                          handleAddRow={this.handleAddRow}
                                          isService = {this.props.isService}
                                          handleSubmit={this.handleSubmitTemperature}
                                          helix_type={this.props.pinion_temperature.select_Helix}/>},
          { tab_id: "1",
          component:  <PinionToGear handleChange={this.handlePinionToGearChange}
                                    gear_pinion_contact_backlash={this.props.gear_pinion_contact_backlash}
                                    pinion_contact_pattern = {this.props.gear_pinion_contact_pattern}
                                    pinion_offset = {this.props.pinion_offset}
                                    isService = {this.props.isService}
                                    handleSubmit = {this.handleSubmitByType}/>},
          { tab_id: "2",
            component:   <UploadPic handleChange={this.handle_ImageChange}
                                    isService = {this.props.isService}
                                    thirdTabState={this.props.photosReducer.image_fieldsDatasheet}
                                    handleSubmit={this.callHandlePhotoFile}/>},
          { tab_id: "3",
            component:  <CouplingAlignment  handleChange={this.handleCouplingChange}          
                                            handleSubmit = {this.handleSubmitCoupling}/>},
          { tab_id: "4",
            component:  <ElectricMotorAlignment motor_alignment_inputs={this.props.electric_motor_alignment}
                                                isService = {this.props.isService}
                                                handleChange={this.handleElectricMotorChange}
                                                handleSubmit = {this.handleSubmitByType}/>},
          { tab_id: "5",
            component:   <PinionBearingHousing PinionBearingHousingInputs={this.props.pinion_bearing_housing.PinionBearingHousingInputs}
                                               isService = {this.props.isService}                                   
                                               housingSelectLeft={this.props.pinion_bearing_housing.housingSelectLeft}
                                               housingSelectRight={this.props.pinion_bearing_housing.housingSelectRight}
                                               handleChange={this.pinionHousing_handleChange}
                                               handleSubmit = {this.handleSubmitByType}/>},
          { tab_id: "6",
            component:   <PinionBearingInstallation fixedPinionBearingInstallInputs={this.props.pinion_bearing_installation.fixedPinionBearingInstall}
                                                    isService = {this.props.isService}                
                                                    freePinionBearingInstallInputs={this.props.pinion_bearing_installation.freePinionBearingInstall}
                                                    handleChange={this.pinion_Installation_handleChange}
                                                    handleSubmit = {this.handleSubmitByType}/>}
          ], 
        nav: [
          { tab_id: '0',
            isOpen: this.props.pinion_temperature.temperatureDropdownOpen === true,
            toggle: this.temparature_dropdown_toggle,
            name: "Pinion temperature",
            click: this.selectHandler,
            dropdown_items: [{name:'double', display_name: "Double Helix"} , {name:'single', display_name: "Single Helix"}]},
          { tab_id: '1',
            name: "Pinion to gear alignment" },
          { tab_id: '2',
            name: "Upload files or images" },
          { tab_id: '3',
            isOpen: this.props.coupling_alignment.couplingDropdownOpen,
            toggle: this.coupling_dropdown_toggle,
            name: " Coupling alignment",
            click: this.selectHandler,
            dropdown_items: [{name:'mtr', display_name: "Motor to reducer"} , {name:'rtp', display_name: "Reducer to pinion"}]},
          { tab_id: '4',
            name: "Electric motor alignment" },
          { tab_id: '5',
            name: "Pinion bearing housing alignment" },
          { tab_id: '6',
            name: "Pinion bearing installation" }
        ]};

      case "Free fixed main bearing":
        return {tab: [
          { tab_id: "0",
            component:  <MillAlignment mill_alignments = {this.props.mill_alignments} isService = {this.props.isService} mill_alignment_type={this.props.mill_alignments.driveSelect} handleChange={this.handleMillAlignmentChange} part_type={this.props.part_type}  handleSubmit = {this.handleSubmitByType}/>}, //props doesnt exist yet
          //Hydropstatic Pad Pressure
          { tab_id: "1",
            component:   <UploadPic handleChange={this.handle_ImageChange}
                                    thirdTabState={this.props.photosReducer.image_fieldsDatasheet}
                                    handleAddPhoto={this.handleAddPhoto}
                                    handleSubmitgeneral={this.handleSubmitgeneral}/>}
          ], 
        nav: [
          { tab_id: '0',
            isOpen: this.props.mill_alignments.millAlignmentsDropdownOpen === true,
            toggle: this.mill_alignment_dropdown_toggle,
            name: "Mill Alignment",
            click: this.selectHandler,
            dropdown_items: [{name:'single_right', display_name: "Single drive right"},{name:'single_left', display_name: "Single drive left"},{name:'dual', display_name: "Dual drive"}]},
          { tab_id: '1',
            name: "Trunnion runout" }
        ]};

      default: 
        return {tab: [{ tab_id: "0",
                        component:   <UploadPic handleChange={this.handle_ImageChange}
                                                thirdTabState={this.props.photosReducer.image_fieldsDatasheet}
                                                handleAddPhoto={this.handleAddPhoto}
                                                handleSubmitgeneral={this.handleSubmitgeneral}/>}],
                nav: [{ tab_id: '0',name: "Upload files or images" }]}; 
    };
  };

  render = () => {

    const tabData = this.determine_correct_datasheets(this.props.part_type).tab;
    const navData = this.determine_correct_datasheets(this.props.part_type).nav; 

    return (
      <div className="datasheet-data">
        <Nav tabs>
        {  navData.map(x =>   
             <div key={x.tab_id}>
          <NavItem>
              { ((this.props.part_type === "Drivetrain" || this.props.part_type === "Free main bearing" || this.props.part_type === "Fixed main bearing") && (x.tab_id === '0' || x.tab_id === '3')) ? 
             <NavLink className={classnames({ active: this.props.activeTab === x.tab_id })} >     
                  <object>
                          <Dropdown nav isOpen={x.isOpen} toggle={x.toggle}>
                            <DropdownToggle nav caret>
                            {x.name}
                            </DropdownToggle>                            
                            <DropdownMenu>        
                              {x.dropdown_items.map((y , key) => 
                              <div key = {key}><DropdownItem name={y.name} onClick={x.click}>{y.display_name}</DropdownItem> </div>       
                              )}
                            </DropdownMenu>
                          </Dropdown>
                    </object>
            </NavLink> 
            :
            <NavLink className={classnames({ active: this.props.activeTab === x.tab_id })} onClick={() => {this.toggle(x.tab_id);}}>
              {x.name}
            </NavLink>
              }
          </NavItem>
          </div>
            )}
        </Nav>

        <TabContent activeTab={this.props.activeTab}>
          {tabData.slice(parseInt(this.props.activeTab, 10) , parseInt(this.props.activeTab, 10)+1).map(x => 
        <div key = {x.tab_id}>
        <TabPane tabId= {x.tab_id}>
            <Row>
              <Col sm="12">
              {tabData[parseInt(this.props.activeTab, 10)].component}
              </Col>
            </Row>
        </TabPane>
        </div>
          )}
        </TabContent>
      </div>
   );
  };
};

/**
 * 
 * @param {*} state
 * mapping the redux states as a prop for the Datasheets Component. 
 */

const mapStateToProps = state => {
  console.log("highlighted part states are: ", state);
  
  const {equipment_clientReducer, globalReducer, reportReducer,photosReducer, dataSheetReducer } = state
    
  return {
    equipment_clientReducer,
    activeTab: dataSheetReducer.activeTab,
    part_type:dataSheetReducer.part_type,
    report_id: reportReducer.report_id,
    isService : globalReducer.isServiceWorker,
    visited_page: globalReducer.visited_page,
    photosReducer,
    dataSheetReducer,
    pinion_bearing_installation: dataSheetReducer.pinion_bearing_installation,
    pinion_bearing_housing: dataSheetReducer.pinion_bearing_housing,
    electric_motor_alignment: dataSheetReducer.electric_motor_alignment,
    coupling_alignment: dataSheetReducer.coupling_alignment,
    pinion_temperature: dataSheetReducer.pinion_temperature,
    pinion_temperatures_single: dataSheetReducer.pinion_temperature.pinion_temperatures_single,
    pinion_temperatures_double: dataSheetReducer.pinion_temperature.pinion_temperatures_double,
    gear_pinion_contact_backlash: dataSheetReducer.pinion_gear_alignment.gear_pinion_contact_backlash,
    gear_pinion_contact_pattern:dataSheetReducer.pinion_gear_alignment.gear_pinion_contact_pattern,
    pinion_offset :dataSheetReducer.pinion_gear_alignment.pinion_offset,
    mill_alignments: dataSheetReducer.mill_alignments
    };
  };
 
export default withRouter(connect(mapStateToProps)(Datasheets)); 
