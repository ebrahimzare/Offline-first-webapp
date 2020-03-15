import React, { PureComponent } from "react";
import HighlightedRow from "../../helpers/HighlightedRow";
import TableHeadClass from "../../helpers/TableHeadClass";
import {
  pinionBearingtableHead,
  pinion_housing_measurements_columns,
  pinionBearingtableData
} from "../../constants/componentsConstants";
import "../../../../css/TempreratureSheetStyle.css";
import "../../../../css/PinionBearingHousingStyle.css";

/**
 * This class handles the rendering of the pinion bearing housing alignment,
 * Its important to note that the mill sides must be opposite to one another. 
 * 
 * The Housing Bearing measurements should be an integer
 */
class PinionBearingHousing extends PureComponent {
  render = () => {
    const t_head = pinion_housing_measurements_columns.map(x => {
      return <TableHeadClass key={x} headName={x} />;
    });
    return (
      <div className="container pinionBearingHousing">
        <div className="pinion-housing-flex">
          <img
            className="equipment-image center"
            src={this.props.isService === true ? "./photos/pinionBearing.png" : "../photos/pinionBearing.png"}
            alt="Pinion-Bearing-diagram"
          />
          <div className="housing-selects-block">
          <div id="leftSelection">
            <select
              className={
                this.props.housingSelectLeft !== "Select"
                  ? "non_selected_housing"
                  : "selected_housing"
              }
              name="housingLeftSelection"
              value={this.props.housingSelectLeft}
              onChange={this.props.handleChange}
              disabled= {this.props.isService === true ? false : true}
            >
              {this.props.housingSelectLeft === "Select" && (
                <option defaultValue="selected" value="housingSelectLeft">
                  {" "}
                  Select &#9660;{" "}
                </option>
              )}
              <option value="mill-side">Mill Side</option>
              <option value="motor-side">Motor Side</option>
            </select>
          </div>

          <div id="rightSelection">
            <select
              className={
                this.props.housingSelectRight !== "Select"
                  ? "non_selected_housing"
                  : "selected_housing"
              }
              name="housingRightSelection"
              value={this.props.housingSelectRight}
              onChange={this.props.handleChange}
              disabled= {this.props.isService === true ? false : true}
            >
              {this.props.housingSelectRight === "Select" && (
                <option defaultValue="selected" value="housingSelectRight">
                  {" "}
                  Select &#9660;{" "}
                </option>
              )}
              <option value="mill-side">Mill Side</option>
              <option value="motor-side">Motor Side</option>
            </select>
          </div>
          </div>
        </div>

        <div className="row">
          <table className="pinion-housingTable ">
            <HighlightedRow highlightedContent={pinionBearingtableHead} colSpan={"28"}/>
            <tbody>
              <tr>{t_head}</tr>
              {pinionBearingtableData.map((data, key) => (
                <tr key={key}>
                  <td> {key + 1}</td>
                  {data.map((x, key) => (
                    <td key={key}>
                      <input
                        type="number"
                        defaultValue={this.props.PinionBearingHousingInputs[x]}
                        name={x}
                        onChange={this.props.handleChange}
                        readOnly = {this.props.isService === true ? false : true}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flatness-image">
          <img
            className="equipment-image center"
            src={this.props.isService === true ? "./photos/pinionBearingBottom.png" : "../photos/pinionBearingBottom.png"}
            alt="Pinion-Bearing-Bottom-diagram"
          />
        </div>

        <label id="pinion-housing-notes">Notes:</label>
        <div className="pinion-housing-flex">
          <textarea
            name="PinionBearingHousingNote"
            rows="10"
            cols="150"
            onChange={this.props.handleChange}
            readOnly = {this.props.isService === true ? false : true}
          />
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

export default PinionBearingHousing;