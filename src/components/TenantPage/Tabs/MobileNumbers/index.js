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

import { fetchGetMobileNumbersForTenant } from "../../../../store/actions";

import Loading from "../../../../common/Loading";
import PhoneNumber from "./PhoneNumber";
import DeleteModal from "./MultipleDeleteModal";
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

  fetchNumbers = () => {
    this.setState({ isLoading: true }, () =>
      this.props.fetchGetMobileNumbersForTenant(this.props.tenantId).then(() =>
        this.setState(
          {
            phoneNumbers: this.props.phoneNumbers.sort((a, b) => {
              if (a.phoneNumber < b.phoneNumber) return -1;
              if (a.phoneNumber > b.phoneNumber) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "phoneNumber"
          },
          () => this.pagination()
        )
      )
    );
  };

  componentDidMount() {
    this.fetchNumbers();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.phoneDeleted !== this.props.phoneDeleted ||
      (this.props.refreshTab !== prevProps.refreshTab && this.props.refreshTab)
    ) {
      this.fetchNumbers();
    }
  }

  render() {
    const {
      isLoading,
      numbersForDelete,
      countPerPage,
      paginationPhoneNumbers,
      page
    } = this.state;

    const { tenantId } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        {/*SEARCHBAR */}

        <Row className={"margin-top-2"}>
          <Col mdOffset={1} md={10}>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Number or Assigned to"
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
              to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/add-mobile-phone`}
            >
              <Glyphicon
                className={"x-large"}
                glyph="glyphicon glyphicon-plus-sign"
              />
            </Link>
          </Col>
        </Row>
        {paginationPhoneNumbers.length ? (
          <React.Fragment>
            {/*CONTROL BAR */}

            <Row>
              <Col mdOffset={1} md={10}>
                <div className={"flex space-between indent-top-bottom-1"}>
                  <div className={"flex align-items-center"}>
                    <Checkbox
                      className={"margin-checbox"}
                      checked={this.state.selectAll}
                      onChange={this.handleSelectAllClick}
                    >
                      (Un)select all shown numbers
                    </Checkbox>
                    <div
                      onClick={this.deleteSlectedNumbers}
                      className={
                        "cursor-pointer padding-left-05 flex text-align-center align-items-center"
                      }
                    >
                      <Glyphicon
                        glyph="glyphicon glyphicon-trash"
                        onClick={this.deleteSlectedNumbers}
                      />
                      <div>Delete selected numbers</div>
                    </div>
                    <DeleteModal
                      rangeStart={numbersForDelete.map(
                        number => number.phoneNumbers || number.phoneNumber
                      )}
                      tenantId={this.props.tenantId}
                      show={this.state.showDelete}
                      onClose={e => {
                        this.fetchNumbers();
                        this.setState({ showDelete: false });
                      }}
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

            {/*TABLE */}

            <Row>
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }} />
                      <th style={{ width: "45%" }}>
                        <FormattedMessage
                          id="phoneNumber"
                          defaultMessage="Phone Number"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByPhoneNumber}
                        />
                      </th>
                      <th style={{ width: "45%" }}>
                        <FormattedMessage
                          id="type"
                          defaultMessage="Assigned to"
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
                        key={number.rangeStart}
                        number={number}
                        tenantId={tenantId}
                        handleSingleCheckboxClick={
                          this.handleSingleCheckboxClick
                        }
                        onReload={() =>
                          this.props.fetchGetMobileNumbersForTenant(
                            this.props.tenantId
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
          phone.phoneNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
          phone.assignedToGroup
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      .map(phone => phone);
    this.setState({ phoneNumbers: SearchArray }, () => this.pagination());
  };

  sortByPhoneNumber = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "phoneNumber") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.phoneNumber < b.phoneNumber) return -1;
        if (a.phoneNumber > b.phoneNumber) return 1;
        return 0;
      });
      this.setState(
        { phoneNumbers: phonesSorted, sortedBy: "phoneNumber" },
        () => this.pagination()
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
        if (a.assignedToGroup < b.assignedToGroup) return -1;
        if (a.assignedToGroup > b.assignedToGroup) return 1;
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

  deleteSlectedNumbers = () => {
    const { phoneNumbers } = this.state;
    const numbersForDelete = phoneNumbers.filter(phone => {
      return !!phone.phoneChecked;
    });
    this.setState({ numbersForDelete, showDelete: true });
  };

  handleSelectAllClick = e => {
    const isChecked = e.target.checked;
    const newArr = this.state.phoneNumbers.map(el => ({
      ...el,
      phoneChecked: el.canBeDeleted ? isChecked : el.phoneChecked
    }));
    this.setState(
      { phoneNumbers: newArr, selectAll: !this.state.selectAll },
      () => this.pagination()
    );
  };

  handleSingleCheckboxClick = index => {
    const newArr = this.state.phoneNumbers.map((el, i) => ({
      ...el,
      phoneChecked:
        index === i && el.canBeDeleted ? !el.phoneChecked : el.phoneChecked
    }));
    this.setState({ phoneNumbers: newArr, selectAll: false }, () =>
      this.pagination()
    );
  };
}

const mapStateToProps = state => ({
  phoneNumbers: state.tenantMobileNumbers,
  phoneDeleted: state.phoneDeleted
});

const mapDispatchToProps = {
  fetchGetMobileNumbersForTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneNumbersTab)
);
