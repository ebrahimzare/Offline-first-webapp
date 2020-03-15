
import React, { PureComponent } from "react";
import {
    freePinionBearingInputs, 
    fixedBearingBoxParagraph,
    fixedPinionBearingInputs,
  } from "../../constants/componentsConstants";

import "../../../../css/pinionBearingInstallStyle.css";

/**
 * This class displays the measurements of the pinion bearing installation. 
 * The user may only select one seal type: Labyrinth or Taconite, Input should be disabled.
 * Note: The free and fixed bearing have opposite sides. 
 *  To do: Clean up this file, too many repetitions.
 */
class PinionBearingInstallation extends PureComponent {

    render = () => { 
       
       return (
        <div className="container" > 
        <div className="container bearing " >
            <div className="row">
             <h1> Pinion Bearing Installation Measurements </h1>
            </div>

            {/* Didnt add the input to fix, hidden value*/}
            <div className="row">
             <p> Drive train location (as viewed from feed end):
                <span className="bearingInstallSpan"> 
                  <select> 
                    <option id="select_option"> Left </option>
                    <option id="select_option"> Right </option>
                  </select>
                </span>
              </p>
            </div>

            <div className="bearingCenter">
               <p > Record Measurements in the appropriate boxes, as follows: <label className="fixedBearinglabel"> FIXED BEARING </label></p>
            </div>

            <div className="row fixedBearingBox">
                    <ol  >
                    {fixedBearingBoxParagraph.map((x, key)=>
                     <li key={key}> {x} </li> )}
                     </ol>
            </div>
            <div className="row">   
             <img  src={this.props.isService === true ? `./photos/FixedBearningInstall.png` : `../photos/FixedBearningInstall.png`} alt="FIXED BEARING" className="img-responsive" />           
               <div className="inputs"> 
                 {
                  fixedPinionBearingInputs.map((x, key)=><input key={key} className={x.class_name} defaultValue = {this.props.fixedPinionBearingInstallInputs[x.name]} name={x.name} type="number"  onChange={this.props.handleChange} 
                  readOnly = {this.props.isService === true ? false : true}/>)
                  }                    
                </div>
            </div>
        </div>  

        <div className="container bearing " >
            <div className="row">
             <h1> Pinion Bearing Installation Measurements </h1>
            </div>

            {/* Didnt add the input */}
            <div className="row">
             <p> Drive train location (as viewed from feed end):
                <span className="bearingInstallSpan"> 
                  <select> 
                    <option id="select_option"> Left </option>
                    <option id="select_option"> Right </option>
                  </select>
                </span>
              </p>
            </div>

            <div className="bearingCenter">
               <p > Record Measurements in the appropriate boxes, as follows: <label className="fixedBearinglabel"> FREE BEARING</label></p>
            </div>

            <div className="row fixedBearingBox">
                    <ol  >
                    {fixedBearingBoxParagraph.map((x, key)=>
                     <li key={key}> {x} </li> )}
                     </ol>
            </div>
             
            <div className="row">   
             <img src={this.props.isService === true ? `./photos/FreeBearningInstall.png` : `../photos/FreeBearningInstall.png`} alt="Free BEARING" className="img-responsive" />           
               <div className="inputs"> 
                 {
                  freePinionBearingInputs.map((x, key)=><input key={key} className={x.class_name} defaultValue = {this.props.freePinionBearingInstallInputs[x.name]}  name={x.name} type="number"  onChange={this.props.handleChange}
                  readOnly = {this.props.isService === true ? false : true}/>)
                  }                    
                </div>
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
 
export default PinionBearingInstallation;