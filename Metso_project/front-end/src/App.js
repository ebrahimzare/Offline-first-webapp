import React, { PureComponent } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {Switch } from "react-router";
import { connect } from 'react-redux'
import Header from "./components/Header";
import PagePath from "./components/PagePath";
// import Footer from "./components/Footer";
import EquipmentList from "./components/EquipmentList";
import EquipmentReport from "./components/EquipmentReport";
import MillSpecification from "./components/serviceWorkerHome/MillSpecification";
import MillCondition from "./components/serviceWorkerHome/MillCondition";
import PreviousVisit from "./components/serviceWorkerHome/PreviousVisit";
import NotFound from "./components/serviceWorkerHome/NotFound";
import Datasheets from "./components/serviceWorkerHome/Datasheets";
import DashBoard from "./components/DashBoard";
import "./css/App.css";
import * as equipment_client_action from './redux/actions/equipment_clientAction';
import * as global_action from './redux/actions/globalActions';
import * as report_action from './redux/actions/reportAction';
import * as mill_condition_action from './redux/actions/millConditionAction';
import * as photos_action from './redux/actions/photosAction';
import * as datasheet_action from './redux/actions/dataSheetAction';

/**
 * This is the main class that will call other components based on the route.
 * Here, we keep Header and PagePath on top, so that it shows in all pages.
 * In the react router the component is rendered based on the path.
 * 
 * Notice each component is passed an action_prop,
 * the action prop is the actions (setters and function calls)
 * This is from mapDispatchToProps, that maps our actions as props.
 */
class App extends PureComponent {

  render = () => {

  //persist store, redux-persist, keeps the state in sessionStorage.
  return (
    <BrowserRouter>
      <div className="App">
      
        <Header action_props={this.props}/>
        <PagePath action_props={this.props}/>
      
        <div className="content">
        <Switch>
          {/* exact component */}
          <Route exact path="/" render ={(props) => <EquipmentList {...props} action_props={this.props} />} /> 
          <Route exact path="/JobReport" render={(props) => <EquipmentReport {...props} action_props={this.props} />} />
          <Route
            exact path="/MillSpecification"
            component={(props) => <MillSpecification {...props} action_props={this.props}/>}
          />
          <Route exact path="/DashBoard" render={(props) => <DashBoard {...props} action_props={this.props}/>} /> 
          <Route exact path="/MillCondition" render={(props) => <MillCondition {...props} action_props={this.props} />} />
          <Route exact path="/PreviousVisit" render={(props) => <PreviousVisit {...props} action_props={this.props} />} />
          <Route exact path="/ReportsInProgress" render={(props) => <PreviousVisit {...props} action_props={this.props} />} />
          <Route exact path="/Datasheets" render={(props) => <Datasheets {...props} action_props={this.props} />} />
          {/* <Route exact path="/Report" render={(props) => <Report {...props} action_props={this.props} />} /> */}
          <Route exact path="/Client/Datasheets" render={(props) => <Datasheets {...props} action_props={this.props} />} />
          <Route exact path="/Client/JobReport" render={(props) => <EquipmentReport {...props} action_props={this.props} />} /> 
          <Route exact path="/Client/PreviousVisit" render={(props) => <PreviousVisit {...props} action_props={this.props}/>} />
          <Route
            exact path="/Client/MillSpecification"
            render={(props) => <MillSpecification {...props} action_props={this.props} />}
          />
          <Route exact path="/Client/DashBoard" render={(props) => <DashBoard {...props} action_props={this.props} />} /> 
          <Route exact path="/Client/MillCondition" render={(props) => <MillCondition {...props} action_props={this.props} />} />
          <Route exact path="/Client/:name" render={(props) => <EquipmentList {...props} action_props={this.props}/>} /> 
          <Route exact path="*" render={(props) => <NotFound {...props} action_props={this.props} />} /> 
        </Switch>
        </div>
        {/* <Footer/> */}
      </div>
    </BrowserRouter>
  );
};
};

/**
 * 
 * @param {Function} dispatch - Dispatch is calling action, so we map the dispatch and all our actions as props. 
 * I only used this once so that you reduce redundancy by constantly calling map dispatch to props. 
 */
export const mapDispatchToProps = (dispatch) => {
    return {
      equipment_client_action,
      global_action,
      report_action,
      mill_condition_action,
      photos_action,
      datasheet_action,
      dispatch
    };
};

export default connect(mapDispatchToProps)(App)