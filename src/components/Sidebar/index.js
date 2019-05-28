import React, { Component } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/lib/ListGroup";
import Row from "react-bootstrap/lib/Row";
import { Link } from "react-router-dom";

export class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroup>
          <div>
            <Link to="/apio/tenants">TENANTS</Link>
          </div>
          <div>SEARCH</div>
          <div>TEMPLATES</div>
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Sidebar);
