import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import Loading from "../../common/Loading";
import Groups from "./Groups";

import { removeEmpty } from "../remuveEmptyInObject";
import { FormattedMessage } from "react-intl";

import {
  fetchGetTenantById,
  fetchPutUpdateTenantDetails
} from "../../store/actions";
import RoutingNumbers from "./RoutingNumbers";

import { isAllowed, pages } from "../../utils/user";

class TenantPage extends Component {
  state = {
    isLoading: true,
    showDelete: false,
    isDisabled: true
  };

  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() =>
        this.setState({ isLoading: false, tenant: this.props.tenant })
      );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              {this.state.isDisabled ? (
                <React.Fragment>
                  <div className={"header margin-right-2"}>
                    <FormattedMessage
                      id="customer"
                      defaultMessage="Customer:"
                    />{" "}
                    {this.props.tenant.name}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <FormattedMessage
                      id="customer"
                      defaultMessage="Customer:"
                    />
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      placeholder={"ENTERPRISES NAME"}
                      value={this.state.tenant.name}
                      disabled={this.state.isDisabled}
                      className={"header flex-basis-50 margin-right-2"}
                      onChange={e =>
                        this.setState({
                          tenant: { ...this.state.tenant, name: e.target.value }
                        })
                      }
                    />
                  </div>
                </React.Fragment>
              )}
            </Col>
          </Row>
        </div>
        <div className={"panel-body"}>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex font-24 align-items-center"}>
                <div className={"margin-right-1"}>
                  <FormattedMessage id="details" defaultMessage="Details" />
                </div>
                {isAllowed(
                  localStorage.getItem("userProfile"),
                  pages.edit_enterprise
                )
                  ? this.state.isDisabled && (
                      <Glyphicon
                        className={"font-18"}
                        glyph="glyphicon glyphicon-pencil"
                        onClick={() => this.setState({ isDisabled: false })}
                      ></Glyphicon>
                    )
                  : null}
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <FormattedMessage id="id" defaultMessage="ID" />
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.props.tenant.tenantId}
                  placeholder={"ID"}
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <FormattedMessage
                  id="customerId"
                  defaultMessage="Customer ID"
                />
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.state.tenant.tina_id}
                  onChange={e =>
                    this.setState({
                      tenant: { ...this.state.tenant, tina_id: e.target.value }
                    })
                  }
                  placeholder={"TINA ID"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <FormattedMessage
                  id="customerName"
                  defaultMessage="Customer name"
                />
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.state.tenant.name}
                  onChange={e =>
                    this.setState({
                      tenant: { ...this.state.tenant, name: e.target.value }
                    })
                  }
                  placeholder={"Name"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
          {!this.state.isDisabled && (
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.tenantUpdate}
                      type="submit"
                      className="btn-primary"
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />
                      <FormattedMessage id="update" defaultMessage="Update" />
                    </Button>
                  </div>
                  <div className="pull-right margin-right-1">
                    <Button
                      onClick={() => this.setState({ isDisabled: true })}
                      type="submit"
                      className="btn-primary"
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />
                      <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          {this.state.isDisabled && (
            <div className={"relative"}>
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex font-24"}>
                    <FormattedMessage id="sites" defaultMessage="Sites" />
                  </div>
                </Col>
              </Row>
              <Row className={"margin-top-1"}>
                <Col md={12}>
                  <Tabs
                    activeKey={this.returnActiveKey()}
                    id="enterprice_tabs"
                    onSelect={key => this.tabRouting(key)}
                  >
                    <Tab
                      eventKey={0}
                      title={
                        <FormattedMessage id="sites" defaultMessage="Sites" />
                      }
                    >
                      <Groups />
                    </Tab>
                    <Tab
                      eventKey={1}
                      title={
                        <FormattedMessage
                          id="routingNumbers"
                          defaultMessage="Routing numbers"
                        />
                      }
                    >
                      <RoutingNumbers />
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
              {!this.state.isDisabled && <div className={"disabled-area"} />}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }

  tabRouting = key => {
    switch (key) {
      case 0:
        this.props.history.push("#sites");
        break;
      case 1:
        this.props.history.push("#routingNumbers");
        break;
    }
  };

  returnActiveKey = () => {
    switch (this.props.location.hash) {
      case "#sites":
        return 0;

      case "#routingNumbers":
        return 1;
      default:
        return 0;
    }
  };

  tenantUpdate = () => {
    const data = {
      name: this.state.tenant.name,
      tina_id: this.state.tenant.tina_id
    };
    const clearData = removeEmpty(data);
    this.props
      .fetchPutUpdateTenantDetails(this.props.match.params.tenantId, clearData)
      .then(() =>
        this.props
          .fetchGetTenantById(this.props.match.params.tenantId)
          .then(() =>
            this.setState({ isLoading: false, tenant: this.props.tenant })
          )
      );
    this.setState({ isDisabled: true });
  };
}

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchPutUpdateTenantDetails
};

const mapStateToProps = state => ({
  tenant: state.tenant
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantPage)
);
