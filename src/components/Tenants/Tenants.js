import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGetTenants } from "../../store/actions";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

import Loading from "../../common/Loading";

import Tenant from "./Tenant";

class Tenants extends Component {
  constructor(props) {
    super(props);
    this.cancelLoad = false;
    this.state = {
      tenants: [],
      searchValue: "",
      sortedBy: null,
      isLoading: true
    };
  }

  componentWillUnmount() {
    this.cancelLoad = true;
  }

  componentDidMount() {
    this.props.fetchGetTenants(this.cancelLoad).then(() =>
      this.setState({
        tenants: this.props.tenants.sort((a, b) => {
          if (a.tenantId < b.tenantId) return -1;
          if (a.tenantId > b.tenantId) return 1;
          return 0;
        }),
        sortedBy: "id",
        isLoading: false
      })
    );
  }

  render() {
    const { tenants, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Row>
          <Col className={"text-right "} md={1}>
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-search"
              onClick={this.filterBySearchValue}
            />
          </Col>
          <Col md={10}>
            <FormattedMessage
              id="search_placeholder"
              defaultMessage="Tenant ID or Name or Type or Resellers"
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
        <Row>
          <Col mdOffset={1} md={10}>
            <Table hover>
              <thead>
                <tr>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="tenant-id" defaultMessage="ID" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByID}
                    />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="name" defaultMessage="Name" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByName}
                    />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="type" defaultMessage="Type" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByType}
                    />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="reseller" defaultMessage="Reseller" />
                    <Glyphicon glyph="glyphicon glyphicon-sort" />
                  </th>
                  <th style={{ width: "4%" }} />
                </tr>
              </thead>
              <tbody>
                {tenants.map(t => (
                  <Tenant
                    key={t.tenantId}
                    t={t}
                    onReload={this.props.fetchGetTenants}
                    {...this.props}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.tenants
      .filter(
        tennant =>
          tennant.tenantId.toLowerCase().includes(searchValue.toLowerCase()) ||
          tennant.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          tennant.type.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(tenant => tenant);
    this.setState({ tenants: SearchArray });
  };

  sortByID = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "id") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted });
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.tenantId < b.tenantId) return -1;
        if (a.tenantId > b.tenantId) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "id" });
    }
  };

  sortByName = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "name") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted });
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "name" });
    }
  };

  sortByType = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "type") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted });
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "type" });
    }
  };
}

const mapDispatchToProps = {
  fetchGetTenants
};

const mapStateToProps = state => ({
  tenants: state.tenants
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenants);
