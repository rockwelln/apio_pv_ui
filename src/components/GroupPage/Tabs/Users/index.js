import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";
import User from "./User";

import { fetchGetUsersByGroupId } from "../../../../store/actions";

import { countsPerPages } from "../../../../constants";

export class Users extends Component {
  state = {
    users: [],
    paginationUsers: [],
    searchValue: "",
    sortedBy: "",
    isLoading: true,
    page: 0,
    pagination: true,
    countPerPage: 25,
    countPages: null
  };

  componentDidMount() {
    this.props
      .fetchGetUsersByGroupId(this.props.tenantId, this.props.groupId)
      .then(() =>
        this.setState(
          {
            users: this.props.users.sort((a, b) => {
              if (a.userId < b.userId) return -1;
              if (a.userId > b.userId) return 1;
              return 0;
            }),
            sortedBy: "userId",
            isLoading: false
          },
          () => this.pagination()
        )
      );
  }

  render() {
    const {
      isLoading,
      users,
      page,
      pagination,
      countPerPage,
      paginationUsers
    } = this.state;

    if ((isLoading, pagination)) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col className={"text-right"} md={1}>
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-search"
              onClick={this.handleSearchClick}
            />
          </Col>
          <Col md={10}>
            <FormattedMessage
              id="search_placeholder"
              defaultMessage="User id or phone number or extension or name"
            >
              {placeholder => (
                <FormControl
                  className={"margin-1"}
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
          </Col>
          <Col md={1}>
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-plus-sign"
            />
          </Col>
        </Row>
        {paginationUsers.length ? (
          <React.Fragment>
            <Row>
              <Col md={12}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "16%" }}>
                        <FormattedMessage id="tenant-id" defaultMessage="ID" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByID}
                        />
                      </th>
                      <th style={{ width: "16%" }}>
                        <FormattedMessage
                          id="name"
                          defaultMessage="First name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByFirstName}
                        />
                      </th>
                      <th style={{ width: "16%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Last name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByLastName}
                        />
                      </th>
                      <th style={{ width: "16%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Extension"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByExtension}
                        />
                      </th>
                      <th style={{ width: "16%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Phone number"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByPhoneNumber}
                        />
                      </th>
                      <th style={{ width: "16%" }}>
                        <FormattedMessage id="type" defaultMessage="Type" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByType}
                        />
                      </th>
                      <th style={{ width: "4%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationUsers[page].map(user => (
                      <User
                        tenantId={this.props.tenantId}
                        groupId={this.props.groupId}
                        key={users.userId}
                        user={user}
                        onReload={this.props.fetchGetUsersByGroupId}
                      />
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col mdOffset={10} md={2}>
                <FormControl
                  componentClass="select"
                  defaultValue={countPerPage}
                  style={{ display: "inline", width: "auto" }}
                  className={"margin-1"}
                  onChange={this.changeCoutOnPage}
                >
                  {countsPerPages.map(counts => (
                    <option key={counts.value} value={counts.value}>
                      {counts.title}
                    </option>
                  ))}
                </FormControl>
                <Glyphicon
                  glyph="glyphicon glyphicon-chevron-left"
                  onClick={this.decrementPage}
                />
                {this.state.page + 1}
                <Glyphicon
                  glyph="glyphicon glyphicon-chevron-right"
                  onClick={this.incrementPage}
                />
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
      page: 0
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.users
      .filter(
        user =>
          user.userId.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.extension.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(user => user);
    this.setState({ users: SearchArray }, () => this.pagination());
  };

  sortByID = () => {
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

  sortByType = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "type") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted }, () => this.pagination());
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "type" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = {
  fetchGetUsersByGroupId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
