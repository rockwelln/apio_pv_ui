import React, { Component } from "react";
import { connect } from "react-redux";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";

import { FormattedMessage } from "react-intl";

export class TrunkId extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage
                  id="destnr1"
                  defaultMessage="Destination numbers 1"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr1}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr1.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr2"
                  defaultMessage="Destination numbers 2"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr2}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr3"
                  defaultMessage="Destination numbers 3"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr3}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr4"
                  defaultMessage="Destination numbers 4"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr4}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr5"
                  defaultMessage="Destination numbers 5"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr5}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr6"
                  defaultMessage="Destination numbers 6"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr6}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr7"
                  defaultMessage="Destination numbers 7"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr7}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr8"
                  defaultMessage="Destination numbers 8"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr8}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr9"
                  defaultMessage="Destination numbers 9"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr9}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
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
                  id="destnr10"
                  defaultMessage="Destination numbers 10"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.destnr10}
                onChange={this.changeDtmf}
              >
                {this.props.config.tenant.group.iad.destnr.map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  iad: state.iad,
  config: state.config
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrunkId);
