import React, { PureComponent } from "react";
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';

/**
 * The Header, header is always on top, and assigned one time at Apps.js, because all the other compoents are wrapped between header and footer 
 * in the react router we can use it one time. 
 * Header shall contain a header name (maybe remove?)
 * Header height should be smaller. 
 */
class Header extends PureComponent {

  async componentDidMount(){
    console.log('header_props', this.props);
    const {dispatch} = this.props.action_props;
    const {updateUserType} = this.props.action_props.global_action;
  
    if(this.props.location.pathname.includes("Client")){
      await dispatch(updateUserType(false));
    }
}
  render() {

    return (
      <header className={(this.props.isService === false) ? "client_header" : "header" } style={{ paddingTop: 0 }}>
        
        <div className="container">
      
        <div id="logo">
          <a className="logo-link" href={this.props.isService === true ? "/" : `/Client/${this.props.client_name}`}>
            <img
              src="/photos/Metso_Logo_White.png"
              alt="logo"
              width="175"
              height="80"
            />
          </a>
        </div>
        <div>
          <h1 className="ui white" id="headerTitle">
            <a className="main-title" href={this.props.isService === true ? "/" : `/Client/${this.props.client_name}`}>
              {this.props.header_title} 
              <br />
            </a>
            </h1>
        </div>

          <div className="logged-in-user">
          <h4 className="logged-in-user-text">
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z" />
            </svg>
             {(this.props.isService) ? "Service123" : "Client123" } <br></br>
             {(this.props.isService) ? "service representative" : "a client" }</h4> 
          </div>
      
      </div>
      </header>
    );
  };
};

//states are the same 
const mapStateToProps = state => {
 const {globalReducer, equipment_clientReducer} = state
   return {
     isService: globalReducer.isServiceWorker,
     header_title : globalReducer.header_title,
     visited_page: globalReducer.visited_page,
     client_name : equipment_clientReducer.name
    
    }
  }

export default withRouter(connect(mapStateToProps)(Header));