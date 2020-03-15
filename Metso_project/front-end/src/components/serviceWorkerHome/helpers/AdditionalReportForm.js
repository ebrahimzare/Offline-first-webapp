import React, { PureComponent } from "react";
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';

/**
 * A helper class that helps the job updates.
 * Since work performed, visit reason and recommendation have similar look, I made them all render this component with different props.
 */
class AdditionalReportForm extends PureComponent {
  render() {
    return (
      <div className="additional-form-inputs">
        <label>
          <h3>
            {this.props.inputLabel} {":"}
          </h3>
        </label>

        {this.props.isService === true && (
          <textarea
            className="form-control"
            id="text-field"
            name={this.props.inputName}
            placeholder={this.props.inputPlaceholder}
            onChange={this.props.onChangeFunc}
          />
        )}

        {this.props.isService === false && (
          <div>
            <textarea className="form-control" readOnly="readOnly"  id="text-field-client" value={this.props.value} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  
   const {globalReducer } = state
    
   return {
    isService: globalReducer.isServiceWorker,
    };
  };
 
export default withRouter(connect(mapStateToProps)(AdditionalReportForm)); 