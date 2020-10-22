import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";

import Loading from "../../common/Loading";

import { removeEmpty } from "../remuveEmptyInObject";

import {
  refuseCreateTenant,
  changeStepOfCreateTenant
} from "../../store/actions";

export class TenantParameters extends Component {
  state = {
    isLoading: true,
    creating: ""
  };

  componentDidMount() {}

  render() {
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>Tenant parameters</div>
            </Col>
          </Row>
        </div>
        <div class="panel-body">
          <Row>
            <Col md={12} className={"flex-row"}>
              <div>
                <Checkbox className={"margin-top-0"}>
                  Tenant synchronized with External LDAP
                </Checkbox>
                <div className="flex space-between align-items-center margin-bottom-1">
                  <div className="nowrap margin-right-1 width-12">
                    External LDAP
                  </div>
                  <FormControl
                    componentClass="select"
                    // value={
                    //   this.props.createTenant.synchronisation_info.backend
                    // }
                    // onChange={e => {
                    //   this.props.changeBackendOfTenant(e.target.value);
                    //   this.props.fetchGetTenantOU(e.target.value);
                    // }}
                  >
                    {/* {this.props.ldapBackends.map(el => (
                            <option key={el} value={el}>
                              {el}
                            </option>
                          ))} */}
                  </FormControl>
                </div>
                <div class="button-row margin-right-0">
                  <div className="pull-right">
                    <Button
                      className={"btn-primary"}
                      onClick={this.goToLicenses}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div class="button-row">
              <div className="pull-right">
                <Button className={"btn-primary"} onClick={this.goToLicenses}>
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  Skip
                </Button>
              </div>
              <div className="pull-right link-button">
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.createdTenant.tenantId}`}
                >
                  <div onClick={() => this.props.refuseCreateTenant()}>
                    Quit wizard
                  </div>
                </Link>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  goToLicenses = () => {
    this.props.changeStepOfCreateTenant("Limits");
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant
});

const mapDispatchToProps = { refuseCreateTenant, changeStepOfCreateTenant };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantParameters)
);
