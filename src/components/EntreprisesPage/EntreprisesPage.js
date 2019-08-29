import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";

import Loading from "../../common/Loading";
import Groups from "./Groups";

import { fetchGetTenantById } from "../../store/actions";

const OPTIONS = [
  { name: "option 1", value: "option 1" },
  { name: "option 2", value: "option 2" },
  { name: "option 3", value: "option 3" },
  { name: "option 4", value: "option 4" },
  { name: "option 5", value: "option 5" }
];

class TenantPage extends Component {
  state = {
    isLoading: true,
    showDelete: false,
    isDisabled: true,
    option: "option 1"
  };

  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { tenant } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    console.log(tenant);
    return (
      <React.Fragment>
        <div className={"panel-body"}>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              {this.state.isDisabled ? (
                <React.Fragment>
                  <div className={"header margin-right-2"}>
                    EXAMPLE ENTREPRISE
                  </div>
                </React.Fragment>
              ) : (
                <FormControl
                  type="text"
                  placeholder={"ENTREPRISES NAME"}
                  disabled={this.state.isDisabled}
                  className={"header flex-basis-50 margin-right-2"}
                />
              )}
            </Col>
          </Row>
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
                  value={"ENTxxxxxxxxxxx"}
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
                  value={"xxxxx"}
                  placeholder={"TINA ID"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                VLAN UUID
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={"xxxxx"}
                  placeholder={"VLAN UUID"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>LLID</div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={"xxxxxxx"}
                  placeholder={"LLID"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Template Name
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  disabled={this.state.isDisabled}
                  value={this.state.option}
                  onChange={e => this.setState({ option: e.target.value })}
                >
                  {OPTIONS.map((type, i) => (
                    <option key={i} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row>
          {!this.state.isDisabled && (
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={() => this.setState({ isDisabled: true })}
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
          <div className={"relative"}>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>Groups</div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12}>
                <Groups />
              </Col>
            </Row>
            {!this.state.isDisabled && <div className={"disabled-area"} />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchGetTenantById
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
