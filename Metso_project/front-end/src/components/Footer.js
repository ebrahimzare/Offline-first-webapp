import React, { PureComponent } from "react";
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';

/**
 * The Footer of the page
 */
class Footer extends PureComponent {
  render = () => {
    return (
        <footer className={(this.props.isService === false) ? "client_footer" : "flexFooter" } id="flexFooter">
          <div id="logo">
          <img
              src="/photos/Metso_Logo_White.png"
              alt="logo"
              width="175"
              height="80"
            />
          </div>
          <div className="footer-text">
      
       <h5>©2019 Metso Canada. All rights reserved. </h5>
        </div>
      </footer>
    );
  };
};

const mapStateToProps = state => {
  const {globalReducer} = state
    return {
      isService: globalReducer.isServiceWorker,
     }
   }

 export default withRouter(connect(mapStateToProps)(Footer));