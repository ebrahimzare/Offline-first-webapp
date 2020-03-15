import React, { PureComponent } from "react";
import {
    pinion_gear_alignment_constants,
    pinion_gear_alignment_table_data,
    pinion_gear_alignment_table_header
  } from "../constants/componentsConstants";

/**
 * This is a helper function that maps the pinion to gear contact backlash alignment inputs.
 */  
class PinionGearAlignments extends PureComponent {
  render = () => {
    const contact_backlash_headers = ["CONTACT", "BACKLASH", "ROOT"];
    return (
      <table>
        <thead>
          <tr>
            <th style={{width : '20%'}} colSpan="2" rowSpan="3">
              POSITION OF GEAR <br />
              TO MESH
            </th>
            {contact_backlash_headers.map(position_gear_type => (
              <th style={{width : '27%'}} key={position_gear_type} colSpan="2">
                {position_gear_type}
              </th>
            ))}
          </tr>
          {pinion_gear_alignment_table_header.map((header, key) => (
            <tr key={key}>
              {header.map((header_title, key) => (
                <th style={{width : '13.33%'}} key={key}>{header_title}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {pinion_gear_alignment_constants.map((x, key) => (
            <tr key={key}>
              <th style={{width : '10%'}}>{x.header_name}</th>
              <th style={{width : '10%'}} className="station_number_pinion">
                STATION NO.{
                    (this.props.edit_view === "view")? 
                    this.props.pinionObject[x.station_number] : 
                    <input
                        name={x.station_number}
                        type="number"
                        onChange={this.props.handleChange}
                        defaultValue={this.props.backlash[x.station_number] ? this.props.backlash[x.station_number] : ""}
                        readOnly = {this.props.isService === true ? false : true}
                      />
                    }
              </th>
              {pinion_gear_alignment_table_data.map((y, key) => (
                <td style={{width : '13.33%'}} className="first-td" key={key}>
                  <table className="inner-table" style={{width : '100%', height: '100%'}}>
                    <tbody className="inner-tBody">
                      {y.map((z, key) => (
                        <tr className="input-row" key={key}>
                          <td>{
                                (this.props.edit_view === "view")? 
                                this.props.pinionObject[x[z]] : 
                                <input
                                    id="pinionGearInputs"
                                    name={x[z]}
                                    type="text"
                                    onChange={this.props.handleChange}
                                    defaultValue={this.props.backlash[x[z]] ? this.props.backlash[x[z]] : ""}
                                    readOnly = {this.props.isService === true ? false : true}
                                  />
                              }</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
};

export default PinionGearAlignments;