import React, { Component } from "react";
import { withRouter } from "react-router";

import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import { LinkContainer } from "react-router-bootstrap";

import CategoriesSideBar from "../../components/CategoriesSideBar";

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
          <LinkContainer
            to={`/provisioning/${this.props.match.params.gwName}/tenants`}
          >
            <NavItem eventKey={0}>TENANTS</NavItem>
          </LinkContainer>
          <LinkContainer
            to={`/provisioning/${this.props.match.params.gwName}/search`}
          >
            <NavItem eventKey={1}>SEARCH</NavItem>
          </LinkContainer>
          <DropdownButton
            title={"TEMPLATES"}
            className={"width-100p flex space-between align-items-center"}
            componentClass={Nav}
            id={"category"}
          >
            <Nav
              bsStyle="pills"
              stacked
              activeKey={this.state.activeKeyTemplate}
              onSelect={this.handleSelectTemplate}
              className={"width-100p"}
            >
              <CategoriesSideBar />
            </Nav>
          </DropdownButton>
          <LinkContainer
            to={`/provisioning/${this.props.match.params.gwName}/configs`}
          >
            <NavItem eventKey={3}>CONFIGS</NavItem>
          </LinkContainer>
        </Nav>
      </React.Fragment>
    );
  }
  handleSelect = selectedKey => {
    this.setState({ activeKey: selectedKey });
  };
  handleSelectTemplate = selectedKey => {
    this.setState({ activeKeyTemplate: selectedKey });
  };
}

export default withRouter(Sidebar);
