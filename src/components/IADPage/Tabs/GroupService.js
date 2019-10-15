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
import Table from "react-bootstrap/lib/Table";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import { FormattedMessage } from "react-intl";

import { changeObjectIAD } from "../../../store/actions";

export class GroupService extends Component {
  state = { dtmf: "", direction: "", channelsIn: "", channelsOut: "" };
  render() {
    return (
      <React.Fragment>
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
                value={
                  this.state.dtmf ||
                  (this.props.iad.services && this.props.iad.services.dtmf)
                }
                onChange={this.changeDtmf}
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
                value={this.state.direction || this.props.iad.direction}
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
        {(this.state.direction === "Uni" ||
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
                      value={
                        this.state.channelsIn ||
                        (this.props.iad.services &&
                          this.props.iad.services.channelsIn)
                      }
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
                      value={
                        this.state.channelsOut ||
                        (this.props.iad.services &&
                          this.props.iad.services.channelsOut)
                      }
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
                  <FormattedMessage
                    id="nocInfo"
                    defaultMessage=" Don't exceed your IADs capacity (avalible:
                        xxxxx)"
                  />
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  changeDtmf = e => {
    this.props.changeObjectIAD("services", "dtmf", e.target.value);
    this.setState({
      dtmf: e.target.value
    });
  };

  changeDirection = e => {
    this.props.changeObjectIAD("services", "direction", e.target.value);
    this.setState({
      direction: e.target.value
    });
  };

  changeChannelsIn = e => {
    this.props.changeObjectIAD("services", "channelsIn", e.target.value);
    this.setState({
      channelsIn: e.target.value
    });
  };

  changeChannelsOut = e => {
    this.props.changeObjectIAD("services", "channelsOut", e.target.value);
    this.setState({
      channelsOut: e.target.value
    });
  };
}

const mapStateToProps = state => ({ iad: state.iad, config: state.config });

const mapDispatchToProps = { changeObjectIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupService)
);
