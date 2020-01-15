import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import { fetchGetAnomalies, fetchGetConfig } from "../../store/actions";
import Loading from "../../common/Loading";
import Anomalies from "./Anomalies";

import { countsPerPages } from "../../constants";

export class Reconciliations extends Component {
  state = {
    searchValue: "",
    isLoading: true,
    sortedBy: "",
    anomalies: [],
    paginationAnomalies: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };
  fetchReq() {
    this.props
      .fetchGetConfig()
      .then(() =>
        this.props
          .fetchGetAnomalies()
          .then(() =>
            this.setState(
              { isLoading: false, anomalies: this.props.anomalies },
              () => this.pagination()
            )
          )
      );
  }
  componentDidMount() {
    this.fetchReq();
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>Reconciliations</div>
        </div>
        <div className={"panel-body"}>
          <Row className={"margin-top-1"}>
            <Col mdOffset={1} md={11}>
              <InputGroup className={"margin-left-negative-4"}>
                <InputGroup.Addon>
                  <Glyphicon glyph="lyphicon glyphicon-search" />
                </InputGroup.Addon>
                <FormattedMessage
                  id="search_placeholder"
                  defaultMessage="Enterprise ID, Group ID or IAD ID"
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
          </Row>
          <Row>
            <Col md={12}>
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
          {this.state.paginationAnomalies.length ? (
            <React.Fragment>
              <Row>
                <Col mdOffset={1} md={11}>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="enterprise_id"
                            defaultMessage="Enterprise id"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByEnterprise}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="group_id"
                            defaultMessage="Group id"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByGroup}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="iad_id"
                            defaultMessage="IAD id"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByIad}
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="anomaly_event"
                            defaultMessage="Anomaly event"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="creation_date"
                            defaultMessage="Creation date"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="anomaly_status"
                            defaultMessage="Anomaly status"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="assigned_team"
                            defaultMessage="Assigned team"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="assigned_user"
                            defaultMessage="Assigned user"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="last_update_date"
                            defaultMessage="Last update date"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="result"
                            defaultMessage="Result"
                          />
                        </th>
                        {/* <th /> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.paginationAnomalies[this.state.page].map(
                        anomalies => (
                          <Anomalies
                            key={anomalies.hash_ref}
                            anomalies={anomalies}
                            onReload={() => this.fetchReq()}
                          />
                        )
                      )}
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
            <Col mdOffset={1} md={11}>
              <FormattedMessage
                id="notFound"
                defaultMessage="No anomalies were found"
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
    const { countPerPage, anomalies } = this.state;
    const countPages = Math.ceil(anomalies.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = anomalies.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = anomalies.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationAnomalies: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.anomalies
      .filter(
        anomaly =>
          (anomaly.enterprise_id &&
            anomaly.enterprise_id
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (anomaly.group_id &&
            anomaly.group_id
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (anomaly.iad_id &&
            anomaly.iad_id.toLowerCase().includes(searchValue.toLowerCase())) ||
          (anomaly.assigned_team &&
            anomaly.assigned_team
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (anomaly.assigned_user &&
            anomaly.assigned_user
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (anomaly.anomaly_status &&
            String(anomaly.anomaly_status)
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (anomaly.creation_date &&
            anomaly.creation_date
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
      )
      .map(anomaly => anomaly);
    this.setState({ anomalies: SearchArray }, () => this.pagination());
  };

  sortByEnterprise = () => {
    const { anomalies, sortedBy } = this.state;
    if (sortedBy === "enterprise_id") {
      const anomaliesSorted = anomalies.reverse();
      this.setState({ anomalies: anomaliesSorted }, () => this.pagination());
    } else {
      const anomaliesSorted = anomalies.sort((a, b) => {
        if (a.enterprise_id < b.enterprise_id) return -1;
        if (a.enterprise_id > b.enterprise_id) return 1;
        return 0;
      });
      this.setState(
        { anomalies: anomaliesSorted, sortedBy: "enterprise_id" },
        () => this.pagination()
      );
    }
  };

  sortByGroup = () => {
    const { anomalies, sortedBy } = this.state;
    if (sortedBy === "group_id") {
      const anomaliesSorted = anomalies.reverse();
      this.setState({ anomalies: anomaliesSorted }, () => this.pagination());
    } else {
      const anomaliesSorted = anomalies.sort((a, b) => {
        if (a.group_id < b.group_id) return -1;
        if (a.group_id > b.group_id) return 1;
        return 0;
      });
      this.setState({ anomalies: anomaliesSorted, sortedBy: "group_id" }, () =>
        this.pagination()
      );
    }
  };

  sortByIad = () => {
    const { anomalies, sortedBy } = this.state;
    if (sortedBy === "iad_id") {
      const anomaliesSorted = anomalies.reverse();
      this.setState({ anomalies: anomaliesSorted }, () => this.pagination());
    } else {
      const anomaliesSorted = anomalies.sort((a, b) => {
        if (a.iad_id < b.iad_id) return -1;
        if (a.iad_id > b.iad_id) return 1;
        return 0;
      });
      this.setState({ anomalies: anomaliesSorted, sortedBy: "iad_id" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({ anomalies: state.anomalies });

const mapDispatchToProps = { fetchGetAnomalies, fetchGetConfig };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reconciliations);
