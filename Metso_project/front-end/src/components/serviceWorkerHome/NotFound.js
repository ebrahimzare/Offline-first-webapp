import React, { Component } from 'react';
/**
 * A Default route if incorrect route. should be 404 not found, make nicer.
 */
export default class NotFound extends Component {
  render() {
    return (
      
        <div className="no-results">
        <h5 className="no-results-text">Invalid Route</h5>
        </div>
     
    );
  }
}