import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";
import {
  fetchGetUserByName,
  fetchPutUpdateUser,
  fetchGetAvailableNumbersByGroupId
} from "../../../../store/actions";

class PhoneNumber extends Component {
  state = {
    isLoadingUser: true,
    phoneNumber: "",
    cliPhoneNumber: "",
    extension: "",
    updateMassage: ""
  };

  componentDidMount() {
    this.props
      .fetchGetUserByName(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.userName
      )
      .then(() =>
        this.setState({
          phoneNumber: this.props.user.phoneNumber,
          cliPhoneNumber: this.props.user.cliPhoneNumber,
          extension: this.props.user.extension,
          isLoadingUser: false
        })
      );

    this.props.fetchGetAvailableNumbersByGroupId(
      this.props.match.params.tenantId,
      this.props.match.params.groupId
    );
  }

  render() {
    const {
      isLoadingUser,
      phoneNumber,
      cliPhoneNumber,
      extension,
      updateMassage
    } = this.state;

    if (isLoadingUser) {
      return <Loading />;
    }

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="Details">
            <ControlLabel className={"margin-1"}>NUMBERS</ControlLabel>
            <FormGroup controlId="phoneNumber">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Phone Number
              </Col>
              <Col md={9}>
                <FormControl
                  componentClass="select"
                  placeholder="Phone Number"
                  defaultValue={phoneNumber}
                  onChange={e =>
                    this.setState({
                      phoneNumber: e.target.value,
                      updateMassage: ""
                    })
                  }
                >
                  <option key={"none"} value="">
                    none
                  </option>
                  {phoneNumber && (
                    <option key={"phoneNumber"} value={phoneNumber}>
                      {phoneNumber}
                    </option>
                  )}
                  {cliPhoneNumber && (
                    <option key={"cliPhoneNumber"} value={cliPhoneNumber}>
                      {cliPhoneNumber}
                    </option>
                  )}
                  {this.props.availableNumbers.map((number, i) => (
                    <option key={i} value={number}>
                      {number}
                    </option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="cliPhoneNumber">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                CLI for outgoing calls
              </Col>
              <Col md={9}>
                <FormControl
                  componentClass="select"
                  placeholder="CLI for outgoing calls"
                  defaultValue={cliPhoneNumber}
                  onChange={e =>
                    this.setState({
                      cliPhoneNumber: e.target.value,
                      updateMassage: ""
                    })
                  }
                >
                  <option key={"none"} value="">
                    none
                  </option>
                  {cliPhoneNumber && (
                    <option key={"cliPhoneNumber"} value={cliPhoneNumber}>
                      {cliPhoneNumber}
                    </option>
                  )}
                  {phoneNumber && (
                    <option key={"phoneNumber"} value={phoneNumber}>
                      {phoneNumber}
                    </option>
                  )}
                  {this.props.availableNumbers.map((number, i) => (
                    <option key={i} value={number}>
                      {number}
                    </option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="extension">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Extension
              </Col>
              <Col md={9}>
                <FormControl
                  type="number"
                  placeholder="Extension"
                  defaultValue={extension}
                  onChange={e =>
                    this.setState({
                      extension: e.target.value,
                      updateMassage: ""
                    })
                  }
                />
              </Col>
            </FormGroup>
            <Col mdOffset={3} md={9}>
              {updateMassage && (
                <HelpBlock
                  bsClass={`${
                    updateMassage === "Loading..."
                      ? "color-info"
                      : "color-success"
                  }`}
                >
                  {updateMassage}
                </HelpBlock>
              )}
            </Col>
          </FormGroup>
          <Row>
            <Col mdPush={10} md={1}>
              <Button onClick={this.updateUser} type="submit">
                <Glyphicon glyph="glyphicon glyphicon-ok" /> UPDATE
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }

  updateUser = e => {
    e.preventDefault();
    const { phoneNumber, cliPhoneNumber, extension } = this.state;

    const data = {
      phoneNumber,
      cliPhoneNumber,
      extension
    };

    this.setState({ updateMassage: "Loading..." }, () =>
      this.props
        .fetchPutUpdateUser(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          this.props.match.params.userName,
          data
        )
        .then(() => this.setState({ updateMassage: "User is updated" }))
    );
  };
}

const mapDispatchToProps = {
  fetchGetUserByName,
  fetchPutUpdateUser,
  fetchGetAvailableNumbersByGroupId
};

const mapStateToProps = state => ({
  user: state.user,
  availableNumbers: state.availableNumbers
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneNumber)
);
