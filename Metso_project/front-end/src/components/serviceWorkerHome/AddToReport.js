import React, { PureComponent } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/AddToReportStyle.css";

/**
 * Add to reports (consider a name change) is for introduction update, upload image and upload files.
 * For the client, they will see the introduction of the report and the uploaded images
 */
class AddToReport extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  /**
   * calls the action "fetchReportByReportID" to get the report by id, then if create/update, overwrite the previus report object with a new one.
   * else if user is a client, the fetchReport will get the report to display the introduction and photos if exists.  
   */
  componentDidMount = async () => {
    const {dispatch} = this.props.action_props;
    const {fetchReportByReportID} = this.props.action_props.report_action;  
    await dispatch(fetchReportByReportID(this.props.report_id)); // sets the field already 
  };

  /**
   * Sets the option selected. introduction: it will be a text area input,
   * upload a photo: a file upload form (for now only accepts images), client (fetch the images)
   * upload files: not yet implemented but should be same as above, (worked adding file to upload photo)
   * add filter for photo and file.
   */
  SelectHandler = async () => {
    const {dispatch} = this.props.action_props;
    const {setSelectValue} = this.props.action_props.report_action;   
    const {fetchPhotosATRByReport} = this.props.action_props.photos_action; 

    await dispatch(setSelectValue(this.select.value));

    if (this.props.isService === false && this.select.value === "View Uploaded Image" ) {
      await dispatch(fetchPhotosATRByReport(this.props.report_id));
      }
  };

  /**
   * @param {Event} event - event handler
   * This function handles the change events of both forms. 
   * If Intro, sets the reports fields, 
   * upload file folder form data, in backend.  
   */
  changeHandler = (event) => {
    const {dispatch} = this.props.action_props;
    const {setFields} = this.props.action_props.report_action; 
    const {setImageFields} = this.props.action_props.photos_action;    
    const {name, value , files} = event.target;
    if (this.props.select_value === "Introduction") {
    const fields =  {
        report_id: this.props.report_id,
        equipment_serial_number: this.props.equipment_serial_number,
        ...this.props.fields,
        [name]: value,
      }
     dispatch(setFields(fields));      
    }

    else if (this.props.select_value === "Upload an Image" || this.props.select_value === "Upload File") { 
      if (name === "name") {
        dispatch(setImageFields(this.props.report_id, value , this.props.image_fields.image));
      }

      if (name === "image") {
        dispatch(setImageFields(this.props.report_id, this.props.image_fields.name , files[0]));
      }
     }
  }

  /**
   * Update the file asynchronously, dispatch the upload actions for both.
   * all files and photos are handled in photos reducer,
   * while the into is handled in reports reducer. 
   */
  handleUpdate = async () => {
    const {dispatch} = this.props.action_props;
    const {updateReport} = this.props.action_props.report_action;  
    const {uploadPhoto} = this.props.action_props.photos_action;  
    
    if (this.props.select_value === "Upload an Image" || this.props.select_value === "Upload File") {
      //must check the type of file. application or image in backend
      dispatch(uploadPhoto(this.props.image_fields)); 
      alert((this.props.select_value === "Upload an Image") ? "Photo created!" : "File uploaded!"); 
     }

    if (this.props.select_value === "Introduction") {
       
      dispatch(updateReport(this.props.fields));
      alert(`Introduction Updated!`);
    }
  };

  /**
   * Call the update function
   */
  handleSave = event => {
    this.handleUpdate();
    event.preventDefault();
  };

  render() {
    return (
     
        <div className="entire-form">
          <div className="row">
            <div className="col-lg-12">
              <div className="add-to-report-block">
                <div className= "select-type-add-to-report">
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select a part of the report</Form.Label>
                    <Form.Control
                      as="select"
                      ref={select => (this.select = select)}
                      componentclass="select"
                      defaultValue={this.props.select_value}
                      onChange={this.SelectHandler}
                    >
                      <option>Introduction</option>
                      <option>{this.props.isService === true ? "Upload an Image" : "View Uploaded Image"}</option>
                      <option>{this.props.isService === true ? "Upload a File" : "View Uploaded Files"}</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className={(this.props.select_value === "Upload an Image" || this.props.select_value === "View Uploaded Image" ) ? "addToReport-body images" : "addToReport-body intro"}>
                  <div className="add-to-report-inputs">
                    {this.props.select_value === "Introduction" && (
                      <div className="intro-input">
                        {this.props.isService === true && (
                          <Form.Control
                            as="textarea"
                            name="introduction"
                            rows="5"
                            onChange={this.changeHandler}
                          />
                        )}
                        {this.props.isService === false && (
                          <Form.Control
                            as="textarea"
                            name="introduction"
                            rows="5"
                            readOnly="readOnly"
                            value={this.props.fields.introduction}
                          />
                        )}
                      </div>
                    )}
                    {(this.props.select_value === "Upload an Image" || this.props.select_value === "View Uploaded Image" || this.props.select_value === "Upload File") && (
                      <div className={this.props.isService === true ? "image-input-addToReport-service" : "image-input-addToReport-client" }>
                        {this.props.isService === true && (
                          <Form.Group controlId="exampleForm.ImageUpload">
                            <Form.Label>{(this.props.select_value === "Upload File") ? "File Title" :"Image Title:" }</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              onChange={this.changeHandler}
                            />
                            <div className="file-upload-addToReport">
                              <Form.Control
                                type="file"
                                name="image"
                                onChange={this.changeHandler}
                              />
                            </div>
                          </Form.Group>
                        )}

                        {this.props.isService === false &&
                          this.props.photos_list.length > 0 && (
                            <div className="row image-contents">
                              
                              {this.props.photos_list.map((x, key) => (
                                <div
                                  className="col-sm individual-uploaded-image"
                                  key={key}
                                >
                                  <img
                                    className="uploadImage"
                                    src={x.image} 
                                    alt={x.name}
                                    width="350px"
                                    height="350px"
                                  />
                                  <h4> {x.name}</h4>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                  <div className="add-to-report-button-position">
                  {this.props.isService === true && (
                    <Button
                      className={
                        this.props.select_value === "Introduction"
                          ? "addToReportButtonIntro"
                          : "addToReportButtonImage"
                      }
                      variant="success"
                      onClick={this.handleSave}
                    >
                      {this.props.select_value === "Introduction"
                        ? "Submit"
                        : (this.props.select_value === "Upload File") ? "Upload File" : "Upload Image" }
                    </Button>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    );
  };
};

const mapStateToProps = state => {
  console.log("add to report states are: ", state);
  
  const {equipment_clientReducer, globalReducer, reportReducer, photosReducer } = state
    
   return {
    photos_list: photosReducer.photos_list,
    image_fields: photosReducer.image_fields,
    isService: globalReducer.isServiceWorker,
    equipment_clientReducer,
    equipment_serial_number: equipment_clientReducer.equipment_serial_number,
    report_id : reportReducer.report_id,
    fields: reportReducer.fields,
    select_value:  reportReducer.select_value
    };
  };
 

export default withRouter(connect(mapStateToProps)(AddToReport)); 