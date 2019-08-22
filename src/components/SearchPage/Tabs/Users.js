import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";
import Button from "react-bootstrap/lib/Button";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import { removeEmpty } from "../../remuveEmptyInObject";
import { fetchGetSearchUsers } from "../../../store/actions";

export class Users extends Component {
  state = {
    insensitiveUserIdContains: "",
    insensitiveUserLastNameContains: "",
    insensitiveUserFirstNameContains: "",
    insensitivePhoneNumberContains: "",
    insensitiveEmailAddressContains: "",
    insensitiveUserInTrunkGroupEquals: null,
    insensitiveGroupIdContains: "",
    responseSizeLimit: undefined,
    showLastName: false,
    showFirstName: false,
    showPhoneNumber: false,
    showEmailAddress: false,
    showUserInTrunkGroup: false,
    showGroupId: false,
    showSizeLimit: false,
    buttonSearch: "Search",
    sizeError: null
  };

  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              User ID contains:
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.insensitiveUserIdContains}
                onChange={e => {
                  this.setState({
                    insensitiveUserIdContains: e.target.value
                  });
                }}
              />
            </div>
            {!this.state.showLastName && (
              <div>
                <Glyphicon
                  className={"x-large margin-0"}
                  glyph="glyphicon glyphicon-plus-sign"
                  onClick={() =>
                    !this.state.showLastName &&
                    this.setState({ showLastName: true })
                  }
                />
              </div>
            )}
          </Col>
        </Row>
        {this.state.showLastName && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                User last name contains:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.state.insensitiveUserLastNameContains}
                  onChange={e => {
                    this.setState({
                      insensitiveUserLastNameContains: e.target.value
                    });
                  }}
                />
              </div>
              {!this.state.showFirstName && (
                <div>
                  <Glyphicon
                    className={"x-large margin-0"}
                    glyph="glyphicon glyphicon-plus-sign"
                    onClick={() =>
                      !this.state.showFirstName &&
                      this.setState({ showFirstName: true })
                    }
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        {this.state.showFirstName && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                User first name contains:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.state.insensitiveUserFirstNameContains}
                  onChange={e => {
                    this.setState({
                      insensitiveUserFirstNameContains: e.target.value
                    });
                  }}
                />
              </div>
              {!this.state.showPhoneNumber && (
                <div>
                  <Glyphicon
                    className={"x-large margin-0"}
                    glyph="glyphicon glyphicon-plus-sign"
                    onClick={() =>
                      !this.state.showPhoneNumber &&
                      this.setState({ showPhoneNumber: true })
                    }
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        {this.state.showPhoneNumber && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                User phone number contains:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="number"
                  value={this.state.insensitivePhoneNumberContains}
                  onChange={e => {
                    this.setState({
                      insensitivePhoneNumberContains: e.target.value
                    });
                  }}
                />
              </div>
              {!this.state.showEmailAddress && (
                <div>
                  <Glyphicon
                    className={"x-large margin-0"}
                    glyph="glyphicon glyphicon-plus-sign"
                    onClick={() =>
                      !this.state.showEmailAddress &&
                      this.setState({ showEmailAddress: true })
                    }
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        {this.state.showEmailAddress && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                User e-mail contains:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="number"
                  value={this.state.insensitiveEmailAddressContains}
                  onChange={e => {
                    this.setState({
                      insensitiveEmailAddressContains: e.target.value
                    });
                  }}
                />
              </div>
              {!this.state.showUserInTrunkGroup && (
                <div>
                  <Glyphicon
                    className={"x-large margin-0"}
                    glyph="glyphicon glyphicon-plus-sign"
                    onClick={() =>
                      !this.state.showUserInTrunkGroup &&
                      this.setState({ showUserInTrunkGroup: true })
                    }
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        {this.state.showUserInTrunkGroup && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                Is trunk user:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormGroup>
                  <Radio
                    className={"margin-left-1 width-12"}
                    name="radioGroup"
                    checked={
                      this.state.insensitiveUserInTrunkGroupEquals === ""
                    }
                    onChange={() =>
                      this.setState({ insensitiveUserInTrunkGroupEquals: "" })
                    }
                  >
                    <div>doesn't matter</div>
                  </Radio>
                  <Radio
                    className={"margin-left-1 width-12"}
                    name="radioGroup"
                    checked={
                      this.state.insensitiveUserInTrunkGroupEquals === true
                    }
                    onChange={() =>
                      this.setState({ insensitiveUserInTrunkGroupEquals: true })
                    }
                  >
                    <div>yes</div>
                  </Radio>
                  <Radio
                    className={"margin-left-1 width-12"}
                    name="radioGroup"
                    checked={
                      this.state.insensitiveUserInTrunkGroupEquals === false
                    }
                    onChange={() =>
                      this.setState({
                        insensitiveUserInTrunkGroupEquals: false
                      })
                    }
                  >
                    <div>no</div>
                  </Radio>
                </FormGroup>
              </div>
              {!this.state.showGroupId && (
                <div>
                  <Glyphicon
                    className={"x-large margin-0"}
                    glyph="glyphicon glyphicon-plus-sign"
                    onClick={() =>
                      !this.state.showGroupId &&
                      this.setState({ showGroupId: true })
                    }
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        {this.state.showGroupId && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                Group ID contains:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.state.insensitiveGroupIdContains}
                  onChange={e => {
                    this.setState({
                      insensitiveGroupIdContains: e.target.value
                    });
                  }}
                />
              </div>
              {!this.state.showSizeLimit && (
                <div>
                  <Glyphicon
                    className={"x-large margin-0"}
                    glyph="glyphicon glyphicon-plus-sign"
                    onClick={() =>
                      !this.state.showSizeLimit &&
                      this.setState({ showSizeLimit: true })
                    }
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        {this.state.showSizeLimit && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                Max number of results:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormGroup
                  controlId="size"
                  validationState={this.state.sizeError}
                >
                  <FormControl
                    type="number"
                    min={1}
                    value={this.state.responseSizeLimit}
                    onChange={e => {
                      this.setState({
                        responseSizeLimit: e.target.value,
                        sizeError: null
                      });
                    }}
                  />
                  {this.state.sizeError && (
                    <HelpBlock>Can be empty, if not it should be > 0</HelpBlock>
                  )}
                </FormGroup>
              </div>
            </Col>
          </Row>
        )}
        <Row className={"margin-top-1"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  className={"btn-primary"}
                  onClick={this.search}
                  disabled={
                    (!this.state.insensitiveUserIdContains &&
                      !this.state.insensitiveUserLastNameContains &&
                      !this.state.insensitiveUserFirstNameContains &&
                      !this.state.insensitivePhoneNumberContains &&
                      !this.state.insensitiveEmailAddressContains &&
                      this.state.insensitiveUserInTrunkGroupEquals === null &&
                      !this.state.insensitiveGroupIdContains) ||
                    this.state.buttonSearch === "Searching..."
                  }
                >
                  {this.state.buttonSearch}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  search = () => {
    const {
      insensitiveUserIdContains,
      insensitiveUserLastNameContains,
      insensitiveUserFirstNameContains,
      insensitivePhoneNumberContains,
      insensitiveEmailAddressContains,
      insensitiveUserInTrunkGroupEquals,
      insensitiveGroupIdContains,
      responseSizeLimit
    } = this.state;

    if (responseSizeLimit && responseSizeLimit < 1) {
      this.setState({ sizeError: "error" });
      return;
    }

    const data = {
      insensitiveUserIdContains,
      insensitiveUserLastNameContains,
      insensitiveUserFirstNameContains,
      insensitivePhoneNumberContains,
      insensitiveEmailAddressContains,
      insensitiveUserInTrunkGroupEquals,
      insensitiveGroupIdContains,
      responseSizeLimit
    };
    const clearData = removeEmpty(data);
    const queryString = Object.keys(clearData)
      .map(key => key + "=" + clearData[key])
      .join("&");
    this.setState({ buttonSearch: "Searching..." }, () =>
      this.props
        .fetchGetSearchUsers(queryString)
        .then(() => this.setState({ buttonSearch: "Search" }))
    );
  };
}

const mapStateToProps = state => ({
  users: state.usersFound
});

const mapDispatchToProps = { fetchGetSearchUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
