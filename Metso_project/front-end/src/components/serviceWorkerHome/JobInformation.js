import React, {PureComponent } from "react";
import { Radio } from "antd";
import { reportConstants , reportIDMax } from "./constants/formConstants";
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';

import "../../css/JobInfoFormStyle.css";

/**
 * Create new job,
 * Generate a random ID and check if id exists from the get lists of report id's
 */
class JobInformation extends PureComponent {
  constructor(props) {
    super(props);
    //equipment serial passed in as a prop
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasError = this.hasError.bind(this);
    this.form_validated = this.form_validated.bind(this);
    this.generateRandomID = this.generateRandomID.bind(this);
    this.verifyGeneratedID = this.verifyGeneratedID.bind(this);
  }

  /**
   * Set a random id as the report id 
   */
  componentDidMount = async () => {
    const {dispatch} = this.props.action_props;
    const {setReportID} = this.props.action_props.report_action;
    await dispatch(setReportID(this.generateRandomID()))
  };

  /**
   * reportIDMax set as 1000 in formConstants
   */
  generateRandomID = () => Math.floor(Math.random() * Math.floor(reportIDMax));
    
  /**
   * Not sure about this. If exist it doesnt create. (tested with 1, 0 existed so it wont create if its the same. )
   * Must right test cases!
   */ 
  verifyGeneratedID = async () => {
    const {dispatch} = this.props.action_props;
    const {setReportID} = this.props.action_props.report_action;
   
    console.log('props":', this.props)
    if(this.props.report_list.includes(this.props.report_id) === true){
      await dispatch(setReportID(this.generateRandomID()))
      this.verifyGeneratedID(); 
    }else{
      await dispatch(setReportID(this.props.report_id))
    } 
    };

  /**
   * Set the form input fields, and set the contact info type, if email or phone.
   * create a new Json Object called fields_holder and set the fields., reset the fields with the new object.
   */
  onChange = event => {
    const {dispatch} = this.props.action_props;
    const {setContactType,setFields} = this.props.action_props.report_action;
    if (event.selected_value) {
      dispatch(setContactType(event.selected_value));
    }

    if (!event.selected_value){
    const fields_holder =   { 
      ...this.props.fields,
      ...event,
      report_id: this.props.report_id,
      equipment_serial_number: this.props.equipment_serial_number,
      introduction:this.props.reportReducer.introduction,
      visit_reason: this.props.reportReducer.visit_reason,
      work_performed: this.props.reportReducer.work_performed,
      recommendation: this.props.reportReducer.recommendation,
      report_status:this.props.reportReducer.report_status
    };
      dispatch(setFields(fields_holder));
    }
  };

  /**
   * @param {string} input_field - the name of the input field
   * Regex Validation for the inputs:
   * integer fields cannot be 0 or less, and must be an an. (job number ,work order number, project number)
   * email and phone regex
   * date cannot toda'y date
   */
  hasError = input_field => {
    const special_char_regex = RegExp(/^[_A-z]*((-|\s)*[_A-z])*$/);
    const emailRegex = RegExp(/[\w'+-]+(\.[\w'+-]+)*@\w+([-.]\w+)*\.\w{2,24}/);
    const phoneRegex = RegExp(
      /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s']?[0-9]{4}$/
    );
    let today = new Date();
    let inputed_date = new Date(this.props.fields.date);

