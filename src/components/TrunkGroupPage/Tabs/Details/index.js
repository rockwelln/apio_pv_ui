import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

import { fetchPutUpdateTrunkGroup } from "../../../../store/actions";

export class Details extends Component {
  state = {
    requireAuthentication: null,
    sipAuthenticationUserName: null,
    pilotUserId: null,
    accessDevice: null,
    disableButton: false,
    sipAuthenticationPassword: ""
  };

  componentDidMount() {
    this.setState({
      requireAuthentication: this.props.trunkGroup.requireAuthentication,
      sipAuthenticationUserName: this.props.trunkGroup
        .sipAuthenticationUserName,
      pilotUserId: this.props.trunkGroup.pilotUserId,
      accessDevice: this.props.trunkGroup.accessDevice.name
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Pilot user
            </div>
            <div>
              <FormControl
                componentClass="select"
                value={this.state.pilotUserId}
                onChange={e => this.setState({ pilotUserId: e.target.value })}
              >
                <option value={this.props.trunkGroup.pilotUserId}>
                  {this.props.trunkGroup.pilotUserId}
                </option>
                {this.props.trunkGroupUsers.map(user => (
                  <option key={user.userId} value={user.userId}>
                    {user.userId}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Access device
            </div>
            <div>{this.state.accessDevice}</div>
          </Col>
        </Row>
        {/* <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              SIP password
            </div>
            <div>
              <FormControl
                autoComplete={false}
                type="password"
                value={this.state.sipAuthenticationPassword}
                onChange={e => {
                  this.setState({
                    sipAuthenticationPassword: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row> */}
        <Row className={"margin-top-1"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  className={"btn-primary"}
                  onClick={this.update}
                  disabled={this.state.disableButton}
                >
                  Update
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  update = () => {
    const {
      requireAuthentication,
      sipAuthenticationUserName,
      pilotUserId,
      accessDevice,
      sipAuthenticationPassword
    } = this.state;

    const data = {
      //requireAuthentication: requireAuthentication && requireAuthentication,
      //sipAuthenticationPassword,
      //sipAuthenticationUserName:
      //  sipAuthenticationUserName && sipAuthenticationUserName,
      pilotUserId: pilotUserId && pilotUserId
      //accessDevice: accessDevice && {
      //name: accessDevice
      //}
    };

    this.setState({ disableButton: true }, () =>
      this.props
        .fetchPutUpdateTrunkGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          this.props.match.params.trunkGroupName,
          data
        )
        .then(() => this.setState({ disableButton: false }))
    );
  };
}

const mapStateToProps = state => ({
  trunkGroup: state.trunkGroup,
  trunkGroupUsers: state.trunkGroupUsers
});

const mapDispatchToProps = { fetchPutUpdateTrunkGroup };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
