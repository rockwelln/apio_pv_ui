import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";

import { fetchGetGroupsByTenantId } from "../../../../store/actions";
import Group from "./Group";
import { countsPerPages } from "../../../../constants";

export class GroupsTab extends Component {
  state = {
    searchValue: "",
    isLoading: true,
    sortedBy: "",
    groups: [],
    paginationGroups: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };

  componentDidMount() {
    this.props.fetchGetGroupsByTenantId(this.props.tenantId).then(() =>
      this.setState(
        {
          groups: this.props.groups.sort((a, b) => {
            if (a.groupId < b.groupId) return -1;
            if (a.groupId > b.groupId) return 1;
            return 0;
          }),
          isLoading: false,
          sortedBy: "id"
        },
        () => this.pagination()
      )
    );
  }

  render() {
    const {
      isLoading,
      countPerPage,
      pagination,
      paginationGroups,
      page
    } = this.state;

    if (isLoading && pagination) {
      return <Loading />;
    }

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
                defaultMessage="Group ID or Name"
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
        {paginationGroups.length ? (
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
                        <FormattedMessage
                          id="type"
                          defaultMessage="User limit"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByUserLimit}
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
                    {paginationGroups[page].map(group => (
                      <Group
                        key={group.groupId}
                        group={group}
                        onReload={this.props.fetchGetGroupsByTenantId}
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
              defaultMessage="No groups were found"
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
      page: 0
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.groups
      .filter(
        group =>
          group.groupId.toLowerCase().includes(searchValue.toLowerCase()) ||
          group.groupName.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(group => group);
    this.setState({ groups: SearchArray }, () => this.pagination());
  };

  sortByID = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "id") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted }, () => this.pagination());
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.groupId < b.groupId) return -1;
        if (a.groupId > b.groupId) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "id" }, () =>
        this.pagination()
      );
    }
  };

  sortByName = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "name") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted }, () => this.pagination());
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.groupName < b.groupName) return -1;
        if (a.groupName > b.groupName) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "name" }, () =>
        this.pagination()
      );
    }
  };

  sortByUserLimit = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "limit") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted }, () => this.pagination());
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.userLimit < b.userLimit) return -1;
        if (a.userLimit > b.userLimit) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "limit" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  groups: state.groups
});

const mapDispatchToProps = {
  fetchGetGroupsByTenantId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsTab);
