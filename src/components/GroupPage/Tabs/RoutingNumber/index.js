import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import { fetchGetEnterpriseTrunksByGroup } from "../../../../store/actions";
import Trunk from "./Trunk";
import Loading from "../../../../common/Loading";

import { countsPerPages } from "../../../../constants";

export class RoutingNumber extends Component {
  state = {
    paginationTrunks: [],
    trunks: [],
    isLoading: true,
    sortedBy: "",
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null,
    searchValue: ""
  };

  fetchTrunks = () => {
    this.props
      .fetchGetEnterpriseTrunksByGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState(
          {
            isLoading: false,
            trunks: this.props.enterpriseTrunks.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "name"
          },
          () => this.pagination()
        )
      );
  };

  componentDidMount() {
    this.fetchTrunks();
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Name or Routing Mode"
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
              to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/addenterprisetrunk`}
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
                <FormattedMessage
                  id="itemPerPage"
                  defaultMessage="Item per page"
                />
              </div>
              <FormControl
                componentClass="select"
                defaultValue={this.state.countPerPage}
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
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={10}>
            <Table hover>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="name" defaultMessage="Name" />
                  </th>
                  <th>
                    <FormattedMessage
                      id="routingMode"
                      defaultMessage="Routing Mode"
                    />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.trunks.map((trunk, i) => (
                  <Trunk
                    key={i}
                    trunk={trunk}
                    onReload={() => this.fetchTrunks()}
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
    );
  }

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.enterpriseTrunks
      .filter(
        trunk =>
          trunk.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          trunk.routingMode.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(trunk => trunk);
    this.setState({ trunks: SearchArray }, () => this.pagination());
  };

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
    const { countPerPage, trunks } = this.state;
    const countPages = Math.ceil(trunks.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = trunks.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = trunks.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationTrunks: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };
}

const mapStateToProps = state => ({ enterpriseTrunks: state.enterpriseTrunks });

const mapDispatchToProps = { fetchGetEnterpriseTrunksByGroup };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RoutingNumber)
);
