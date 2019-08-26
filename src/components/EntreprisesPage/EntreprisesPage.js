import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";
import Groups from "./Groups";

import { fetchGetTenantById } from "../../store/actions";

class TenantPage extends Component {
  state = {
    isLoading: true,
    showDelete: false
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
        <div className={"panel-heading"}>
          <div className={"header"}>ENTREPRISES NAME: xxxxx</div>
        </div>
        <div className={"panel-body"}>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex font-24"}>
                <div className={"margin-right-1"}>Details</div>
                <Glyphicon
                  Glyphicon
                  glyph="glyphicon glyphicon-pencil"
                ></Glyphicon>
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
                  disabled
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
                  disabled
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
                  disabled
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
                  type="text"
                  value={"option 1"}
                  placeholder={"Template Name"}
                  disabled
                />
              </div>
            </Col>
          </Row>
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
