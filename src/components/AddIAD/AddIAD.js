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
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { FormattedMessage } from "react-intl";
import {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPostCreateIAD,
  fetchGetIADs,
  fetchGetPhoneNumbersByGroupNotTP
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";
import { validateInputPhoneNumber } from "../validateInputPhoneNumber";

import { TRANSPORTMODE, IP1MODE } from "../../constants";
import Loading from "../../common/Loading";

import { isAllowed, pages } from "../../utils/user";

export class AddIAD extends Component {
  state = {
    disabledButton: false,
    isLoadingConfig: true,
    errorMacAddress: null,
    errorPbxIpAdress: null,
    errorIpAdressV4: null,
    errorNetMaskV4: null,
    errorIpAdressV6: null,
    errorNetMaskV6: null,
    isLoadingGroup: true,
    isloadingIADs: true,
    secondEDU: false,
    iadType: "",
    macAddress: "",
    pilotNumber: "",
    cliPhoneNumber: "",
    nameEDUA: "",
    lanPortA: "",
    wanPortA: "",
    srNameA: "",
    srSAPA: "",
    eduVLANIDA: "",
    nameEDUB: "",
    lanPortB: "",
    wanPortB: "",
    srNameB: "",
    srSAPB: "",
    eduVLANIDB: "",
    transportMode: "",
    ip1mode: "Disabled",
    ipv4Address: "",
    ipv4Netmask: "",
    ipv6Address: "",
    ipv6Netmask: "",
    ipAddress: "",
    port: "",
    dtmf: "",
    direction: "",
    channelsIn: "",
    channelsOut: "",
    buttonName: "Create",
    tpid: "",
    circuitID: "",
    praByIad: {},
    arrayOfPraId: [],
    selectedID: [],
    clock_master: true,
    dual_power: false,
    isdnTerminationSide: "Network",
    isLoadingPN: true
  };
  componentDidMount() {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState(
          {
            cliPhoneNumber: this.props.group.cliPhoneNumber,
            isLoadingGroup: false
          },
          () =>
            this.props.fetchGetConfig().then(() =>
              this.setState({
                isLoadingConfig: false,
                iadType: this.props.config.tenant.group.iad.iadType[0].value,
                dtmf: this.props.config.tenant.group.iad.dtmfOverride[0].value,
                direction: this.props.config.tenant.group.iad
                  .directionOverride[0].value,
                secondEDU:
                  this.props.config.tenant.group.iad[
                    "2EDUsForServiceTypes"
                  ].indexOf(this.props.group.serviceType) !== -1
              })
            )
        )
      )
      .then(() =>
        this.props
          .fetchGetIADs(
            this.props.match.params.tenantId,
            this.props.match.params.groupId
          )
          .then(() =>
            this.props.group.pbxType === "PRA" ||
            this.props.group.pbxType === "PRA_SIP" ||
            this.props.group.pbxType === "SIP_PRA"
              ? this.setPraByIad()
              : this.setState({ isloadingIADs: false })
          )
      );
    this.props
      .fetchGetPhoneNumbersByGroupNotTP(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState({
          isLoadingPN: false,
          cliPhoneNumber: this.props.phoneNumbersByGroupNotTP[0]
        })
      );
  }

  render() {
    const {
      disabledButton,
      nameEDUA,
      lanPortA,
      wanPortA,
      eduVLANIDA,
      srNameA,
      srSAPA,
      secondEDU,
      nameEDUB,
      lanPortB,
      wanPortB,
      eduVLANIDB,
      srNameB,
      srSAPB,
      iadType,
      pilotNumber,
      errorMacAddress,
      errorPbxIpAdress,
      errorIpAdressV4,
      errorNetMaskV4,
      errorIpAdressV6,
      errorNetMaskV6,
      cliPhoneNumber
    } = this.state;
    if (
      this.state.isLoadingConfig ||
      this.state.isLoadingGroup ||
      this.state.isloadingIADs ||
      this.state.isLoadingPN
    ) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage id="addIad" defaultMessage="ADD IAD" />
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </Button>
            </div>
            <div>
              <FormattedMessage
                id="addIadInfo"
                defaultMessage="Enter your IAD specificities, configurations and optional overrides"
              />
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage id="details" defaultMessage="DETAILS" />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage id="id" defaultMessage="ID" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl type="text" disabled />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="virtualIAD"
                      defaultMessage="Virtual IAD"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="isVirtualIAD"
                      checked={this.props.group.virtual}
                      disabled
                    >
                      <div className="font-weight-bold flex">
                        <FormattedMessage id="yes" defaultMessage="Yes" />
                      </div>
                    </Radio>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="isVirtualIAD"
                      checked={!this.props.group.virtual}
                      disabled
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
                  <ControlLabel>
                    <FormattedMessage
                      id="iadType"
                      defaultMessage="Type of IAD"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.iadType}
                    onChange={e => this.setState({ iadType: e.target.value })}
                  >
                    {this.props.config.tenant.group.iad.iadType.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.label}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <FormGroup
              controlId="errorMacAddress"
              validationState={this.state.errorMacAddress}
            >
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="macAddress"
                        defaultMessage="MAC Address"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      value={this.state.macAddress}
                      placeholder={"MAC Address"}
                      onChange={e =>
                        this.setState({
                          macAddress: e.target.value,
                          errorMacAddress: false
                        })
                      }
                      disabled={this.props.group.virtual}
                      onBlur={this.validateMacAddress}
                    />
                  </div>
                </Col>
              </Row>
              {this.state.errorMacAddress && (
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}></div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <HelpBlock bsClass="color-error">
                        <FormattedMessage
                          id="errorMacAddress"
                          defaultMessage="Invalide MAC address"
                        />
                      </HelpBlock>
                    </div>
                  </Col>
                </Row>
              )}
            </FormGroup>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="maintenanceNumber"
                      defaultMessage="Maintenance number"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.pilotNumber}
                    placeholder={"Maintenance number"}
                    onKeyDown={validateInputPhoneNumber}
                    onChange={e =>
                      this.setState({ pilotNumber: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="mainNumber"
                      defaultMessage="Main Number"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.cliPhoneNumber}
                    onChange={e =>
                      this.setState({
                        cliPhoneNumber: e.target.value
                      })
                    }
                  >
                    {this.props.phoneNumbersByGroupNotTP.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>

            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage
                    id="eduConfiguration"
                    defaultMessage="EDU configuration"
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="eduAName"
                      defaultMessage="EDU A Name"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.nameEDUA}
                    placeholder={"EDU Name"}
                    onChange={e => this.setState({ nameEDUA: e.target.value })}
                    disabled={this.props.group.virtual}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="eduBName"
                        defaultMessage="EDU B Name"
                      />
                      {"\u002a"}
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.nameEDUB}
                      placeholder={"EDU Name"}
                      onChange={e =>
                        this.setState({ nameEDUB: e.target.value })
                      }
                      disabled={this.props.group.virtual}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="lanPort" defaultMessage="LAN port" />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.lanPortA}
                    placeholder={"LAN port"}
                    onChange={e => {
                      if (isNaN(e.target.value)) {
                        return;
                      }
                      this.setState({ lanPortA: e.target.value });
                    }}
                    disabled={this.props.group.virtual}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="lanPort"
                        defaultMessage="LAN port"
                      />
                      {"\u002a"}
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.lanPortB}
                      placeholder={"LAN port"}
                      onChange={e => {
                        if (isNaN(e.target.value)) {
                          return;
                        }
                        this.setState({ lanPortB: e.target.value });
                      }}
                      disabled={this.props.group.virtual}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="wanPort" defaultMessage="WAN port" />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.wanPortA}
                    placeholder={"WAN port"}
                    onChange={e => {
                      this.setState({ wanPortA: e.target.value });
                    }}
                    disabled={this.props.group.virtual}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="wanPort"
                        defaultMessage="WAN port"
                      />
                      {"\u002a"}
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.wanPortB}
                      placeholder={"WAN port"}
                      onChange={e => {
                        this.setState({ wanPortB: e.target.value });
                      }}
                      disabled={this.props.group.virtual}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="eduVlanId"
                      defaultMessage="EDU VLAN ID"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.eduVLANIDA}
                    placeholder={"EDU VLAN ID"}
                    onChange={e => {
                      if (
                        isNaN(e.target.value) ||
                        e.target.value < 0 ||
                        e.target.value > 4096
                      ) {
                        return;
                      }
                      this.setState({ eduVLANIDA: e.target.value });
                    }}
                    disabled={this.props.group.virtual}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="eduVlanId"
                        defaultMessage="EDU VLAN ID"
                      />
                      {"\u002a"}
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.eduVLANIDB}
                      placeholder={"EDU VLAN ID"}
                      onChange={e => {
                        if (
                          isNaN(e.target.value) ||
                          e.target.value < 0 ||
                          e.target.value > 4096
                        ) {
                          return;
                        }
                        this.setState({ eduVLANIDB: e.target.value });
                      }}
                      disabled={this.props.group.virtual}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="srName" defaultMessage="SR name" />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.srNameA}
                    placeholder={"SR name"}
                    onChange={e => this.setState({ srNameA: e.target.value })}
                    disabled={this.props.group.virtual}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage id="srName" defaultMessage="SR name" />
                      {"\u002a"}
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.srNameB}
                      placeholder={"SR name"}
                      onChange={e => this.setState({ srNameB: e.target.value })}
                      disabled={this.props.group.virtual}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="srSap" defaultMessage="SR SAP" />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.srSAPA}
                    placeholder={"SR SAP"}
                    onChange={e => this.setState({ srSAPA: e.target.value })}
                    disabled={this.props.group.virtual}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage id="srSap" defaultMessage="SR SAP" />
                      {"\u002a"}
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.srSAPB}
                      placeholder={"SR SAP"}
                      onChange={e => this.setState({ srSAPB: e.target.value })}
                      disabled={this.props.group.virtual}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage
                    id="overrideSite"
                    defaultMessage="Override the default site settings"
                  />
                </div>
              </Col>
            </Row>
            {(this.props.group.pbxType === "SIP" ||
              this.props.group.pbxType === "PRA_SIP" ||
              this.props.group.pbxType === "SIP_PRA") && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage id="dtmf" defaultMessage="DTMF" />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex"}>
                    <FormControl
                      componentClass="select"
                      value={this.state.dtmf}
                      disabled={this.props.group.virtual}
                      onChange={e =>
                        this.setState({
                          dtmf: e.target.value
                        })
                      }
                      //disabled={
                      //  !isAllowed(
                      //    localStorage.getItem("userProfile"),
                      //    pages.edit_group_iad_services_dtmf
                      //  )
                      //}
                    >
                      {this.props.config.tenant.group.iad.dtmfOverride.map(
                        (el, i) => (
                          <option key={i} value={el.value}>
                            {el.label}
                          </option>
                        )
                      )}
                    </FormControl>
                  </div>
                </Col>
              </Row>
            )}
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="direction"
                      defaultMessage="Direction"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.direction}
                    onChange={e =>
                      this.setState({
                        direction: e.target.value
                      })
                    }
                  >
                    {this.props.config.tenant.group.iad.directionOverride.map(
                      (el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            {this.state.direction === "Uni" && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="numbersOfChannels"
                          defaultMessage="Numbers Of Channels"
                        />
                      </ControlLabel>
                      {"\u002a"}
                    </div>
                    <React.Fragment>
                      <div className={"margin-right-1 flex"}>
                        <ControlLabel className={"margin-0 margin-right-1"}>
                          <FormattedMessage id="in" defaultMessage="In" />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-11"}>
                        <FormControl
                          type="text"
                          value={this.state.channelsIn}
                          placeholder={"In"}
                          onChange={e =>
                            this.setState({
                              channelsIn: Number(e.target.value)
                            })
                          }
                        />
                      </div>
                      <div className={"margin-right-1 flex"}>
                        <ControlLabel className={"margin-0 margin-right-1"}>
                          <FormattedMessage id="out" defaultMessage="Out" />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-11"}>
                        <FormControl
                          type="text"
                          value={this.state.channelsOut}
                          placeholder={"Out"}
                          onChange={e =>
                            this.setState({
                              channelsOut: Number(e.target.value)
                            })
                          }
                        />
                      </div>
                    </React.Fragment>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"} />
                    <div className={"margin-right-1 flex-basis-33"}>
                      {/* {"\u002a"}
                      <FormattedMessage id="nocInfo" defaultMessage="" /> */}
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
            {(this.props.group.pbxType === "PRA" ||
              this.props.group.pbxType === "PRA_SIP" ||
              this.props.group.pbxType === "SIP_PRA") && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex font-24"}>
                    <FormattedMessage id="praByIad" defaultMessage="PRA info" />
                  </div>
                </Col>
              </Row>
            )}
            {(this.props.group.pbxType === "PRA" ||
              this.props.group.pbxType === "PRA_SIP" ||
              this.props.group.pbxType === "SIP_PRA") &&
              Object.keys(this.state.praByIad).map((pra, i) => (
                <React.Fragment key={i + ""}>
                  <Row className={"margin-top-1"}>
                    <Col md={12} className={"flex align-items-center"}>
                      <div className={"margin-right-1 flex font-18"}>
                        <FormattedMessage
                          id="praNumber"
                          defaultMessage={`PRA ${i + 1}`}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className={"margin-top-1"}>
                    <Col md={12} className={"flex align-items-center"}>
                      <div className={"margin-right-1 flex flex-basis-16"}>
                        <ControlLabel>
                          <FormattedMessage
                            id="praPort"
                            defaultMessage="PRA Port"
                          />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-33"}>
                        <FormControl
                          componentClass="select"
                          value={this.state.praByIad[pra].praID}
                          disabled={this.props.group.virtual}
                          onChange={e => {
                            let selectedID = [...this.state.selectedID];
                            if (Number(e.target.value) !== 0) {
                              selectedID.push(Number(e.target.value));
                              if (this.state.praByIad[pra].praID) {
                                const index = selectedID.indexOf(
                                  this.state.praByIad[pra].praID
                                );
                                if (index !== -1) {
                                  selectedID.splice(index, 1);
                                }
                              }
                            } else if (Number(e.target.value) === 0) {
                              const index = selectedID.indexOf(
                                this.state.praByIad[pra].praID
                              );
                              if (index !== -1) {
                                selectedID.splice(index, 1);
                              }
                            }
                            this.setState({
                              selectedID,
                              praByIad: {
                                ...this.state.praByIad,
                                [pra]: {
                                  ...this.state.praByIad[pra],
                                  praID: Number(e.target.value),
                                  enabled: Number(e.target.value) ? true : false
                                }
                              }
                            });
                          }}
                          //disabled={
                          //  !isAllowed(
                          //    localStorage.getItem("userProfile"),
                          //    pages.edit_iad_pra_info_pra_port
                          //  )
                          //}
                        >
                          {this.state.arrayOfPraId.map((el, i) => (
                            <option
                              key={i}
                              value={el.value}
                              disabled={this.state.selectedID.includes(
                                el.value
                              )}
                            >
                              {el.label}
                            </option>
                          ))}
                        </FormControl>
                      </div>
                    </Col>
                  </Row>
                  <Row className={"margin-top-1"}>
                    <Col md={12} className={"flex align-items-center"}>
                      <div className={"margin-right-1 flex flex-basis-16"}>
                        <ControlLabel>
                          <FormattedMessage
                            id="tpid"
                            defaultMessage="Tina Product ID"
                          />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-33"}>
                        <FormControl
                          type="text"
                          placeholder={"Tina Product ID"}
                          disabled={
                            !this.state.praByIad[pra].praID //||
                            //!isAllowed(
                            //  localStorage.getItem("userProfile"),
                            //  pages.edit_iad_pra_info_tpid
                            //)
                          }
                          onChange={e =>
                            this.setState({
                              praByIad: {
                                ...this.state.praByIad,
                                [pra]: {
                                  ...this.state.praByIad[pra],
                                  tpid: e.target.value
                                }
                              }
                            })
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className={"margin-top-1"}>
                    <Col md={12} className={"flex align-items-center"}>
                      <div className={"margin-right-1 flex flex-basis-16"}>
                        <ControlLabel>
                          <FormattedMessage
                            id="circuitID"
                            defaultMessage="Circuit ID"
                          />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-33"}>
                        <FormControl
                          type="text"
                          placeholder={
                            "Prefix followed by national phone number"
                          }
                          disabled={
                            !this.state.praByIad[pra].praID //||
                            //!isAllowed(
                            //  localStorage.getItem("userProfile"),
                            //  pages.edit_iad_pra_info_circuit_id
                            //)
                          }
                          onChange={e =>
                            this.setState({
                              praByIad: {
                                ...this.state.praByIad,
                                [pra]: {
                                  ...this.state.praByIad[pra],
                                  circuit_id: e.target.value
                                }
                              }
                            })
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className={"margin-top-1"}>
                    <Col md={12} className={"flex align-items-center"}>
                      <div className={"margin-right-1 flex flex-basis-16"}>
                        <ControlLabel>
                          <FormattedMessage
                            id="enabled"
                            defaultMessage="Enabled"
                          />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-33"}>
                        <Checkbox
                          className={"table-checkbox"}
                          checked={this.state.praByIad[pra].enabled}
                          disabled={
                            !this.state.praByIad[pra].praID //||
                            //!isAllowed(
                            //  localStorage.getItem("userProfile"),
                            //  pages.edit_iad_pra_info_enabled
                            //)
                          }
                          onChange={e =>
                            this.setState({
                              praByIad: {
                                ...this.state.praByIad,
                                [pra]: {
                                  ...this.state.praByIad[pra],
                                  enabled: e.target.checked
                                }
                              }
                            })
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </React.Fragment>
              ))}
            {(this.props.group.pbxType === "SIP" ||
              this.props.group.pbxType === "PRA_SIP" ||
              this.props.group.pbxType === "SIP_PRA") && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex font-24"}>
                    <FormattedMessage
                      id="localIpAddressing"
                      defaultMessage="Local IP Addressing"
                    />
                  </div>
                </Col>
              </Row>
            )}
            {(this.props.group.pbxType === "SIP" ||
              this.props.group.pbxType === "PRA_SIP" ||
              this.props.group.pbxType === "SIP_PRA") && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="transportMode"
                        defaultMessage="Transport mode"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex"}>
                    <FormGroup className={"margin-0 flex"}>
                      {TRANSPORTMODE.map((type, i) => (
                        <Radio
                          className={"margin-0 flex margin-right-2"}
                          key={i + ""}
                          name="transportMode"
                          value={type.value}
                          checked={type.value === this.state.transportMode}
                          disabled={this.props.group.virtual}
                          onChange={e =>
                            this.setState({
                              transportMode: e.target.value
                            })
                          }
                          //disabled={
                          //  !isAllowed(
                          //    localStorage.getItem("userProfile"),
                          //    pages.edit_group_iad_transportMode
                          //  )
                          //}
                        >
                          <div className="font-weight-bold flex">
                            {type.name}
                          </div>
                        </Radio>
                      ))}
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            )}
            {(this.props.group.pbxType === "SIP" ||
              this.props.group.pbxType === "PRA_SIP" ||
              this.props.group.pbxType === "SIP_PRA") && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="iadLanAddress"
                          defaultMessage="IAD LAN address"
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex"}>
                      <FormGroup className={"margin-0 flex"}>
                        {IP1MODE.map((type, i) => (
                          <Radio
                            className={"margin-0 flex margin-right-2"}
                            key={i + ""}
                            name="ip1mode"
                            value={type.value}
                            checked={type.value === this.state.ip1mode}
                            disabled={this.props.group.virtual}
                            onChange={e =>
                              this.setState({
                                ip1mode: e.target.value
                              })
                            }
                            //disabled={
                            //  !isAllowed(
                            //    localStorage.getItem("userProfile"),
                            //    pages.edit_group_iad_ip1_mode
                            //  )
                            //}
                          >
                            <div className="font-weight-bold flex">
                              {type.name}
                            </div>
                          </Radio>
                        ))}
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
                {this.state.ip1mode === "IPv4" && (
                  <React.Fragment>
                    <Row className={"margin-top-1"}>
                      <Col md={6}>
                        <FormGroup
                          controlId="errorIpAdressv4"
                          validationState={this.state.errorIpAdressV4}
                          className={"ip-address-styles"}
                        >
                          <ControlLabel
                            className={"margin-right-1 flex-basis-33"}
                          >
                            <FormattedMessage
                              id="IPv4Address"
                              defaultMessage="IPv4 address"
                            />
                          </ControlLabel>
                          <FormControl
                            className={"flex-basis-66"}
                            type="text"
                            value={this.state.ipv4Address}
                            placeholder={"IPv4 address"}
                            disabled={this.props.group.virtual}
                            onChange={e =>
                              this.setState({
                                ipv4Address: e.target.value,
                                errorIpAdressV4: null
                              })
                            }
                            onBlur={this.validateIPAddressV4}
                            // disabled={
                            //   !isAllowed(
                            //     localStorage.getItem("userProfile"),
                            //     pages.edit_group_iad_ip1_ipv4Address
                            //   )
                            // }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.state.errorIpAdressV4 && (
                      <Row className={"margin-top-1 "}>
                        <Col md={6} className={"flex"}>
                          <div
                            className={"margin-right-1 flex flex-basis-33"}
                          ></div>
                          <div className={"flex-basis-66"}>
                            <HelpBlock bsClass="color-error">
                              <FormattedMessage
                                id="errorIpAdress"
                                defaultMessage="Invalide IP address"
                              />
                            </HelpBlock>
                          </div>
                        </Col>
                      </Row>
                    )}
                    <Row className={"margin-top-1"}>
                      <Col md={6}>
                        <FormGroup
                          controlId="errorNetMaskV4"
                          validationState={this.state.errorNetMaskV4}
                          className={"ip-address-styles"}
                        >
                          <ControlLabel
                            className={"margin-right-1 flex-basis-33"}
                          >
                            <FormattedMessage
                              id="IPv4Netmask"
                              defaultMessage="IPv4 netmask"
                            />
                          </ControlLabel>
                          <FormControl
                            className={"flex-basis-66"}
                            type="text"
                            value={this.state.ipv4Netmask}
                            disabled={this.props.group.virtual}
                            placeholder={"IPv4 netmask"}
                            onChange={e =>
                              this.setState({
                                ipv4Netmask: e.target.value,
                                errorNetMaskV4: null
                              })
                            }
                            onBlur={this.validateNetMaskV4}
                            // disabled={
                            //   !isAllowed(
                            //     localStorage.getItem("userProfile"),
                            //     pages.edit_group_iad_ip1_ipv4Netmask
                            //   )
                            // }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.state.errorNetMaskV4 && (
                      <Row className={"margin-top-1 "}>
                        <Col md={6} className={"flex"}>
                          <div
                            className={"margin-right-1 flex flex-basis-33"}
                          ></div>
                          <div className={"flex-basis-66"}>
                            <HelpBlock bsClass="color-error">
                              <FormattedMessage
                                id="errorNetMask"
                                defaultMessage="Invalide Net Mask"
                              />
                            </HelpBlock>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </React.Fragment>
                )}
                {this.state.ip1mode === "IPv6" && (
                  <React.Fragment>
                    <Row className={"margin-top-1"}>
                      <Col md={6}>
                        <FormGroup
                          controlId="errorIpAdressv6"
                          validationState={this.state.errorIpAdressV6}
                          className={"ip-address-styles"}
                        >
                          <ControlLabel
                            className={"margin-right-1 flex-basis-33"}
                          >
                            <FormattedMessage
                              id="IPv6Address"
                              defaultMessage="IPv6 address"
                            />
                          </ControlLabel>
                          <FormControl
                            className={"flex-basis-66"}
                            value={this.state.ipv6Address}
                            placeholder={"IPv6 address"}
                            disabled={this.props.group.virtual}
                            onChange={e =>
                              this.setState({
                                ipv6Address: e.target.value,
                                errorIpAdressV6: null
                              })
                            }
                            type="text"
                            onBlur={this.validateIPAddressV6}
                            // disabled={
                            //   !isAllowed(
                            //     localStorage.getItem("userProfile"),
                            //     pages.edit_group_iad_ip1_ipv6Address
                            //   )
                            // }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.state.errorIpAdressV6 && (
                      <Row className={"margin-top-1 "}>
                        <Col md={6} className={"flex"}>
                          <div
                            className={"margin-right-1 flex flex-basis-33"}
                          ></div>
                          <div className={"flex-basis-66"}>
                            <HelpBlock bsClass="color-error">
                              <FormattedMessage
                                id="errorIpAdress"
                                defaultMessage="Invalide IP address"
                              />
                            </HelpBlock>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
            {(this.props.group.pbxType === "SIP" ||
              this.props.group.pbxType === "PRA_SIP" ||
              this.props.group.pbxType === "SIP_PRA") && (
              <React.Fragment>
                <Row className={"margin-top-1 "}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="IPPBXAddress"
                          defaultMessage="IP-PBX address"
                        />
                      </ControlLabel>
                    </div>
                    <div
                      className={
                        "margin-right-1 flex flex-basis-33 align-items-center"
                      }
                    >
                      <FormGroup
                        controlId="errorPbxIpAdress"
                        validationState={this.state.errorPbxIpAdress}
                        className={"margin-0 flex width-100p"}
                      >
                        <div className={"flex align-items-center width-100p"}>
                          <ControlLabel className={"margin-0 margin-right-1"}>
                            <FormattedMessage
                              id="ipAddress"
                              defaultMessage="IP Address"
                            />
                          </ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.ipAddress}
                            placeholder={"IP Address"}
                            disabled={this.props.group.virtual}
                            onChange={e =>
                              this.setState({
                                ipAddress: e.target.value,
                                errorPbxIpAdress: null
                              })
                            }
                            onBlur={this.validatePbxIPAddress}
                            // disabled={
                            //   !isAllowed(
                            //     localStorage.getItem("userProfile"),
                            //     pages.edit_group_iad_pbx_IPAddress
                            //   )
                            // }
                          />
                        </div>
                      </FormGroup>
                    </div>
                    <div
                      className={
                        "margin-right-1 flex flex-basis-33 align-items-center"
                      }
                    >
                      <ControlLabel className={"margin-0 margin-right-1"}>
                        <FormattedMessage id="port" defaultMessage="Port" />
                      </ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.port}
                        placeholder={"Port"}
                        disabled={this.props.group.virtual}
                        onChange={e => {
                          if (isNaN(e.target.value)) {
                            return;
                          }
                          this.setState({ port: e.target.value });
                        }}
                        // disabled={
                        //   !isAllowed(
                        //     localStorage.getItem("userProfile"),
                        //     pages.edit_group_iad_pbx_port
                        //   )
                        // }
                      />
                    </div>
                  </Col>
                </Row>
                {this.state.errorPbxIpAdress && (
                  <Row className={"margin-top-1 "}>
                    <Col md={12} className={"flex align-items-center"}>
                      <div
                        className={"margin-right-1 flex flex-basis-16"}
                      ></div>
                      <div
                        className={
                          "margin-right-1 flex flex-basis-33 align-items-center"
                        }
                      >
                        <HelpBlock bsClass="color-error">
                          <FormattedMessage
                            id="errorIpAdress"
                            defaultMessage="Invalide IP address"
                          />
                        </HelpBlock>
                      </div>
                    </Col>
                  </Row>
                )}
              </React.Fragment>
            )}
            <React.Fragment>
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex font-24"}>
                    <FormattedMessage
                      id="advanced_parameters"
                      defaultMessage="Advanced Parameters"
                    />
                  </div>
                </Col>
              </Row>
              {this.props.group.pbxType !== "SIP" && (
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="clockMaster"
                          defaultMessage="Clock Master"
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <Checkbox
                        defaultChecked={this.state.clock_master}
                        disabled={this.props.group.virtual}
                        onChange={e =>
                          this.setState({ clock_master: e.target.checked })
                        }
                        // disabled={
                        //   !isAllowed(
                        //     localStorage.getItem("userProfile"),
                        //     pages.edit_group_iad_advanced_clock_master
                        //   )
                        // }
                      />
                    </div>
                  </Col>
                </Row>
              )}
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="dualPower"
                        defaultMessage="Dual Power"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <Checkbox
                      checked={this.state.dual_power}
                      disabled={this.props.group.virtual}
                      onChange={e =>
                        this.setState({ dual_power: e.target.checked })
                      }
                      // disabled={
                      //   !isAllowed(
                      //     localStorage.getItem("userProfile"),
                      //     pages.edit_group_iad_advanced_dual_power
                      //   )
                      // }
                    />
                  </div>
                </Col>
              </Row>
              {(this.props.group.pbxType === "PRA" ||
                this.props.group.pbxType === "PRA_SIP" ||
                this.props.group.pbxType === "SIP_PRA") && (
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="isdnTerminationSide"
                          defaultMessage="ISDN termination side"
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        componentClass="select"
                        value={this.state.isdnTerminationSide}
                        disabled={this.props.group.virtual}
                        onChange={e =>
                          this.setState({ isdnTerminationSide: e.target.value })
                        }
                        // disabled={
                        //   !isAllowed(
                        //     localStorage.getItem("userProfile"),
                        //     pages.edit_group_iad_advanced_isdnTerminationSide
                        //   )
                        // }
                      >
                        {this.props.config.tenant.group.iad.isdnTerminationSide.map(
                          (el, i) => (
                            <option key={i} value={el.value}>
                              {el.label}
                            </option>
                          )
                        )}
                      </FormControl>
                    </div>
                  </Col>
                </Row>
              )}
            </React.Fragment>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.addAID}
                      type="submit"
                      className="btn-primary"
                      disabled={
                        this.props.group.virtual
                          ? !iadType ||
                            !pilotNumber ||
                            disabledButton ||
                            !cliPhoneNumber
                          : disabledButton ||
                            errorMacAddress ||
                            errorPbxIpAdress ||
                            errorIpAdressV4 ||
                            errorNetMaskV4 ||
                            errorIpAdressV6 ||
                            errorNetMaskV6 ||
                            !iadType ||
                            !pilotNumber ||
                            !cliPhoneNumber ||
                            !nameEDUA ||
                            !lanPortA ||
                            !wanPortA ||
                            !srNameA ||
                            !srSAPA ||
                            !eduVLANIDA ||
                            (secondEDU &&
                              (!nameEDUB ||
                                !lanPortB ||
                                !wanPortB ||
                                !srNameB ||
                                !srSAPB ||
                                !eduVLANIDB))
                      }
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

  setPraByIad = () => {
    let praByIad = { ...this.state.praByIad };
    let arrayOfPraId = [
      { value: 0, label: "None" },
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 }
    ];
    const createdIADs = this.props.iads.iads.map(el =>
      Number(el.iadId.slice(-2))
    );
    const unic = Object.keys(this.props.iads.praByIad).filter(
      el => createdIADs.indexOf(Number(el)) === -1
    );
    if (Object.keys(praByIad).length < unic[0]) {
      for (let i = 0; i < this.props.iads.praByIad[unic[0]]; i++) {
        praByIad = {
          ...praByIad,
          [i + 1]: { tpid: "", circuit_id: "", praID: "", enabled: "" }
        };
      }
    }
    this.setState({ praByIad, arrayOfPraId, isloadingIADs: false });
  };

  validateNetMaskV6 = e => {
    let reg = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorNetMaskV6: "error" });
    }
  };

  validateIPAddressV6 = e => {
    let reg = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/;
    let parts =  e.target.value.split("/");
    if (parts.length > 2) {
      return this.setState({ errorIpAdressV6: "error" });
    }
    if (parts.length < 2) {
      if (reg.test(e.target.value) || e.target.value === "") {
        return;
      } else {
        return this.setState({ errorIpAdressV6: "error" });
      }
    }
    // not > 2 and not 2 so automatically 2: ip + mask
    if (reg.test(parts[0]) || parts[0] === "") {
      if (isNaN(parts[1])) { //mask is not a number
        return this.setState({ errorIpAdressV6: "error" });
      }
      if (parseInt(parts[1]) > 128) { // mask value is too big
        return this.setState({ errorIpAdressV6: "error" });
      }
      // other cases: the mask is ok
      return;
    } else {
      return this.setState({ errorIpAdressV6: "error" });
    }

  };

  validateNetMaskV4 = e => {
    let reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorNetMaskV4: "error" });
    }
  };

  validateIPAddressV4 = e => {
    let reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorIpAdressV4: "error" });
    }
  };

  validatePbxIPAddress = e => {
    let reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorPbxIpAdress: "error" });
    }
  };

  validateMacAddress = e => {
    let regDots = /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/;
    let reg = /^([0-9A-Fa-f]{2}){5}([0-9A-Fa-f]{2})$/;
    if (
      reg.test(e.target.value) ||
      regDots.test(e.target.value) ||
      e.target.value === ""
    ) {
      return;
    } else {
      this.setState({ errorMacAddress: "error" });
    }
  };

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };

  addAID = () => {
    const {
      secondEDU,
      iadType,
      macAddress,
      pilotNumber,
      nameEDUA,
      lanPortA,
      wanPortA,
      srNameA,
      srSAPA,
      eduVLANIDA,
      nameEDUB,
      lanPortB,
      wanPortB,
      srNameB,
      srSAPB,
      eduVLANIDB,
      transportMode,
      ip1mode,
      ipv4Address,
      ipv4Netmask,
      ipv6Address,
      ipv6Netmask,
      ipAddress,
      port,
      dtmf,
      direction,
      channelsIn,
      channelsOut,
      clock_master,
      dual_power,
      isdnTerminationSide,
      cliPhoneNumber
    } = this.state;
    let pra_info = {};
    Object.keys(this.state.praByIad).forEach(key => {
      if (this.state.praByIad[key].praID === 0) {
        return;
      }
      pra_info = {
        ...pra_info,
        [this.state.praByIad[key].praID]: {
          tpid: this.state.praByIad[key].tpid,
          circuit_id: this.state.praByIad[key].circuit_id,
          enabled: this.state.praByIad[key].enabled
        }
      };
    });
    const data = {
      iadType,
      pilotNumber,
      cliPhoneNumber,
      macAddress,
      edu1: {
        name: nameEDUA,
        lanPort: lanPortA,
        wanPort: wanPortA,
        srName: srNameA,
        srSap: srSAPA,
        vlan: eduVLANIDA
      },
      edu2: secondEDU
        ? {
            name: nameEDUB,
            lanPort: lanPortB,
            wanPort: wanPortB,
            srName: srNameB,
            srSap: srSAPB,
            vlan: eduVLANIDB
          }
        : null,
      transportMode,
      ip1:
        ip1mode === "IPv4"
          ? {
              mode: ip1mode,
              ipv4Address,
              ipv4Netmask
            }
          : ip1mode === "IPv6"
          ? {
              mode: ip1mode,
              ipv6Address,
              ipv6Netmask
            }
          : null,
      pbx: {
        ipAddress,
        port
      },
      services: {
        dtmf:
          this.props.group.pbxType === "SIP" ||
          this.props.group.pbxType === "PRA_SIP" ||
          this.props.group.pbxType === "SIP_PRA"
            ? dtmf === "useGroupSettings"
              ? null
              : dtmf
            : "",
        direction: direction === "useGroupSettings" ? null : direction,
        channelsIn,
        channelsOut
      },
      virtual: this.props.group.virtual,
      pra_info,
      advanced: {
        clock_master,
        dual_power,
        isdnTerminationSide
      }
    };
    const clearData = removeEmpty(data);
    this.setState({ disabledButton: true, buttonName: "Creating..." });
    this.props
      .fetchPostCreateIAD(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        clearData
      )
      .then(res => {
        if (res === "created") {
          this.props.history.push(
            `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`,
            { defaultTab: 3 }
          );
        } else {
          this.props.group.pbxType === "PRA" && this.setPraByIad();
          this.setState({ disabledButton: false, buttonName: "Create" });
        }
      });
  };
}

const mapStateToProps = state => ({
  config: state.config,
  group: state.group,
  iads: state.iads,
  phoneNumbersByGroupNotTP: state.phoneNumbersByGroupNotTP
});

const mapDispatchToProps = {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPostCreateIAD,
  fetchGetIADs,
  fetchGetPhoneNumbersByGroupNotTP
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddIAD)
);
