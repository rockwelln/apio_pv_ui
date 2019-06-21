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
import Checkbox from "react-bootstrap/lib/Checkbox";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";
import {
  fetchGetUserByName,
  fetchPutUpdateUser
} from "../../../../store/actions";

class Details extends Component {
  state = {
    user: [],
    isLoading: true,
    useSameName: true,
    emailAddress: "",
    firstName: "",
    lastName: "",
    cliFirstName: "",
    cliLastName: "",
    language: "English",
    emailIsValid: null,
    firstNameError: null,
    lastNameError: null,
    updateMassage: ""
  };

  fetchRequst = () => {
    this.props
      .fetchGetUserByName(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.userName
      )
      .then(() =>
        this.setState({
          emailAddress: this.props.user.emailAddress,
          firstName: this.props.user.firstName,
          lastName: this.props.user.lastName,
          cliFirstName: this.props.user.cliFirstName,
          cliLastName: this.props.user.cliLastName,
          isLoading: false
        })
      );
  };

  componentDidMount() {
    this.fetchRequst();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {
      isLoading,
      emailAddress,
      firstName,
      lastName,
      cliFirstName,
      cliLastName,
      language,
      emailIsValid,
      firstNameError,
      lastNameError,
      updateMassage
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="Details">
            <ControlLabel className={"margin-1"}>DETAILS</ControlLabel>
            <FormGroup controlId="userEmail" validationState={emailIsValid}>
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Email
              </Col>
              <Col md={9}>
                <FormControl
                  type="email"
                  placeholder="Email"
                  defaultValue={emailAddress}
                  onChange={e =>
                    this.setState({
                      emailAddress: e.target.value,
                      emailIsValid: null
                    })
                  }
                />
                {emailIsValid && <HelpBlock>Invalid email</HelpBlock>}
              </Col>
            </FormGroup>
            <FormGroup controlId="firstName" validationState={firstNameError}>
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                First Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="First Name"
                  defaultValue={firstName}
                  onChange={e =>
                    this.setState({
                      firstName: e.target.value,
                      firstNameError: null
                    })
                  }
                />
                {firstNameError && <HelpBlock>Field is required</HelpBlock>}
              </Col>
            </FormGroup>
            <FormGroup controlId="lastName" validationState={lastNameError}>
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Last Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Last Name"
                  defaultValue={lastName}
                  onChange={e =>
                    this.setState({
                      lastName: e.target.value,
                      lastNameError: null
                    })
                  }
                />
                {lastNameError && <HelpBlock>Field is required</HelpBlock>}
              </Col>
            </FormGroup>
            <FormGroup controlId="lastName">
              <Col mdOffset={3} md={9}>
                <Checkbox
                  checked={this.state.useSameName}
                  onChange={e =>
                    this.setState({
                      useSameName: e.target.checked
                    })
                  }
                >
                  Use same Name at CLI Name
                </Checkbox>
              </Col>
            </FormGroup>
            {!this.state.useSameName && (
              <React.Fragment>
                <FormGroup controlId="cliFirstName">
                  <Col
                    componentClass={ControlLabel}
                    md={3}
                    className={"text-left"}
                  >
                    CLI First Name
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      placeholder="CLI First Name"
                      defaultValue={cliFirstName}
                      onChange={e =>
                        this.setState({
                          cliFirstName: e.target.value
                        })
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="cliLastName">
                  <Col
                    componentClass={ControlLabel}
                    md={3}
                    className={"text-left"}
                  >
                    CLI Last Name
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      placeholder="CLI Last Name"
                      defaultValue={cliLastName}
                      onChange={e =>
                        this.setState({
                          cliLastName: e.target.value
                        })
                      }
                    />
                  </Col>
                </FormGroup>
              </React.Fragment>
            )}
            <FormGroup controlId="language">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Language
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Language"
                  defaultValue={language}
                  disabled
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

  validateEmail = elementValue => {
    var emailPattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    return emailPattern.test(elementValue);
  };

  updateUser = e => {
    e.preventDefault();
    const {
      useSameName,
      emailAddress,
      firstName,
      lastName,
      cliFirstName,
      cliLastName,
      language
    } = this.state;

    if (emailAddress) {
      if (!this.validateEmail(emailAddress)) {
        this.setState({ emailIsValid: "error" });
        return;
      }
    }
    if (!firstName) {
      this.setState({ firstNameError: "error" });
      return;
    }
    if (!lastName) {
      this.setState({ lastNameError: "error" });
      return;
    }

    const data = {
      emailAddress,
      firstName,
      lastName,
      cliFirstName: useSameName ? firstName : cliFirstName,
      cliLastName: useSameName ? lastName : cliLastName,
      language
    };

    this.setState({ updateMassage: "Loading..." }, () =>
      this.props
        .fetchPutUpdateUser(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          this.props.match.params.userName,
          data
        )
        .then(() =>
          this.setState(
            { updateMassage: "User is updated" },
            () =>
              (this.timer = setTimeout(
                () => this.setState({ updateMassage: "" }),
                3000
              ))
          )
        )
    );
  };
}

const mapDispatchToProps = {
  fetchGetUserByName,
  fetchPutUpdateUser
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
