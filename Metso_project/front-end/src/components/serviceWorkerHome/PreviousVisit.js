import React, { PureComponent } from "react";
import { tHeader} from "./constants/fakeDatabase"; 
import { withRouter,Link } from "react-router-dom";
import { connect } from 'react-redux';
import EquipmentReport from "../EquipmentReport";
import "../../css/prevVisitStyle.css";

/**
 * List of previous visits based on the equipment id
 *  */ 
class PreviousVisit extends PureComponent {
/**
 * has access to te equipment serial number, 
 * gets the list of reports by equipment number, for now all reports.
 *  */  
componentDidMount = async () => {
    const {dispatch} = this.props.action_props;
    const {fetchReportsSerialNumber} = this.props.action_props.report_action;
    const {changeHeaderTitle,addToVisitedPage} = this.props.action_props.global_action;
    const {setCurrentEquipment} = this.props.action_props.equipment_client_action; 
    
    const prev_visit_reports_progress = {
      'Previous visit' : { name: 'Previous visit',
                           page_path: '/PreviousVisit'}, 
      
      'Reports in progress': { name: 'Reports in progress',
                               page_path: '/ReportsInProgress'}, 
    };

    //store it in redux not just location.
    if(this.props.location.entered_from){
    await dispatch(changeHeaderTitle(prev_visit_reports_progress[this.props.location.entered_from].name));
    const page_nav_content = {path_number:2 ,page_path: prev_visit_reports_progress[this.props.location.entered_from].page_path, page_name: (prev_visit_reports_progress[this.props.location.entered_from].name)}; //if active set active  
    await dispatch(addToVisitedPage(this.props.visited_page , page_nav_content , page_nav_content.path_number ));
    }

    if(this.props.location.equipment){
      await dispatch(setCurrentEquipment(this.props.location.equipment));
    }
    if(this.props.equipment_serial_number)
      await dispatch(fetchReportsSerialNumber(this.props.equipment_serial_number));
      };

/**
 * list of reports is already in ascending order 
 * sets the isReversed boolean not the current value. 
 * if true -> false ,
 * else if false -> true
 * refer to line 53, const tableData.
 * if isReversed is true, the tableData is reversed using javascript's reverse function.
 */
sortByDate = async () => {
  const {dispatch} = this.props.action_props;
  const {reverseList} = this.props.action_props.report_action;
  await dispatch(reverseList(this.props.isReverse)); //action triggered state changes, but no rerender of props.
  window.location.href = this.props.isService === true ? '/PreviousVisit' : '/Client/PreviousVisit'; //not the best approach to force a re-render
};

submitReport = async (report) => {
const {dispatch} = this.props.action_props;
const {updateReport} = this.props.action_props.report_action;   
const copyReport = {...report, report_status: !report.report_status}
// console.log('report is: ', copyReport);
const isSubmitted = window.confirm(`You are about to submit report ${report.report_id} for submission, are you sure?`);

if(isSubmitted === true){
await dispatch(updateReport(copyReport));
alert(`Report ${report.report_id} submitted for revision`);
window.location.href =  '/ReportsInProgress';
}
};

  render = () => {
    const tableHeader =  tHeader.map((x, key) => {
      return <THead key={key} head_name={x} onClickFunction={this.sortByDate.bind(this)} />;
    });

    // const completedReports = this.props.reports.map(x =>  (x.report_status === true) && x );
    // const reportsInProgress = this.props.reports.map(x =>  (x.report_status === false) && x );
//this.props.reports
    // reports is an array containing all reports as objects. Map each object in the array Return a single row. 
    const reportsInProgress = (this.props.isReverse === false ? this.props.reports : this.props.reports.reverse()).map((x, key) =>  
      (x.report_status===false) &&
        <TData
          key={key}
          submitReport = {this.submitReport}
          report={x}
          equipment={this.props.current_equipment}
          client_name={this.props.client_name}
          pdfReady={x.report_status}
          isService={this.props.isService}
        />
      );
    
    const completedReports = (this.props.isReverse === false ? this.props.reports : this.props.reports.reverse()).map((x, key) => 
      (x.report_status === true) &&
        <TData 
          key={key}
          report={x}
          equipment={this.props.current_equipment}
          client_name={this.props.client_name}
          pdfReady={x.report_status}
          isService={this.props.isService}
        />
    );
    
    return (
      <div id="featured">
    
      <div className="prevVisitTable">
        <table className="previous-visit table table-striped" align="center">
          <thead className ="thead-light">
            <tr >{tableHeader}</tr>
          </thead>
          <tbody>{this.props.header_title === 'Previous visit' ? completedReports : reportsInProgress}</tbody>
        </table>
      </div>
      </div>
    );
  };
};

