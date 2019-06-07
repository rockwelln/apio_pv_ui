import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";
import Admin from "./Admin";

import { fetchGetAdminsByTenantId } from "../../../../store/actions";

export class Admins extends Component {
  state = {
    admins: [],
    isLoading: true,
    sortedBy: ""
  };

  componentDidMount() {
    this.props.fetchGetAdminsByTenantId(this.props.tenantId).then(() =>
      this.setState({
        admins: this.props.admins.sort((a, b) => {
          if (a.userId < b.userId) return -1;
          if (a.userId > b.userId) return 1;
          return 0;
        }),
        isLoading: false,
        sortedBy: "userId"
      })
    );
  }
  render() {
    const { isLoading, admins } = this.state;
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
              defaultMessage="User ID or name"
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
        {admins.length ? (
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
                      <FormattedMessage id="name" defaultMessage="First name" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByFirstName}
                      />
                    </th>
                    <th style={{ width: "24%" }}>
                      <FormattedMessage id="type" defaultMessage="Last name" />
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
                  {admins.map(admin => (
                    <Admin
                      key={admin.userId}
                      admin={admin}
                      onReload={() =>
                        this.props.fetchGetAdminsByTenantId(this.props.tenantId)
                      }
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
              defaultMessage="No admins were found"
            />
          </Col>
        )}
      </React.Fragment>
    );
  }

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
    this.setState({ admins: SearchArray });
  };

  sortByUserId = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "userId") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted });
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.userId < b.userId) return -1;
        if (a.userId > b.userId) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "userId" });
    }
  };

  sortByFirstName = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "firstName") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted });
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "firstName" });
    }
  };

  sortByLastName = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "lastName") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted });
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "lastName" });
    }
  };

  sortByLanguage = () => {
    const { admins, sortedBy } = this.state;
    if (sortedBy === "language") {
      const adminsSorted = admins.reverse();
      this.setState({ admins: adminsSorted });
    } else {
      const adminsSorted = admins.sort((a, b) => {
        if (a.language < b.language) return -1;
        if (a.language > b.language) return 1;
        return 0;
      });
      this.setState({ admins: adminsSorted, sortedBy: "language" });
    }
  };
}

const mapStateToProps = state => ({
  admins: state.admins
});

const mapDispatchToProps = {
  fetchGetAdminsByTenantId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admins);
