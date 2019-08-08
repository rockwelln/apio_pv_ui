import React, { Component } from "react";
import { connect } from "react-redux";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

export class Details extends Component {
  state = {
    requireAuthentication: "",
    sipAuthenticationUserName: "",
    pilotUserId: "",
    accessDevice: ""
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
          <Col md={12}>
            <Checkbox
              checked={this.state.requireAuthentication}
              onChange={e => {
                this.setState({ requireAuthentication: e.target.checked });
              }}
            >
              Authentication required?
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              SIP username for authentication
            </div>
            <div>
              <FormControl
                type="text"
                value={this.state.sipAuthenticationUserName}
                onChange={e => {
                  this.setState({
                    sipAuthenticationUserName: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
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
        <Row className={"margin-top-1"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button className={"btn-primary"}>&nbsp; Update</Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  trunkGroup: state.trunkGroup,
  trunkGroupUsers: state.trunkGroupUsers
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
