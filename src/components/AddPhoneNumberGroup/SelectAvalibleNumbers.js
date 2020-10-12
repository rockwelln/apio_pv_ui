import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

import PhoneNumber from "./PhoneNumber";
import { countsPerPages } from "../../constants";

import {
  fetchPostAssignPhoneNumbersToGroup,
  fetchPostAddMobileNumbersToGroup
} from "../../store/actions";

export class PhoneNumbersTab extends Component {
  state = {
    searchValue: "",
    phoneNumbers: [],
    sortedBy: "",
    selectAll: false,
    paginationPhoneNumbers: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };

  propsToState() {
    this.setState(
      {
        phoneNumbers: this.props.phoneNumbers.sort((a, b) => {
          if (a.rangeStart < b.rangeStart) return -1;
          if (a.rangeStart > b.rangeStart) return 1;
          return 0;
        }),
        isLoading: false,
        sortedBy: "rangeStart"
      },
      () => this.pagination()
    );
  }

  mobilePropsToState() {
    this.setState(
      {
        phoneNumbers: this.props.phoneNumbers.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        }),
        isLoading: false,
        sortedBy: "phoneNumber"
      },
      () => this.pagination()
    );
  }

  componentDidMount() {
    const pathNameArr = this.props.location.pathname.split("/");
    pathNameArr[pathNameArr.length - 1] === "add-mobile-phone"
      ? this.mobilePropsToState()
      : this.propsToState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.phoneNumbers.length !== this.props.phoneNumbers.length) {
      const pathNameArr = this.props.location.pathname.split("/");
      pathNameArr[pathNameArr.length - 1] === "add-mobile-phone"
        ? this.mobilePropsToState()
        : this.propsToState();
    }
  }

  render() {
    const { countPerPage, paginationPhoneNumbers, page } = this.state;
    const pathNameArr = this.props.location.pathname.split("/");

    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col md={12}>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Phone number"
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
                        () =>
                          pathNameArr[pathNameArr.length - 1] ===
                          "add-mobile-phone"
                            ? this.filterBySearchValueMobile()
                            : this.filterBySearchValue()
                      )
                    }
                  />
                )}
              </FormattedMessage>
            </InputGroup>
          </Col>
        </Row>
        {paginationPhoneNumbers.length ? (
          <React.Fragment>
            <Row>
              <Col md={12}>
                <div className="flex flex-row flex-end-center indent-top-bottom-1">
                  <div className={"flex align-items-center"}>
                    <div>Item per page</div>
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
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Table hover>
                  <thead>
                    <tr>
                      {pathNameArr[pathNameArr.length - 1] ===
                      "add-mobile-phone" ? (
                        <th>
                          <FormattedMessage
                            id="tenant-id"
                            defaultMessage="Phone number"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByPhoneNumber}
                          />
                        </th>
                      ) : (
                        <React.Fragment>
                          <th width="40%">
                            <FormattedMessage
                              id="tenant-id"
                              defaultMessage="Range start"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByRangeStart}
                            />
                          </th>
                          <th width="40%">
                            <FormattedMessage
                              id="name"
                              defaultMessage="Range end"
                            />
                            <Glyphicon
                              glyph="glyphicon glyphicon-sort"
                              onClick={this.sortByRangeEnd}
                            />
                          </th>
                        </React.Fragment>
                      )}
                      <th width="10%" />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationPhoneNumbers[page].map((number, i) => (
                      <PhoneNumber
                        index={i}
                        key={i}
                        number={number}
                        handleSingleCheckboxClick={
                          this.handleSingleCheckboxClick
                        }
                        onReload={() =>
                          this.props.fetchGetPhoneNumbersByGroupId(
                            this.props.tenantId,
                            this.props.groupId
                          )
                        }
                        toUpdate={this.props.toUpdate}
                        assignNumbers={this.assignNumbers}
                      />
                    ))}
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
            <Row>
              <div className="button-row">
                <div className="pull-right">
                  <Button onClick={this.handleDone} className={"btn-primary"}>
                    Done
                  </Button>
                </div>
              </div>
            </Row>
          </React.Fragment>
        ) : (
          <Col mdOffset={1} md={10}>
            <FormattedMessage
              id="notFound"
              defaultMessage="No phone numbers were found"
            />
          </Col>
        )}
      </React.Fragment>
    );
  }

  handleDone = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };

  assignNumbers = numbersToAssign => {
    const pathNameArr = this.props.location.pathname.split("/");
    return pathNameArr[pathNameArr.length - 1] === "add-mobile-phone"
      ? this.props
          .fetchPostAddMobileNumbersToGroup(
            this.props.match.params.tenantId,
            this.props.match.params.groupId,
            numbersToAssign
          )
          .then(() => this.props.toUpdate())
      : this.props
          .fetchPostAssignPhoneNumbersToGroup(
            this.props.match.params.tenantId,
            this.props.match.params.groupId,
            numbersToAssign
          )
          .then(() => this.props.toUpdate());
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
    const { countPerPage, phoneNumbers } = this.state;
    const countPages = Math.ceil(phoneNumbers.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = phoneNumbers.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = phoneNumbers.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationPhoneNumbers: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.phoneNumbers.filter(
      phone =>
        phone.rangeStart.toLowerCase().includes(searchValue.toLowerCase()) ||
        phone.rangeEnd.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.setState({ phoneNumbers: SearchArray }, () => this.pagination());
  };

  filterBySearchValueMobile = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.phoneNumbers.filter(phone =>
      phone.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.setState({ phoneNumbers: SearchArray }, () => this.pagination());
  };

  sortByPhoneNumber = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "phoneNumber") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.setState(
        { phoneNumbers: phonesSorted, sortedBy: "phoneNumber" },
        () => this.pagination()
      );
    }
  };

  sortByRangeStart = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "rangeStart") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.rangeStart < b.rangeStart) return -1;
        if (a.rangeStart > b.rangeStart) return 1;
        return 0;
      });
      this.setState(
        { phoneNumbers: phonesSorted, sortedBy: "rangeStart" },
        () => this.pagination()
      );
    }
  };

  sortByRangeEnd = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "rangeEnd") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.rangeEnd < b.rangeEnd) return -1;
        if (a.rangeEnd > b.rangeEnd) return 1;
        return 0;
      });
      this.setState({ phoneNumbers: phonesSorted, sortedBy: "rangeEnd" }, () =>
        this.pagination()
      );
    }
  };

  handleSingleCheckboxClick = index => {
    const newArr = this.state.phoneNumbers.map((el, i) => ({
      ...el,
      phoneChecked: index === i ? !el.phoneChecked : el.phoneChecked
    }));
    this.setState({ phoneNumbers: newArr, selectAll: false }, () =>
      this.pagination()
    );
  };
}

const mapDispatchToProps = {
  fetchPostAssignPhoneNumbersToGroup,
  fetchPostAddMobileNumbersToGroup
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(PhoneNumbersTab)
);
