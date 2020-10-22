import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";
import Radio from "react-bootstrap/lib/Radio";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";

import {
  changeTypeOfTenant,
  changeIdOfTenant,
  changeNameOfTenant,
  changeAddressOfTenant,
  changeZIPOfTenant,
  changeCityOfTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant,
  changeDomainOfTenant,
  fetchGetExistingBackends,
  changeBackendOfTenant,
  fetchGetTenantOU,
  changeDetailsOfTenant
} from "../../store/actions";

export class Basic extends Component {
  state = {
    showMore: false,
    errorMessage: "",
    domainError: "",
    isDefault: true,
    turnOnSyncLDAP: false,
    overwriteID: false
  };

  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>Add new tenant</div>
            </Col>
          </Row>
        </div>
        <div className={"panel-body"}>
          <Row>
            <Col md={12}>
              <p>
                Select the type, configure a unique ID, a name and optionally
                some contact details
              </p>
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col md={12}>
              <p className={"larger"}>Tenant type{"\u002a"}</p>
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col md={4}>
              <ToggleButtonGroup
                type="radio"
                name="options"
                value={this.props.createTenant.type}
                onChange={this.changeTenantType}
              >
                <ToggleButton
                  className={"radio-button"}
                  value={"ServiceProvider"}
                >
                  <div>
                    <Glyphicon
                      className={"font-24"}
                      glyph="glyphicon glyphicon-cloud"
                    />
                    <p>SERVICE PROVIDER</p>
                  </div>
                </ToggleButton>
                <ToggleButton className={"radio-button"} value={"Enterprise"}>
                  <div>
                    <Glyphicon
                      className={"font-24"}
                      glyph="glyphicon glyphicon-object-align-bottom"
                    />
                    <p>ENTERPRISE</p>
                  </div>
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
            {this.props.ldapBackends.length &&
            this.props.createTenant.type === "Enterprise" ? (
              <Col>
                <div>
                  <Checkbox
                    checked={this.state.turnOnSyncLDAP}
                    onChange={e => {
                      this.setState({
                        turnOnSyncLDAP: e.target.checked
                      });
                      if (e.target.checked) {
                        this.props.changeBackendOfTenant(
                          this.props.ldapBackends[0]
                        );
                        this.props.changeDetailsOfTenant("");
                        this.props.fetchGetTenantOU(this.props.ldapBackends[0]);
                      } else {
                        this.props.changeBackendOfTenant("");
                      }
                    }}
                    className={"margin-top-0"}
                  >
                    Tenant synchronized with External LDAP
                  </Checkbox>
                  {this.state.turnOnSyncLDAP && (
                    <div>
                      <div className="flex space-between align-items-center margin-bottom-1">
                        <div className="nowrap margin-right-1 width-12">
                          External LDAP
                        </div>
                        <FormControl
                          componentClass="select"
                          value={this.props.createTenant.sync.ldap}
                          onChange={e => {
                            this.props.changeBackendOfTenant(e.target.value);
                            this.props.fetchGetTenantOU(e.target.value);
                          }}
                        >
                          {this.props.ldapBackends.map(el => (
                            <option key={el} value={el}>
                              {el}
                            </option>
                          ))}
                        </FormControl>
                      </div>
                      <div className="flex space-between align-items-center ">
                        <div className="nowrap margin-right-1 width-12">
                          Tenant OU
                        </div>
                        <FormControl
                          componentClass="select"
                          value={this.props.createTenant.sync.ou}
                          onChange={e =>
                            this.props.changeDetailsOfTenant(e.target.value)
                          }
                        >
                          {this.props.tenantOU.map(el => (
                            <option key={el.id} value={el.id}>
                              {el.id}
                            </option>
                          ))}
                        </FormControl>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            ) : null}
          </Row>
          {(!this.props.createTenant.sync.ou ||
            !this.props.createTenant.sync.ldap) && (
            <React.Fragment>
              <Row className={"margin-1"}>
                <Col md={12}>
                  <p className={"larger"}>Details</p>
                </Col>
              </Row>
              <Row className={"margin-1"}>
                <Col componentClass={ControlLabel} md={3}>
                  ID
                </Col>
                <Col md={9}>
                  <Checkbox
                    className={"margin-top-0"}
                    checked={this.state.overwriteID}
                    onChange={e =>
                      this.setState({ overwriteID: e.target.checked })
                    }
                  >
                    Overwrite default tenant ID
                  </Checkbox>
                  <FormControl
                    type="text"
                    placeholder="Tenant ID"
                    defaultValue={this.props.createTenant.tenantId}
                    disabled={!this.state.overwriteID}
                    onChange={e => {
                      this.props.changeIdOfTenant(e.target.value);
                      this.setState({ errorMessage: "" });
                    }}
                  />
                </Col>
              </Row>
              <Row className={"margin-1"}>
                <Col componentClass={ControlLabel} md={3}>
                  Name
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    placeholder="Tenant name"
                    defaultValue={this.props.createTenant.name}
                    onChange={e => {
                      this.props.changeNameOfTenant(e.target.value);
                      this.setState({ errorMessage: "" });
                    }}
                  />
                </Col>
              </Row>
              <Row className={"margin-1"}>
                <Col componentClass={ControlLabel} md={3}>
                  Domain
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Radio
                      name="domain"
                      checked={this.state.isDefault}
                      onClick={() => {
                        this.props.changeDomainOfTenant("");
                        this.setState({
                          isDefault: !this.state.isDefault
                        });
                      }}
                    >
                      <div className="font-weight-bold flex">
                        use default domain
                      </div>
                    </Radio>
                    <div className={"flex align-items-center"}>
                      <Radio
                        name="domain"
                        className={"nowrap margin-right-1"}
                        checked={!this.state.isDefault}
                        onClick={() =>
                          this.setState({
                            isDefault: !this.state.isDefault
                          })
                        }
                      >
                        <div className="font-weight-bold flex">
                          specify domain
                        </div>
                      </Radio>
                      <FormControl
                        type="text"
                        placeholder="Domain"
                        disabled={this.state.isDefault}
                        defaultValue={this.props.createTenant.defaultDomain}
                        onChange={e => {
                          this.validateDomain(e.target.value);
                          this.setState({ errorMessage: "" });
                        }}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              {this.state.domainError && (
                <Row className={"margin-1 color-error"}>
                  <Col md={12}>
                    <p>{this.state.domainError}</p>
                  </Col>
                </Row>
              )}
              <Row className={"margin-1"}>
                <Col mdOffset={0} md={2}>
                  {!this.state.showHideMore ? (
                    <Glyphicon
                      className={"glyphicon-light"}
                      glyph="glyphicon glyphicon-collapse-down"
                      onClick={this.showHideMore}
                      style={{ display: "flex", lineHeight: "20px" }}
                    >
                      <div
                        style={{
                          fontFamily: `"Ubuntu, Helvetica Neue",Helvetica,Arial,sans-serif`
                        }}
                      >
                        Add address
                      </div>
                    </Glyphicon>
                  ) : (
                    <Glyphicon
                      className={"glyphicon-light"}
                      glyph="glyphicon glyphicon-collapse-down"
                      onClick={this.showHideMore}
                      style={{ display: "flex", lineHeight: "20px" }}
                    >
                      <div
                        style={{
                          fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                        }}
                      >
                        Hide
                      </div>
                    </Glyphicon>
                  )}
                </Col>
              </Row>
              {this.state.showHideMore && (
                <React.Fragment>
                  <Row className={"margin-1"}>
                    <Col componentClass={ControlLabel} md={3}>
                      Addess
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="Street"
                        defaultValue={
                          this.props.createTenant.address.addressLine1
                        }
                        onChange={e =>
                          this.props.changeAddressOfTenant(e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row className={"margin-1"}>
                    <Col mdOffset={3} md={3}>
                      <FormControl
                        type="text"
                        placeholder="ZIP"
                        defaultValue={
                          this.props.createTenant.address.postalCode
                        }
                        onChange={e =>
                          this.props.changeZIPOfTenant(e.target.value)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <FormControl
                        type="text"
                        placeholder="City"
                        defaultValue={this.props.createTenant.address.city}
                        onChange={e =>
                          this.props.changeCityOfTenant(e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                </React.Fragment>
              )}
              {this.state.errorMessage && (
                <Row className={"margin-1 color-error"}>
                  <Col md={12}>
                    <p>{this.state.errorMessage}</p>
                  </Col>
                </Row>
              )}
            </React.Fragment>
          )}
          <Row className={"margin-1"}>
            <div class="button-row">
              <div className="pull-right">
                <Button className={"btn-primary"} onClick={this.nextStep}>
                  <Glyphicon glyph="glyphicon glyphicon-ok"></Glyphicon>
                  &nbsp; Next
                </Button>
              </div>
              <div className="pull-right link-button">
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants`}
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

  changeTenantType = value => {
    this.props.changeTypeOfTenant(value);
    if (
      this.props.createTenant.type !== "Enterprise" &&
      value === "Enterprise"
    ) {
      this.props.fetchGetExistingBackends();
    }
    if (value === "ServiceProvider") {
      this.props.changeBackendOfTenant("");
      this.props.changeDetailsOfTenant("");
      this.setState({ turnOnSyncLDAP: false });
    }
    this.setState({ errorMessage: "" });
  };

  nextStep = () => {
    const { tenantId, type } = this.props.createTenant;
    this.props.changeStepOfCreateTenant("Template");
  };

  validateDomain = value => {
    if (value.length < 2 || value.length > 80 || value.includes("@")) {
      this.props.changeDomainOfTenant(value);
      this.setState({
        domainError:
          "Domain length must be from 2 to 80 characters and not contain the @ symbol"
      });
      return;
    }
    this.props.changeDomainOfTenant(value);
    this.setState({ domainError: "" });
  };

  showHideMore = () => {
    this.setState(prevState => ({ showHideMore: !prevState.showHideMore }));
  };
}

const mapStateToProps = state => ({
  createTenant: state.createTenant,
  ldapBackends: state.ldapBackends,
  tenantOU: state.tenantOU
});

const mapDispatchToProps = {
  changeTypeOfTenant,
  changeIdOfTenant,
  changeNameOfTenant,
  changeAddressOfTenant,
  changeZIPOfTenant,
  changeCityOfTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant,
  changeDomainOfTenant,
  fetchGetExistingBackends,
  changeBackendOfTenant,
  fetchGetTenantOU,
  changeDetailsOfTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
