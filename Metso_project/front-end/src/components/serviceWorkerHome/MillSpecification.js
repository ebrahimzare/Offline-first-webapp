import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "../../css/MillSpecificationStyle.css";
import {leftTHead , leftTData , rightTHead , rightTData} from "./constants/millConstants";
import HighlightedRow from "./helpers/HighlightedRow";
import TableHeadClass from "./helpers/TableHeadClass";

/**
 * For now this is just a static file that displays constant mill spec data. 
 */
class MillSpecification extends PureComponent {

  componentDidMount = async () =>{
    const {dispatch} = this.props.action_props;
    const {changeHeaderTitle,addToVisitedPage} = this.props.action_props.global_action;
    await dispatch(changeHeaderTitle("Mill Specification")); // will remove
    const page_nav_content = {path_number:2 ,page_path: '/MillSpecification', page_name: `Mill Specification`}; //if active set active  
    await dispatch(addToVisitedPage(this.props.visited_page , page_nav_content , page_nav_content.path_number ));
  }

  render = () => {
    const t_head_left = leftTHead.map((x, key) => {
      return <TableHeadClass key={key} headName={x} />;
    });

    const t_head_right = rightTHead.map((x, key) => {
      return <TableHeadClass key={key} headName={x} />;
    });

    const t_data_left = leftTData.map((x, key) => {
      return (
        <LeftTableData
          key={key}
          bolt_location={x.bolt_location}
          bolt_type={x.bolt_type}
          bolt_size={x.bolt_size}
          bolt_length={x.bolt_length}
          bolt_socket={x.bolt_socket}
          bolt_torque={x.bolt_torque}
        />
      );
    });

    const t_data_right = rightTData.map((x, key) => {
      return (
        <RightTableData
          key={key}
          mill_description={x.mill_description}
          info_criteria={x.info_criteria}
        />
      );
    });

    return (
      <div className="mill-spec-body">
        <div className="row">
          <div className="column left">
            <table className="tg" id="tg-left" align="left">
          
              <HighlightedRow
                highlightedContent={`14' Dia. X 24.5' Lg. - Ball Mill -,Pilanesburg,UG2`}
                colSpan={"6"}
              />
              <HighlightedRow
                highlightedContent={` ~ LIGHTLY LUBRICATED BOLTS~ `}
                colSpan={"6"}
              /> 
             <tbody>
              <tr id="column-title">{t_head_left}</tr>
             
              {t_data_left}
              </tbody>
              <HighlightedRow
                highlightedContent={` BACKLASH FOR NEW GEAR AND NEW PINION = mm - mm`}
                colSpan={"6"}
              />
              <HighlightedRow
                highlightedContent={`   ROOT CLEARANCE FOR NEW OR USED GEAR AND NEW OR USED PINION = mm`}
                colSpan={"6"}
              />
            </table>
          </div>

          <div className="column right">
            <table className="tg" id="tg-right" align="right">
              <HighlightedRow
                highlightedContent={`   14' Dia. X 24.5' Lg. - Ball Mill - Pilansburg&nbsp;&nbsp;UG2 - Secondary `}
                colSpan={"6"}
              />
              <HighlightedRow
                highlightedContent={`      METSO - MILL SERIAL # 74656 `}
                colSpan={"6"}
              />
             <tbody>
              <tr id="column-title">
              {t_head_right}
              </tr>
             
              {t_data_right}
              </tbody>
              <HighlightedRow
                highlightedContent={`MILL SPEED  15.84 RPM - 75% CS`}
                colSpan={"6"}
              />
               <HighlightedRow
                highlightedContent={`MAXIMUM CHARGE 38% OF MILL VOLUME`}
                colSpan={"6"}
              />
            </table>
          </div>
        </div>
      </div>
    );
  };
};

/**
 * Data on the left table
 */
class LeftTableData extends PureComponent {
  render() {
    const staticLeftData = [{className: "tg-lqy6" , toDisplay: this.props.bolt_location},
                            {className: "tg-baqh" , toDisplay: this.props.bolt_type},
                            {className: "tg-baqh" , toDisplay: this.props.bolt_size},
                            {className: "tg-baqh" , toDisplay: this.props.bolt_length},
                            {className: "tg-baqh" , toDisplay: this.props.bolt_socket},
                            {className: "tg-baqh" , toDisplay: this.props.bolt_torque},
  ];
    return (
      <tr>
        {staticLeftData.map(left_data =>
          <td key= {left_data} className={left_data.className}> {left_data.toDisplay}</td> ) }
      </tr>
    );
  };
};

/**
 * Data on the right table
 */
class RightTableData extends PureComponent {
  render = () => {
    const staticRightData = [{className: "tg-lqy6" , toDisplay: this.props.mill_description},
    {className: "tg-baqh" , toDisplay: this.props.info_criteria}];
    return (
      <tr>
        {staticRightData.map(right_data =>
          <td key= {right_data} className={right_data.className}> {right_data.toDisplay}</td> ) }
      </tr>        
    );
  };
};

/**
 * 
 * @param {Object} state - Map the redux states as props 
 */
const mapStateToProps = state => {
  console.log("mill spec states are: ", state);
  
  const {globalReducer } = state
    
   return {
    visited_page: globalReducer.visited_page,
    isService : globalReducer.isServiceWorker,
    };
  };

export default withRouter(connect(mapStateToProps)(MillSpecification)); 
