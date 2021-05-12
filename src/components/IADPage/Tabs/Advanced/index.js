import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import Options from "./Tabs/Options";
//import TrunlId from "./Tabs/TrunkId"; // This page is obsolte it is now integrated in Destination Numbers
import DestinationNumbers from "./Tabs/DestinationNumbers";
import SpecialCustomizedTags from "./Tabs/SpecialCustomizedTags";

import { isAllowed, pages } from "../../../../utils/user";

export class AdvancedTab extends Component {
  render() {
    return (
      <Row className={"margin-top-1"}>
        <Col md={12}>
          <Tabs defaultActiveKey={3} id="iads_tabs">
            <Tab eventKey={0} title="Options">
              <Options />
            </Tab>
            {/* <Tab eventKey={1} title="Trunk Id">
              <TrunlId />
            </Tab> */}
            {isAllowed(
              localStorage.getItem("userProfile"),
              pages.access_iad_advanced_destination_numbers
            )
              ? (this.props.iad.protocolMode === "PRA" ||
                  this.props.iad.protocolMode === "PRA_SIP") && (
                  <Tab eventKey={2} title="Destination Number">
                    <DestinationNumbers />
                  </Tab>
                )
              : null}
            <Tab eventKey={3} title="Special Customized Tags">
              <SpecialCustomizedTags />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  iad: state.iad,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedTab);
