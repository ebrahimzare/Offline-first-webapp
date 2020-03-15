import React, { PureComponent } from "react";
import {withRouter ,Link } from "react-router-dom";
import { connect } from 'react-redux';
import { TableHead } from "./serviceWorkerHome/constants/clientConstants";

import "../css/ClientListStyle.css";
import DashBoard from "./DashBoard";

/**
 * This class is the default path of the application, 
 * It shows the list of clients and their equipments respectively, 
 * Each clients have their own set of equipment.
 * Clients only see their own equipments. 
 * 
 * As of now, no login, so to enter client, set the route /Client/${Client_name}
 */
class EquipmentList extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.isService === true){
    this.activeLink = this.activeLink.bind(this);
    this.setCurrentEquipment = this.setCurrentEquipment.bind(this);
  }
  }

  async componentDidMount() {
    const {dispatch} = this.props.action_props;
    const {fetchClientByNameSearch, fetchClientsList,fetchClientByID, fetchEquipment,invalidSearch} = this.props.action_props.equipment_client_action;
    const {changeHeaderTitle,updateUserType} = this.props.action_props.global_action;
    dispatch(changeHeaderTitle("Metso Equipment Center"));
    if(this.props.location.pathname.includes("Client")){
      await dispatch(updateUserType(false));
    }

    if (this.props.isService === true){
    
    if (this.props.location.search) {
      //replace + with whitespace
      let name = this.props.location.search.split("name=")[1];
      if (name.includes("+")) {
        name = name.replace("+", " ");
      }
      await dispatch(fetchClientByNameSearch(name,this.props.validSearch,this.props["active_customer"]));

     };
      await dispatch(fetchClientsList(this.props["validSearch"],this.props["active_customer"]));
      await dispatch(fetchClientByID(this.props.current_customer_id));
      await dispatch(fetchEquipment(this.props.current_customer_id));
  }

  else if (this.props.isService === false){
    const { name } = this.props.match.params;
    await dispatch(invalidSearch(this.props.validSearch));
    await dispatch(fetchClientByNameSearch(name,this.props.validSearch,this.props["active_customer"]));
    await dispatch(fetchEquipment(this.props.current_customer_id));
   }
};

/**
 * @param {object} equipment - The equipment the user selected
 * 
 */

   setCurrentEquipment = async equipment => {
    const {dispatch} = this.props.action_props;
    const {setCurrentEquipment} = this.props.action_props.equipment_client_action;
    await dispatch(setCurrentEquipment(equipment));
   }

   /**
    * Show the information of the current client, based on the selected link in the client list. (only for service workers and managers.)
    */
   activeLink = async event => {
    const {dispatch} = this.props.action_props;
    const {updateClientID,fetchClientByID,fetchEquipment} = this.props.action_props.equipment_client_action;
    let index = event.target.id;
    let tempArray = this.props.active_customer;
    tempArray.fill(false);
    tempArray[index] = !tempArray[index];

    //dispatch an action
    await dispatch(updateClientID(parseInt(index) + 1));
    await dispatch(fetchClientByID(this.props.current_customer_id));
    await dispatch(fetchEquipment(this.props.current_customer_id));
  };

  render() {
    if(this.props.isService===true) {
    return (
      <div id="featured">
          <div className="ui grid">
            <div className="four wide column">
              <div className="ui vertical fluid tabular menu" id="verticalMenu">
                <div className="item">
                  <form className="ui icon search input">
                    <input
                      className="searchField"
                      type="text"
                      placeholder="Search Customer..."
                      name="name"
                    />
                    <button className="searchButton" type="submit">
                      <i className="search icon" />
                    </button>
                  </form>
                </div>
                {this.props.customers.length !== 0 &&
                  this.props.customers.map(x => {
                    return (
                      <li
                        className={
                          this.props.active_customer[x.index] === false
                            ? "item"
                            : "active item"
                        }
                        id={x.index}
                        onClick={this.activeLink}
                        key={x.index}
                      >
                        {x.name}
                      </li>
                    );
                  })}
              </div>
            </div>
            <CustomerInfo 
            current_customer = {this.props.customers[this.props.current_customer_id-1]} 
            TableHead={TableHead} 
            customer_equipments= {this.props.equipments}
            equipment_redirect= "/DashBoard" />
          </div>
      </div>
    ); }
    else if (this.props.isService === false){
      return (
        <div id="featured">
          <main className="Site-content">
            <div className="ui grid">
            <div className="wide column">
            <CustomerInfo 
            current_customer = {this.props.current_customer} 
            TableHead={TableHead} 
            customer_equipments= {this.props.equipments}
            equipment_redirect= "/Client/DashBoard" />
            </div>
            </div> 
          </main>
        </div>
      );
    }
  }
}

/**
 * Displays the customer basic info, logo name, address 
 */
class CustomerInfo extends PureComponent { 
render = () =>  { 

return (
    <div className="twelve wide stretched column">
      {(this.props.current_customer) && (
        <div className="ui segment">
          <img
            className="customerLogo"
            src={(this.props.current_customer).logo} 
            alt="logo"
            width="180px"
            height="180px"
          />
          <p className="pBody">
            {(this.props.current_customer).name}
            <br />
            {(this.props.current_customer).address} <br />
          </p>
          <div className="equipment-table"> 
          <table className="ui striped table" align="center">
            <thead>
              <tr>
                {(this.props.TableHead).map(x => (
                  <th key={x}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(this.props.customer_equipments) !== null &&
                (this.props.customer_equipments).map(x => (
                  <tr  key={x.equipment_serial_number}>
                    <td>
                      <Link to={{pathname: this.props.equipment_redirect , equipment: x ,component : <DashBoard/>}}>{x.equip_type}</Link>
                    </td>
                    <td>{x.model}</td>
                    <td>{x.customer_reference}</td>
                    <td>{x.equipment_serial_number}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
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
  //if dev mode
  console.log("states are: ", state);
 const {equipment_clientReducer,globalReducer } = state
   return {
     isService: globalReducer.isServiceWorker,
     current_customer_id: equipment_clientReducer.client_id,
     current_customer: equipment_clientReducer.current_customer,
     customers: equipment_clientReducer.clients,
     active_customer: equipment_clientReducer.active_customer,
     validSearch:equipment_clientReducer.validSearch,
     equipments : equipment_clientReducer.equipments,
     header_title : globalReducer.header_title
    }
  }

export default withRouter(connect(mapStateToProps)(EquipmentList));