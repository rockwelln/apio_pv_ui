import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";

import {
  changeObjectIAD,
  fetchPutUpdateIAD
} from "../../../../../store/actions";
import { removeEmpty } from "../../../../remuveEmptyInObject";

export class TrunkId extends Component {
  state = {
    advanced: {},
    disabledButton: false
  };
  componentDidMount() {
    this.setState({
      advanced: this.props.iad.advanced
        ? {
            destnr1: this.props.iad.advanced.destnr1,
            destnr2: this.props.iad.advanced.destnr2,
            destnr3: this.props.iad.advanced.destnr3,
            destnr4: this.props.iad.advanced.destnr4,
            destnr5: this.props.iad.advanced.destnr5,
            destnr6: this.props.iad.advanced.destnr6,
            destnr7: this.props.iad.advanced.destnr7,
            destnr8: this.props.iad.advanced.destnr8,
            destnr9: this.props.iad.advanced.destnr9,
            destnr10: this.props.iad.advanced.destnr10
          }
        : {}
    });
  }
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
                value={this.state.advanced.destnr1}
                onChange={this.chageDestnr1}
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
                value={this.state.advanced.destnr2}
                onChange={this.chageDestnr2}
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
                value={this.state.advanced.destnr3}
                onChange={this.chageDestnr3}
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
                value={this.state.advanced.destnr4}
                onChange={this.chageDestnr4}
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
                value={this.state.advanced.destnr5}
                onChange={this.chageDestnr5}
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
                value={this.state.advanced.destnr6}
                onChange={this.chageDestnr6}
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
                value={this.state.advanced.destnr7}
                onChange={this.chageDestnr7}
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
                value={this.state.advanced.destnr8}
                onChange={this.chageDestnr8}
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
                value={this.state.advanced.destnr9}
                onChange={this.chageDestnr9}
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
                value={this.state.advanced.destnr10}
                onChange={this.chageDestnr10}
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
      </React.Fragment>
    );
  }

  updateIAD = () => {
    const { advanced } = this.state;
    const data = { advanced };
    const clearData = removeEmpty(data);
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

  chageDestnr1 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr1: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr1", e.target.value);
  };

  chageDestnr2 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr2: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr2", e.target.value);
  };

  chageDestnr3 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr3: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr3", e.target.value);
  };

  chageDestnr4 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr4: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr4", e.target.value);
  };

  chageDestnr5 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr5: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr5", e.target.value);
  };

  chageDestnr6 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr6: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr6", e.target.value);
  };

  chageDestnr7 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr7: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr7", e.target.value);
  };

  chageDestnr8 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr8: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr8", e.target.value);
  };

  chageDestnr9 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr9: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr9", e.target.value);
  };

  chageDestnr10 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        destnr10: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "destnr10", e.target.value);
  };
}

const mapStateToProps = state => ({
  iad: state.iad,
  config: state.config
});

const mapDispatchToProps = { changeObjectIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrunkId)
);
