import React, { Component } from "react";

import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import { LinkContainer } from "react-router-bootstrap";

export class Sidebar extends Component {
  state = {
    activeKey: 0
  };

  render() {
    return (
      <React.Fragment>
        <Nav
          bsStyle="pills"
          stacked
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
        >
          <LinkContainer to="/provisioning/broadsoft_xsp1_as1/tenants">
            <NavItem eventKey={0}>TENANTS</NavItem>
          </LinkContainer>
          <LinkContainer to="/provisioning/broadsoft_xsp1_as1/search">
            <NavItem eventKey={1}>SEARCH</NavItem>
          </LinkContainer>
          <LinkContainer to="/provisioning/broadsoft_xsp1_as1/templates">
            <NavItem eventKey={2}>TEMPLATES</NavItem>
          </LinkContainer>
        </Nav>
      </React.Fragment>
    );
  }
  handleSelect = selectedKey => {
    this.setState({ activeKey: selectedKey });
  };
}

export default Sidebar;
