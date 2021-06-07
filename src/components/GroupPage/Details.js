import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

import Loading from "../../common/Loading";

import { isAllowed, pages } from "../../utils/user";

import { FormattedMessage } from "react-intl";

import {
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
  fetchGetPhoneNumbersByGroupNotTP,
  fetchGetPhoneNumbersByGroupId,
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
    isLoadingPN: true,
    group: {},
    disabledUpdateButton: false,
  };

  fetchGroup = () => {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoading: false, group: this.props.group }));
    this.props
      .fetchGetPhoneNumbersByGroupNotTP(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoadingPN: false }));
  };

  componentDidMount() {
    this.fetchGroup();
  }

  render() {
    if (this.state.isLoading || this.state.isLoadingPN) {
      return <Loading />;
    }
    const { group } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col md={12} className={"flex align-items-center"}>
            <React.Fragment>
              <div className={"header margin-right-2"}>
                <FormattedMessage id="details" defaultMessage="Details" />
              </div>
              {isAllowed(
                localStorage.getItem("userProfile"),
                pages.edit_group_details
              )
                ? this.state.isDisabled && (
                    <Glyphicon
                      className={"font-18"}
                      glyph="glyphicon glyphicon-pencil"
                      onClick={() => this.setState({ isDisabled: false })}
                    />
                  )
                : null}
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
              <FormattedMessage
                id="groupTpid"
                defaultMessage="Tina Product Id"
              />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.group.groupTpid}
                placeholder={"Group Tina Product Id"}
                onChange={(e) =>
                  this.setState({
                    group: { ...this.state.group, groupTpid: e.target.value },
                  })
                }
                disabled={this.state.isDisabled || this.props.group.groupTpid}
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
                onChange={(e) =>
                  this.setState({
                    group: { ...this.state.group, groupName: e.target.value },
                  })
                }
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        {/* <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="mainNumber" defaultMessage="CLI Name" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.group.cliName}
                placeholder={"CLI Name"}
                onChange={e =>
                  this.setState({
                    group: { ...this.state.group, cliName: e.target.value }
                  })
                }
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row> */}
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="mainNumber" defaultMessage="Main Number" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.group.cliPhoneNumber}
                onChange={(e) =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      cliPhoneNumber: e.target.value,
                    },
                  })
                }
                disabled={this.state.isDisabled}
              >
                {!this.state.group.cliPhoneNumber && (
                  <option key={"empty"} value={""}></option>
                )}
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
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="zipCode" defaultMessage="ZIP code" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                className={"hide-arrows"}
                type="number"
                value={this.state.group.zipCode}
                min={0}
                placeholder={"ZIP code"}
                onChange={(e) => {
                  if (e.target.value < 0) {
                    return;
                  }
                  this.setState({
                    group: { ...this.state.group, zipCode: e.target.value },
                  });
                }}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        {group.accessType === "COAX" || group.accessType === "VDSL" ? null : (
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
                    checked={this.state.group.virtual}
                    disabled
                    onChange={(e) =>
                      this.setState({
                        group: {
                          ...this.state.group,
                          virtual: e.target.checked,
                        },
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
                    checked={!this.state.group.virtual}
                    disabled
                    onChange={(e) =>
                      this.setState({
                        virtual: false,
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
        )}
        {!this.state.isDisabled && (
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => this.updateGroup()}
                    type="submit"
                    disabled={this.state.disabledUpdateButton}
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    {this.state.disabledUpdateButton ? (
                      <FormattedMessage
                        id="updating"
                        defaultMessage="Updating..."
                      />
                    ) : (
                      <FormattedMessage id="update" defaultMessage="Update" />
                    )}
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
    const {
      groupName,
      //cliName,
      zipCode,
      cliPhoneNumber,
      groupTpid,
    } = this.state.group;
    const data = {
      groupName,
      //cliName,
      cliPhoneNumber,
      zipCode,
      groupTpid,
    };
    this.setState({ disabledUpdateButton: true }, () =>
      this.props
        .fetchPutUpdateGroupDetails(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          data
        )
        .then(() => {
          this.props.fetchGetPhoneNumbersByGroupId(
            this.props.match.params.tenantId,
            this.props.match.params.groupId
          );
          this.setState({ isDisabled: true, disabledUpdateButton: false });
        })
    );
    // this.props
    //   .fetchPutUpdateGroupDetails(
    //     this.props.match.params.tenantId,
    //     this.props.match.params.groupId,
    //     data
    //   )
    //   .then(() => {
    //     this.props.fetchGetPhoneNumbersByGroupId(
    //       this.props.match.params.tenantId,
    //       this.props.match.params.groupId
    //     );
    //     this.setState({ isDisabled: true });
    //   });
  };
}

const mapStateToProps = (state) => ({
  group: state.group,
  phoneNumbersByGroupNotTP: state.phoneNumbersByGroupNotTP,
});

const mapDispatchToProps = {
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
  fetchGetPhoneNumbersByGroupNotTP,
  fetchGetPhoneNumbersByGroupId,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(index));
