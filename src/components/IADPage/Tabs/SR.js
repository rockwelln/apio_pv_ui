import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { get } from "../../get";

import { FormattedMessage } from "react-intl";

import { isAllowed, pages } from "../../../utils/user";

import {
  changeObjectIAD,
  fetchPutUpdateIAD,
  changeIAD,
} from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";

export class SR extends Component {
  state = {
    normLocalUpdate: false,
    sr: {
      srName: "",
      srSap: "",
    },
    disabledButton: false,
  };

  componentDidMount() {
    this.setState({
      sr: this.props.iad.sr ? this.props.iad.sr : this.state.sr,
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
                  id="updateOnlyLocally"
                  defaultMessage="Update only locally"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <Checkbox
                checked={this.state.normLocalUpdate}
                onChange={(e) =>
                  this.setState({ normLocalUpdate: e.target.checked })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_iad_edu
                  ) || this.props.iad.virtual
                }
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage id="srName" defaultMessage="SR Name" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.sr.srName}
                placeholder={"SR Name"}
                onChange={(e) => this.changeSr("srName", e.target.value)}
                // disabled={
                //   !isAllowed(
                //     localStorage.getItem("userProfile"),
                //     pages.edit_iad_edu
                //   ) || this.props.iad.virtual
                // }
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage id="srSap" defaultMessage="SR SAP" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.sr.srSap}
                placeholder={"SR SAP"}
                onChange={(e) => this.changeSr("srSap", e.target.value)}
                // disabled={
                //   !isAllowed(
                //     localStorage.getItem("userProfile"),
                //     pages.edit_iad_edu
                //   ) || this.props.iad.virtual
                // }
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage id="ip_iad" defaultMessage="IP IAD" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.sr.ip_iad}
                placeholder={"IP IAD"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage id="ip_sr" defaultMessage="IP SR" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.sr.ip_sr}
                placeholder={"IP SR"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage
                  id="network_identifier"
                  defaultMessage="Network identifier"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.sr.network_identifier}
                placeholder={"Network identifier"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage
                  id="norm_error_sr"
                  defaultMessage="NORM error SR"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.sr.norm_error_sr}
                placeholder={"NORM error SR"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage
                  id="norm_status_sr"
                  defaultMessage="NORM status SR"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.sr.norm_status_sr}
                placeholder={"NORM status SR"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage
                  id="iadLoopbackIP"
                  defaultMessage="IAD Loopback IP"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                defaultValue={
                  get(this.props, "iad.norm.loopback")
                    ? this.props.iad.norm.loopback
                    : ""
                }
                placeholder={"Loopback"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                {isAllowed(
                  localStorage.getItem("userProfile"),
                  pages.edit_iad_edu
                ) ? (
                  <Button
                    onClick={this.updateIAD}
                    type="submit"
                    className="btn-primary"
                    disabled={
                      this.state.disabledButton || this.props.iad.virtual
                    }
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    {this.state.disabledButton ? (
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
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  updateIAD = () => {
    const { sr, normLocalUpdate } = this.state;
    const data = { sr, normLocalUpdate };
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
          .then(() =>
            this.setState({
              disabledButton: false,
              sr: this.props.iad.sr ? this.props.iad.sr : this.state.sr,
            })
          )
      );
    } else {
      this.setState({ disabledButton: true }, () =>
        this.setState({ disabledButton: false })
      );
    }
  };

  changeSr = (editableField, value) => {
    this.setState({
      sr: {
        ...this.state.sr,
        [editableField]: value,
      },
    });
    this.props.changeIAD("sr", {
      ...this.state.sr,
      [editableField]: value,
    });
  };
}

const mapStateToProps = (state) => ({ iad: state.iad, config: state.config });

const mapDispatchToProps = { changeIAD, changeObjectIAD, fetchPutUpdateIAD };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SR));
