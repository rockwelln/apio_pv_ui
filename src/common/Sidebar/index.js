import React, { Component } from "react";
import { withRouter } from "react-router";

import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
//import DropdownButton from "react-bootstrap/lib/DropdownButton";
import { LinkContainer } from "react-router-bootstrap";

//import CategoriesSideBar from "../../components/CategoriesSideBar";
import { isAllowed, pages } from "../../utils/user";

import "./styles.css";

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
          className={"sidebar-container "}
        >
          <LinkContainer
            to={`/provisioning/${this.props.match.params.gwName}/tenants`}
            className={"li-width"}
          >
            <NavItem eventKey={0} className={"text-align-center"}>
              ENTERPRISES
            </NavItem>
          </LinkContainer>
          {isAllowed(
            localStorage.getItem("userProfile"),
            pages.config_pages
          ) ? (
            <LinkContainer
              to={`/provisioning/${this.props.match.params.gwName}/configs`}
              className={"li-width"}
            >
              <NavItem eventKey={3} className={"text-align-center"}>
                CONFIGS
              </NavItem>
            </LinkContainer>
          ) : null}
          {isAllowed(
            localStorage.getItem("userProfile"),
            pages.reconciliations
          ) ? (
            <LinkContainer
              to={`/provisioning/${this.props.match.params.gwName}/reconciliations`}
              className={"li-width"}
            >
              <NavItem eventKey={4} className={"text-align-center"}>
                RECONCILIATIONS
              </NavItem>
            </LinkContainer>
          ) : null}
          {isAllowed(
            localStorage.getItem("userProfile"),
            pages.iad_reboot_pages
          ) ? (
            <LinkContainer
              to={`/provisioning/${this.props.match.params.gwName}/iadreboot`}
              className={"li-width"}
            >
              <NavItem eventKey={4} className={"text-align-center"}>
                MASS IAD REBOOT
              </NavItem>
            </LinkContainer>
          ) : null}
          {/* <LinkContainer
            to={`/provisioning/${this.props.match.params.gwName}/statistics`}
            className={"li-width"}
          >
            <NavItem eventKey={4} className={"text-align-center"}>
              STATISTICS
            </NavItem>
          </LinkContainer> */}
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
