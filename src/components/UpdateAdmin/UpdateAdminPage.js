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
  //   fetchPostCreateGroupAdmin,
  fetchGetGroupById,
  //   clearErrorMassage,
  fetchGetGroupAdminByAdminId
} from "../../store/actions";

import Loading from "../../common/Loading";

class CreateAdmin extends Component {
  state = {
    updateAdminData: {
      firstName: "",
      lastName: "",
      language: "English",
      password: ""
    },
    passwordConfirmation: "",
    passwordNotMatch: null,
    isLoadingGroup: true,
    isLoadingAdmin: true
  };

  componentDidMount() {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoadingGroup: false }));
    this.props
      .fetchGetGroupAdminByAdminId(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.adminId
      )
      .then(() =>
        this.setState({
          updateAdminData: this.props.admin,
          isLoadingAdmin: false
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.shouldRedirect && this.props.shouldRedirect) {
      this.props.history.push(
        `/provisioning/broadsoft_xsp1_as1/tenants/${
          this.props.match.params.tenantId
        }/${this.props.match.params.groupId}`
      );
    }
  }

  render() {
    const {
      updateAdminData,
      passwordConfirmation,
      passwordNotMatch,
      isLoadingGroup,
      isLoadingAdmin
    } = this.state;

    if (isLoadingGroup && isLoadingAdmin) {
      return <Loading />;
    }
    const splitedAdminId = this.props.match.params.adminId.slice(
      0,
      this.props.match.params.adminId.indexOf("@")
    );

    console.log(updateAdminData);

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="Details">
            <ControlLabel className={"margin-1"}>UPDATE ADMIN</ControlLabel>
            <FormGroup controlId="usernameGroupAdmin">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Username
              </Col>
              <Col md={9}>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="User name"
                    defaultValue={splitedAdminId}
                    autoComplete="new-username"
                    disabled
                  />
                  <InputGroup.Addon>{`@${
                    this.props.defaultDomain
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
                  defaultValue={updateAdminData.firstName}
                  onChange={e => {
                    this.setState({
                      updateAdminData: {
                        ...this.state.updateAdminData,
                        firstName: e.target.value
                      }
                    });
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
                  defaultValue={updateAdminData.lastName}
                  onChange={e => {
                    this.setState({
                      updateAdminData: {
                        ...this.state.updateAdminData,
                        lastName: e.target.value
                      }
                    });
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
                  defaultValue={updateAdminData.language}
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
                  defaultValue={updateAdminData.password}
                  onChange={e => {
                    this.setState({
                      updateAdminData: {
                        ...this.state.updateAdminData,
                        password: e.target.value
                      },
                      passwordNotMatch: null
                    });
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
                <Glyphicon glyph="glyphicon glyphicon-ok" /> UPDATE
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }

  createAdmin = () => {
    const { updateAdminData, passwordConfirmation } = this.state;
    if (updateAdminData.password !== passwordConfirmation) {
      this.setState({ passwordNotMatch: "error" });
      const data = {
        firstName: updateAdminData.firstName,
        lastName: updateAdminData.lastName
      };
      return;
    }
    // this.props.fetchPostCreateGroupAdmin(
    //   this.props.match.params.tenantId,
    //   this.props.match.params.groupId,
    //   updateAdminData
    // );
  };
}

const mapStateToProps = state => ({
  defaultDomain: state.group.defaultDomain,
  errorMassage: state.errorMassage,
  shouldRedirect: state.shouldRedirect,

  admin: state.groupAdmin
});

const mapDispatchToProps = {
  //   fetchPostCreateGroupAdmin,
  fetchGetGroupById,
  //   clearErrorMassage,
  fetchGetGroupAdminByAdminId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateAdmin)
);
