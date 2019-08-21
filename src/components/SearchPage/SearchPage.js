import React, { Component } from "react";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import Users from "./Tabs/Users";

class SearchPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>Search Panel</div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="search_tabs">
            <Tab eventKey={0} title="USERS">
              <Users />
            </Tab>
            <Tab eventKey={1} title="GROUPS">
              GroupsTab
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchPage;
