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

import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";
import Admin from "./Admin";

import { fetchGetAdminsByTenantId } from "../../../../store/actions";
import { countsPerPages } from "../../../../constants";

export class Admins extends Component {
  state = {
    admins: [],
    paginationAdmins: [],
    isLoading: true,
    sortedBy: "",
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };

  fetchAdmins = () => {
    this.props.fetchGetAdminsByTenantId(this.props.tenantId).then(() =>
      this.setState(
        {
          admins: this.props.admins.sort((a, b) => {
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
    this.fetchAdmins();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.admins.length !== this.props.admins.length) {
      this.fetchAdmins();
    }
  }

  render() {
    const {
      isLoading,
      countPerPage,
      pagination,
      paginationAdmins,
      page
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
                defaultMessage="User ID or name"
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
          <Col md={1}>
            <Link
              to={`/provisioning/broadsoft_xsp1_as1/tenants/${
                this.props.match.params.tenantId
              }/addadmin`}
            >
              <Glyphicon
                className={"x-large"}
                glyph="glyphicon glyphicon-plus-sign"
              />
            </Link>
          </Col>
        </Row>
        {paginationAdmins.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "24%" }}>
                        <FormattedMessage
                          id="tenant-id"
                          defaultMessage="User ID"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByUserId}
                        />
                      </th>
                      <th style={{ width: "24%" }}>
                        <FormattedMessage
                          id="name"
                          defaultMessage="First name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByFirstName}
                        />
                      </th>
                      <th style={{ width: "24%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Last name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByLastName}
                        />
                      </th>
                      <th style={{ width: "24%" }}>
                        <FormattedMessage id="type" defaultMessage="Language" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByAssignedToGroup}
                        />
                      </th>
                      <th style={{ width: "4%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationAdmins[page].map(admin => (
                      <Admin
                        key={admin.userId}
                        tenantId={this.props.tenantId}
                        admin={admin}
                        notifications={this.props.notifications}
                        onReload={() =>
                          this.props.fetchGetAdminsByTenantId(
                            this.props.tenantId
                          )
                        }
                      />
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col mdOffset={9} md={2}>
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
              defaultMessage="No admins were found"
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
    const { countPerPage, admins } = this.state;
    const countPages = Math.ceil(admins.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = admins.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = admins.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationAdmins: paginationItems,
      pagination: false,
      countPages,
      page: 0
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.admins
      .filter(
        admin =>
          admin.userId.toLowerCase().includes(searchValue.toLowerCase()) ||
          admin.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          admin.lastName.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(admin => admin);
    this.setState({ admins: SearchArray }, () => this.pagination());
  };

  sortByUserId = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "userId") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted }, () => this.pagination());
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.userId < b.userId) return -1;
        if (a.userId > b.userId) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "userId" }, () =>
        this.pagination()
      );
    }
  };

  sortByFirstName = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "firstName") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted }, () => this.pagination());
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "firstName" }, () =>
        this.pagination()
      );
    }
  };

  sortByLastName = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "lastName") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted }, () => this.pagination());
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "lastName" }, () =>
        this.pagination()
      );
    }
  };

  sortByLanguage = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "language") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted }, () => this.pagination());
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.language < b.language) return -1;
        if (a.language > b.language) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "language" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  admins: state.adminsTenant
});

const mapDispatchToProps = {
  fetchGetAdminsByTenantId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admins)
);
