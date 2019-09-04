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
import Checkbox from "react-bootstrap/lib/Checkbox";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import { fetchGetPhoneNumbersByGroupId } from "../../../../store/actions";

import Loading from "../../../../common/Loading";
import PhoneNumber from "./PhoneNumber";
import DeleteModal from "./DeleteModal";
import { countsPerPages } from "../../../../constants";

import "./styles.css";

export class PhoneNumbersTab extends Component {
  state = {
    searchValue: "",
    phoneNumbers: [],
    sortedBy: "",
    isLoading: true,
    selectAll: false,
    numbersForDelete: [],
    showDelete: false,
    paginationPhoneNumbers: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };

  componentDidMount() {
    this.props
      .fetchGetPhoneNumbersByGroupId(this.props.tenantId, this.props.groupId)
      .then(() =>
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
        )
      );
  }

  render() {
    const {
      isLoading,
      showDelete,
      numbersForDelete,
      countPerPage,
      pagination,
      paginationPhoneNumbers,
      page
    } = this.state;

    const { onReload } = this.props;

    if (isLoading && pagination) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-2 flex align-items-center"}>
          <Col mdOffset={1} md={8}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="placeholder"
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
              to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.tenantId}/groups/${this.props.groupId}/addphone`}
            >
              <Glyphicon
                className={"x-large"}
                glyph="glyphicon glyphicon-plus-sign"
              />
            </Link>
          </Col>
          <Col md={2}>
            <Link
              to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.tenantId}/groups/${this.props.groupId}/modifyphone`}
            >
              modify portability states
            </Link>
          </Col>
        </Row>
        {paginationPhoneNumbers.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={8}>
                <div className={"flex space-between indent-top-bottom-1"}>
                  <div className={"flex align-items-center"}>
                    <Checkbox
                      className={"margin-checbox"}
                      checked={this.state.selectAll}
                      onChange={this.handleSelectAllClick}
                    >
                      (Un)select all shown numbers
                    </Checkbox>
                    <Glyphicon
                      glyph="glyphicon glyphicon-trash"
                      onClick={this.deleteSlectedNumbers}
                    />
                    <div className={"margin-checbox"}>
                      Delete selected numbers
                    </div>
                    <DeleteModal
                      rangeStart={numbersForDelete.map(
                        number => number.phoneNumbers || number.phoneNumber
                      )}
                      show={showDelete}
                      onClose={e => {
                        onReload && onReload(numbersForDelete);
                        this.setState({ showDelete: false });
                      }}
                      {...this.props}
                    />
                  </div>
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
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }} />
                      <th style={{ width: "22%" }}>
                        <FormattedMessage
                          id="tenant-id"
                          defaultMessage="Range start"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByRangeStart}
                        />
                      </th>
                      <th style={{ width: "22%" }}>
                        <FormattedMessage
                          id="name"
                          defaultMessage="Range end"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByRangeEnd}
                        />
                      </th>
                      <th style={{ width: "22%" }}>
                        <FormattedMessage
                          id="assigned"
                          defaultMessage="Assigned to"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByAssignedToGroup}
                        />
                      </th>
                      <th style={{ width: "22%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="User type"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByAssignedToGroup}
                        />
                      </th>
                      <th style={{ width: "5%" }} />
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
              defaultMessage="No phone numbers were found"
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
    const SearchArray = this.props.phoneNumbers
      .filter(
        phone =>
          phone.rangeStart.toLowerCase().includes(searchValue.toLowerCase()) ||
          phone.rangeEnd.toLowerCase().includes(searchValue.toLowerCase()) ||
          phone.userId.toLowerCase().includes(searchValue.toLowerCase()) ||
          phone.userType.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(phone => phone);
    this.setState({ phoneNumbers: SearchArray }, () => this.pagination());
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

  sortByAssignedToGroup = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "assignedToGroup") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.userId < b.userId) return -1;
        if (a.userId > b.userId) return 1;
        return 0;
      });
      this.setState(
        {
          phoneNumbers: phonesSorted,
          sortedBy: "assignedToGroup"
        },
        () => this.pagination()
      );
    }
  };

  sortByAssignedToGroup = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "userType") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.userType < b.userType) return -1;
        if (a.userType > b.userType) return 1;
        return 0;
      });
      this.setState(
        {
          phoneNumbers: phonesSorted,
          sortedBy: "userType"
        },
        () => this.pagination()
      );
    }
  };

  deleteSlectedNumbers = () => {
    const { phoneNumbers } = this.state;
    const numbersForDelete = phoneNumbers.filter(phone => {
      return !!phone.phoneChecked;
    });
    this.setState({ numbersForDelete, showDelete: true }, () =>
      this.pagination()
    );
  };

  handleSelectAllClick = e => {
    const isChecked = e.target.checked;
    const newArr = this.state.phoneNumbers.map(el => ({
      ...el,
      phoneChecked: isChecked
    }));
    this.setState(
      { phoneNumbers: newArr, selectAll: !this.state.selectAll },
      () => this.pagination()
    );
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

const mapStateToProps = () => ({
  phoneNumbers: [
    { rangeStart: "0392392304", rangeEnd: "0392392312" },
    { rangeStart: "0392392323", rangeEnd: "" }
  ]
});

const mapDispatchToProps = {
  fetchGetPhoneNumbersByGroupId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneNumbersTab)
);
