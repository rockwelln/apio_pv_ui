import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { fetchGetTenants, refuseCreateTenant } from "../../store/actions";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";
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
    this.cancelLoad = true;
  }

  fetchRequsts = () => {
    this.props.fetchGetTenants(this.cancelLoad).then(() => {
      const sortedTenants = [...this.props.tenants];
      this.setState(
        {
          tenants: sortedTenants.sort((a, b) => {
            if (a.tenantId < b.tenantId) return -1;
            if (a.tenantId > b.tenantId) return 1;
            return 0;
          }),
          sortedBy: "tenantId",
          isLoading: false
        },
        () => this.pagination()
      );
    });
    this.props.refuseCreateTenant();
  };

  componentDidMount() {
    this.fetchRequsts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tenants.length !== this.props.tenants.length) {
      this.fetchRequsts();
    }
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
        <div className={"panel-heading"}>
          <div className={"header"}>
            <FormattedMessage
              id="costomerOverview"
              defaultMessage="Customer overview"
            />
          </div>
          <div>
            <FormattedMessage
              id="costomerDescription"
              defaultMessage="Lookup any customer by providing one the parameters or add a new
                entreprise"
            />
          </div>
        </div>
        <div className={"panel-body"}>
          <Row>
            <Col mdOffset={1} md={10}>
              <InputGroup className={"margin-left-negative-4"}>
                <InputGroup.Addon>
                  <Glyphicon glyph="lyphicon glyphicon-search" />
                </InputGroup.Addon>
                <FormattedMessage
                  id="search_placeholder"
                  defaultMessage="Entreprise ID or Entreprise Name or Customer ID"
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
                to={`/provisioning/${this.props.match.params.gwName}/tenants/add`}
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
                <div>
                  {" "}
                  <FormattedMessage
                    id="itemPerPage"
                    defaultMessage="Item per page"
                  />
                </div>
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
          {paginationTenants.length ? (
            <React.Fragment>
              <Row>
                <Col mdOffset={1} md={10}>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="tenant-id"
                            defaultMessage="Entreprise id"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByTenantID}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="tenant-id"
                            defaultMessage="Entreprise name"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByTenantName}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="tina"
                            defaultMessage="Customer ID"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByTinaID}
                          />
                        </th>
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
          ) : (
            <Col mdOffset={1} md={10}>
              <FormattedMessage
                id="notFound"
                defaultMessage="No tenants were found"
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
      page: this.state.page
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.tenants
      .filter(
        tennant =>
          tennant.tenantId.toLowerCase().includes(searchValue.toLowerCase()) ||
          tennant.tina_id.toLowerCase().includes(searchValue.toLowerCase()) ||
          tennant.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(tenant => tenant);
    this.setState({ tenants: SearchArray }, () => this.pagination());
  };

  sortByTenantID = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "tenantId") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted }, () => this.pagination());
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.tenantId < b.tenantId) return -1;
        if (a.tenantId > b.tenantId) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "tenantId" }, () =>
        this.pagination()
      );
    }
  };

  sortByTenantName = () => {
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

  sortByTinaID = () => {
    const { tenants, sortedBy } = this.state;
    if (sortedBy === "tina_id") {
      const tenansSorted = tenants.reverse();
      this.setState({ tenants: tenansSorted }, () => this.pagination());
    } else {
      const tenansSorted = tenants.sort((a, b) => {
        if (a.tina_id < b.tina_id) return -1;
        if (a.tina_id > b.tina_id) return 1;
        return 0;
      });
      this.setState({ tenants: tenansSorted, sortedBy: "tina_id" }, () =>
        this.pagination()
      );
    }
  };
}

const mapDispatchToProps = {
  fetchGetTenants,
  refuseCreateTenant
};

const mapStateToProps = state => ({
  tenants: state.tenants
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Tenants)
);
