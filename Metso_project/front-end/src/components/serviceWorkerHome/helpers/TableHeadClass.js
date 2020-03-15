
import React, { PureComponent } from "react";

/**
 * Class that shows the header of the tables.
 */
class TableHeadClass extends PureComponent {
    render = () => {
      return <td className="tg-amwm">{this.props.headName}</td>;
    };
  };

export default TableHeadClass;  