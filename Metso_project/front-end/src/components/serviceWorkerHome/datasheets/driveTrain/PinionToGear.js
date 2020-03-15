import React, { PureComponent } from "react";
import "../../../../css/PinionToGearStyle.css";
// import {metso_logo} from "../../constants/componentsConstants";
import PinionGearAlignments from "../../helpers/PinionGearAlignment";

/**
 * This class renders all 3 pinion to gear tables.
 * contact backlash, contact pattern and pinion offset.
 */
class PinionToGear extends PureComponent {
  render = () => {
    const offset_select_options = ["Select", "Discharge", "Feed"];
    const station_numbers = ['station_number1', 'station_number2', 'station_number3'];
    const contact_pattern_constants = [{contact_pattern_name:"GEAR" , contact: ["gear_contact_pattern1","gear_contact_pattern2","gear_contact_pattern3"]},
    {contact_pattern_name:"PINION" , contact: ["pinion_contact_pattern1","pinion_contact_pattern2","pinion_contact_pattern3"]}];
    // const metso_image = (this.props.isService === true) ? metso_logo : `.${metso_logo}`;

    const pinion_offset_data = [
      {
        label_left_name: "Side",
        label_right_name: "LEFT",
        selectName : "side1",
        valueName : "leftValue",
        select_options: offset_select_options
      },
      {
        label_left_name: "Side",
        label_right_name: "RIGHT",
        selectName : "side2",
        valueName : "rightValue",
        select_options: offset_select_options
      }
    ];

    return (
      <div className="container dataSheetContainer">
        <div className="pinion-to-gear-flex">
          <div className="reportTable" style={{width : '100%'}}>
            <h2 className="contact-backlash">
              GEAR/PINION <br /> CONTACT AND BACKLASH
            </h2>
            <form className="pinionToGear">
              <PinionGearAlignments
                edit_view="edit"
                handleChange={this.props.handleChange}
                backlash = {this.props.gear_pinion_contact_backlash}
                isService = {this.props.isService}
              />
            </form>
          </div>
        </div>

        <div className="contact-offset-flex">
          <div className="gear-pinion-contact-pattern-offset" style={{width : '45%'}}>
            <h2 className="contact-pattern">GEAR/PINION CONTACT PATTERN</h2>
            <table className="pinion-contact-pattern">
              <thead>
                <tr>
                  <th rowSpan="2"></th>
                  <th style={{ width: "81.5%" }} colSpan="3">
                    Position
                  </th>
                </tr>
                <tr>
                  {station_numbers.map(x => (
                    <th style={{ width: "27%" }} key={x}>
                      Station NO.{" "}
                      <input
                        style={{ width: "50%" }}
                        className="station_number_input"
                        name= {x}
                        type="number"
                        onChange={this.props.handleChange}
                        readOnly = {this.props.isService === true ? false : true}
                        defaultValue={this.props.pinion_contact_pattern[x]}
                      ></input>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contact_pattern_constants.map((x, key) => (
                  <tr key={key}>
                    <th style={{ width: "20%" }}>{x.contact_pattern_name}</th>
                    {x.contact.map(y => (
                      <td key={y}>
                        <img
                          className="position_percentile_image"
                          src="../photos/gear_pinion_contact.png"
                          alt="gear-pattern"
                        />
                        <input
                          style={{ width: "50%" }}
                          className="position_percentile"
                          name={y}
                          type="number"
                          onChange={this.props.handleChange}
                          readOnly = {this.props.isService === true ? false : true}
                          defaultValue={this.props.pinion_contact_pattern[y]}
                        ></input>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pinion-offset" style={{width : '45%'}}>
            <h2 className="pinion-offset-title">PINION OFFSET</h2>
            <form className="offset-form">
              <div className="container pinion-offset">
                {pinion_offset_data.map((x, key) => (
                  <div key={key} className="row pinion-offset">
                    <div className="col-sm-3">
                      <label className="offset-label">
                        {x.label_left_name}
                      </label>
                    </div>
                    <div className="col-sm-3">
                      <select name={x.selectName} onChange={this.props.handleChange} defaultValue={this.props.pinion_offset[x.selectName] ? this.props.pinion_offset[x.selectName] : ""} disabled = {this.props.isService === true ? false : true} >
                  
                        {x.select_options.map(x => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-3">
                      <label className="offset-label">
                        {x.label_right_name}
                      </label>
                    </div>
                    <div className="col-sm-3">
                      <input type="number" name= {x.valueName} onChange={this.props.handleChange} defaultValue={this.props.pinion_offset[x.valueName] ? this.props.pinion_offset[x.valueName] : ""} readOnly = {this.props.isService === true ? false : true}></input> 
                    </div>
                  </div>
                ))}
              </div>
            </form>
            
          </div>
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

export default PinionToGear; 