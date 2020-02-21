import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { fetchGetTeam, fetchPutUpdateTeam } from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";
import DeleteModal from "./DeleteModal";
import { FormattedMessage } from "react-intl";
import { isAllowed, pages } from "../../utils/user";

export class AddReconciliationTeam extends Component {
  state = {
    name: "",
    email: "",
    users: [{ username: "", email: "" }],
    buttonName: "Update",
    showDelete: false
  };
  fetchReq() {
    this.props.fetchGetTeam(this.props.match.params.teamName).then(() =>
      this.setState({
        isLoading: false,
        name: this.props.team.name,
        email: this.props.team.email,
        users: this.props.team.users.length
          ? this.props.team.users
          : [{ username: "", email: "" }]
      })
    );
  }
  componentDidMount() {
    this.fetchReq();
  }
  render() {
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage
                id="reconciliationTeam"
                defaultMessage={`Reconciliation Team: ${this.props.team.name}`}
              />
              {isAllowed(
                localStorage.getItem("userProfile"),
                pages.delete_access
              ) && (
                <Glyphicon
                  glyph="glyphicon glyphicon-trash"
                  onClick={() => this.setState({ showDelete: true })}
                />
              )}
              <DeleteModal
                teamName={this.props.team.name}
                show={this.state.showDelete}
                onClose={() => {
                  this.setState({ showDelete: false });
                }}
              />
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="name" defaultMessage="Name" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    placeholder="Name"
                    type="text"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="email" defaultMessage="Email" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    placeholder="Email"
                    type="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex"}>
                <div className={"flex flex-basis-16 margin-right-1 "}>
                  <FormattedMessage id="user" defaultMessage="Users" />
                </div>
                <div className={"margin-right-1 flex-column flex-basis-66 "}>
                  {this.state.users.map((user, i) => (
                    <div
                      key={i}
                      className={"flex align-items-center margin-bottom-1"}
                    >
                      <FormControl
                        placeholder="User name"
                        type="text"
                        value={user.username}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState(curState => {
                            const users = [...curState.users];
                            users[i] = {
                              ...users[i],
                              username: val
                            };
                            return { users };
                          });
                        }}
                        className={"flex flex-basis-33 margin-right-1"}
                      />
                      <FormControl
                        placeholder="User email"
                        type="text"
                        value={user.email}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState(curState => {
                            const users = [...curState.users];
                            users[i] = {
                              ...users[i],
                              email: val
                            };
                            return { users };
                          });
                        }}
                        className={"flex flex-basis-33 margin-right-1"}
                      />
                      {this.state.users.length > 1 && (
                        <Glyphicon
                          className={"margin-0 margin-right-1 font-18"}
                          glyph="glyphicon glyphicon-remove"
                          onClick={() => this.removeUserFromArray(i)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"flex flex-basis-16 margin-right-1 "}></div>
                <div
                  className={"margin-right-1 flex cursor-pointer"}
                  onClick={this.addUserToArray}
                >
                  <Glyphicon
                    className={"margin-0 margin-right-1 font-18"}
                    glyph="glyphicon glyphicon-plus-sign"
                  />
                  <div className={"flex"}>Add a user</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.addTeam}
                      type="submit"
                      className="btn-primary"
                      disabled={
                        !this.state.email ||
                        !this.state.name ||
                        this.state.buttonName === "Updating..."
                      }
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />{" "}
                      {this.state.buttonName}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }

  addUserToArray = () => {
    const users = this.state.users;
    users.push({ username: "", email: "" });
    this.setState({ users });
  };

  removeUserFromArray = i => {
    const users = this.state.users;
    users.splice(i, 1);
    this.setState({ users });
  };

  addTeam = () => {
    const { name, email, users } = this.state;
    const clearUsers = users.filter(user => user.username || user.email);
    const data = {
      name,
      email,
      users: clearUsers.length ? clearUsers : []
    };
    //const clearData = removeEmpty(data);
    this.setState({ buttonName: "Updating..." }, () =>
      this.props
        .fetchPutUpdateTeam(this.props.team.name, data)
        .then(() => this.setState({ buttonName: "Update" }))
    );
  };
}

const mapStateToProps = state => ({
  team: state.team
});

const mapDispatchToProps = { fetchPutUpdateTeam, fetchGetTeam };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddReconciliationTeam)
);
