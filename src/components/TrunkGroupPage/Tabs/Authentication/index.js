import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

import { fetchPutUpdateTrunkGroup } from "../../../../store/actions";

export class Authentication extends Component {
  state = {
    requireAuthentication: null,
    sipAuthenticationUserName: null,
    sipAuthenticationPassword: null,
    disableButton: false
  };

  componentDidMount() {
    this.setState({
      requireAuthentication: this.props.trunkGroup.requireAuthentication,
      sipAuthenticationUserName: this.props.trunkGroup
        .sipAuthenticationUserName,
      sipAuthenticationPassword: this.props.trunkGroup.sipAuthenticationPassword
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
                autoComplete={false}
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
        <Row>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>Password</div>
            <div>
              <FormControl
                autoComplete="new-password"
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
        </Row>
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
      sipAuthenticationPassword
    } = this.state;

    const data = {
      requireAuthentication: requireAuthentication && requireAuthentication,
      sipAuthenticationUserName:
        sipAuthenticationUserName && sipAuthenticationUserName,
      sipAuthenticationPassword:
        sipAuthenticationPassword && sipAuthenticationPassword
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
  )(Authentication)
);
