import React, { PureComponent } from "react";
import { Nav, Navbar } from "react-bootstrap";
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
/**
 This class displays the the page path history of the user. So that the user knows which page they are on or equipment info and report info.
 */
class PagePath extends PureComponent {

  render() {

    return (
        <div className="navigation-redirection">
        <Navbar expand='xl'>    {/* sticky="top"  bg="light"*/}
           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
             <Nav className="mr-auto">
                {this.props.visited_page.map((x,key) =>
                 <div className = "nav-item-head" key={key}>
                    <Nav.Link  href={this.props.isService ? x.page_path : (x.page_name === "Equipment Client" ?`/Client/${this.props.client_name}` : `/Client${x.page_path}`)}><p className="nav-text">{x.page_name}</p> </Nav.Link>    
                </div>
               )}      
            </Nav> 
            </Navbar.Collapse>
          </Navbar>
          </div>     
    );
  };
};

//states are the same 
const mapStateToProps = state => {
 const {globalReducer} = state
   return {
     isService: globalReducer.isServiceWorker,
     visited_page: globalReducer.visited_page,
    };
  };

export default withRouter(connect(mapStateToProps)(PagePath));

