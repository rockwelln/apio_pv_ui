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
import Panel from "react-bootstrap/lib/Panel";
import Table from "react-bootstrap/lib/Table";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import { removeEmpty } from "../../../remuveEmptyInObject";
import { fetchGetSearchUsers } from "../../../../store/actions";

import { countsPerPages } from "../../../../constants";
import User from "./User";

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
    buttonSearch: "Search",
    sizeError: null,
    users: [],
    paginationUsers: [],
    sortedBy: "",
    page: 0,
    pagination: true,
    countPerPage: 25,
    countPages: null
  };

  render() {
    return (
      <React.Fragment>
        <Panel className={"margin-top-1"} defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>Search criteria</Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
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
                      onKeyPress={e => this.onEnterSearch(e)}
                    />
                  </div>
                </Col>
              </Row>
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
                      onKeyPress={e => this.onEnterSearch(e)}
                    />
                  </div>
                </Col>
              </Row>

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
                      onKeyPress={e => this.onEnterSearch(e)}
                    />
                  </div>
                </Col>
              </Row>
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
                      onKeyPress={e => this.onEnterSearch(e)}
                    />
                  </div>
                </Col>
              </Row>
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    User e-mail contains:
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      value={this.state.insensitiveEmailAddressContains}
                      onChange={e => {
                        this.setState({
                          insensitiveEmailAddressContains: e.target.value
                        });
                      }}
                      onKeyPress={e => this.onEnterSearch(e)}
                    />
                  </div>
                </Col>
              </Row>
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
                          this.setState({
                            insensitiveUserInTrunkGroupEquals: ""
                          })
                        }
                        onKeyPress={e => this.onEnterSearch(e)}
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
                          this.setState({
                            insensitiveUserInTrunkGroupEquals: true
                          })
                        }
                        onKeyPress={e => this.onEnterSearch(e)}
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
                        onKeyPress={e => this.onEnterSearch(e)}
                      >
                        <div>no</div>
                      </Radio>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
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
                      onKeyPress={e => this.onEnterSearch(e)}
                    />
                  </div>
                </Col>
              </Row>
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
                        onKeyPress={e => this.onEnterSearch(e)}
                      />
                      {this.state.sizeError && (
                        <HelpBlock>
                          Can be empty, if not it should be > 0
                        </HelpBlock>
                      )}
                    </FormGroup>
                  </div>
                </Col>
              </Row>
              <Row className={"margin-top-1"}>
                <Col md={12}>
                  <div className="button-row">
                    <div className="pull-right">
                      <Button
                        className={"btn-primary"}
                        onClick={this.search}
                        disabled={this.disabledButton()}
                      >
                        {this.state.buttonSearch}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel className={"margin-top-1"}>
          <Panel.Heading>
            <Panel.Title>Search results</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {!!this.state.paginationUsers.length && (
              <React.Fragment>
                <Row>
                  <Col mdOffset={1} md={11}>
                    <div className={"flex flex-end-center indent-top-bottom-1"}>
                      <div className={"flex align-items-center"}>
                        <div>Item per page</div>
                        <FormControl
                          componentClass="select"
                          defaultValue={this.state.countPerPage}
                          style={{ display: "inline", width: "auto" }}
                          className={"margin-left-1"}
                          onChange={this.changeCoutOnPage}
                        >
                          {countsPerPages.map(counts => (
                            <option key={counts.value} value={counts.value}>
                              {counts.title}
                            </option>
                          ))}
                        </FormControl>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="tenantId"
                              defaultMessage="Tenant ID"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByTenantId}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="groupId"
                              defaultMessage="Group ID"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByGroupId}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="userId"
                              defaultMessage="User ID"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByUserId}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="lastName"
                              defaultMessage="Last Name"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByLastName}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="firstName"
                              defaultMessage="First Name"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByFirstName}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="department"
                              defaultMessage="Department"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByDepartment}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="phoneNumber"
                              defaultMessage="Phone Number"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByPhoneNumber}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="emailAddress"
                              defaultMessage="Email"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByEmailAddress}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="inTrunkGroup"
                              defaultMessage="In Trunk Group"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByInTrunkGroup}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="extension"
                              defaultMessage="Extension"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByExtension}
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.paginationUsers[this.state.page].map(
                          (user, i) => (
                            <User key={i} user={user} />
                          )
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="flex flex-row flex-end-center">
                      <Pagination className={"indent-top-bottom-1"}>
                        <Pagination.Prev onClick={this.decrementPage} />
                        <Pagination.Item>{this.state.page + 1}</Pagination.Item>
                        <Pagination.Next onClick={this.incrementPage} />
                      </Pagination>
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }

  disabledButton = () => {
    return (
      (!this.state.insensitiveUserIdContains &&
        !this.state.insensitiveUserLastNameContains &&
        !this.state.insensitiveUserFirstNameContains &&
        !this.state.insensitivePhoneNumberContains &&
        !this.state.insensitiveEmailAddressContains &&
        this.state.insensitiveUserInTrunkGroupEquals === null &&
        !this.state.insensitiveGroupIdContains) ||
      this.state.buttonSearch === "Searching..."
    );
  };

  onEnterSearch = e => {
    if (e.key === "Enter" && !this.disabledButton()) {
      this.search();
    }
  };

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
      this.props.fetchGetSearchUsers(queryString).then(() =>
        this.setState(
          {
            users: this.props.users.sort((a, b) => {
              if (a.userId < b.userId) return -1;
              if (a.userId > b.userId) return 1;
              return 0;
            }),
            sortedBy: "userId",
            buttonSearch: "Search"
          },
          () => this.pagination()
        )
      )
    );
  };

  changeCoutOnPage = e => {
    this.setState({ countPerPage: Number(e.target.value), page: 0 }, () =>
      this.pagination()
    );
  };

  incrementPage = () => {
    if (this.state.page >= this.state.countPages - 1) {
      return;
    }
    this.setState({ page: this.state.page + 1 });
  };

  decrementPage = () => {
    if (this.state.page === 0) {
      return;
    }
    this.setState({ page: this.state.page - 1 });
  };

  pagination = () => {
    const { countPerPage, users } = this.state;
    const countPages = Math.ceil(users.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = users.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = users.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationUsers: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };

  sortByTenantId = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "tenantId") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.tenantId < b.tenantId) return -1;
        if (a.tenantId > b.tenantId) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "tenantId" }, () =>
        this.pagination()
      );
    }
  };

  sortByGroupId = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "groupId") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.groupId < b.groupId) return -1;
        if (a.groupId > b.groupId) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "groupId" }, () =>
        this.pagination()
      );
    }
  };

  sortByUserId = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "userId") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.userId < b.userId) return -1;
        if (a.userId > b.userId) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "userId" }, () =>
        this.pagination()
      );
    }
  };

  sortByLastName = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "lastName") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "lastName" }, () =>
        this.pagination()
      );
    }
  };

  sortByFirstName = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "firstName") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "firstName" }, () =>
        this.pagination()
      );
    }
  };

  sortByDepartment = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "department") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.department < b.department) return -1;
        if (a.department > b.department) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "department" }, () =>
        this.pagination()
      );
    }
  };

  sortByPhoneNumber = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "phoneNumber") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.phoneNumber < b.phoneNumber) return -1;
        if (a.phoneNumber > b.phoneNumber) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "phoneNumber" }, () =>
        this.pagination()
      );
    }
  };

  sortByEmailAddress = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "emailAddress") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.emailAddress < b.emailAddress) return -1;
        if (a.emailAddress > b.emailAddress) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "emailAddress" }, () =>
        this.pagination()
      );
    }
  };

  sortByInTrunkGroup = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "inTrunkGroup") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.inTrunkGroup < b.inTrunkGroup) return -1;
        if (a.inTrunkGroup > b.inTrunkGroup) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "inTrunkGroup" }, () =>
        this.pagination()
      );
    }
  };

  sortByExtension = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "extension") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.extension < b.extension) return -1;
        if (a.extension > b.extension) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "extension" }, () =>
        this.pagination()
      );
    }
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
