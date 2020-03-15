import React, { PureComponent } from "react";
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import AdditionalReportForm from "./helpers/AdditionalReportForm";
import { visit_reason_constants , work_performed_constants , recommendation_constants } from "./constants/formConstants";
import "../../css/AdditionalFormStyle.css";

/**
 * Job Updates is for updating the form fields. It uses a helper class "AdditionalReportForm",
 * This class updates the Work Performed, Visit Reason, and Recommendation.
 * The reason for this is to reduce code since they all do similar things.
 */
class JobUpdates extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.determineConstant = this.determineConstant.bind(this);
    this.value_onChange = this.value_onChange.bind(this);
  }

  /**
   * Fetch the report data, if newly created other fields are empty strings
   */
  componentDidMount = async () => {
    const {dispatch} = this.props.action_props;
    const {fetchReportByReportID} = this.props.action_props.report_action;   
    await dispatch(fetchReportByReportID(this.props.report_id)); // sets the field already
  };

  /**
   * @param {Event} event 
   * Create new object and set the fields state in the redux store by calling a setter action.
   */
  value_onChange = (event) => {
    const {dispatch} = this.props.action_props;
    const {setFields} = this.props.action_props.report_action;  
    const {name, value} = event.target;
    const fields = {
              report_id: this.props.report_id,
              equipment_serial_number: this.props.equipment_serial_number,
              ...this.props.fields,
              [name]: value
            };
    dispatch(setFields(fields));  
};

/**
 * Set the new Field
 */
  handleUpdate = async () => {
    const {dispatch} = this.props.action_props;
    const {updateReport} = this.props.action_props.report_action;   
    dispatch(updateReport(this.props.fields));
    alert(`${this.determineConstant().inputLabel} Updated!`);
  };

  //return the appropriate constant object.
  determineConstant = () => {
      const jobConstants = {
        'visit_reason_modal': visit_reason_constants,
        'work_performed_modal': work_performed_constants,
        'recommendation_modal': recommendation_constants
      }; 
      return jobConstants[this.props.type];
  };

  handleSubmit = event => {
    this.handleUpdate();
    event.preventDefault();
  };

  render() {
    const constant = this.determineConstant();

    const form =  <AdditionalReportForm
          inputLabel={constant.inputLabel}
          inputType={constant.inputType}
          inputName={constant.inputName}
          inputPlaceholder={constant.inputPlaceholder}
          onChangeFunc={this.value_onChange}
          errorMessage={constant.errorMessage}
        />
     
    const valueToReturn =  {
        'visit_reason_modal': <AdditionalReportForm inputLabel= "Reason for Visit:" value= {this.props.fields.visit_reason} action_props = {this.props.action_props}/>,
        'work_performed_modal':<AdditionalReportForm  inputLabel= "Work Performed:" value= {this.props.fields.work_performed} action_props = {this.props.action_props}/>,
        'recommendation_modal': <AdditionalReportForm  inputLabel= "Recommendation:" value= {this.props.fields.recommendation} action_props = {this.props.action_props}/>
    }; 

    return (
        <div className="entire-form">
          <div className="job-update-row" id="job-update-row">
            <div className="col-lg-8">
              {this.props.isService === true &&
              <form className="job-update-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  {form}
                  <input
                    id="jobUpdateSubmit"
                    className="btn btn-success"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
              }
               {this.props.isService === false &&
              <div className = "additionalForm" >
                <div className="form-group">
                  <div> {valueToReturn[this.props.type]} </div>
                </div>
                </div>
              }
            </div>
          </div>
        </div>
     
    );
  }
}

/**
 * Map Redux state as props
 * @param {Object} state 
 */
const mapStateToProps = state => {
  console.log("job_updates states are: ", state);
  
   const {equipment_clientReducer, globalReducer, reportReducer } = state
    
   return {
    isService: globalReducer.isServiceWorker,
    equipment_clientReducer,
    equipment_serial_number: equipment_clientReducer.equipment_serial_number,
    report_id : reportReducer.report_id,
    fields: reportReducer.fields 
    };
  };
 
export default withRouter(connect(mapStateToProps)(JobUpdates)); 