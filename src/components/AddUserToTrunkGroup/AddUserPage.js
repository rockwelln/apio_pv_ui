import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Select from "react-select";

import {
  fetchGetCategoryByName,
  fetchPostCreateTrunkGroupUser,
  fetchGetGroupById,
  fetchGetAvailableNumbersByGroupId,
  fetchGetLanguages,
  fetchPostAssignPhoneNumbersToGroup
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import Loading from "../../common/Loading";

export class AddUserPage extends Component {
  state = {
    user: [],
    isLoadingTemplates: true,
    templateName: { value: "", label: "none" },
    buttonName: "Create",
    isLoadingGroup: true,
    phoneNumber: { value: "New number", label: "New number" },
    newPhoneNumber: "",
    minPhoneNumber: "",
    maxPhoneNumber: ""
  };

  componentDidMount = () => {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.props
          .fetchGetAvailableNumbersByGroupId(
            this.props.match.params.tenantId,
            this.props.match.params.groupId
          )
          .then(() => this.setState({ isLoadingGroup: false }))
      );
    this.props
      .fetchGetCategoryByName("user")
      .then(() => this.setState({ isLoadingTemplates: false }));
  };
  render() {
    const {
      isLoadingGroup,
      isLoadingTemplates,
      templateName,
      buttonName,
      isLoadingLanguages
    } = this.state;

    if (isLoadingGroup || isLoadingTemplates || isLoadingLanguages) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div
            className={"header"}
          >{`Add a new user to ${this.props.match.params.groupId}`}</div>
        </div>
        <div className={"panel-body"}>
          <div className="alert alert-info" role="alert">
            To add users in bulk, please use the bulk tool
          </div>
          <Row>
            <Col md={8}>
              <Form horizontal className={"margin-1"}>
                <FormGroup controlId="addUser">
                  <FormGroup controlId="phonenumber">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Phone number{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <Select
                        defaultValue={this.state.phoneNumber}
                        onChange={this.setPhoneNumber}
                        placeholder="phone number"
                        isSearchable
                        options={[
                          { value: "New number", label: "New number" },
                          { value: "Range", label: "Range" },
                          ...this.props.availableNumbers.map(number => ({
                            value: number,
                            label: number
                          }))
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  {this.state.phoneNumber.value === "New number" && (
                    <FormGroup controlId="newNumber">
                      <Col
                        componentClass={ControlLabel}
                        md={3}
                        className={"text-left"}
                      >
                        New number{"\u002a"}
                      </Col>
                      <Col md={9}>
                        <FormControl
                          type="number"
                          placeholder="New number"
                          value={this.state.newPhoneNumber}
                          onChange={this.setNewPhoneNumber}
                        />
                      </Col>
                    </FormGroup>
                  )}
                  {this.state.phoneNumber.value === "Range" && (
                    <React.Fragment>
                      <FormGroup controlId="minNumber">
                        <Col
                          componentClass={ControlLabel}
                          md={3}
                          className={"text-left"}
                        >
                          Range start{"\u002a"}
                        </Col>
                        <Col md={9}>
                          <FormControl
                            type="number"
                            placeholder="Start"
                            value={this.state.minPhoneNumber}
                            onChange={e =>
                              this.setState({ minPhoneNumber: e.target.value })
                            }
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="maxNumber">
                        <Col
                          componentClass={ControlLabel}
                          md={3}
                          className={"text-left"}
                        >
                          Range end{"\u002a"}
                        </Col>
                        <Col md={9}>
                          <FormControl
                            type="number"
                            placeholder="End"
                            value={this.state.maxPhoneNumber}
                            onChange={e =>
                              this.setState({ maxPhoneNumber: e.target.value })
                            }
                          />
                        </Col>
                      </FormGroup>
                    </React.Fragment>
                  )}
                  <FormGroup controlId="template">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Template
                    </Col>
                    <Col md={9}>
                      <Select
                        defaultValue={templateName}
                        onChange={this.setTemplate}
                        placeholder="Template"
                        options={[
                          ...this.props.category.templates.map(template => ({
                            value: template.name,
                            label: template.name
                          }))
                        ]}
                      />
                    </Col>
                  </FormGroup>
                </FormGroup>
                <Row>
                  <Col md={12} className={"padding-0"}>
                    <div className="button-row">
                      <div className="pull-right">
                        <Button
                          onClick={this.addUser}
                          type="submit"
                          className="btn-primary"
                          disabled={
                            buttonName === "Creating..." ||
                            !this.state.phoneNumber.value ||
                            (this.state.phoneNumber.value === "New number" &&
                              !this.state.newPhoneNumber)
                          }
                        >
                          <Glyphicon glyph="glyphicon glyphicon-ok" />{" "}
                          {buttonName}
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  setNewPhoneNumber = e => {
    this.setState({
      newPhoneNumber: e.target.value
    });
  };

  setPhoneNumber = selected => {
    if (selected.value === "New number") {
      this.setState({ phoneNumber: selected });
      return;
    }

    this.setState({
      phoneNumber: selected
    });
  };

  setTemplate = selected => {
    this.setState({
      templateName: selected
    });
  };

  setLanguage = selected => {
    this.setState({
      language: selected
    });
  };

  addUser = e => {
    e.preventDefault();
    const {
      templateName,
      phoneNumber,
      newPhoneNumber,
      minPhoneNumber,
      maxPhoneNumber
    } = this.state;

    const data = {
      auto_create:
        phoneNumber.value === "New number" || phoneNumber.value === "Range"
          ? true
          : "",
      numbers: [
        {
          phoneNumber:
            phoneNumber.value === "New number"
              ? newPhoneNumber
              : phoneNumber.value !== "Range"
              ? phoneNumber.value
              : ""
        }
      ],
      range:
        phoneNumber.value === "Range" ? { minPhoneNumber, maxPhoneNumber } : "",
      templateName: templateName.value
    };

    const clearData = removeEmpty(data);

    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateTrunkGroupUser(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          this.props.match.params.trunkGroupName,
          clearData
        )
        .then(res =>
          res === "success"
            ? this.setState({ buttonName: "Create" }, () =>
                this.props.history.push(
                  `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/trunkgroup/${this.props.match.params.trunkGroupName}/`
                )
              )
            : this.setState({ buttonName: "Create" })
        )
    );
  };
}

const mapStateToProps = state => ({
  category: state.category,
  group: state.group,
  createdUserInGroup: state.createdUserInGroup,
  availableNumbers: state.availableNumbers,
  languages: state.languages
});

const mapDispatchToProps = {
  fetchGetCategoryByName,
  fetchPostCreateTrunkGroupUser,
  fetchGetGroupById,
  fetchGetAvailableNumbersByGroupId,
  fetchGetLanguages,
  fetchPostAssignPhoneNumbersToGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddUserPage)
);
