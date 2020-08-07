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

import { fetchGetReconciliationTeams } from "../../../../store/actions";
import Loading from "../../../../common/Loading";

import { countsPerPages } from "../../../../constants";
import Team from "./Team";

import { isAllowed, pages } from "../../../../utils/user";

export class ReconciliationTeams extends Component {
  state = {
    searchValue: "",
    isLoading: true,
    sortedBy: "",
    teams: [],
    paginationTeams: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };
  fetchReq = () => {
    this.props.fetchGetReconciliationTeams().then(() =>
      this.setState(
        {
          teams: this.props.reconciliationTeams.sort((a, b) => {
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
    this.fetchReq();
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Name or email"
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
          {isAllowed(localStorage.getItem("userProfile"), pages.add_config_reconciliation_team) && (
            <Col md={1}>
              <Link
                to={`/provisioning/${this.props.match.params.gwName}/configs/addteam`}
              >
                <Glyphicon
                  className={"x-large"}
                  glyph="glyphicon glyphicon-plus-sign"
                />
              </Link>
            </Col>
          )}
        </Row>
        <Row>
          <Col md={11}>
            <div className="flex flex-row flex-end-center indent-top-bottom-1">
              <div>Item per page</div>
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
        {this.state.paginationTeams.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage id="name" defaultMessage="Name" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByName}
                        />
                      </th>
                      <th>
                        <FormattedMessage id="email" defaultMessage="Email" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByEmail}
                        />
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.paginationTeams[this.state.page].map(team => (
                      <Team
                        key={team.name}
                        team={team}
                        onReload={() => this.fetchReq()}
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
              defaultMessage="No groups were found"
            />
          </Col>
        )}
      </div>
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
    const { countPerPage, teams } = this.state;
    const countPages = Math.ceil(teams.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = teams.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = teams.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationTeams: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.reconciliationTeams
      .filter(
        team =>
          team.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          team.email.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(team => team);
    this.setState({ teams: SearchArray }, () => this.pagination());
  };

  sortByName = () => {
    const { teams, sortedBy } = this.state;
    if (sortedBy === "name") {
      const teamsSorted = teams.reverse();
      this.setState({ teams: teamsSorted }, () => this.pagination());
    } else {
      const teamsSorted = teams.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ teams: teamsSorted, sortedBy: "name" }, () =>
        this.pagination()
      );
    }
  };

  sortByEmail = () => {
    const { teams, sortedBy } = this.state;
    if (sortedBy === "email") {
      const teamsSorted = teams.reverse();
      this.setState({ teams: teamsSorted }, () => this.pagination());
    } else {
      const teamsSorted = teams.sort((a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      });
      this.setState({ teams: teamsSorted, sortedBy: "email" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  reconciliationTeams: state.reconciliationTeams
});

const mapDispatchToProps = { fetchGetReconciliationTeams };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReconciliationTeams)
);
