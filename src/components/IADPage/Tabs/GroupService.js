import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";

import { changeObjectIAD, fetchPutUpdateIAD } from "../../../store/actions";

import { removeEmpty } from "../../remuveEmptyInObject";

import RebootWindow from "../RebootWindow";

import { isAllowed, pages } from "../../../utils/user";

export class GroupService extends Component {
  state = {
    services: { dtmf: "", direction: "", channelsIn: "", channelsOut: "" },
    disabledButton: false,
    showRebootDialog: false
  };
  componentDidMount() {
    this.setState({
      services: this.props.iad.services
        ? this.props.iad.services
        : this.state.services
    });
  }
  render() {
    return (
      <React.Fragment>
        {(this.props.iad.protocolMode === "SIP" ||
          this.props.iad.protocolMode === "PRA_SIP" ||
          this.props.iad.protocolMode === "SIP_PRA") && (
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
                  value={this.state.services.dtmf}
                  onChange={this.changeDtmf}
                  disabled={
                    !isAllowed(
                      localStorage.getItem("userProfile"),
                      pages.edit_group_iad_services_dtmf
                    )
                  }
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
                <FormattedMessage id="direction" defaultMessage="Direction" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex"}>
              <FormControl
                componentClass="select"
                value={this.state.services.direction}
                onChange={this.changeDirection}
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
        {(this.state.services.direction === "Uni" ||
          (this.props.iad.services &&
            this.props.iad.services.direction === "Uni")) && (
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
                      value={this.state.services.channelsIn}
                      placeholder={"In"}
                      onChange={this.changeChannelsIn}
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
                      value={this.state.services.channelsOut}
                      placeholder={"Out"}
                      onChange={this.changeChannelsOut}
                    />
                  </div>
                </React.Fragment>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"} />
                <div className={"margin-right-1 flex-basis-33"}>
                  {"\u002a"}
                  <FormattedMessage id="nocInfo" defaultMessage="" />
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.updateIAD}
                  type="submit"
                  className="btn-primary"
                  disabled={this.state.disabledButton}
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  <FormattedMessage id="update" defaultMessage="Update" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <RebootWindow
          data={this.state.data}
          show={this.state.showRebootDialog}
          onClose={() => this.setState({ showRebootDialog: false })}
        />
      </React.Fragment>
    );
  }

  updateIAD = () => {
    const { services } = this.state;
    const data = { services };
    const clearData = removeEmpty(data);
    if (!this.props.iad.services && services.dtmf) {
      this.setState({ showRebootDialog: true, data: clearData });
      return;
    }
    if (services.dtmf !== this.props.iad.services.dtmf) {
      this.setState({ showRebootDialog: true, data: clearData });
      return;
    }
    if (Object.keys(clearData).length) {
      this.setState({ disabledButton: true }, () =>
        this.props
          .fetchPutUpdateIAD(
            this.props.match.params.tenantId,
            this.props.match.params.groupId,
            this.props.match.params.iadId,
            clearData
          )
          .then(() => this.setState({ disabledButton: false }))
      );
    } else {
      this.setState({ disabledButton: true }, () =>
        this.setState({ disabledButton: false })
      );
    }
  };

  changeDtmf = e => {
    this.props.changeObjectIAD("services", "dtmf", e.target.value);
    this.setState({
      services: {
        ...this.state.services,
        dtmf: e.target.value
      }
    });
  };

  changeDirection = e => {
    this.props.changeObjectIAD("services", "direction", e.target.value);
    this.setState({
      services: {
        ...this.state.services,
        direction: e.target.value
      }
    });
  };

  changeChannelsIn = e => {
    this.props.changeObjectIAD(
      "services",
      "channelsIn",
      Number(e.target.value)
    );
    this.setState({
      services: {
        ...this.state.services,
        channelsIn: Number(e.target.value)
      }
    });
  };

  changeChannelsOut = e => {
    this.props.changeObjectIAD(
      "services",
      "channelsOut",
      Number(e.target.value)
    );
    this.setState({
      services: {
        ...this.state.services,
        channelsOut: Number(e.target.value)
      }
    });
  };
}

const mapStateToProps = state => ({ iad: state.iad, config: state.config });

const mapDispatchToProps = { changeObjectIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupService)
);
