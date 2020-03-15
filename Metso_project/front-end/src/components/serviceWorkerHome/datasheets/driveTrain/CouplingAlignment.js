import React, { PureComponent } from "react";
import { Card, CardTitle } from "reactstrap";
import { connect } from 'react-redux';
import {withRouter } from "react-router-dom";
import {
  couplingReducerToPinionPhotos,
  couplingMotorToReducerPhotos,
  couplingInputsLeftCol,
  couplingInputsRightCol
} from "../../constants/componentsConstants";
import "../../../../css/CouplingAlignmentStyle.css";

/**
 * This class contains the logic of the coupling alignment datasheets. 
 * Motor to reducer and Reducer to pinion.
 * 
 * If data for the sheets exists, default value if shown else it will be default 
 * 0.000 for offset and 0.0000 for angular
 */
class CouplingAlignment extends PureComponent {

  render = () => {
   
    const images =
      this.props.coupling_alignment.select_Coupling === "rtp"
        ? couplingReducerToPinionPhotos:couplingMotorToReducerPhotos
    const coupling_alignment_data = [
      { card_title: "Off Set", image: images[0], input: couplingInputsLeftCol },
      { card_title: "Angular", image: images[1], input: couplingInputsRightCol }
    ];

    return (
      <div className="container coupling"> 
        <div className="row">
          {coupling_alignment_data.map((x, key) => (
            <div className="col-sm-6" key={key}>
              <Card body>
                <div className="coupling-alignment-content-flex">
                  <CardTitle> {x.card_title} </CardTitle>
                  <div className="img-responsive-container">
                    {x.image.map(image => (
                      <img
                        key={image}
                        src={this.props.isService === true ? `./photos/${image}.png` : `../photos/${image}.png`}
                        alt="off set coupling"
                        className={
                          image.includes("Up")
                            ? "img-responsive-coupling-top"
                            : "img-responsive-coupling-bottom"
                        }
                      />
                    ))}
                    <div className="coupling-inputs">
                      {x.input.map((x, key) => (
                        <div key={key} className={x.global_class_name}>
                          {" "}
                          <input
                            className={x.class_name}
                            name={`${this.props.coupling_alignment.select_Coupling}_${x.name}`} //each input has own name, different for mtr and rtp 
                            type="number"
                            onChange={this.props.handleChange}
                            defaultValue={this.props.coupling_alignment.coupling_alignment_inputs[`${this.props.coupling_alignment.select_Coupling}_${x.name}`]}
                            readOnly = {this.props.isService === true ? false : true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
           {this.props.isService === true &&
             <div className="button-flex" id="coupling_submit">
             <button className="btn btn-success center" type="submit"  onClick={this.props.handleSubmit}> Submit Report</button> 
             </div>
            }
        </div>
        <div className="row ">
          <div className="col-sm-12 ">
            <div className="couplingFooter-flex">
              <p>Notes:</p>
              <p>
                <strong>Allowable Tolerance: </strong>
              </p>
              <div className="metso-logo-image-flex">
              <ul>
                <li>-Off set: .000" Total</li>
                <li>-Angular: .0000"/ inch coupling dia.</li>
              </ul>  
        </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Map the redux states to props.
 * @param {Object} state 
 */
const mapStateToProps = state => {
  
  const {globalReducer,dataSheetReducer} = state
    
  return {
    dataSheetReducer,
    isService : globalReducer.isServiceWorker,
    coupling_alignment: dataSheetReducer.coupling_alignment,
    };
  };
 
export default withRouter(connect(mapStateToProps)(CouplingAlignment)); 
