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
      advanced: {
        trunkId1: this.props.iad.advanced.trunkId1,
        trunkId2: this.props.iad.advanced.trunkId2,
        trunkId3: this.props.iad.advanced.trunkId3,
        trunkId4: this.props.iad.advanced.trunkId4,
        trunkId5: this.props.iad.advanced.trunkId5,
        trunkId6: this.props.iad.advanced.trunkId6,
        trunkId7: this.props.iad.advanced.trunkId7,
        trunkId8: this.props.iad.advanced.trunkId8,
        trunkId9: this.props.iad.advanced.trunkId9,
        trunkId10: this.props.iad.advanced.trunkId10
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="trunkId1" defaultMessage="Trunk Id 1" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId1}
                onChange={this.chageTrunkId1}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId2" defaultMessage="Trunk Id 2" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId2}
                onChange={this.chageTrunkId2}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId3" defaultMessage="Trunk Id 3" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId3}
                onChange={this.chageTrunkId3}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId4" defaultMessage="Trunk Id 4" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId4}
                onChange={this.chageTrunkId4}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId5" defaultMessage="Trunk Id 5" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId5}
                onChange={this.chageTrunkId5}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId6" defaultMessage="Trunk Id 6" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId6}
                onChange={this.chageTrunkId6}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId7" defaultMessage="Trunk Id 7" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId7}
                onChange={this.chageTrunkId7}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId8" defaultMessage="Trunk Id 8" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId8}
                onChange={this.chageTrunkId8}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId9" defaultMessage="Trunk Id 9" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId9}
                onChange={this.chageTrunkId9}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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
                <FormattedMessage id="trunkId10" defaultMessage="Trunk Id 10" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.trunkId10}
                onChange={this.chageTrunkId10}
              >
                {this.props.config.tenant.group.iad.trunkId.map((el, i) => (
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

  chageTrunkId1 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId1: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId1", Number(e.target.value));
  };
  chageTrunkId2 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId2: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId2", Number(e.target.value));
  };
  chageTrunkId3 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId3: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId3", Number(e.target.value));
  };
  chageTrunkId4 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId4: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId4", Number(e.target.value));
  };
  chageTrunkId5 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId5: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId5", Number(e.target.value));
  };
  chageTrunkId6 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId6: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId6", Number(e.target.value));
  };
  chageTrunkId7 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId7: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId7", e.target.value);
  };
  chageTrunkId8 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId8: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId8", Number(e.target.value));
  };
  chageTrunkId9 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId9: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId9", Number(e.target.value));
  };
  chageTrunkId10 = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        trunkId10: Number(e.target.value)
      }
    });
    this.props.changeObjectIAD("advanced", "trunkId10", Number(e.target.value));
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
