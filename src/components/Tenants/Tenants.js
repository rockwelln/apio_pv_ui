import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGetTenants } from "../../store/actions";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

import Loading from "../../common/Loading";

import Tenant from "./Tenant";
import { countsPerPages } from "../../constants";

class Tenants extends Component {
  constructor(props) {
    super(props);
    this.cancelLoad = false;
    this.state = {
      tenants: [],
      paginationTenants: [],
      searchValue: "",
      sortedBy: null,
      isLoading: true,
      countPerPage: 25,
      page: 0,
      pagination: true,
      countPages: null
    };
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.cancelLoad = true;
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchGetTenants(this.cancelLoad).then(() => {
      const sortedTenants = [...this.props.tenants];
      this.setState(
        {
          tenants: sortedTenants.sort((a, b) => {
            if (a.tenantId < b.tenantId) return -1;
            if (a.tenantId > b.tenantId) return 1;
            return 0;
          }),
          sortedBy: "id",
          isLoading: false
        },
        () => this.pagination()
      );
    });
  }

  render() {
    const {
      isLoading,
      countPerPage,
      pagination,
      paginationTenants,
      page
    } = this.state;

    if (isLoading && pagination) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Row>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Tenant ID or Name or Type or Resellers"
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
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-plus-sign"
            />
          </Col>
        </Row>
        {paginationTenants.length ? (
          <React.Fragment>
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
                        <FormattedMessage
                          id="reseller"
                          defaultMessage="Reseller"
                        />
                        <Glyphicon glyph="glyphicon glyphicon-sort" />
                      </th>
                      <th style={{ width: "4%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationTenants[page].map(t => (
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
              defaultMessage="No tenants were found"
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
    const { countPerPage, tenants } = this.state;
    const countPages = Math.ceil(tenants.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = tenants.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = tenants.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationTenants: paginationItems,
      pagination: false,
      countPages,
      page: 0
    });
  };

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
    this.setState({ tenants: SearchArray }, () => this.pagination());
  };

  sortByID = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "id") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted }, () => this.pagination());
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.tenantId < b.tenantId) return -1;
        if (a.tenantId > b.tenantId) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "id" }, () =>
        this.pagination()
      );
    }
  };

  sortByName = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "name") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted }, () => this.pagination());
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "name" }, () =>
        this.pagination()
      );
    }
  };

  sortByType = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "type") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted }, () => this.pagination());
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "type" }, () =>
        this.pagination()
      );
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
