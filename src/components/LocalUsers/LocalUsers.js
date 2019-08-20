import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";
import { FormattedMessage } from "react-intl";

import Loading from "../../common/Loading";
import User from "./User";
import { countsPerPages } from "../../constants";

import { fetchGetLocalUsers } from "../../store/actions";

export class LocalUsers extends Component {
  state = {
    users: [],
    paginationUsers: [],
    searchValue: "",
    sortedBy: "",
    isLoading: true,
    page: 0,
    pagination: true,
    countPerPage: 25,
    countPages: null,
    showDelete: false
  };

  fetchReq = () => {
    this.props.fetchGetLocalUsers().then(() =>
      this.setState(
        {
          users: this.props.localUsers.sort((a, b) => {
            if (a.username < b.username) return -1;
            if (a.username > b.username) return 1;
            return 0;
          }),
          sortedBy: "username",
          isLoading: false
        },
        () => this.pagination()
      )
    );
  };

  componentDidMount() {
    this.fetchReq();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.localUsers.length !== this.props.localUsers.length) {
      this.fetchReq();
    }
  }

  render() {
    const { isLoading, page, countPerPage, paginationUsers } = this.state;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <p className={"header"}>LOCAL USERS</p>
        </div>
        <div className={"panel-body"}>
          <Row className={"margin-top-2"}>
            <Col mdOffset={1} md={10}>
              <InputGroup className={"margin-left-negative-4"}>
                <InputGroup.Addon>
                  <Glyphicon glyph="lyphicon glyphicon-search" />
                </InputGroup.Addon>
                <FormattedMessage
                  id="search_placeholder"
                  defaultMessage="Username or Name or email"
                >
                  {placeholder => (
                    <FormControl
                      type="text"
                      value={this.state.searchValue}
                      placeholder={placeholder}
                      onChange={e =>
                        this.setState(
                          {
                            searchValue: e.target.value
                          },
                          () => this.filterBySearchValue()
                        )
                      }
                    />
                  )}
                </FormattedMessage>
              </InputGroup>
            </Col>
            <Col className={"text-right"} md={1}>
              <Link
                to={`/provisioning/${
                  this.props.match.params.gwName
                }/localusers/adduser`}
              >
                <Glyphicon
                  className={"x-large"}
                  glyph="glyphicon glyphicon-plus-sign"
                />
              </Link>
            </Col>
          </Row>
          {paginationUsers.length ? (
            <React.Fragment>
              <Row>
                <Col mdOffset={1} md={11}>
                  <div className={"flex flex-end-center indent-top-bottom-1"}>
                    <div className={"flex align-items-center"}>
                      <div>Item per page</div>
                      <FormControl
                        componentClass="select"
                        defaultValue={countPerPage}
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
                <Col md={12} />
              </Row>
              <Row>
                <Col md={12}>
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="user-id"
                            defaultMessage="Username"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByUsername}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="name"
                            defaultMessage="First name"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByFirstName}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="type"
                            defaultMessage="Last name"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByLastName}
                          />
                        </th>
                        <th>
                          <FormattedMessage id="type" defaultMessage="Email" />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByEmail}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="type"
                            defaultMessage="Access Type"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByAccessType}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="type"
                            defaultMessage="Language"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByLanguage}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="type"
                            defaultMessage="Read only"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByReadOnly}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="type"
                            defaultMessage="User level"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByUserLevel}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="type"
                            defaultMessage="User profile type"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByUserProfileType}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="type"
                            defaultMessage="User type"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByUserType}
                          />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {paginationUsers[page].map((user, i) => (
                        <User
                          index={i}
                          tenantId={this.props.tenantId}
                          groupId={this.props.groupId}
                          key={i}
                          user={user}
                          handleSingleCheckboxClick={
                            this.handleSingleCheckboxClick
                          }
                          onReload={() => this.fetchReq()}
                        />
                      ))}
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
          ) : (
            <Col mdOffset={1} md={10}>
              <FormattedMessage
                id="notFound"
                defaultMessage="No users were found"
              />
            </Col>
          )}
        </div>
      </React.Fragment>
    );
  }
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

  filterBySearchValue = () => {
    const { searchValue } = this.state;

    const SearchArray = this.props.localUsers
      .filter(
        user =>
          user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.emailAddress.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(user => user);
    this.setState({ users: SearchArray }, () => this.pagination());
  };

  sortByUsername = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "username") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.username < b.username) return -1;
        if (a.username > b.username) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "username" }, () =>
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

  sortByEmail = () => {
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

  sortByAccessType = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "accessType") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.accessType < b.accessType) return -1;
        if (a.accessType > b.accessType) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "accessType" }, () =>
        this.pagination()
      );
    }
  };

  sortByLanguage = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "language") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.language < b.language) return -1;
        if (a.language > b.language) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "language" }, () =>
        this.pagination()
      );
    }
  };

  sortByReadOnly = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "readOnly") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.readOnly < b.readOnly) return -1;
        if (a.readOnly > b.readOnly) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "readOnly" }, () =>
        this.pagination()
      );
    }
  };

  sortByUserLevel = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "userLevel") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.userLevel < b.userLevel) return -1;
        if (a.userLevel > b.userLevel) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "userLevel" }, () =>
        this.pagination()
      );
    }
  };

  sortByUserProfileType = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "userProfileType") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.userProfileType < b.userProfileType) return -1;
        if (a.userProfileType > b.userProfileType) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "userProfileType" }, () =>
        this.pagination()
      );
    }
  };
  sortByUserType = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "userType") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.userType < b.userType) return -1;
        if (a.userType > b.userType) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "userType" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({ localUsers: state.localUsers });

const mapDispatchToProps = { fetchGetLocalUsers };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocalUsers)
);
