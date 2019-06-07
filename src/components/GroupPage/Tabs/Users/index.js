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

export class Users extends Component {
  state = {
    users: [],
    searchValue: "",
    sortedBy: "",
    isLoading: true
  };

  componentDidMount() {
    this.props
      .fetchGetUsersByGroupId(this.props.tenantId, this.props.groupId)
      .then(() =>
        this.setState({
          users: this.props.users.sort((a, b) => {
            if (a.userId < b.userId) return -1;
            if (a.userId > b.userId) return 1;
            return 0;
          }),
          sortedBy: "userId",
          isLoading: false
        })
      );
  }

  render() {
    const { isLoading, users } = this.state;

    if (isLoading) {
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
        {users.length ? (
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
                      <FormattedMessage id="name" defaultMessage="First name" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByFirstName}
                      />
                    </th>
                    <th style={{ width: "16%" }}>
                      <FormattedMessage id="type" defaultMessage="Last name" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByLastName}
                      />
                    </th>
                    <th style={{ width: "16%" }}>
                      <FormattedMessage id="type" defaultMessage="Extension" />
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
                  {users.map(user => (
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
    this.setState({ users: SearchArray });
  };

  sortByID = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "userId") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted });
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.userId < b.userId) return -1;
        if (a.userId > b.userId) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "userId" });
    }
  };

  sortByFirstName = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "firstName") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted });
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "firstName" });
    }
  };

  sortByLastName = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "lastName") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted });
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "lastName" });
    }
  };

  sortByExtension = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "extension") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted });
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.extension < b.extension) return -1;
        if (a.extension > b.extension) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "extension" });
    }
  };

  sortByPhoneNumber = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "phoneNumber") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted });
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.phoneNumber < b.phoneNumber) return -1;
        if (a.phoneNumber > b.phoneNumber) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "phoneNumber" });
    }
  };

  sortByType = () => {
    const { users, sortedBy } = this.state;
    if (sortedBy === "type") {
      const usersSorted = users.reverse();
      this.setState({ users: usersSorted });
    } else {
      const usersSorted = users.sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      });
      this.setState({ users: usersSorted, sortedBy: "type" });
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
