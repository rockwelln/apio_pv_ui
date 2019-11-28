import React from "react";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Nav from "react-bootstrap/lib/Nav";
import Navbar from "react-bootstrap/lib/Navbar";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";

import { LinkContainer } from "react-router-bootstrap";

import { Link, Route } from "react-router-dom";

import { FormattedMessage } from "react-intl";

import { isAllowed, pages } from "../../utils/user";
import apio_brand from "../../images/apio.png";

const ListItemLink = ({ to, children }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li role="presentation" className={match ? "active" : ""}>
        <Link to={to} role="button">
          {children}
        </Link>
      </li>
    )}
  />
);

const AsyncApioNavBar = ({
  user_group,
  logoutUser,
  database_status,
  ...props
}) => (
  <Navbar staticTop collapseOnSelect inverse>
    <Navbar.Header>
      <Navbar.Brand style={{ color: "#ef0803", fontWeight: "bold" }}>
        <img
          src={apio_brand}
          width="38"
          height="42"
          className="d-inline-block align-top"
          style={{ padding: 0 }}
          alt="apio"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <ListItemLink to={"/dashboard"}>
          <Glyphicon glyph="dashboard" />{" "}
          <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
        </ListItemLink>

        {isAllowed(user_group, pages.data) && (
          <NavDropdown
            eventKey={4}
            title={
              <span>
                <Glyphicon glyph="hdd" />{" "}
                <FormattedMessage
                  id="provisioning"
                  defaultMessage="Provisioning"
                />
              </span>
            }
            id="nav-data-apio"
          >
            <LinkContainer to={"/provisioning/broadsoft_xsp1_as1/tenants"}>
              <MenuItem>
                <FormattedMessage
                  id="broadsoft_xsp1_as1"
                  defaultMessage="PRAoSIP Provisioning"
                />
              </MenuItem>
            </LinkContainer>
          </NavDropdown>
        )}

        <NavDropdown title={<Glyphicon glyph="user" />} id="nav-local-user">
          <MenuItem onClick={logoutUser}>
            <FormattedMessage id="logout" defaultMessage="Logout" />
          </MenuItem>
        </NavDropdown>
      </Nav>
      <Navbar.Text
        pullRight
        style={{
          color:
            database_status && database_status.env === "TEST"
              ? "#ef0803"
              : "#777",
          fontWeight:
            database_status && database_status.env === "TEST"
              ? "bold"
              : "normal"
        }}
      >
        {database_status && database_status.env
          ? database_status.env
          : "unknown"}
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default AsyncApioNavBar;
