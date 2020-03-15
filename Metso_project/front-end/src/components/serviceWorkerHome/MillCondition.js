import React, {PureComponent } from "react";
import "../../css/MillConditionStyle.css";
import {withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Select from "react-select";
import {
  tableHeader,
  select_options
} from "./constants/millConstants";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

/**
 * Mill Condition class sets the mill condition of the equipment selected. Every equipment serial number has their own unique mill conditions.
 * A service worker may add a non existing condition or update the current condition.
 * A client can only view the current state of the mill. 
 */
class MillCondition extends PureComponent {
  constructor(props) {
    super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.switchView = this.switchView.bind(this);
      this.onChangeWTBS = this.onChangeWTBS.bind(this);
      this.onChangeCondition = this.onChangeCondition.bind(this);
      this.imageCase = this.imageCase.bind(this);
  }

  componentDidMount = async () => {
    const {dispatch} = this.props.action_props;
    const {changeHeaderTitle,addToVisitedPage} = this.props.action_props.global_action;
    const {fetchMillConditionByID} = this.props.action_props.mill_condition_action;
    await dispatch(changeHeaderTitle(`${this.props.mill_id} Mill Condition`));
    await dispatch(fetchMillConditionByID(this.props.mill_id));

    const page_nav_content = {path_number:5 ,page_path: '/MillCondition', page_name: `Mill Condition`}; //if active set active  
    await dispatch(addToVisitedPage(this.props.visited_page , page_nav_content , page_nav_content.path_number ));     
 }

  /**
   * This funtion changes the condition of the mill condition table array.
   * @param {array} table - an array of components, each mill component represents a row in the table.
   * @param {number} index - The index of the array.
   * @param {Event} event - event is an action here would be trigerred by an onChange. 
   */
  onChangeCondition = (table, index, event) => {
    const {dispatch} = this.props.action_props;
    const {setTableData} = this.props.action_props.mill_condition_action;
    let tempTable = table;
    tempTable[index].condition = event.value;
    dispatch(setTableData(tempTable, this.props.mill_id));
  };

  /**
   * Change the work to be determined
   * Similar to above, however i created a custom attribut for the event. 
   */
  onChangeWTBS = event => {
    const {dispatch} = this.props.action_props;
    const {setTableData} = this.props.action_props.mill_condition_action;
    
    let tempTable =  JSON.parse(event.target.getAttribute("tabledata"));
    let table_index= event.target.getAttribute("condition_index");
    tempTable[table_index].work_to_be_scheduled = event.target.value;
    dispatch(setTableData(tempTable,this.props.mill_id));
  };

  /**
   * Set if clicked switch view true or false. 
   * View means update or static view. 
   */
  switchView = () =>{
    const {dispatch} = this.props.action_props;
    const {setClickedUpdate} = this.props.action_props.mill_condition_action;
    dispatch(setClickedUpdate(!this.props.millConditionReducer.clickedUpdate));
  }

  /** Call an action to set the table states of the redux store.  */
  submitForm = async () => {
    const {dispatch} = this.props.action_props;
    const {addMillCondition} = this.props.action_props.mill_condition_action;

    await dispatch(addMillCondition(this.props.tableData));
    alert("Success! Mill Condition Added");
  };

  /** If the mill already exist we update the form, by changing the version number.
   * version number so we can see how many times mill condition has been adjusted.
  */
  updateForm = async () => {
    const {dispatch} = this.props.action_props;
    const {updateMillCondition} = this.props.action_props.mill_condition_action;
    for (let i in this.props.tableData){ //where i is index
      this.props.tableData[i].version += 1;
    }
    await dispatch(updateMillCondition(this.props.tableData, this.props.mill_id));
    alert("Success! Mill Condition Updated");
  };

  handleSubmit = event => {
    if(this.props.millConditionReducer.conditionExists === false)
    this.submitForm();

    else 
    this.updateForm();

    event.preventDefault();
  };

  /**
   * @param {string} name - The name of the condition image
   */
  imageCase = name => {
    switch (name) {
      case "Green":
        return (this.props.isService === true) ? "./photos/green.png" : "../../photos/green.png";
      case "Red":
        return (this.props.isService === true) ? "./photos/red.png" : "../../photos/red.png";
      case "Yellow":
        return (this.props.isService === true) ? "./photos/yellow.png" :  "../../photos/yellow.png";
      case "NA":
        return (this.props.isService === true) ? "./photos/NA.jpeg" :  "../../photos/NA.jpeg";
      default:
        return null;
    }
  };

  render() {
    const table_head = tableHeader.map(head_val => {
      return (
        <TableCell key={head_val} align="center">
          {head_val}
        </TableCell>
      );
    });

    const table_data = this.props.tableData.map((x,key) =>
      <MillData
      key={key}
      component={x.component}
      condition={
      (this.props.isService === true && (this.props.millConditionReducer.conditionExists === false || this.props.millConditionReducer.clickedUpdate === true)) ? 
         <Select options={select_options} name="condition" onChange={event => this.onChangeCondition(this.props.tableData,key, event)} placeholder={(this.props.millConditionReducer.clickedUpdate === true) ? <img 
          src={this.imageCase(x.condition)} //condition is null from the default state
          width="20"
          height="20"
          alt={  
          this.imageCase(x.condition)
          .split("photos/")[1]
          .split(".png")[0]}/>  : "Select"  }/> 
        :  
      <img 
        src={this.imageCase(x.condition)} //condition is null from the default state
        width="20"
        height="20"
        alt={  
            this.imageCase(x.condition)
            .split("photos/")[1]
            .split(".png")[0]
        }
      /> 
      }
      wtbs={((this.props.isService === true && this.props.millConditionReducer.conditionExists === false) || this.props.millConditionReducer.clickedUpdate === true) ?  
          <input
              type="text"
              name="work_to_be_scheduled"
              placeholder= {(this.props.millConditionReducer.clickedUpdate === true) ? x.work_to_be_scheduled : "Work to be scheduled"}
              condition_index= {key}
              tabledata ={JSON.stringify(this.props.tableData)}
              onChange={this.onChangeWTBS.bind(this)}
            />: x.work_to_be_scheduled}
    />
    );

    if (this.props.isService === true) {
      return (
        <div className="mill-condition">
        <div id="featured">
          <form className="mill-condition-form" onSubmit={ this.handleSubmit}>
          
            <MillConditionTable
              table_head={table_head}
              table_data={table_data}
            />
            {(this.props.millConditionReducer.clickedUpdate === true ||  this.props.millConditionReducer.conditionExists === false) &&
            <button className= "btn btn-success" type="submit" id="submit">
              {(this.props.millConditionReducer.conditionExists === false) ? "Submit" : "Update"}
            </button>
            }
          </form>
          {(this.props.millConditionReducer.conditionExists === true) &&
          <div className={this.props.millConditionReducer.clickedUpdate === true ? "switch-mill-view" : "switch-mill-view-false"}>
          <button className= {this.props.millConditionReducer.clickedUpdate === false ? "btn btn-success" :"btn btn-primary"} id= {this.props.millConditionReducer.clickedUpdate === false ? "submit" :"revert"}  onClick= {this.switchView}>
              {this.props.millConditionReducer.clickedUpdate === false ? "Update"  : "Revert"}
          </button>
          </div>}
        </div>
        </div>
      );
    } else if (this.props.isService === false) {
      return (
        <div className="mill-condition">
        <div id="featured">
          <div className="mill-condition-form">
            <MillConditionTable
              table_head={table_head}
              table_data={table_data}
            />
          </div>
        </div>
        </div>
      );
    }
  }
}

/**
 * Static table that displays the mill condition table
 */
class MillConditionTable extends PureComponent {
  render = () => {
    return (
      <Table className="staticTable" size="small">
        <TableHead>
          <TableRow className="table-head">{this.props.table_head}</TableRow>
        </TableHead>
        <TableBody>{this.props.table_data}</TableBody>
      </Table>
    );
  };
};

/** Representing each row in the table, what the tableData is mapped on.*/
class MillData extends PureComponent {
  render = () => {
    return (
      <TableRow>
        <TableCell align="left" scope="row" className="component-field">
          {this.props.component}
        </TableCell>
        <TableCell  align="center">
          <div id="mill-condition-select">
          {this.props.condition}
          </div>
        </TableCell>
        <TableCell align="center">{this.props.wtbs}</TableCell>
      </TableRow>
    );
  };
};

/**
 * 
 * @param {Object} state - Map the redux states as props.
 */
const mapStateToProps = state => {
  console.log("mill_condition_states are: ", state);
 const {equipment_clientReducer,globalReducer , millConditionReducer } = state
   return {
     millConditionReducer,
     isService: globalReducer.isServiceWorker,
     visited_page: globalReducer.visited_page,
     tableData: millConditionReducer.tableData,
     mill_id: equipment_clientReducer.equipment_serial_number,
     header_title : globalReducer.header_title
    };
  };

export default withRouter(connect(mapStateToProps)(MillCondition))