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

import {
  fetchGetTenantById,
  fetchPutUpdateTenantDetails
} from "../../store/actions";

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
    const { tenant } = this.props;
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
                    Customer: {this.props.tenant.name}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    Customer:
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      placeholder={"ENTREPRISES NAME"}
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
                <div className={"margin-right-1"}>Details</div>
                {this.state.isDisabled && (
                  <Glyphicon
                    className={"font-18"}
                    glyph="glyphicon glyphicon-pencil"
                    onClick={() => this.setState({ isDisabled: false })}
                  ></Glyphicon>
                )}
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>ID</div>
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
              <div className={"margin-right-1 flex flex-basis-16"}>TINA ID</div>
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
                Customer name
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
                      Update
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
                  <div className={"margin-right-1 flex font-24"}>Sites</div>
                </Col>
              </Row>
              <Row className={"margin-top-1"}>
                <Col md={12}>
                  <Tabs defaultActiveKey={0} id="enterprice_tabs">
                    <Tab eventKey={0} title="Groups">
                      <Groups />
                    </Tab>
                    <Tab eventKey={1} title="Number routing">
                      number routing
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
