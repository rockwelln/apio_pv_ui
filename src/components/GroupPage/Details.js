import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

import Loading from "../../common/Loading";

import { FormattedMessage } from "react-intl";

import {
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
} from "../../store/actions";

export class index extends Component {
  state = {
    typeOfIad: "PRA",
    isDisabled: true,
    clip: true,
    colp: false,
    clir: false,
    colr: true,
    aoc: false,
    dtmf: "RFC2833",
    direction: "Bi",
    additionnalRedundancy: true,
    isLoading: true,
    group: {}
  };

  fetchGroup = () => {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoading: false, group: this.props.group }));
  };

  componentDidMount() {
    this.fetchGroup();
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={12} className={"flex align-items-center"}>
            <React.Fragment>
              <div className={"header margin-right-2"}>
                <FormattedMessage id="details" defaultMessage="Details" />
              </div>
              {this.state.isDisabled && (
                <Glyphicon
                  className={"font-18"}
                  glyph="glyphicon glyphicon-pencil"
                  onClick={() => this.setState({ isDisabled: false })}
                />
              )}
            </React.Fragment>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="siteID" defaultMessage="Site ID" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                placeholder={"ID"}
                disabled
                value={this.props.match.params.groupId}
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
                value={this.state.group.groupName}
                placeholder={"Site Name"}
                onChange={e =>
                  this.setState({
                    group: { ...this.state.group, groupName: e.target.value }
                  })
                }
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="mainNumber" defaultMessage="Main Number" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.group.cliName}
                placeholder={"Main Number"}
                onChange={e =>
                  this.setState({
                    group: { ...this.state.group, cliName: e.target.value }
                  })
                }
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="zipCode" defaultMessage="ZIP code" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.group.zipCode}
                placeholder={"ZIP code"}
                onChange={e =>
                  this.setState({
                    group: { ...this.state.group, zipCode: e.target.value }
                  })
                }
                disabled={this.state.isDisabled}
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
                  checked={this.state.group.virtualSite}
                  disabled={this.state.isDisabled}
                  onChange={e =>
                    this.setState({
                      group: {
                        ...this.state.group,
                        virtualSite: e.target.checked
                      }
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
                  checked={!this.state.virtualSite}
                  disabled={this.state.isDisabled}
                  onChange={e =>
                    this.setState({
                      virtualSite: false
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
        {!this.state.isDisabled && (
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => this.updateGroup()}
                    type="submit"
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    <FormattedMessage id="update" defaultMessage="Update" />
                  </Button>
                </div>
                <div className="pull-right margin-right-1">
                  <Button
                    onClick={() => this.setState({ isDisabled: true })}
                    type="submit"
                    className="btn-danger"
                  >
                    <FormattedMessage id="cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }

  updateGroup = () => {
    const { groupName, cliName, zipCode, virtualSite } = this.state.group;
    const data = {
      groupName,
      cliName,
      virtualSite,
      zipCode
    };
    this.props
      .fetchPutUpdateGroupDetails(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        data
      )
      .then(() => this.setState({ isDisabled: true }));
  };
}

const mapStateToProps = state => ({ group: state.group });

const mapDispatchToProps = { fetchGetGroupById, fetchPutUpdateGroupDetails };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);