/**
 * Headers of the table, only the date will be sorted on click.
 */
class THead extends PureComponent {
  render = () => {
    return <th onClick={(this.props.head_name === "Date") ? this.props.onClickFunction : null} scope="col">{this.props.head_name}</th>;
  };
};

/**
 * Represent a single row of the table.
 * Use of neat trick to reduce code, put all columns in an array and map it so only one td tag is required.
 */
class TData extends PureComponent {
  render = () => {
    let table_datas = [this.props.report.date,
      this.props.report.visit_reason,
      this.props.report.representative_name,
      this.props.report.contact_info,
      this.props.pdfReady === false ? 
      (<div className= "report_buttons">
      <Link to={{  pathname: (this.props.isService === true) ? `/JobReport` : `/Client/JobReport`,
                   report_id: this.props.report.report_id, 
                   date: this.props.report.date,
                   client_name: this.props.client_name,
                   equipment: this.props.equipment,
                   action_props: this.props.action_props,
                   component: <EquipmentReport />
                }} >
      <button className="btn btn-info center" id='seperate_button' style= {{width: '137.38px' ,height: '45px',fontSize: '18px'}} >  {this.props.isService === true ? "Edit" : "View"}</button> 
      </Link>
     {/*  */}
      {this.props.isService === true &&
      <button className="btn btn-success center" style= {{width: '137.38px' ,height: '45px',fontSize: '18px'}} onClick = {() => this.props.submitReport(this.props.report)} > Submit Report</button>}
      </div> )
  
      : <div>
        <a
        target="_blank"
        rel="noopener noreferrer"
        href={"../pdfs/MalarticReport.pdf"}
      >
         <button className="btn btn-info center"  id='seperate_button' style= {{width: '137.38px' ,height: '45px',fontSize: '18px'}} > {"Download"} </button> 
      </a> 
      <Link to={{  pathname: (this.props.isService === true) ? `/JobReport` : `/Client/JobReport`,
                   report_id: this.props.report.report_id, 
                   date: this.props.report.date,
                   client_name: this.props.client_name,
                   equipment: this.props.equipment,
                   action_props: this.props.action_props,
                   component: <EquipmentReport />
                }} >
      <button className="btn btn-primary center" style= {{width: '137.38px' ,height: '45px',fontSize: '18px'}}> {"View Online"}</button> 
      </Link> 
      </div>
    ];

    return (
      <tr >
        {table_datas.map((x,key) => <td key={key}>{x}</td> )
        }
      </tr>
    );
  };
};

/**
 * Map the redux store's states as props.
 * @param {*} state - represents  
 */
const mapStateToProps = state => {
  console.log("previous visit states are: ", state);
  
    const {equipment_clientReducer, globalReducer, reportReducer } = state
    
   return {
    equipment_clientReducer,
    header_title : globalReducer.header_title,
    isService : globalReducer.isServiceWorker,
    visited_page: globalReducer.visited_page,
    client_name : equipment_clientReducer.current_customer.name,
    equipment_serial_number: equipment_clientReducer.equipment_serial_number,
    current_equipment: equipment_clientReducer.current_equipment,
    isReverse: reportReducer.isReverse,
    reports: reportReducer.reports 
    };
  };
 

export default withRouter(connect(mapStateToProps)(PreviousVisit)); 