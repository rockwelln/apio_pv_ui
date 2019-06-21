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
import InputGroup from "react-bootstrap/lib/InputGroup";
import { Form } from "react-bootstrap";

import {
  fetchPostCreateGroupAdmin,
  fetchPostCreateTenantAdmin,
  fetchGetGroupById,
  fetchGetTenantById,
  clearErrorMassage
} from "../../store/actions";

import Loading from "../../common/Loading";

class CreateAdmin extends Component {
  state = {
    createAdminData: {
      userId: "",
      firstName: "",
      lastName: "",
      language: "English",
      password: ""
    },
    passwordConfirmation: "",
    passwordNotMatch: null,
    isLoading: true
  };

  componentDidMount() {
    console.log(this.props.match.params.groupId);
    this.props.match.params.groupId
      ? this.props
          .fetchGetGroupById(
            this.props.match.params.tenantId,
            this.props.match.params.groupId
          )
          .then(() => this.setState({ isLoading: false }))
      : this.props
          .fetchGetTenantById(this.props.match.params.tenantId)
          .then(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.shouldRedirect && this.props.shouldRedirect) {
      this.props.match.params.groupId
        ? this.props.history.push(
            `/provisioning/broadsoft_xsp1_as1/tenants/${
              this.props.match.params.tenantId
            }/groups/${this.props.match.params.groupId}`
          )
        : this.props.history.push(
            `/provisioning/broadsoft_xsp1_as1/tenants/${
              this.props.match.params.tenantId
            }`
          );
    }
  }

  render() {
    const {
      createAdminData,
      passwordConfirmation,
      passwordNotMatch,
      isLoading
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="Details">
            <ControlLabel className={"margin-1"}>CREATE ADMIN</ControlLabel>
            <FormGroup controlId="usernameGroupAdmin">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Username
              </Col>
              <Col md={9}>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="User name"
                    defaultValue={createAdminData.userId}
                    autoComplete="new-username"
                    onChange={e => {
                      this.setState({
                        createAdminData: {
                          ...this.state.createAdminData,
                          userId: e.target.value
                        }
                      });
                      this.props.clearErrorMassage();
                    }}
                  />
                  <InputGroup.Addon>{`@${
                    this.props.match.params.groupId
                      ? this.props.groupDefaultDomain
                      : this.props.tenantDefaultDomain
                  }`}</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="firstName">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                First Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="First name"
                  defaultValue={createAdminData.firstName}
                  onChange={e => {
                    this.setState({
                      createAdminData: {
                        ...this.state.createAdminData,
                        firstName: e.target.value
                      }
                    });
                    this.props.clearErrorMassage();
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="lastName">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Last Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Last name"
                  defaultValue={createAdminData.lastName}
                  onChange={e => {
                    this.setState({
                      createAdminData: {
                        ...this.state.createAdminData,
                        lastName: e.target.value
                      }
                    });
                    this.props.clearErrorMassage();
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="language">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Language
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Language"
                  defaultValue={createAdminData.language}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="passwordGroupAdmin"
              validationState={passwordNotMatch}
            >
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Password
              </Col>
              <Col md={9}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  defaultValue={createAdminData.password}
                  onChange={e => {
                    this.setState({
                      createAdminData: {
                        ...this.state.createAdminData,
                        password: e.target.value
                      },
                      passwordNotMatch: null
                    });
                    this.props.clearErrorMassage();
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="passwordConfirmation"
              validationState={passwordNotMatch}
            >
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Password confirmation
              </Col>
              <Col md={9}>
                <FormControl
                  type="password"
                  placeholder="Password confirmation"
                  autoComplete="new-password"
                  defaultValue={passwordConfirmation}
                  onChange={e => {
                    this.setState({
                      passwordConfirmation: e.target.value,
                      passwordNotMatch: null
                    });
                    this.props.clearErrorMassage();
                  }}
                />
                {passwordNotMatch && <HelpBlock>Passwords not match</HelpBlock>}
              </Col>
            </FormGroup>
            <Col mdOffset={3} md={9}>
              {this.props.errorMassage && (
                <HelpBlock bsClass="color-error">
                  {this.props.errorMassage}
                </HelpBlock>
              )}
            </Col>
          </FormGroup>
          <Row>
            <Col mdPush={10} md={1}>
              <Button onClick={this.createAdmin}>
                <Glyphicon glyph="glyphicon glyphicon-ok" /> CREATE
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }

  createAdmin = () => {
    const { createAdminData, passwordConfirmation } = this.state;
    if (createAdminData.password !== passwordConfirmation) {
      this.setState({ passwordNotMatch: "error" });
      return;
    }
    this.props.match.params.groupId
      ? this.props.fetchPostCreateGroupAdmin(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          createAdminData
        )
      : this.props.fetchPostCreateTenantAdmin(
          this.props.match.params.tenantId,
          createAdminData
        );
  };
}

const mapStateToProps = state => ({
  groupDefaultDomain: state.group.defaultDomain,
  tenantDefaultDomain: state.tenant.defaultDomain,
  errorMassage: state.errorMassage,
  shouldRedirect: state.shouldRedirect
});

const mapDispatchToProps = {
  fetchPostCreateGroupAdmin,
  fetchPostCreateTenantAdmin,
  fetchGetGroupById,
  fetchGetTenantById,
  clearErrorMassage
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateAdmin)
);
