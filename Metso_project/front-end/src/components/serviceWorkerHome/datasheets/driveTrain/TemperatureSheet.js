import React, { PureComponent } from "react";
import {
  secondtableHead,
  secondtableHeadDouble,
  firstTData,
  firstTableHead,
  tempSheetInputsSingle,
  tempSheetInputsDouble,
  secondTableHeadNote
} from "../../constants/componentsConstants"; //,firstTableHead ,secondData
import "../../../../css/TempreratureSheetStyle.css";
import HighlightedRow from "../../helpers/HighlightedRow";
import TableHeadClass from "../../helpers/TableHeadClass";

/**
 * Class that handles both the single and double helix table,
 * The background image is switched depending on the helix type. 
 */
class TemperatureSheet extends PureComponent {
  render = () => {
    const t_head_second = ((this.props.helix_type === "single")
      ? (secondtableHead)
      : (secondtableHeadDouble)
    ).map(x => {
      return <TableHeadClass key={x} headName={x} />;
    });

    const t_data_first = firstTData.map((x, key) => {
      return <FirstTableData key={key} content={x} />;
    });

    const singleHelixImage = (this.props.isService === true) ? './photos/tmpReadingImg.png'  : '../photos/tmpReadingImg.png';
    const doubleHelixImage = (this.props.isService === true) ? './photos/tmpReadingImgDouble.png'  : '../photos/tmpReadingImgDouble.png';

    // const logoLocation = (this.props.isService === true) ? metso_logo  : `.${metso_logo}`;
    const left_drive = (this.props.helix_type === 'single') ? this.props.jobs1.left_drive : this.props.jobs1Double.left_drive;
    const drive_pinion = (this.props.helix_type === 'single') ? this.props.jobs1.drive_pinion : this.props.jobs1Double.drive_pinion;
    const right_drive = (this.props.helix_type === 'single') ? this.props.jobs1.right_drive : this.props.jobs1Double.right_drive;

    return (
      <div className="container tempSheetClass">
        <form className="equipment-image-block">
          <img
            className="equipment-image"
            style={{ height: "350px", width: "75%" }}
            src={
              this.props.helix_type === "single"
                ? singleHelixImage
                : doubleHelixImage
            }
            alt="tempsheet-diagram"
          />
          {/* map this */}
          <div className="temperature-selects-block">
            <select
              className={
                left_drive !== "Select"
                  ? "non_selected_temp"
                  : "selected_temp"
              }
              id="leftSelection"
              name="left_drive"
              value={(this.props.helix_type === "single"
              ? this.props.jobs1.left_drive
              : this.props.jobs1Double.left_drive
            )}
              disabled = {(this.props.isService === true) ? false : true}
              onChange={this.props.handleChange}
            >
              {left_drive === "Select" && (
                <option defaultValue="selected" value="selectLeft">
                  {" "}
                  Select &#9660;{" "}
                </option>
              )}
              <option value="non-drive-side">Non Drive Side</option>
              <option value="drive-side">Drive Side</option>
            </select>

            <select
              className={
                drive_pinion !== "Select"
                  ? "non_selected_temp"
                  : "selected_temp"
              }
              id="middleSelection"
              name="drive_pinion"
              value={(this.props.helix_type === "single"
              ? this.props.jobs1.drive_pinion
              : this.props.jobs1Double.drive_pinion
            )}
              disabled = {(this.props.isService === true) ? false : true}
              onChange={this.props.handleChange}
            >
              {drive_pinion === "Select" && (
                <option defaultValue="selected" value="selectMiddle">
                  Select &#9660;{" "}
                </option>
              )}
              <option value="downdrivePinion">Downdrive Pinion</option>
              <option value="updrivePinion">Updrive Pinion</option>
            </select>

            <select
              className={
                right_drive !== "Select"
                  ? "non_selected_temp"
                  : "selected_temp"
              }
              id="rightSelection"
              name="right_drive"
              value= {(this.props.helix_type === "single"
              ? this.props.jobs1.right_drive
              : this.props.jobs1Double.right_drive
            )}
              disabled = {(this.props.isService === true) ? false : true}
              onChange={this.props.handleChange}
            >
              {right_drive === "Select" && (
                <option defaultValue="selected" value="selectRight">
                  {" "}
                  Select &#9660;{" "}
                </option>
              )}
              <option value="non-drive-side">Non Drive Side</option>
              <option value="drive-side">Drive Side</option>
            </select>
          </div>
        </form>

        <div className="temperature-table-instruction-flex">
          <table className="temperature-table" id="tg-left" align="right">
            <HighlightedRow highlightedContent={firstTableHead} colSpan={"28"}/>
            <tbody className="tg-tbody">{t_data_first}</tbody>
          </table>
        </div>

        <div className="temperature-table-input-flex">
          <table className="TempTable">
            <HighlightedRow highlightedContent={secondTableHeadNote} colSpan={"28"} />
            <tbody>
              <tr>{t_head_second}</tr>
              {(this.props.helix_type === "single"
                ? this.props.jobs1.temperature_readings
                : this.props.jobs1Double.temperature_readings
              ).map((x, key1) => (
                <tr key={key1}>
                  {(this.props.helix_type === "single"
                    ? tempSheetInputsSingle
                    : tempSheetInputsDouble
                  ).map((temp_data, key) => (
                    <td key={key} className={temp_data.class_name}>
                      {temp_data["name"].toLowerCase().includes("delta") === false &&
                        temp_data["name"].includes("Notes") === false &&(
                          <input
                            name={`${temp_data["name"]}-${key1}`}
                            type={temp_data.type}
                            defaultValue={x[temp_data['name']]}
                            onChange={this.props.handleChange}
                            readOnly = {(this.props.isService === true) ? false : true}
                          /> 
                        )}

                      {temp_data.name.toLowerCase().includes("delta") && x[temp_data.name]}
                      {temp_data.name === "Notes" && (
                        <textarea
                          rows="5"
                          cols="40"
                          defaultValue={x[temp_data["name"]]}
                          name={`${temp_data.name}-${key1}`}
                          onChange={this.props.handleChange}
                          readOnly = {(this.props.isService === true) ? false : true}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {this.props.isService === true && 
        <div className="button-flex ">
          <button className="btn btn-success center" type="submit"  onClick={this.props.handleSubmit}> Submit Report</button> 
          <button
            className="btn btn-primary"
            type="submit"
            value="Add rows"
            onClick={this.props.handleAddRow}
            style = {{marginLeft: '15px'}}
          >
            Add Row
          </button>
        </div>
        }
      </div>
    );
  };
};

/**
 * Class that shows the rows of each object in the temperature readings array
 */
class FirstTableData extends PureComponent {
  render() {
    return (
      <tr>
        <td className="tg-lqy6">{this.props.content}</td>
      </tr>
    );
  }
}

export default TemperatureSheet;