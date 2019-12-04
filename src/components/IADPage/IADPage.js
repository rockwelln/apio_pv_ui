import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";

import {
  fetchGetIADById,
  fetchGetConfig,
  fetchPutUpdateIAD,
  fetchGetGroupById
} from "../../store/actions";

import { removeEmpty } from "../remuveEmptyInObject";

import Details from "./Tabs/Details";
import GroupService from "./Tabs/GroupService";
import Edu from "./Tabs/Edu";
import IPAddress from "./Tabs/IpAddress";
import Advanced from "./Tabs/Advanced";
import PraInfo from "./Tabs/PraInfo";
import Loading from "../../common/Loading";
import DeleteModal from "./DeleteModal";

export class IADPage extends Component {
  state = {
    isLoading: true,
    disabledButton: false,
    showDelete: false
  };
  componentDidMount() {
    this.props.fetchGetGroupById(
      this.props.match.params.tenantId,
      this.props.match.params.groupId
    );
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
        <div className={"panel-heading padding-top-0"}>
          <Row className={"header"}>
            <Col md={12} className={"padding-0"}>
              <div className="button-row">
                <div className="pull-left">
                  {`IAD: ${this.props.match.params.iadId}`}
                  <Glyphicon
                    glyph="glyphicon glyphicon-trash"
                    onClick={() => this.setState({ showDelete: true })}
                  />
                  <DeleteModal
                    iadId={this.props.match.params.iadId}
                    show={this.state.showDelete}
                    notifications={this.props.notifications}
                    onClose={() => {
                      this.setState({ showDelete: false });
                    }}
                  />
                </div>
                <div className="pull-right">
                  <Button
                    onClick={this.updateIAD}
                    type="submit"
                    className="btn-primary"
                    disabled={this.state.disabledButton}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    <FormattedMessage
                      id="updateIad"
                      defaultMessage="Update IAD"
                    />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="iads_tabs">
            <Tab eventKey={0} title="Details">
              <Details />
            </Tab>
            <Tab eventKey={1} title="EDUs">
              <Edu />
            </Tab>
            <Tab eventKey={2} title="IP Addressing">
              <IPAddress />
            </Tab>
            <Tab eventKey={3} title="Group service override">
              <GroupService />
            </Tab>
            <Tab eventKey={4} title="Advanced settings">
              <Advanced />
            </Tab>
            {this.props.group.pbxType === "PRA" && (
              <Tab eventKey={5} title="PRA Info">
                <PraInfo isLoading={this.state.isLoading} />
              </Tab>
            )}
          </Tabs>
        </div>
      </React.Fragment>
    );
  }

  updateIAD = () => {
    const { iadForUpdate } = this.props;
    const checkedIp = iadForUpdate.ip1
      ? iadForUpdate.ip1.mode === "disabled"
        ? { mode: iadForUpdate.ip1.mode }
        : iadForUpdate.ip1.mode === "IPv4"
        ? {
            mode: iadForUpdate.ip1.mode,
            ipv4Address: iadForUpdate.ip1.ipv4Address,
            ipv4Netmask: iadForUpdate.ip1.ipv4Netmask
          }
        : iadForUpdate.ip1.mode === "IPv6"
        ? {
            mode: iadForUpdate.ip1.mode,
            ipv6Address: iadForUpdate.ip1.ipv6Address,
            ipv4Netmask: iadForUpdate.ip1.ipv6Netmask
          }
        : null
      : null;
    const data = { ...iadForUpdate, ip1: checkedIp };
    const clearData = removeEmpty(data);
    if (Object.keys(clearData).length) {
      this.setState({ disabledButton: true }, () =>
        this.props
          .fetchPutUpdateIAD(
            this.props.match.params.tenantId,
            this.props.match.params.groupId,
            this.props.match.params.iadId,
            clearData
          )
          .then(() => this.setState({ disabledButton: false }))
      );
    } else {
      this.setState({ disabledButton: true }, () =>
        this.setState({ disabledButton: false })
      );
    }
  };
}

const mapStateToProps = state => ({
  iadForUpdate: state.iadForUpdate,
  group: state.group
});

const mapDispatchToProps = {
  fetchGetIADById,
  fetchGetConfig,
  fetchPutUpdateIAD,
  fetchGetGroupById
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IADPage)
);
