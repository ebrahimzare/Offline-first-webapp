import React, { Component } from "react";
import "../../../../css/ElectricMotorAlignmentStyle.css";
import {radial_clearance,axial_clearance,air_gap_table} from "../../constants/componentsConstants";

/**
 * class that renders the electric motor alignement table.
 * Displays the Axial Radial and air gap table.
 * 
 * To do: clean up the table, reduce code as much as possible. , too many td's 
 */
class ElectricMotorAlignment extends Component {
  render = () => {
    return (
      <div className="electric-motor-container">
        <div className="electric-motor-image-flex">
          <img
            className="equipment-image center"
            src={this.props.isService === true ? "./photos/electricMotor.png" : "../photos/electricMotor.png"}
            alt="electricMotor-diagram"
          />
        </div>
        <div className="radial-clearance-flex">
          <table className="Radial-Clearance-Table">
            <thead>
              <tr>
                <th colSpan="4">Radial Clearance</th>
              </tr>
              <tr>
                <th colSpan="2"> Opposite Drive End</th>
                <th colSpan="2"> Drive End</th>
              </tr>
            </thead>
          
            <tbody>
                {radial_clearance.map((x,key) =>
                <tr  className="table-input" key={key}>
                <td>{x.col1}</td>
                <td id="radial-clearence">{(x.col2.isInput) === true ?<input type="text" name={x.col2.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.radialTable[x.col2.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.radialTable[x.col2.name]}</td> 
                <td>{x.col3}</td>
                <td id="radial-clearence">{(x.col4.isInput) === true ?<input type="text" name={x.col4.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.radialTable[x.col4.name]}  readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.radialTable[x.col4.name]}</td> 
                </tr>
                )}
            </tbody>
          </table>
        </div>
        <div className="axial-clearance-flex">
          <table className="Axial-Clearance-Table">
            <thead>
              <tr>
                <th colSpan="6">Axial Clearance</th>
              </tr>
              <tr>
                <th colSpan="3"> Opposite Drive End</th>
                <th colSpan="3"> Drive End</th>
              </tr>
            </thead>

            <tbody>
                {
        axial_clearance.map((x,key) =>
                <tr key={key}>
                <td>{x.col1}</td>
                <td className="table-input">{(x.col2.isInput) === true ?<input type="text" name={x.col2.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AxialTable[x.col2.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AxialTable[x.col2.name]}</td>
                <td className="table-input">{(x.col3.isInput) === true ?<input type="text" name={x.col3.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AxialTable[x.col3.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AxialTable[x.col3.name]}</td>
                <td>{x.col4}</td>
                <td className="table-input">{(x.col5.isInput) === true ?<input type="text" name={x.col5.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AxialTable[x.col5.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AxialTable[x.col5.name]}</td>
                <td className="table-input">{(x.col6.isInput) === true ?<input type="text" name={x.col6.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AxialTable[x.col6.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AxialTable[x.col6.name]}</td>
              </tr>
       )}
            </tbody>
          </table>
        </div>
        <div className="air-gap-flex">
          <table className="Air-Gap-Table">
            <thead>
              <tr>
                <th colSpan="3">Exiter</th>
                <th colSpan="3">Stator</th>
              </tr>
              <tr>
                <th colSpan="1"> Position</th>
                <th colSpan="2"> Air Gap</th>
                <th colSpan="1"> Position</th>
                <th colSpan="2"> Air Gap</th>
              </tr>
            </thead>

            <tbody>
                {
        air_gap_table.map((x,key) =>
                <tr className="table-input" key={key}>
                <td id="air-gap-position">{x.col1}</td>
                <td id={(x.col2.isInput) === true ? "air-gap-de-input" : "air-gap-de"}>{(x.col2.isInput) === true ?<input type="text" name={x.col2.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AirGapTable[x.col2.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AirGapTable[x.col2.name]}</td>
                <td id={(x.col3.isInput) === true ? "air-gap-ode-input" : "air-gap-ode"}>{(x.col3.isInput) === true ?<input type="text" name={x.col3.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AirGapTable[x.col3.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AirGapTable[x.col3.name]}</td>
                <td id="air-gap-position">{x.col4}</td>
                <td id={(x.col5.isInput) === true ? "air-gap-de-input" : "air-gap-de"}>{(x.col5.isInput) === true ?<input type="text" name={x.col5.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AirGapTable[x.col5.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AirGapTable[x.col5.name]}</td>
                <td id={(x.col6.isInput) === true ? "air-gap-ode-input" : "air-gap-ode"}>{(x.col6.isInput) === true ?<input type="text" name={x.col6.name} onChange={this.props.handleChange} defaultValue = {this.props.motor_alignment_inputs.AirGapTable[x.col6.name]} readOnly = {this.props.isService === true ? false : true}></input>: this.props.motor_alignment_inputs.AirGapTable[x.col6.name]}</td>
              </tr>
       )}
            </tbody>
          </table>
        </div>
        <label id="electric-notes">Notes:</label>
        <div className="electric-notes-flex">   
            <textarea name="electric_motor_notes" rows="10" cols="150"  onChange={this.props.handleChange}  defaultValue = {this.props.motor_alignment_inputs.electric_motor_notes} readOnly = {this.props.isService === true ? false : true}/> 
        </div>
        
        {this.props.isService === true && 
        <div className="button-flex">
        <button className="btn btn-success center" type="submit"  onClick={this.props.handleSubmit}> Submit Report</button> 
        </div>
        }
        
      </div>
    );
  };
};

export default ElectricMotorAlignment;

