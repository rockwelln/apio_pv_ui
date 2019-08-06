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
import Checkbox from "react-bootstrap/lib/Checkbox";
import Pagination from "react-bootstrap/lib/Pagination";
import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";
import User from "./User";
import DeleteModal from "./DeleteModal";

import { fetchGetUsersByTrunkGroup } from "../../../../store/actions";

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
    countPages: null,
    showDelete: false,
    usersForDelete: []
  };
  fetchUsers = () => {
    this.props
      .fetchGetUsersByTrunkGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.trunkGroupName
      )
      .then(() =>
        this.setState(
          {
            users: this.props.trunkGroupUsers.sort((a, b) => {
              if (a.userId < b.userId) return -1;
              if (a.userId > b.userId) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "userId"
          },
          () => this.pagination()
        )
      );
  };
  componentDidMount() {
    this.fetchUsers();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.trunkGroupUsers.length !== this.props.trunkGroupUsers.length
    ) {
      this.setState({ isLoading: true }, () => this.fetchUsers());
    }
  }
  render() {
    const {
      isLoading,
      page,
      pagination,
      countPerPage,
      paginationUsers,
      usersForDelete,
      showDelete
    } = this.state;
    if (isLoading && pagination) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="User id or phone number or extension or name"
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
              to={`/provisioning/${this.props.match.params.gwName}/tenants/${
                this.props.match.params.tenantId
              }/groups/${this.props.match.params.groupId}/trunkgroup/${
                this.props.match.params.trunkGroupName
              }/adduser`}
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
                <div className={"flex space-between indent-top-bottom-1"}>
                  <div className={"flex align-items-center"}>
                    <Checkbox
                      className={"margin-checbox"}
                      checked={this.state.selectAll}
                      onChange={this.handleSelectAllClick}
                    >
                      (Un)select all shown numbers
                    </Checkbox>
                    <Glyphicon
                      glyph="glyphicon glyphicon-trash"
                      onClick={this.deleteSlectedUsers}
                    />
                    <div className={"margin-checbox"}>
                      Delete selected numbers
                    </div>
                    <DeleteModal
                      userId={usersForDelete.map(user => user.userId)}
                      show={showDelete}
                      onClose={e => {
                        this.props.fetchGetUsersByGroupId(
                          this.props.tenantId,
                          this.props.groupId
                        );
                        this.setState({ showDelete: false });
                      }}
                      {...this.props}
                    />
                  </div>
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
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }} />
                      <th style={{ width: "15%" }}>
                        <FormattedMessage id="user-id" defaultMessage="ID" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByID}
                        />
                      </th>
                      <th style={{ width: "15%" }}>
                        <FormattedMessage
                          id="name"
                          defaultMessage="First name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByFirstName}
                        />
                      </th>
                      <th style={{ width: "15%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Last name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByLastName}
                        />
                      </th>
                      <th style={{ width: "15%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Extension"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByExtension}
                        />
                      </th>
                      <th style={{ width: "15%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Phone number"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByPhoneNumber}
                        />
                      </th>
                      <th style={{ width: "15%" }}>
                        <FormattedMessage id="type" defaultMessage="Type" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByType}
                        />
                      </th>
                      <th style={{ width: "5%" }} />
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
                        onReload={() => this.fetchUsers()}
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

  handleSelectAllClick = e => {
    const isChecked = e.target.checked;
    const newArr = this.state.users.map(el => ({
      ...el,
      userChecked: isChecked
    }));
    this.setState({ users: newArr, selectAll: !this.state.selectAll }, () =>
      this.pagination()
    );
  };

  handleSingleCheckboxClick = index => {
    const newArr = this.state.users.map((el, i) => ({
      ...el,
      userChecked: index === i ? !el.userChecked : el.userChecked
    }));
    this.setState({ users: newArr, selectAll: false }, () => this.pagination());
  };

  deleteSlectedUsers = () => {
    const { users } = this.state;
    const usersForDelete = users.filter(user => {
      return !!user.userChecked;
    });
    this.setState({ usersForDelete, showDelete: true }, () =>
      this.pagination()
    );
  };
}

const mapStateToProps = state => ({
  trunkGroupUsers: state.trunkGroupUsers
});

const mapDispatchToProps = { fetchGetUsersByTrunkGroup };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
