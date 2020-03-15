import React, { PureComponent } from "react";
import { withRouter,Link } from "react-router-dom";
import { connect } from 'react-redux';
import NotFound from "./serviceWorkerHome/NotFound";
import {dashboard_data} from "./serviceWorkerHome/constants/dashboardConstants";
import JobInformation from "./serviceWorkerHome/JobInformation";
import Modal from "react-responsive-modal";
import "../css/DashBoardStyle.css";

/**
 * DashBoard:
 * Service Workers and Managers: View Mill Specification, All Previous Visits, Reports in Progress, Create new Reports
 * Clients: View Mill Specification and completed visits.
 */
class DashBoard extends PureComponent {
  constructor(props) {
    super(props);
   
    this.state = {jobInfoModalOpen: false,
    }     
  }

/**
 * Sets the dashboard according to the information of the equipment the user selected
 */
   componentDidMount = async () => {
        const {dispatch} = this.props.action_props;
        const {fetchReportsListSerialNumber} = this.props.action_props.report_action;
        const {changeHeaderTitle, addToVisitedPage} = this.props.action_props.global_action;
        const {setCurrentEquipment} = this.props.action_props.equipment_client_action;
        const {setMillID} = this.props.action_props.mill_condition_action;
        await dispatch(changeHeaderTitle("Welcome to the Dashboard"));
       
        if(this.props.location.equipment) {
          await dispatch(setCurrentEquipment(this.props.location.equipment)); //only updates the state
        }
       
        const page_nav_content = {path_number:1 ,page_path: '/DashBoard', page_name: `${this.props.current_equipment.equip_type} 
        ${this.props.equipment_serial_number}`};
        await dispatch(addToVisitedPage(this.props.visited_page , page_nav_content , page_nav_content.path_number ));

        if(this.props.equipment_serial_number){
          await dispatch(fetchReportsListSerialNumber(this.props['equipment_serial_number']));
          await dispatch(setMillID(this.props['equipment_serial_number']));
      }
   };

 /**
 * Sets boolean on local state if the create a new job modal is open 
 * 
 */  
  openJobInfoModal = () => this.setState({ jobInfoModalOpen: true });
  
  closeJobInfoModal = () => this.setState({ jobInfoModalOpen: false });
  
  render = () => {
    const { jobInfoModalOpen } = this.state;

    let dashboard_links = (this.props.equipment_clientReducer.current_customer && this.props.current_equipment) ? (((this.props.isService === false) ? dashboard_data.slice(0,2) :dashboard_data).map((x,key) => {
        return(
            <article key={key} className="dashboard-style" >
            <span className="image">
              <img src={x.background_image} alt=""  />
            </span>
            
            {x.title !== "Create Report" && 
            <Link
                to={{
                  pathname: this.props.isService ? x.link_to : `/Client${x.link_to}`,
                  equipment: this.props.current_equipment,
                  client_name: this.props.equipment_clientReducer.current_customer['name'],
                  component: x.component_name,
                  entered_from: (x.title === 'Previous Visit' || x.title === 'Reports In Progress') && x.title 
                }}
              > 
              <h2>{x.title}</h2>
                <div className="dash-board-content">
                  <p className="dashboard-description">
                  {x.description}
                  </p>
                </div>
              </Link>
            }

            {x.title === "Create Report" && 
        <div className="create-report-modal" onClick = {this.openJobInfoModal}>
         <h2>{x.title}</h2>
            <div className="dash-board-content">
              <p className="dashboard-description">
              {x.description}
              </p>
            </div>
            </div>
          }
              <Modal
          open={jobInfoModalOpen}
          onClose={this.closeJobInfoModal}
          center={true}
          style={{ overlay: { background: "rgba(0, 0, 0, 0.75)" }}}    
        >
          <JobInformation
            action_props={this.props.action_props}
          />
        </Modal> 

          </article>
        );
        })) : <NotFound/>;

    if(this.props.equipment_clientReducer.current_customer && this.props.current_equipment )
    return(
      <div id="main">
        <section id="client-info-one" className="wrapper style2">
          <div className="inner-content">
            <article className="feature left">
            <div className="row">
              <span className="image customerLogo">
                <img
                  src={this.props.equipment_clientReducer.current_customer.logo} /*was image_link before */
                  alt="logo"
                  width="250px"
                  height="250px"
                />
              </span>
              <div className="client-info">
                  <div className="column left">
                    <h2>Equipment:</h2>
                    <h2>Model:</h2>
                    <h2>Customer Reference:</h2>
                    <h2>Serial Number:</h2>
                  </div>
        
                  <div className="column right">
                    <h2>{this.props.current_equipment.equip_type}</h2>
                    <h2>{this.props.current_equipment.model}</h2>
                    <h2>{this.props.current_equipment.customer_reference}</h2>
                    <h2>{this.props.equipment_serial_number}</h2>
                  </div>
            
                </div>
              </div>
            </article>
          </div>
        </section>

        <div className="inner">
          <section className="tiles">
           {dashboard_links}
          </section>
        </div>
      </div>
    );
     else return(<div> <NotFound/> You Must Select an equipment to enter the dashboard</div>);
 
  };
};

 /**
 * @param {Object} state
 * passing the redux state as props for the specified component
 * 
 */  

const mapStateToProps = state => {
  if (process.env.NODE_ENV !== 'production') {
    console.log("dashboard states are: ", state);
  }

    const {equipment_clientReducer, globalReducer, reportReducer } = state
   return {
    equipment_clientReducer,
    visited_page: globalReducer.visited_page,
    isService : globalReducer.isServiceWorker,
    equipment_serial_number: equipment_clientReducer.equipment_serial_number,
    current_equipment: equipment_clientReducer.current_equipment,
    report_list: reportReducer.report_list 
    };
  };
 
export default withRouter(connect(mapStateToProps)(DashBoard)); 