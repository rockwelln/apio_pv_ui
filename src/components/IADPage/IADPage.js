import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import { fetchGetIADById, fetchGetConfig } from "../../store/actions";

import Details from "./Tabs/Details";
import GroupService from "./Tabs/GroupService";
import Loading from "../../common/Loading";

export class IADPage extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.props
      .fetchGetIADById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.iadId
      )
      .then(() =>
        this.props
          .fetchGetConfig()
          .then(() => this.setState({ isLoading: false }))
      );
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div
            className={"header"}
          >{`IAD: ${this.props.match.params.iadId}`}</div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="iads_tabs">
            <Tab eventKey={0} title="Details">
              <Details />
            </Tab>
            <Tab eventKey={1} title="EDUs"></Tab>
            <Tab eventKey={2} title="IP Addressing"></Tab>
            <Tab eventKey={3} title="Group service override">
              <GroupService />
            </Tab>
            <Tab eventKey={4} title="Advanced settings"></Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { fetchGetIADById, fetchGetConfig };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IADPage)
);
