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

import Loading from "../../../../common/Loading";
import IAD from "./IAD";

import { fetchGetIADs } from "../../../../store/actions";
import { countsPerPages } from "../../../../constants";

export class IADs extends Component {
  state = {
    admins: [],
    paginationAdmins: [],
    isLoading: true,
    sortedBy: "",
    countPerPage: 25,
    fakeIADs: [
      {
        id: "IAD1",
        type: "first",
        mac: "192.0.2.235"
      },
      {
        id: "IAD2",
        type: "second",
        mac: "2001:0DB8:AA10:0001:0000:0000:0000:00FB"
      }
    ],
    page: 0,
    pagination: true,
    countPages: null
  };

  fetchAdmins = () => {
    this.props.fetchGetIADs(
      this.props.match.params.tenantId,
      this.props.match.params.groupId
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
    // if (isLoading && pagination) {
    //   return <Loading />;
    // }
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
                defaultMessage="placeholder"
              >
                {placeholder => (
                  <FormControl
                    type="text"
                    defaultValue={this.state.searchValue}
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
              to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/addiad`}
            >
              <Glyphicon
                className={"x-large"}
                glyph="glyphicon glyphicon-plus-sign"
              />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={11}>
            <div className="flex flex-row flex-end-center indent-top-bottom-1">
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
          </Col>
        </Row>
        {/*paginationAdmins.length ? (*/}
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <Table hover>
                <thead>
                  <tr>
                    <th>
                      <FormattedMessage
                        id="tenant-id"
                        defaultMessage="IAD ID"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByUserId}
                      />
                    </th>
                    <th style={{ width: "24%" }}>
                      <FormattedMessage id="name" defaultMessage="IAD Type" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByFirstName}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="type"
                        defaultMessage="Mac Address"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByLastName}
                      />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.fakeIADs.map(iad => (
                    <IAD key={iad.id} iad={iad} />
                  ))}
                  {/* {paginationAdmins[page].map(admin => (
                      <IAD
                        key={admin.userId}
                        tenantId={this.props.tenantId}
                        groupId={this.props.groupId}
                        admin={admin}
                        notifications={this.props.notifications}
                        onReload={() =>
                          this.props.fetchGetAdminsByGroupId(
                            this.props.tenantId,
                            this.props.groupId
                          )
                        }
                      />
                    ))} */}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={11}>
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
        {/* ) : (
        <Col mdOffset={1} md={10}>
          <FormattedMessage id="notFound" defaultMessage="No IADs were found" />
        </Col>
        )} */}
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
      page: this.state.page
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
  admins: state.adminsGroup
});

const mapDispatchToProps = {
  fetchGetIADs
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IADs)
);
