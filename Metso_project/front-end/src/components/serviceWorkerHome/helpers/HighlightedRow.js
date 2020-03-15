import React, { PureComponent } from "react";

/**
 * A helper class that show the table header.
 */
class HighlightedRow extends PureComponent {
    render = () => {
      return (
       <thead>
          <tr>
            <th className="tg-amwm" colSpan= {this.props.colSpan}>
              {this.props.highlightedContent}
            </th>
          </tr>
       </thead>
      );
    };
  };

export default HighlightedRow