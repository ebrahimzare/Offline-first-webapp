import React, { PureComponent } from "react";
import Navs from "./Navs";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import ImageComponent from "./serviceWorkerHome/ImageComponent";
import NotFound from "./serviceWorkerHome/NotFound";
import "../css/millImage.css";

/**
 * This class is the main report page, when the service worker and service manager will fill in the data.
 * Clients is view only.
 * The image component and the form buttons are here.  
 */
class EquipmentReport extends PureComponent {
  
/**
 * componentDidMount is executed after the render function. Mounting is when the component is outputted on the user Interface, Doman Object Model. 
 */  
  componentDidMount = async () => {
    const {dispatch} = this.props.action_props;
    const {setReportID,setReportDate} = this.props.action_props.report_action;
    const {changeHeaderTitle,addToVisitedPage} = this.props.action_props.global_action;
    const {setCurrentEquipment} = this.props.action_props.equipment_client_action; 
    const {get_and_set_drivetrain} = this.props.action_props.datasheet_action;

    if(this.props.current_equipment){
     await dispatch(changeHeaderTitle(`${this.props.current_equipment.equip_type} ${this.props.current_equipment.equipment_serial_number} Report`)); 
 
     if(this.props.location.report_id){
      await dispatch(setReportID(this.props.location.report_id));
      await dispatch(setReportDate(this.props.location.date))
     }
      await dispatch(setCurrentEquipment(this.props.current_equipment));

     const page_nav_content = {path_number:3 ,page_path: '/JobReport', page_name: `Date: ${this.props.date} ➪ Report: ${this.props.report_id} `}; //if active set active  
     await dispatch(addToVisitedPage(this.props.visited_page , page_nav_content , page_nav_content.path_number ));      
     await dispatch(get_and_set_drivetrain(this.props.report_id)); 
     
    };
  };

  render = () => {
    return (
      <div id="featured">
      {this.props.current_equipment && (
      <main className="Site-content">
       
        <section>
          <div className="row">
            <div className="column left">
              <Navs action_props={this.props.action_props} isService = {this.props.isService}/>
            </div>
            <div className="column right">
              <div className="mill-image">
                <ImageComponent action_props={this.props.action_props}/>
              </div>
            </div>
          </div>
        </section>
      </main>
      )}

{!this.props.current_equipment && 
<div>
<NotFound /> 
<h2> Must access through reports</h2>
</div>
}
      </div>
    );
  }
}

 /**
 * @param {Object} state
 * passing the redux state as props for the specified component
 * 
 */  
const mapStateToProps = state => {
  console.log("equipment report states are: ", state);
  
    const {equipment_clientReducer, globalReducer, reportReducer,dataSheetReducer } = state
    
   return {
    equipment_clientReducer,
    isService : globalReducer.isServiceWorker,
    visited_page: globalReducer.visited_page,
    dataSheetReducer,
    client_name : equipment_clientReducer.current_customer.name,
    equipment_serial_number: equipment_clientReducer.equipment_serial_number,
    current_equipment: equipment_clientReducer.current_equipment,
    isReverse: reportReducer.isReverse,
    reports: reportReducer.reports,
    report_id: reportReducer.report_id,
    date : reportReducer.date
    };
  };
 

export default withRouter(connect(mapStateToProps)(EquipmentReport)); 