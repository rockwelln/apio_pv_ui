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
import Select from "react-select";

import Loading from "../../../../common/Loading";
import {
  fetchGetUserByName,
  fetchPutUpdateUser,
  fetchGetAvailableNumbersByGroupId
} from "../../../../store/actions";

class PhoneNumber extends Component {
  state = {
    isLoadingUser: true,
    phoneNumber: { value: "", label: "none" },
    cliPhoneNumber: { value: "", label: "none" },
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
          phoneNumber: this.props.user.phoneNumber
            ? {
                value: this.props.user.phoneNumber,
                label: this.props.user.phoneNumber
              }
            : { value: "", label: "none" },
          cliPhoneNumber: this.props.user.cliPhoneNumber
            ? {
                value: this.props.user.cliPhoneNumber,
                label: this.props.user.cliPhoneNumber
              }
            : { value: "", label: "none" },
          extension: this.props.user.extension,
          isLoadingUser: false
        })
      );

    this.props.fetchGetAvailableNumbersByGroupId(
      this.props.match.params.tenantId,
      this.props.match.params.groupId
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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

    const phoneNumbers = this.getPhonenumbers();

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
                <Select
                  className={"width-100p"}
                  defaultValue={phoneNumber}
                  onChange={selected =>
                    this.setState({ phoneNumber: selected })
                  }
                  options={phoneNumbers}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="cliPhoneNumber">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                CLI for outgoing calls
              </Col>
              <Col md={9}>
                <Select
                  className={"width-100p"}
                  defaultValue={cliPhoneNumber}
                  onChange={selected =>
                    this.setState({ cliPhoneNumber: selected })
                  }
                  options={phoneNumbers}
                />
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
                      extension: e.target.value
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
              <Button
                onClick={this.updateUser}
                type="submit"
                className={"btn-primary"}
              >
                <Glyphicon glyph="glyphicon glyphicon-ok" /> UPDATE
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }

  getPhonenumbers = () => {
    const { phoneNumber, cliPhoneNumber } = this.state;
    const phoneNumbers = [];
    const availableNumbers = [...this.props.availableNumbers];
    phoneNumbers.push({ value: "", label: "none" });
    if (phoneNumber.value) {
      if (~availableNumbers.indexOf(phoneNumber.value)) {
        availableNumbers.splice(availableNumbers.indexOf(phoneNumber.value), 1);
      }
      phoneNumbers.push(phoneNumber);
    }
    if (cliPhoneNumber.value) {
      if (~availableNumbers.indexOf(cliPhoneNumber.value)) {
        availableNumbers.splice(
          availableNumbers.indexOf(cliPhoneNumber.value),
          1
        );
      }
      phoneNumbers.push(cliPhoneNumber);
    }
    return [
      ...phoneNumbers,
      ...availableNumbers.map(number => ({
        value: number,
        label: number
      }))
    ];
  };

  updateUser = e => {
    e.preventDefault();
    const { phoneNumber, cliPhoneNumber, extension } = this.state;

    const data = {
      phoneNumber: phoneNumber.value,
      cliPhoneNumber: cliPhoneNumber.value,
      extension
    };

    this.setState({ updateMassage: "Loading..." }, () =>
      this.props.fetchPutUpdateUser(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.userName,
        data
      )
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
