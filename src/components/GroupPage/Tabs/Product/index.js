import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Alert from "react-bootstrap/lib/Alert";
import Modal from "react-bootstrap/lib/Modal";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";
import { removeEmpty } from "../../../remuveEmptyInObject";
import { get } from "../../../get";
import CertifiedPBXs from "./CertifiedPBXs";

import { isAllowed, pages } from "../../../../utils/user";

import {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
  fetchGetIADs,
  fetchGetValidateGroupUpdate,
  clearValidationGroup,
  fetchGetCertifiedPBX,
} from "../../../../store/actions";

export class Product extends Component {
  state = {
    isLoading: true,
    isLoadingPBX: false,
    group: {},
    disableButton: false,
    seviceTypeError: null,
    textSerivceTypeError: "",
    updatingButton: false,
    newPBXModel: "",
    showPBXList: false,
  };

  fetchReq = () => {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState({ group: this.props.group }, () =>
          this.props.fetchGetConfig().then(() =>
            this.setState({
              isLoading: false,
              group: {
                ...this.state.group,
                pbxType:
                  this.state.group.pbxType ||
                  this.props.config.tenant.group.pbxType[0].value,
                accessType:
                  this.state.group.accessType ||
                  this.props.config.tenant.group.accessType[0].value,
                serviceType:
                  this.state.group.serviceType ||
                  this.props.config.tenant.group.serviceType[0].value,
                np1Redundancy: this.state.group.np1Redundancy || false,
                pbxModel: this.state.group.pbxCertified
                  ? this.state.group.pbxModel || "None"
                  : "Not a certified PBX",
                pbxVersion: this.state.group.pbxVersion || "",
              },
              newPBXModel: this.props.group.pbxCertified
                ? ""
                : this.props.group.pbxModel,
              isRedundant: ~this.props.config.tenant.group.iad[
                "2EDUsForServiceTypes"
              ].indexOf(this.state.group.serviceType)
                ? "redundant"
                : "nonRedundant",
            })
          )
        )
      );
    this.setState({ isLoadingPBX: true }, () =>
      this.props
        .fetchGetCertifiedPBX()
        .then(() => this.setState({ isLoadingPBX: false }))
    );
  };

  componentDidMount() {
    this.fetchReq();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.fetchReq();
    }
  }
  render() {
    if (this.state.isLoading || this.state.isLoadingPBX) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    return (
      <React.Fragment>
        {((get(this.props, "validationGroup.warnings") &&
          !!this.props.validationGroup.warnings.length) ||
          this.props.validationGroupError) && (
          <Row className={"margin-top-1"}>
            <Col md={12}>
              <Alert
                bsStyle={this.props.validationGroupError ? "danger" : "warning"}
                className={"flex-column"}
              >
                {this.props.validationGroupError
                  ? this.props.validationGroupError
                  : this.props.validationGroup.warnings.map((el) => (
                      <p key={el}>{el}</p>
                    ))}
                <div className="button-row">
                  <div className="pull-right">
                    <Button onClick={this.hideAlert}>
                      <FormattedMessage id="ok" defaultMessage="Ok" />
                    </Button>
                  </div>
                </div>
              </Alert>
            </Col>
          </Row>
        )}
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="pbxType" defaultMessage="Type of IAD" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.group.pbxType}
                onChange={(e) =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      pbxType: e.target.value,
                    },
                  })
                }
                disabled={
                  this.state.group.pbxType !== "PRA_SIP" &&
                  this.state.group.pbxType !== "SIP_PRA"
                }
              >
                {this.props.config.tenant.group.pbxType.map((el, i) => (
                  <option
                    key={i}
                    value={el.value}
                    disabled={
                      (this.state.group.pbxType === "PRA_SIP" &&
                        el.value !== "SIP_PRA") ||
                      (this.state.group.pbxType === "SIP_PRA" &&
                        el.value !== "PRA_SIP")
                    }
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
                  id="accessType"
                  defaultMessage="Type of access"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.group.accessType}
                onChange={(e) =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      accessType: e.target.value,
                    },
                  })
                }
                disabled
              >
                {this.props.config.tenant.group.accessType.map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        {this.props.group.accessType !== "COAX" &&
          this.props.group.accessType !== "VDSL" && (
            <FormGroup
              controlId="channelIn"
              validationState={this.state.seviceTypeError}
            >
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="serviceType"
                        defaultMessage="Service Type"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      componentClass="select"
                      value={this.state.group.serviceType}
                      onChange={this.updateServiceType}
                      disabled={
                        (get(this.props, "validationGroup.warnings") &&
                          !!this.props.validationGroup.warnings.length) ||
                        this.props.validationGroupError ||
                        !isAllowed(
                          localStorage.getItem("userProfile"),
                          pages.edit_group_product_service_type
                        )
                      }
                    >
                      {this.props.config.tenant.group.serviceType.map(
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
              {this.state.seviceTypeError && (
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}></div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <HelpBlock>{this.state.textSerivceTypeError}</HelpBlock>
                    </div>
                  </Col>
                </Row>
              )}
            </FormGroup>
          )}
        {this.props.group.accessType !== "COAX" &&
          this.props.group.accessType !== "VDSL" &&
          (this.state.group.pbxType === "SIP" ||
            this.state.group.pbxType === "SIP_PRA") && (
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
                    defaultChecked={this.state.group.np1Redundancy}
                    onChange={(e) => {
                      this.setState({
                        group: {
                          ...this.state.group,
                          np1Redundancy: e.target.checked,
                        },
                      });
                    }}
                    disabled
                  />
                </div>
              </Col>
            </Row>
          )}
        {(this.props.group.accessType === "COAX" ||
          this.props.group.accessType === "VDSL") && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  {this.props.group.accessType === "COAX" && (
                    <FormattedMessage
                      id="VLAN_UUID"
                      defaultMessage="VLAN UUID"
                    />
                  )}
                  {this.props.group.accessType === "VDSL" && (
                    <FormattedMessage
                      id="SPEC CFS ID"
                      defaultMessage="SPEC CFS ID"
                    />
                  )}
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  placeholder={"ID"}
                  disabled
                  value={this.props.group.networkIdentifier}
                />
              </div>
            </Col>
          </Row>
        )}
        {(this.state.group.pbxType === "SIP" ||
          this.state.group.pbxType === "PRA_SIP" ||
          this.state.group.pbxType === "SIP_PRA") && (
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage id="PBXModel" defaultMessage="PBX Model" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    className={"margin-right-1"}
                    value={JSON.stringify({
                      brand: this.state.group.pbxModel,
                      version: this.state.group.pbxVersion,
                    })}
                    onChange={(e) => {
                      this.setState({
                        group: {
                          ...this.state.group,
                          pbxModel: JSON.parse(e.target.value).brand,
                          pbxVersion: JSON.parse(e.target.value).version,
                        },
                        newPBXModel:
                          JSON.parse(e.target.value).brand !== "Not a certified PBX"
                            ? ""
                            : this.state.newPBXModel,
                      });
                    }}
                  >
                    {[
                      { brand: "None", version: "" },
                      { brand: "Not a certified PBX", version: "" },
                      ...this.props.certifiedPBX,
                    ].map((el, i) => (
                      <option
                        key={i}
                        value={JSON.stringify({
                          brand: el.brand,
                          version: el.version,
                        })}
                      >
                        {`${el.brand} ${el.version}`}
                      </option>
                    ))}
                  </FormControl>
                  <Button
                    className={"btn-primary"}
                    onClick={() => this.setState({ showPBXList: true })}
                  >
                    <FormattedMessage
                      id="show_detail"
                      defaultMessage="Show details"
                    />
                  </Button>
                </div>
              </Col>
            </Row>
        )}
        {(this.state.group.pbxType === "SIP" ||
          this.state.group.pbxType === "PRA_SIP" ||
          this.state.group.pbxType === "SIP_PRA") &&
          this.state.group.pbxModel === "Not a certified PBX" && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="new_pbx_model"
                    defaultMessage="New PBX Model"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  placeholder={"New PBX Model"}
                  value={this.state.newPBXModel}
                  onChange={(e) =>
                    this.setState({ newPBXModel: e.target.value })
                  }
                />
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <div className="button-row">
            <div className="pull-right">
              {isAllowed(
                localStorage.getItem("userProfile"),
                pages.edit_group_product
              ) ? (
                <Button
                  onClick={this.updateProduct}
                  className={"btn-primary"}
                  disabled={
                    this.state.disableButton ||
                    (get(this.props, "validationGroup.warnings") &&
                      !!this.props.validationGroup.warnings.length) ||
                    this.props.validationGroupError ||
                    this.state.updatingButton
                  }
                >
                  {this.state.updatingButton ? (
                    <FormattedMessage
                      id="updating"
                      defaultMessage="Updating..."
                    />
                  ) : (
                    <FormattedMessage id="update" defaultMessage="Update" />
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </Row>
        {this.state.showPBXList && (
          <Modal
            show={this.state.showPBXList}
            onHide={() => this.setState({ showPBXList: false })}
            backdrop={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <FormattedMessage
                  id="list_of_certified_pbx"
                  defaultMessage="List of certified PBX"
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CertifiedPBXs
                selectedPBX={{
                  brand: this.props.group.pbxModel,
                  version: this.props.group.pbxVersion,
                }}
              />
            </Modal.Body>
          </Modal>
        )}
      </React.Fragment>
    );
  }

  hideAlert = () => {
    if (this.props.validationGroupError) {
      this.fetchReq();
      this.props.clearValidationGroup();
    }
    this.props.clearValidationGroup();
  };

  updateServiceType = (e) => {
    const targetValue = e.target.value;
    this.setState({ disableButton: true }, () =>
      this.props
        .fetchGetValidateGroupUpdate(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          `serviceType=${targetValue}`
        )
        .then(() => this.setState({ disableButton: false }))
    );

    this.setState({
      group: {
        ...this.state.group,
        serviceType: targetValue,
      },
      seviceTypeError: null,
      textSerivceTypeError: "",
    });
  };

  updateProduct = () => {
    const {
      pbxType,
      accessType,
      serviceType,
      np1Redundancy,
      pbxModel,
      pbxVersion,
    } = this.state.group;
    const data = {
      pbxType: pbxType !== this.props.group.pbxType ? pbxType : "",
      //accessType,
      serviceType,
      pbxModel: this.state.newPBXModel ? this.state.newPBXModel : pbxModel,
      pbxCertified: this.state.newPBXModel ? false : true,
      pbxVersion: this.state.newPBXModel || pbxModel === "None" ? "UNKNOWN" : pbxVersion,
      //np1Redundancy
    };
    const clearData = removeEmpty(data);
    this.setState({ updatingButton: true }, () =>
      this.props
        .fetchPutUpdateGroupDetails(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          clearData
        )
        .then(() => {
          this.props.fetchGetIADs(
            this.props.match.params.tenantId,
            this.props.match.params.groupId
          );
          this.setState({ updatingButton: false });
        })
    );
  };
}

const mapStateToProps = (state) => ({
  group: state.group,
  config: state.config,
  validationGroup: state.validationGroup,
  validationGroupError: state.validationGroupError,
  certifiedPBX: state.certifiedPBX,
});

const mapDispatchToProps = {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
  fetchGetIADs,
  fetchGetValidateGroupUpdate,
  clearValidationGroup,
  fetchGetCertifiedPBX,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
