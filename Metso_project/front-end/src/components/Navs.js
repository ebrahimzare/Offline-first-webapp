import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {buttonOptions} from "./serviceWorkerHome/constants/serviceWorkerConstant";

import JobUpdates from "./serviceWorkerHome/JobUpdates";
import AddToReport from "./serviceWorkerHome/AddToReport";

import Modal from "react-responsive-modal";

/**
 * The navigation buttons on the report page, 
 * - Mill Condition
 * - Introduction (Photo File Upload)
 * - Visit Reason 
 * - Work Performed
 * - Recommendation
 */
class Navs extends PureComponent {
  state = {
    visitReasonModalOpen: false,
    workPerfomedModalOpen: false,
    recommendationModalOpen: false,
    addToReportModalOpen: false
  };

  /**
   * Open Modal Functions: set the open state as true.
   */
  openAddToReportModal = () =>  this.setState({ addToReportModalOpen: true });
  openVisitReasonModal = () => this.setState({ visitReasonModalOpen: true });
  openWorkPerfomedModal = () => this.setState({ workPerfomedModalOpen: true });
  openRecommendationModal = () => this.setState({ recommendationModalOpen: true });
   
  /**
   * Close Modal Functions: set the open state as true.
   */
  closeAddToReportModal = () => this.setState({ addToReportModalOpen: false });
  closeVisitReasonModal = () => this.setState({ visitReasonModalOpen: false });
  closeWorkPerformedModal = () => this.setState({ workPerfomedModalOpen: false });
  closeRecommendationModal = () => this.setState({ recommendationModalOpen: false });
  
  /**
   * Calling the specific set open or close modal function based on the modal button name.
   * @param {string} modalType - The type of modal coming from button's name  
   * @param {number} index - Index of open or close, open = 0 , close = 1 
   */
  openAndcloseModal = (modalType,index) => {
    const open_close_ModalFunctionToReturn = {
                "add_to_report_modal" : [this.openAddToReportModal,this.closeAddToReportModal],
                "visit_reason_modal" : [this.openVisitReasonModal,this.closeVisitReasonModal],
                "work_performed_modal" : [this.openWorkPerfomedModal,this.closeWorkPerformedModal],
                "recommendation_modal" : [this.openRecommendationModal,this.closeRecommendationModal]
       };
    return open_close_ModalFunctionToReturn[modalType][index];
  };

  render() {
    const {
      addToReportModalOpen,
      visitReasonModalOpen,
      workPerfomedModalOpen,
      recommendationModalOpen
    } = this.state;

        /**
        * Mapping the constant buttonOptions {array} coming from the constants file serviceWorkerConstant located in the constants folder. 
        * buttonOptions is simply an array that contains the key information of the buttons (name ,type and if its a link the path to redirect to)
        */

    let buttons = buttonOptions.map((x, key) => {
        /**
        * If the button type is a link redirect to a new route
        */
      return x.type === "link" ? (
        <Link
        key={key}
        to={{
          pathname: x.redirectTo,
          component: x.component,
          action_props: this.props.action_props
        }}
      > 
     <IndividualButtons key={key} button_name={x.name} isService = {this.props.isService} />
      </Link>
       
      ) : (
        /**
        * Else if the button type is a modal-type open the modal
        */
        <div key={key} onClick={this.openAndcloseModal(x.type,0)}>
          <IndividualButtons key={key} button_name={x.name} isService = {this.props.isService} />
        </div>
      );
    });

     /**
      * @param {string} modalType - The name of the modal
      * Return the current state of the modal status, if open is true or falsy.
      */
    let modalBool = (modalType) => {
      switch (modalType) {
        case "visit_reason_modal": 
          return visitReasonModalOpen;
        case "work_performed_modal":
          return workPerfomedModalOpen;
        case "recommendation_modal":
          return recommendationModalOpen;  
        default: 
        return false;
      }
    };
    /**
      * Splitting buttonOptions Reasoning: 
      * Reason for visit, work performed and recommendation share the same component because they have the same functionality. 
      * Altough the Introduction in add to report is also very similar, it differs because we have upload a photo. 
      * This is why it is split into seperate components. 
      * 
      * Optional task for future: combine intro (AddToReport) into JobUpdates component. 
      * 
      */

    let form_modals = buttonOptions.slice(buttonOptions.length - 3).map((x) => {
      return (
      <div key={x.type}>
       <Modal
      open={modalBool(x.type)} 
      onClose={this.openAndcloseModal(x.type,1)}  
      center={true}
      style={{ overlay: { background: "rgba(0, 0, 0, 0.75)" }}}    
       >
      <JobUpdates type= {x.type} action_props={this.props.action_props}/>
      </Modal>
      </div>
      );
    } );

    return (
      <div className="buttons-section">
        {buttons}

        <Modal
          open={addToReportModalOpen}
          onClose={this.openAndcloseModal('add_to_report_modal',1)}
          center={true}
        >
          <AddToReport action_props={this.props.action_props}  />
        </Modal>
       {form_modals}
      </div>
    );
  };
};

export default Navs;

/**
 * representing a single button that is mapped by nav.
 * If is client add to report -> view report. (should have a name change)
 */
class IndividualButtons extends PureComponent {
  render() {
    return (
      <div>
        <button className="medium ui green button" id="createBtn">
          {(this.props.button_name === "Add To Report" && this.props.isService === false) ? "View Report" : this.props.button_name   }
        </button>
      </div>
    );
  };
};