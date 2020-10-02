import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Button from "react-bootstrap/lib/Button";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Panel from "react-bootstrap/lib/Panel";
import Table from "react-bootstrap/lib/Table";
import Pagination from "react-bootstrap/lib/Pagination";

import { removeEmpty } from "../../../remuveEmptyInObject";
import { fetchGetSearchGroups } from "../../../../store/actions";
import { FormattedMessage } from "react-intl";

import { countsPerPages } from "../../../../constants";
import Group from "./Group";

export class Groups extends Component {
  state = {
    insensitiveGroupNameContains: "",
    insensitiveGroupIdContains: "",
    responseSizeLimit: undefined,
    buttonSearch: "Search",
    sizeError: null,
    groups: [],
    paginationGroups: [],
    sortedBy: "",
    page: 0,
    pagination: true,
    countPerPage: 25,
    countPages: null
  };

  render() {
    return (
      <React.Fragment>
        <Panel className={"margin-top-1"} defaultExpanded>
          <Panel.Heading toggle>
            <Panel.Title toggle>Search criteria</Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    Group name contains:
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      value={this.state.insensitiveGroupNameContains}
                      onChange={e => {
                        this.setState({
                          insensitiveGroupNameContains: e.target.value
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    Group ID contains:
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      value={this.state.insensitiveGroupIdContains}
                      onChange={e => {
                        this.setState({
                          insensitiveGroupIdContains: e.target.value
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    Max number of results:
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormGroup
                      controlId="size"
                      validationState={this.state.sizeError}
                    >
                      <FormControl
                        type="number"
                        min={1}
                        value={this.state.responseSizeLimit}
                        onChange={e => {
                          this.setState({
                            responseSizeLimit: e.target.value,
                            sizeError: null
                          });
                        }}
                      />
                      {this.state.sizeError && (
                        <HelpBlock>
                          Can be empty, if not it should be > 0
                        </HelpBlock>
                      )}
                    </FormGroup>
                  </div>
                </Col>
              </Row>
              <Row className={"margin-top-1"}>
                <Col md={12}>
                  <div className="button-row">
                    <div className="pull-right">
                      <Button
                        className={"btn-primary"}
                        onClick={this.search}
                        disabled={
                          (!this.state.insensitiveGroupNameContains &&
                            !this.state.insensitiveGroupIdContains) ||
                          this.state.buttonSearch === "Searching..."
                        }
                      >
                        {this.state.buttonSearch}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel className={"margin-top-1"}>
          <Panel.Heading>Search results</Panel.Heading>
          <Panel.Body>
            {!!this.state.paginationGroups.length && (
              <React.Fragment>
                <Row>
                  <Col mdOffset={1} md={11}>
                    <div className={"flex flex-end-center indent-top-bottom-1"}>
                      <div className={"flex align-items-center"}>
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
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="groupId"
                              defaultMessage="Group ID"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByGroupId}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="groupName"
                              defaultMessage="Group Name"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByGroupName}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="tenantId"
                              defaultMessage="Tenant ID"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByTenantId}
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="userLimit"
                              defaultMessage="User Limit"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByUserLimit}
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.paginationGroups[this.state.page].map(
                          (group, i) => (
                            <Group key={i} group={group} />
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
            )}
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
  search = () => {
    const {
      insensitiveGroupNameContains,
      insensitiveGroupIdContains,
      responseSizeLimit
    } = this.state;

    if (responseSizeLimit && responseSizeLimit < 1) {
      this.setState({ sizeError: "error" });
      return;
    }

    const data = {
      insensitiveGroupNameContains,
      insensitiveGroupIdContains,
      responseSizeLimit
    };
    const clearData = removeEmpty(data);
    const queryString = Object.keys(clearData)
      .map(key => key + "=" + clearData[key])
      .join("&");
    this.setState({ buttonSearch: "Searching..." }, () =>
      this.props.fetchGetSearchGroups(queryString).then(() =>
        this.setState(
          {
            groups: this.props.groups.sort((a, b) => {
              if (a.groupId < b.groupId) return -1;
              if (a.groupId > b.groupId) return 1;
              return 0;
            }),
            sortedBy: "groupId",
            buttonSearch: "Search"
          },
          () => this.pagination()
        )
      )
    );
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
    const { countPerPage, groups } = this.state;
    const countPages = Math.ceil(groups.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = groups.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = groups.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationGroups: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };

  sortByGroupId = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "groupId") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted }, () => this.pagination());
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.groupId < b.groupId) return -1;
        if (a.groupId > b.groupId) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "groupId" }, () =>
        this.pagination()
      );
    }
  };

  sortByGroupName = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "groupName") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted }, () => this.pagination());
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.groupName < b.groupName) return -1;
        if (a.groupName > b.groupName) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "groupName" }, () =>
        this.pagination()
      );
    }
  };

  sortByTenantId = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "tenantId") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted }, () => this.pagination());
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.tenantId < b.tenantId) return -1;
        if (a.tenantId > b.tenantId) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "tenantId" }, () =>
        this.pagination()
      );
    }
  };

  sortByUserLimit = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "userLimit") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted }, () => this.pagination());
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.userLimit < b.userLimit) return -1;
        if (a.userLimit > b.userLimit) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "userLimit" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  groups: state.groupsFound
});

const mapDispatchToProps = { fetchGetSearchGroups };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