    switch (input_field) {
      case "job_number":
        if (this.props.fields.job_number !== undefined) {
          if (
            this.props.fields.job_number < 1 ||
            this.props.fields.job_number.length < 1
          ) {
            return true;
          }
          return false;
        }
        break;
      case "work_order_number":
        if (this.props.fields.work_order_number !== undefined) {
          if (
            this.props.fields.work_order_number < 1 ||
            this.props.fields.work_order_number.length < 1
          ) {
            return true;
          }
          return false;
        }
        break;
      case "project_number":
        if (this.props.fields.project_number !== undefined) {
          if (this.props.fields.project_number < 1) {
            return true;
          }
          return false;
        }
        break;
      case "representative_name":
        if (this.props.fields.representative_name !== undefined) {
          if (!special_char_regex.test(this.props.fields.representative_name)) {
            return true;
          }
          return false;
        }
        break;
      case "contact_info":
        if (this.props.fields.contact_info !== undefined) {
          if (
            this.props.contact_type === "Email" &&
            !emailRegex.test(this.props.fields.contact_info)
          ) {
            return true;
          }
          if (
            this.props.contact_type === "Phone" &&
            !phoneRegex.test(this.props.fields.contact_info)
          ) {
            return true;
          }

          return false;
        }
        break;
      case "date":
        if (this.props.fields.date !== undefined) {
          if (inputed_date > today) {
            return true;
          }
          return false;
        }
        break;

      default:
        return false;
    }
  };

  /**
   * All regex condition satisfied
   */
  form_validated = () => {
    let error_array = reportConstants.map(x => {
      return this.hasError(x.inputName);
    });
    if (process.env.NODE_ENV.trim() !== 'production') {
      console.log(error_array); // has error
    }
   
    let isValidated = error_array.every(element => {
      return element === false;
    });
    return isValidated;
  };

  /**
   * Create report function
   */
  handleCreate = async () => {
    const {dispatch} = this.props.action_props;
    const {createReport} = this.props.action_props.report_action;
    if (process.env.NODE_ENV.trim() !== 'production') { //no console log in production mode
      console.log("Form Validated attempting to submit the form.");
    }
    await dispatch(createReport(this.props.fields));
    alert(`Job Created!`);
  };

  //call the function asynchronously.
  handleSubmit = async event => {
    if (this.form_validated() === true) await this.handleCreate();
    else alert("Form not Validated");

    event.preventDefault();
  };

  render = () => {
    const formInputs = reportConstants.map(x => {
      return (
        <div key={x.inputLabel}>
          <FormInput
            inputLabel={x.inputLabel}
            inputType={x.inputType}
            inputName={x.inputName}
            inputPlaceholder={x.inputPlaceholder}
            inputRef={x.inputPlaceholder}
            onChange={fields => this.onChange(fields)}
            hasError={this.hasError(x.inputName)} //set to a function this.hasError(x.inputName) promise
            errorMessage={x.errorMessage}
          />
        </div>
      );
    });

    const clientInfo = reportConstants.map(x => {
      return (
        <div key={x.inputName}>
          <ClientJobInfo
            inputLabel={x.inputLabel}
            value={this.props.fields[x.inputName]}
          />
        </div>
      );
    });

    return (
      <div className="entire-form">
        <div className="form-header">Job Information</div>

      <div className="row">
        <div className="col-lg-12">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="job-form-group">
            <div className="container-fluid">
              {this.props.isService === true && (
                <div>
                  {formInputs}
                  <div className="col-sm-12 text-center">
                    <input
                      className="btn btn-success"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </div>
              )}
              {this.props.isService === false && (
                <div className="job-form-group">
                  <div className="container-fluid">{clientInfo}</div>
                </div>
              )}
            </div>
          </div>
        </form>
        </div>
        </div>
      </div>
    );
  };
}

/**
 * The container box of each input
 */
class ClientJobInfo extends PureComponent {
  render() {
    return (
      <div className="field">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <label>{this.props.inputLabel}</label>
            </div>
            <div className="card-body">
              <div className="row" />
              <h4>{this.props.value}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

/**
 * Every input in create job form,
 * Note here selected value is not in redux since only in create job is where user decides/ provides an email or phone number (their preference)
 */
class FormInput extends PureComponent {
  change = event => {
    event.preventDefault();

    this.props.onChange({ [event.target.name]: event.target.value });

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  state = {
    selected_value: "Email"
  };

  /**
   * Change the selected contact type.
   */
  onChangeRadio = event => {
    this.props.onChange({ selected_value: event.target.value });
    this.setState({
      selected_value: event.target.value
    });
  };

  render = () => {
    if (this.props.inputLabel === "Contact Info Email or Phone")
      return (
        <div className="field">
          <label>{this.props.inputLabel}</label>
          <Radio.Group
            onChange={this.onChangeRadio}
            value={this.state.selected_value}
            size="small"
          >
            <Radio value={"Email"}> <FaEnvelope style = {this.state.selected_value === "Email" && {color: '#00ff00 '}} /></Radio>
            <Radio value={"Phone"}><FaPhone style = {this.state.selected_value === "Phone" && {color: '#00ff00 '}}/></Radio>
            
          </Radio.Group>

          <input
            type={this.props.inputType}
            name={this.props.inputName}
            placeholder={
              this.state.selected_value === "Email"
                ? `example@example.com`
                : `(111)-111-1111`
            }
            onChange={event => this.change(event)}
            contact_type={this.state.selected_value}
          />
          {this.props.hasError && (
            <span className="errorMessage">
              {" "}
              {this.state.selected_value === "Email"
                ? this.props.errorMessage
                : "Invalid Phone Format"}
            </span>
          )}
        </div>
      );

    if (this.props.inputLabel !== "Contact Info Email or Phone")
      return (
        <div className="field">
          <label>{this.props.inputLabel}</label>
          <input
            className="job-info-form-input"
            type={this.props.inputType}
            name={this.props.inputName}
            placeholder={this.props.inputPlaceholder}
            onChange={event => this.change(event)}
          />
          {this.props.hasError && (
            <span className="errorMessage"> {this.props.errorMessage}</span>
          )}
        </div>
      );
  };
}

/**
 * 
 * @param {Object} state - Set the redux state as props for the component.
 */
const mapStateToProps = state => {
  if (process.env.NODE_ENV.trim() !== 'production') { //no console log in production mode
    console.log("job info states are: ", state);
  }
  
  const {equipment_clientReducer, globalReducer, reportReducer } = state
    
   return {
    reportReducer,
    equipment_clientReducer,
    isService : globalReducer.isServiceWorker,
    equipment_serial_number: equipment_clientReducer.equipment_serial_number,
    report_id: reportReducer.report_id ,
    fields:  reportReducer.fields,
    contact_type: reportReducer.contact_type
    };
  };
 

export default withRouter(connect(mapStateToProps)(JobInformation)); 