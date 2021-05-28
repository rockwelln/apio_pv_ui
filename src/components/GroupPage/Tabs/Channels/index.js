import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";
import Alert from "react-bootstrap/lib/Alert";

import {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
  fetchGetIADs,
  fetchGetValidateGroupUpdate,
  clearValidationGroup,
} from "../../../../store/actions";

import { FormattedMessage } from "react-intl";
import { removeEmpty } from "../../../remuveEmptyInObject";
import { get } from "../../../get";

import Loading from "../../../../common/Loading";
import RebootWindow from "../../RebootWindow";

import { isAllowed, pages } from "../../../../utils/user";

export class Channels extends Component {
  state = {
    isLoading: true,
    group: {},
    channelsInError: null,
    channelsOutError: null,
    disableButton: false,
    channelsOut: 0,
    channelsIn: 0,
    numberOfChannelsError: null,
    channelHuntingOptions: [],
    data: {},
    showRebootDialog: false,
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
                direction:
                  this.state.group.direction ||
                  this.props.config.tenant.group.direction[0].value,
                channelHunting:
                  this.state.group.channelHunting ||
                  this.props.config.tenant.group.channelHunting[0].value,
              },
              channelsOut:
                this.state.group.channelsOut || this.state.channelsOut,
              channelsIn: this.state.group.channelsIn || this.state.channelsIn,
              channelHuntingOptions:
                this.props.config.tenant.group.channelHunting.map((el) => ({
                  ...el,
                  disabled:
                    this.state.group.channelHunting === "Loadbalanced"
                      ? el.value === "Loadbalanced"
                        ? false
                        : true
                      : el.value === "Loadbalanced"
                      ? true
                      : false,
                })),
            })
          )
        )
      );
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.group.serviceType !== this.props.group.serviceType ||
      prevProps.location.hash !== this.props.location.hash
    ) {
      this.fetchReq();
    }
  }

  componentDidMount() {
    this.fetchReq();
  }
  render() {
    if (this.state.isLoading || !this.props.iads.iadType) {
      return <Loading />;
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
        <FormGroup
          controlId="channelIn"
          validationState={this.state.numberOfChannelsError}
        >
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  {this.state.group.pbxType === "PRA" ||
                  this.state.group.pbxType === "PRA_SIP" ? (
                    <FormattedMessage
                      id="numberOfPRA"
                      defaultMessage="Number of PRA"
                    />
                  ) : (
                    <FormattedMessage
                      id="numberOfChannels"
                      defaultMessage="Number of Channels"
                    />
                  )}
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  value={this.state.group.numberOfChannels}
                  onChange={this.changeNumberOfChannels}
                  disabled={
                    (get(this.props, "validationGroup.warnings") &&
                      !!this.props.validationGroup.warnings.length) ||
                    this.props.validationGroupError ||
                    !isAllowed(
                      localStorage.getItem("userProfile"),
                      pages.edit_group_channels_number_of_channels
                    )
                  }
                >
                  {this.state.group.pbxType === "PRA" ||
                  this.state.group.pbxType === "PRA_SIP"
                    ? ~this.props.config.tenant.group.iad[
                        "2EDUsForServiceTypes"
                      ].indexOf(this.state.group.serviceType)
                      ? this.props.config.tenant.group.capacity[
                          this.state.group.accessType
                        ].PRA[
                          this.state.group.accessType === "FIBER"
                            ? "redundant"
                            : this.props.iads.iadType
                        ].map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))
                      : this.props.config.tenant.group.capacity[
                          this.state.group.accessType
                        ].PRA[
                          this.state.group.accessType === "FIBER"
                            ? "nonRedundant"
                            : this.props.iads.iadType
                        ].map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))
                    : this.state.group.pbxType === "SIP" ||
                      this.state.group.pbxType === "SIP_PRA"
                    ? ~this.props.config.tenant.group.iad[
                        "2EDUsForServiceTypes"
                      ].indexOf(this.state.group.serviceType)
                      ? this.props.config.tenant.group.capacity[
                          this.state.group.accessType
                        ].SIP[
                          this.state.group.accessType === "FIBER"
                            ? "redundant"
                            : this.props.iads.iadType
                        ].map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))
                      : this.props.config.tenant.group.capacity[
                          this.state.group.accessType
                        ].SIP[
                          this.state.group.accessType === "FIBER"
                            ? "nonRedundant"
                            : this.props.iads.iadType
                        ].map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))
                    : null}
                </FormControl>
              </div>
            </Col>
          </Row>
          {this.state.numberOfChannelsError && (
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}></div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <HelpBlock>
                    <FormattedMessage
                      id="numberOfChannelsError"
                      defaultMessage="It is not allowed to decrease the capacity"
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
                <FormattedMessage id="direction" defaultMessage="Direction" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.group.direction}
                onChange={(e) =>
                  this.setState({
                    group: { ...this.state.group, direction: e.target.value },
                  })
                }
                disabled={
                  (get(this.props, "validationGroup.warnings") &&
                    !!this.props.validationGroup.warnings.length) ||
                  this.props.validationGroupError ||
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_channels_other_fields
                  )
                }
              >
                {this.props.config.tenant.group.direction.map((type, i) => (
                  <option key={i} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        {this.state.group.direction === "Uni" && (
          <React.Fragment>
            <FormGroup
              controlId="channelIn"
              validationState={this.state.channelsInError}
            >
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="channelsIn"
                        defaultMessage="Channels In"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="number"
                      defaultValue={this.state.channelsIn}
                      placeholder={"Channels In"}
                      onChange={this.changeChannelsIn}
                      min={0}
                      max={
                        this.state.group.numberOfChannels -
                        this.state.group.channelsOut
                      }
                      disabled={
                        (get(this.props, "validationGroup.warnings") &&
                          !!this.props.validationGroup.warnings.length) ||
                        this.props.validationGroupError ||
                        !isAllowed(
                          localStorage.getItem("userProfile"),
                          pages.edit_group_channels_other_fields
                        )
                      }
                    />
                  </div>
                </Col>
              </Row>
              {this.state.channelsInError && (
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}></div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <HelpBlock bsClass="color-error">
                        <FormattedMessage
                          id="channelsError"
                          defaultMessage="Can't be less than 0, and amount channels in and out can't be more than number of channels"
                        />
                      </HelpBlock>
                    </div>
                  </Col>
                </Row>
              )}
            </FormGroup>
            <FormGroup
              controlId="channelsOut"
              validationState={this.state.channelsOutError}
            >
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="channelsOut"
                        defaultMessage="Channels Out"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="number"
                      defaultValue={this.state.channelsOut}
                      placeholder={"Channels Out"}
                      onChange={this.changeChannelsOut}
                      min={0}
                      max={
                        this.state.group.numberOfChannels -
                        this.state.group.channelsIn
                      }
                      disabled={
                        (get(this.props, "validationGroup.warnings") &&
                          !!this.props.validationGroup.warnings.length) ||
                        this.props.validationGroupError ||
                        !isAllowed(
                          localStorage.getItem("userProfile"),
                          pages.edit_group_channels_other_fields
                        )
                      }
                    />
                  </div>
                </Col>
              </Row>
              {this.state.channelsOutError && (
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}></div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <HelpBlock bsClass="color-error">
                        <FormattedMessage
                          id="channelsError"
                          defaultMessage="Can't be less than 0, and amount channels in and out can't be more than number of channels"
                        />
                      </HelpBlock>
                    </div>
                  </Col>
                </Row>
              )}
            </FormGroup>
          </React.Fragment>
        )}
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage
                  id="channelHunting"
                  defaultMessage="Channel hunting"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.group.channelHunting}
                onChange={(e) =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      channelHunting: e.target.value,
                    },
                  })
                }
                disabled={
                  (get(this.props, "validationGroup.warnings") &&
                    !!this.props.validationGroup.warnings.length) ||
                  this.props.validationGroupError ||
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_channels_other_fields
                  )
                }
              >
                {this.state.channelHuntingOptions.map(
                  (type, i) =>
                    !type.disabled && (
                      <option key={i} value={type.value}>
                        {type.label}
                      </option>
                    )
                )}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="button-row">
            <div className="pull-right">
              {isAllowed(
                localStorage.getItem("userProfile"),
                pages.edit_group_channels_other_fields
              ) ? (
                <Button
                  onClick={this.updateChannels}
                  className={"btn-primary"}
                  disabled={
                    !!this.state.channelsOutError ||
                    !!this.state.channelsInError ||
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
        <RebootWindow
          data={this.state.data}
          show={this.state.showRebootDialog}
          onClose={() => this.setState({ showRebootDialog: false })}
        />
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

  changeNumberOfChannels = (e) => {
    const targetValue = e.target.value;
    this.setState({ disableButton: true }, () =>
      this.props
        .fetchGetValidateGroupUpdate(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          `numberOfChannels=${Number(targetValue)}`
        )
        .then(() => this.setState({ disableButton: false }))
    );

    this.setState({
      group: {
        ...this.state.group,
        numberOfChannels: Number(targetValue),
      },
      numberOfChannelsError: null,
    });
  };

  updateChannels = () => {
    const {
      numberOfChannels,
      channelHunting,
      direction,
      channelsIn,
      channelsOut,
    } = this.state.group;
    const data = {
      numberOfChannels,
      channelHunting,
      direction,
      channelsIn,
      channelsOut,
    };
    const clearData = removeEmpty(data);

    if (
      (this.state.group.pbxType === "SIP" ||
        this.state.group.pbxType === "PRA") &&
      this.state.group.channelHunting !== this.props.group.channelHunting
    ) {
      this.setState({
        showRebootDialog: true,
        data: clearData,
        disableButton: false,
      });
      return;
    }

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

  changeChannelsIn = (e) => {
    const { channelsOut, numberOfChannels } = this.state.group;
    this.setState({ channelsInError: null, channelsOutError: null });
    if (
      e.target.value < 0 ||
      Number(e.target.value) + (!!channelsOut && channelsOut) > numberOfChannels
    ) {
      this.setState({
        channelsInError: "error",
        group: {
          ...this.state.group,
          channelsIn: Number(e.target.value),
        },
      });
      return;
    }
    this.setState({
      group: {
        ...this.state.group,
        channelsIn: Number(e.target.value),
      },
    });
  };

  changeChannelsOut = (e) => {
    const { channelsIn, numberOfChannels } = this.state.group;
    this.setState({ channelsOutError: null, channelsInError: null });
    if (
      e.target.value < 0 ||
      Number(e.target.value) + (!!channelsIn && channelsIn) > numberOfChannels
    ) {
      this.setState({
        channelsOutError: "error",
        group: {
          ...this.state.group,
          channelsOut: Number(e.target.value),
        },
      });
      return;
    }
    this.setState({
      group: {
        ...this.state.group,
        channelsOut: Number(e.target.value),
      },
    });
  };
}

const mapStateToProps = (state) => ({
  group: state.group,
  config: state.config,
  validationGroup: state.validationGroup,
  validationGroupError: state.validationGroupError,
  iads: state.iads,
});

const mapDispatchToProps = {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
  fetchGetIADs,
  fetchGetValidateGroupUpdate,
  clearValidationGroup,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Channels)
);
