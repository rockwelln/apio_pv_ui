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

import { fetchGetAnomalies } from "../../store/actions";
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
      .fetchGetAnomalies()
      .then(() =>
        this.setState(
          { isLoading: false, anomalies: this.props.anomalies },
          () => this.pagination()
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
                <FormattedMessage id="search_placeholder" defaultMessage="">
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
                        </th>
                        <th>
                          <FormattedMessage
                            id="group_id"
                            defaultMessage="Group id"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="iad_id"
                            defaultMessage="IAD id"
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
                            id="norm_data"
                            defaultMessage="Norm data"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="apio_db_data"
                            defaultMessage="APIO DB data"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="broadsoft_data"
                            defaultMessage="Broadsoft data"
                          />
                        </th>
                        <th>
                          <FormattedMessage
                            id="reconciliation_report"
                            defaultMessage="Reconciliation report"
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
                            id="assigned_user_date"
                            defaultMessage="Assigned user date"
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
                        <th>
                          <FormattedMessage
                            id="comments"
                            defaultMessage="Comments"
                          />
                        </th>
                        <th />
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
    return;
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
}

const mapStateToProps = state => ({ anomalies: state.anomalies });

const mapDispatchToProps = { fetchGetAnomalies };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reconciliations);
