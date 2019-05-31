import React, { Component } from "react";
import ListGroup from "react-bootstrap/lib/ListGroup";
import { Link } from "react-router-dom";

export class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroup>
          <div>
            <Link to="/provisioning/broadsoft_xsp1_as1/tenants">TENANTS</Link>
          </div>
          <div>SEARCH</div>
          <div>TEMPLATES</div>
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Sidebar;
