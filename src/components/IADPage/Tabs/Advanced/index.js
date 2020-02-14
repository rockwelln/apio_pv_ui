import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import Options from "./Tabs/Options";
import TrunlId from "./Tabs/TrunkId";
import DestinationNumbers from "./Tabs/DestinationNumbers";

export class AdvancedTab extends Component {
  render() {
    return (
      <Row className={"margin-top-1"}>
        <Col md={12}>
          <Tabs defaultActiveKey={0} id="iads_tabs">
            <Tab eventKey={0} title="Options">
              <Options />
            </Tab>
            {/* <Tab eventKey={1} title="Trunk Id">
              <TrunlId />
            </Tab> */}
            {(this.props.iad.protocolMode === "PRA" ||
              this.props.iad.protocolMode === "PRA_SIP") && (
              <Tab eventKey={2} title="Destination Number">
                <DestinationNumbers />
              </Tab>
            )}
          </Tabs>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  iad: state.iad
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedTab);
