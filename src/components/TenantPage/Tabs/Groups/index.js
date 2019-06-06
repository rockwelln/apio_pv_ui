import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";

import { fetchGetGroupsByTenantId } from "../../../../store/actions";
import Group from "./Group";

export class GroupsTab extends Component {
  state = {
    searchValue: "",
    isLoading: true,
    sortedBy: "",
    groups: []
  };

  componentDidMount() {
    this.props.fetchGetGroupsByTenantId(this.props.tenantId).then(() =>
      this.setState({
        groups: this.props.groups.sort((a, b) => {
          if (a.groupId < b.groupId) return -1;
          if (a.groupId > b.groupId) return 1;
          return 0;
        }),
        isLoading: false,
        sortedBy: "id"
      })
    );
  }

  render() {
    const { isLoading, groups } = this.state;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Row>
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
              defaultMessage="Group ID or Name"
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
        {groups.length ? (
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
                      <FormattedMessage id="type" defaultMessage="User limit" />
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
                  {groups.map(group => (
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

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.groups
      .filter(
        group =>
          group.groupId.toLowerCase().includes(searchValue.toLowerCase()) ||
          group.groupName.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(group => group);
    this.setState({ groups: SearchArray });
  };

  sortByID = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "id") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted });
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.groupId < b.groupId) return -1;
        if (a.groupId > b.groupId) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "id" });
    }
  };

  sortByName = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "name") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted });
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.groupName < b.groupName) return -1;
        if (a.groupName > b.groupName) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "name" });
    }
  };

  sortByUserLimit = () => {
    const { groups, sortedBy } = this.state;
    if (sortedBy === "limit") {
      const groupsSorted = groups.reverse();
      this.setState({ groups: groupsSorted });
    } else {
      const groupsSorted = groups.sort((a, b) => {
        if (a.userLimit < b.userLimit) return -1;
        if (a.userLimit > b.userLimit) return 1;
        return 0;
      });
      this.setState({ groups: groupsSorted, sortedBy: "limit" });
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
