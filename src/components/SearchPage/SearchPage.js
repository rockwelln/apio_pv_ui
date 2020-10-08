import React, { Component } from "react";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import Users from "./Tabs/Users/Users";
import Groups from "./Tabs/Groups/Groups";
import Numbers from "./Tabs/Numbers/Numbers";

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
              <Groups />
            </Tab>
            <Tab eventKey={2} title="NUMBERS">
              <Numbers />
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchPage;
