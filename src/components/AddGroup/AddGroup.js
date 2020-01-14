import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Radio from "react-bootstrap/lib/Radio";
import FormGroup from "react-bootstrap/lib/FormGroup";

import Loading from "../../common/Loading";

import { FormattedMessage } from "react-intl";
import { fetchPostCreateGroup, fetchGetConfig } from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { validateInputPhoneNumber } from "../validateInputPhoneNumber";

export class AddGroup extends Component {
  state = {
    siteName: "",
    zipCode: "",
    virtual: false,
    typeOfIad: "",
    typeOfAccess: "",
    numberOfChannels: undefined,
    serviceType: "",
    buttonName: "Create",
    //cliName: "",
    isLoading: true,
    channelHunting: "",
    np1Redundancy: false,
    mainNumber: ""
  };

  componentDidMount = () => {
    this.props.fetchGetConfig().then(() =>
      this.setState({
        isLoading: false,
        typeOfIad: this.props.config.tenant.group.pbxType[0].value,
        typeOfAccess: this.props.config.tenant.group.accessType[0].value,
        serviceType: this.props.config.tenant.group.serviceType[0].value,
        channelHunting: this.props.config.tenant.group.channelHunting[0].value,
        numberOfChannels: this.props.config.tenant.group.capacity.PRA
          .nonRedundant[0].value
      })
    );
  };
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage id="addSite" defaultMessage="ADD SITE" />
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </Button>
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="siteId" defaultMessage="Site ID" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl type="text" placeholder={"ID"} disabled />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage
                    id="siteDetails"
                    defaultMessage="Site details"
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="siteName" defaultMessage="Site Name" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.siteName}
                    placeholder={"Site Name"}
                    onChange={e => this.setState({ siteName: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            {/* <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="cliName" defaultMessage="CLI Name" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.cliName}
                    placeholder={"CLI Name"}
                    onChange={e => this.setState({ cliName: e.target.value })}
                  />
                </div>
              </Col>
            </Row> */}
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="zipCode" defaultMessage="ZIP code" />
                  {"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    className={"hide-arrows"}
                    type="number"
                    value={this.state.zipCode}
                    placeholder={"ZIP code"}
                    onChange={e => {
                      if (e.target.value < 0) {
                        return;
                      }
                      this.setState({ zipCode: e.target.value });
                    }}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="virtualSite"
                    defaultMessage="Virtual Site"
                  />
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="isVirtualSite"
                      checked={this.state.virtual}
                      onChange={e =>
                        this.setState({
                          virtual: true
                        })
                      }
                    >
                      <div className="font-weight-bold flex">
                        <FormattedMessage id="yes" defaultMessage="Yes" />
                      </div>
                    </Radio>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="isVirtualSite"
                      checked={!this.state.virtual}
                      onChange={e =>
                        this.setState({
                          virtual: false
                        })
                      }
                    >
                      <div className="font-weight-bold flex">
                        <FormattedMessage id="no" defaultMessage="No" />
                      </div>
                    </Radio>
                  </FormGroup>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="mainNumber"
                    defaultMessage="Main number"
                  />
                  {"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    className={"hide-arrows"}
                    type="number"
                    value={this.state.mainNumber}
                    placeholder={"Main number"}
                    onKeyDown={validateInputPhoneNumber}
                    onChange={e => {
                      this.setState({ mainNumber: e.target.value });
                    }}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage
                    id="productType"
                    defaultMessage="Product Type"
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="pbxType" defaultMessage="Type of IAD" />
                </div>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    defaultValue={this.state.typeOfIad}
                    onChange={e => this.setState({ typeOfIad: e.target.value })}
                  >
                    {this.props.config.tenant.group.pbxType.map((type, i) => (
                      <option key={i} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="accessType"
                    defaultMessage="Type of access"
                  />
                </div>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.typeOfAccess}
                    onChange={e =>
                      this.setState({ typeOfAccess: e.target.value })
                    }
                  >
                    {this.props.config.tenant.group.accessType.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="serviceType"
                    defaultMessage="Service Type"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.serviceType}
                    onChange={e =>
                      this.setState({ serviceType: e.target.value })
                    }
                  >
                    {this.props.config.tenant.group.serviceType.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            {(this.state.typeOfIad === "SIP" ||
              this.state.typeOfIad === "SIP_PRA") && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="np1Redundancy"
                        defaultMessage="N+1 Redundancy"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <Checkbox
                      defaultChecked={this.state.np1Redundancy}
                      onChange={e =>
                        this.setState({ np1Redundancy: e.target.checked })
                      }
                    />
                  </div>
                </Col>
              </Row>
            )}
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="channelHunting"
                    defaultMessage="Channel Hunting"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.channelHunting}
                    onChange={e =>
                      this.setState({ channelHunting: e.target.value })
                    }
                  >
                    {this.props.config.tenant.group.channelHunting.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="numbersOfChannels"
                    defaultMessage="Numbers of Channels"
                  />
                  {"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.numberOfChannels}
                    onChange={e =>
                      this.setState({ numberOfChannels: e.target.value })
                    }
                  >
                    {this.state.typeOfIad === "PRA"
                      ? ~this.props.config.tenant.group.iad[
                          "2EDUsForServiceTypes"
                        ].indexOf(this.state.serviceType)
                        ? this.props.config.tenant.group.capacity.PRA.redundant.map(
                            (type, i) => (
                              <option key={i} value={type.value}>
                                {type.label}
                              </option>
                            )
                          )
                        : this.props.config.tenant.group.capacity.PRA.nonRedundant.map(
                            (type, i) => (
                              <option key={i} value={type.value}>
                                {type.label}
                              </option>
                            )
                          )
                      : this.state.typeOfIad === "SIP"
                      ? ~this.props.config.tenant.group.iad[
                          "2EDUsForServiceTypes"
                        ].indexOf(this.state.serviceType)
                        ? this.props.config.tenant.group.capacity.SIP.redundant.map(
                            (type, i) => (
                              <option key={i} value={type.value}>
                                {type.label}
                              </option>
                            )
                          )
                        : this.props.config.tenant.group.capacity.SIP.nonRedundant.map(
                            (type, i) => (
                              <option key={i} value={type.value}>
                                {type.label}
                              </option>
                            )
                          )
                      : null}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.AddGroup}
                      type="submit"
                      className="btn-primary"
                      disabled={!this.state.zipCode}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />{" "}
                      {this.state.buttonName}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`
    );
  };

  AddGroup = () => {
    const {
      siteName,
      typeOfIad,
      typeOfAccess,
      numberOfChannels,
      serviceType,
      zipCode,
      //cliName,
      virtual,
      channelHunting,
      np1Redundancy
    } = this.state;

    const data = {
      groupName: siteName,
      //cliName,
      zipCode,
      numberOfChannels: Number(numberOfChannels),
      pbxType: typeOfIad,
      accessType: typeOfAccess,
      serviceType,
      virtual,
      channelHunting,
      np1Redundancy
    };
    const clearData = removeEmpty(data);
    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateGroup(this.props.match.params.tenantId, clearData)
        .then(res =>
          res === "created"
            ? this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`
              )
            : this.setState({ buttonName: "Create" })
        )
    );
  };
}

const mapStateToProps = state => ({
  config: state.config
});

const mapDispatchToProps = { fetchPostCreateGroup, fetchGetConfig };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddGroup)
);
