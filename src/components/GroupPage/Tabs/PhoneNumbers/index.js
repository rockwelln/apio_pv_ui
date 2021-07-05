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
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";

import { NotificationsManager } from "../../../../utils";

import { FormattedMessage } from "react-intl";

import deepEqual from "../../../deepEqual";

import {
  fetchGetPhoneNumbersByGroupId,
  fetchPutUpdateNumbersStatus,
  fetchGetPhoneNumbersWithRefreshDB,
} from "../../../../store/actions";

import Loading from "../../../../common/Loading";
import PhoneNumber from "./PhoneNumber";
import DeleteModal from "./DeleteMultipleNumbers";
import { countsPerPages } from "../../../../constants";

import { isAllowed, pages } from "../../../../utils/user";

import "./styles.css";

export class PhoneNumbersTab extends Component {
  state = {
    searchValue: "",
    phoneNumbers: [],
    sortedBy: "",
    isLoading: true,
    selectAll: false,
    selectAllPreActive: false,
    selectAllActive: false,
    numbersForDelete: [],
    showDelete: false,
    paginationPhoneNumbers: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null,
    showWithStatus: false,
    showRefreshAllDialog: false,
    disableDialogButtons: false,
    disabledUpdateStatusActive: false,
    disabledUpdateStatusPreActive: false,
    disableRefresInfo: false,
  };

  fetchGetNumbers() {
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
            sortedBy: "rangeStart",
          },
          () => this.pagination()
        )
      );
  }

  componentDidMount() {
    this.fetchGetNumbers();
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(prevProps.phoneNumbers, this.props.phoneNumbers)) {
      this.setState(
        {
          phoneNumbers: this.props.phoneNumbers,
          isLoading: false,
          sortedBy: "rangeStart",
        },
        () => this.pagination()
      );
    }
    if (prevProps.location.hash !== this.props.location.hash) {
      this.fetchGetNumbers();
    }
  }

  render() {
    const {
      isLoading,
      numbersForDelete,
      showDelete,
      countPerPage,
      pagination,
      paginationPhoneNumbers,
      page,
    } = this.state;

    if (isLoading && pagination) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Row className={"margin-top-2 flex align-items-center"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder_numbers"
                defaultMessage="Numbers"
              >
                {(placeholder) => (
                  <FormControl
                    type="text"
                    value={this.state.searchValue}
                    placeholder={placeholder}
                    onChange={(e) =>
                      this.setState(
                        {
                          searchValue: e.target.value,
                        },
                        () => this.filterBySearchValue()
                      )
                    }
                  />
                )}
              </FormattedMessage>
            </InputGroup>
          </Col>
          {isAllowed(
            localStorage.getItem("userProfile"),
            pages.group_numbers_other_actions
          ) && (
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
          )}
        </Row>
        {/* {paginationPhoneNumbers.length ? ( */}
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <div className={"flex space-between indent-top-bottom-1"}>
                <div className={"flex align-items-center"}>
                  {/* <Checkbox
                      className={"margin-checbox"}
                      checked={this.state.selectAll}
                      onChange={this.handleSelectAllClick}
                    >
                      (Un)select all shown numbers
                    </Checkbox> */}
                  {isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.group_numbers_other_actions
                  ) && (
                    <div
                      onClick={this.deleteSlectedNumbers}
                      className={
                        "cursor-pointer padding-left-05 flex text-align-center align-items-center margin-right-1"
                      }
                    >
                      <Glyphicon
                        glyph="glyphicon glyphicon-trash"
                        className={"margin-right-1"}
                        onClick={this.deleteSlectedNumbers}
                      />
                      <div>Delete selected numbers</div>
                    </div>
                  )}
                  <DeleteModal
                    rangeStart={numbersForDelete.map(
                      (number) => number.phoneNumbers || number.phoneNumber
                    )}
                    show={showDelete}
                    onClose={(e) => {
                      this.fetchGetNumbers();
                      this.setState({ showDelete: false });
                    }}
                    {...this.props}
                  />
                  {isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.group_numbers_other_actions
                  ) ? (
                    <Button
                      onClick={this.updateStatus}
                      className={"btn-primary margin-right-1"}
                      disabled={
                        this.state.disabledUpdateStatusActive ||
                        this.state.disabledUpdateStatusPreActive
                      }
                    >
                      <FormattedMessage
                        id="updateStatus"
                        defaultMessage="Update Status"
                      />
                    </Button>
                  ) : null}
                  {isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.group_numbers_refresh_selected
                  ) && (
                    <Button
                      onClick={this.refreshInformation}
                      className={"btn-primary margin-right-1"}
                      disabled={this.state.disableRefresInfo}
                    >
                      <FormattedMessage
                        id="refreshInformation"
                        defaultMessage="Refresh information"
                      />
                    </Button>
                  )}
                  {isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.group_numbers_refresh_all
                  ) ? (
                    <Button
                      onClick={() =>
                        this.setState({ showRefreshAllDialog: true })
                      }
                      className={"btn-primary margin-right-1"}
                    >
                      <FormattedMessage
                        id="refreshAll"
                        defaultMessage="Refresh all"
                      />
                    </Button>
                  ) : null}
                  {isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.group_numbers_refresh_all
                  ) ? (
                    <Button
                      onClick={this.updateZipCodes}
                      className={"btn-primary margin-right-1"}
                      disabled={
                        this.state.disabledUpdateStatusActive ||
                        this.state.disabledUpdateStatusPreActive
                      }
                    >
                      <FormattedMessage
                        id="updateZipCodes"
                        defaultMessage="Update zip codes"
                      />
                    </Button>
                  ) : null}
                </div>
                <Modal show={this.state.showRefreshAllDialog}>
                  <Modal.Header>
                    <Modal.Title>Refresh All</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>This activity could take a long time</Modal.Body>

                  <Modal.Footer>
                    <Button
                      onClick={() =>
                        this.setState({ showRefreshAllDialog: false })
                      }
                      disabled={this.state.disableDialogButtons}
                    >
                      Close
                    </Button>
                    <Button
                      disabled={this.state.disableDialogButtons}
                      onClick={this.refreshAll}
                      bsStyle="primary"
                    >
                      {this.state.disableDialogButtons ? "Refreshing..." : "OK"}
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className={"flex align-items-center"}>
                  <div>Item per page</div>
                  <FormControl
                    componentClass="select"
                    defaultValue={countPerPage}
                    style={{ display: "inline", width: "auto" }}
                    className={"margin-left-1"}
                    onChange={this.changeCoutOnPage}
                  >
                    {countsPerPages.map((counts) => (
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
                    <th>
                      <Checkbox
                        className={"margin-0 height-20"}
                        checked={this.state.selectAll}
                        onChange={this.handleSelectAllClick}
                      />
                    </th>
                    <React.Fragment>
                      <th>
                        <Checkbox
                          className={"margin-0"}
                          checked={this.state.selectAllActive}
                          onChange={this.handleSelectAllClickActive}
                        >
                          <div className={"font-weight-bold"}>
                            <FormattedMessage
                              id="activate"
                              defaultMessage="Activate"
                            />
                          </div>
                        </Checkbox>
                      </th>
                      <th>
                        <Checkbox
                          className={"margin-0"}
                          checked={this.state.selectAllPreActive}
                          onChange={this.handleSelectAllClickPreActive}
                        >
                          <div className={"font-weight-bold"}>
                            <FormattedMessage
                              id="pre-activate"
                              defaultMessage="Pre-activate"
                            />
                          </div>
                        </Checkbox>
                      </th>
                    </React.Fragment>
                    <th>
                      <FormattedMessage
                        id="tenant-id"
                        defaultMessage="Range start"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByRangeStart}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="name" defaultMessage="Range end" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByRangeEnd}
                      />
                    </th>
                    <th />
                    <th style={{ width: "12%" }}>
                      <FormattedMessage
                        id="zipCode"
                        defaultMessage="ZIP Code"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByZipCode}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="mainNumber"
                        defaultMessage="Main Number"
                      />
                      {" / "}
                      <FormattedMessage
                        id="maintenanceNumber"
                        defaultMessage="Maintenance Number"
                      />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {!!paginationPhoneNumbers.length &&
                    paginationPhoneNumbers[page].map((number, i) => (
                      <PhoneNumber
                        index={i}
                        key={i}
                        number={number}
                        showWithStatus={this.state.showWithStatus}
                        handleSingleCheckboxClick={
                          this.handleSingleCheckboxClick
                        }
                        handleSingleCheckboxClickActive={
                          this.handleSingleCheckboxClickActive
                        }
                        handleSingleCheckboxClickPreActive={
                          this.handleSingleCheckboxClickPreActive
                        }
                        handleSingleCheckboxClickInRange={
                          this.handleSingleCheckboxClickInRange
                        }
                        handleChangeZipCode={this.handleChangeZipCode}
                        page={page}
                        onReload={() => this.fetchGetNumbers()}
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
        {/* ) : (
          <Col mdOffset={1} md={10}>
            <FormattedMessage
              id="notFound"
              defaultMessage="No phone numbers were found"
            />
          </Col>
        )} */}
      </React.Fragment>
    );
  }

  refreshAll = () => {
    this.setState({ disableDialogButtons: true }, () =>
      this.props
        .fetchGetPhoneNumbersWithRefreshDB(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          "refresh_db=true"
        )
        .then(() =>
          this.setState({
            showRefreshAllDialog: false,
            disableDialogButtons: false,
          })
        )
    );
  };

  refreshInformation = () => {
    const { phoneNumbers } = this.state;
    const numbersForRefresh = [];

    phoneNumbers.forEach((phone) => {
      if (phone.phoneNumbers) {
        phone.phoneNumbers.forEach((number) => {
          if (number.phoneChecked) {
            numbersForRefresh.push(number.phoneNumber);
          }
        });
      } else {
        if (phone.phoneChecked) {
          numbersForRefresh.push(phone.phoneNumber);
        }
      }
    });
    // phoneNumbers.map(phone => {
    //   if (!!phone.phoneChecked) {
    //     numbersForRefresh.push(phone.phoneNumber);
    //   }
    //   return 0;
    // });
    if (!numbersForRefresh.length) {
      NotificationsManager.error(
        <FormattedMessage
          id="notSelectedNumbers"
          defaultMessage="Numbers is not selcted"
        />,
        "Please select numbers at first"
      );
      return;
    }
    const queryNumbers = numbersForRefresh.reduce(
      (numbersString, number) =>
        (numbersString = `${numbersString}&only_for_numbers=${number}`),
      ""
    );
    const queryString = `refresh_db=true${queryNumbers}`;
    this.setState({ disableRefresInfo: true }, () =>
      this.props
        .fetchGetPhoneNumbersWithRefreshDB(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          queryString
        )
        .then(() => this.setState({ disableRefresInfo: false }))
    );
  };

  updateStatus = () => {
    const activeNumbers = [];
    const preActiveNumbers = [];
    this.state.phoneNumbers.forEach((phone) => {
      if (phone.phoneNumbers) {
        phone.phoneNumbers.forEach((number) => {
          if (number.active && number.isChanged) {
            activeNumbers.push(number);
          }
        });
      } else {
        if (phone.active && phone.isChanged) {
          activeNumbers.push(phone);
        }
      }
    });
    // const activeNumbers = this.state.phoneNumbers.filter(
    //   el => el.active && el.isChanged
    // );
    this.state.phoneNumbers.forEach((phone) => {
      if (phone.phoneNumbers) {
        phone.phoneNumbers.forEach((number) => {
          if (number.preActive && number.isChanged) {
            preActiveNumbers.push(number);
          }
        });
      } else {
        if (phone.preActive && phone.isChanged) {
          preActiveNumbers.push(phone);
        }
      }
    });
    // const preActiveNumbers = this.state.phoneNumbers.filter(
    //   el => el.preActive && el.isChanged
    // );
    const allActiveNumbers = [];
    const allPreActiveNumbers = [];
    activeNumbers.map((el) => {
      allActiveNumbers.push(el.phoneNumber);
      return 0;
    });
    preActiveNumbers.map((el) => {
      allPreActiveNumbers.push(el.phoneNumber);
      return 0;
    });
    const activeData = {
      numbers: allActiveNumbers.map((number) => ({ phoneNumber: number })),
      status: "active",
    };
    const preActiveData = {
      numbers: allPreActiveNumbers.map((number) => ({ phoneNumber: number })),
      status: "preActive",
    };
    this.setState({
      disabledUpdateStatusActive: !!allActiveNumbers.length,
      disabledUpdateStatusPreActive: !!allPreActiveNumbers.length,
    });
    allActiveNumbers.length &&
      this.props
        .fetchPutUpdateNumbersStatus(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          activeData
        )
        .then(() => this.setState({ disabledUpdateStatusActive: false }));
    allPreActiveNumbers.length &&
      this.props
        .fetchPutUpdateNumbersStatus(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          preActiveData
        )
        .then(() => this.setState({ disabledUpdateStatusPreActive: false }));
  };

  updateZipCodes = () => {
    const newZipNumbers = [];
    this.state.phoneNumbers.forEach((phone) => {
      if (phone.phoneNumbers) {
        phone.phoneNumbers.forEach((number) => {
          if (number.isChanged) {
            newZipNumbers.push({
              active: number.active,
              preActive: number.preActive,
              phoneNumber: number.phoneNumber,
              zipCode: number.zipCode,
            });
          }
        });
      } else {
        if (phone.isChanged) {
          newZipNumbers.push({
            active: phone.active,
            preActive: phone.preActive,
            phoneNumber: phone.phoneNumber,
            zipCode: phone.zipCode,
          });
        }
      }
    });

    const activeData = {
      numbers: newZipNumbers.filter((number) => number.active),
      status: "active",
    };
    const preActiveData = {
      numbers: newZipNumbers.filter((number) => number.preActive),
      status: "preActive",
    };
    this.setState({
      disabledUpdateStatusActive: activeData.numbers.length,
      disabledUpdateStatusPreActive: preActiveData.numbers.length,
    });
    activeData.numbers.length &&
      this.props
        .fetchPutUpdateNumbersStatus(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          activeData
        )
        .then(() => this.setState({ disabledUpdateStatusActive: false }));
    preActiveData.numbers.length &&
      this.props
        .fetchPutUpdateNumbersStatus(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          preActiveData
        )
        .then(() => this.setState({ disabledUpdateStatusPreActive: false }));
  };

  getNumbersWithStatus = () => {
    this.props
      .fetchGetPhoneNumbersByGroupId(
        this.props.tenantId,
        this.props.groupId,
        true
      )
      .then(() =>
        this.setState(
          {
            phoneNumbers: this.props.phoneNumbers.sort((a, b) => {
              if (a.rangeStart < b.rangeStart) return -1;
              if (a.rangeStart > b.rangeStart) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "rangeStart",
            showWithStatus: true,
          },
          () => this.pagination()
        )
      );
  };

  changeCoutOnPage = (e) => {
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
      page: this.state.page,
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.phoneNumbers
      .filter(
        (phone) =>
          phone.rangeStart.toLowerCase().includes(searchValue.toLowerCase()) ||
          (phone.phoneNumbers &&
            phone.phoneNumbers.some((el) =>
              el.rangeStart.toLowerCase().includes(searchValue.toLowerCase())
            )) ||
          (phone.userId &&
            phone.userId.toLowerCase().includes(searchValue.toLowerCase())) ||
          (phone.userType &&
            phone.userType.toLowerCase().includes(searchValue.toLowerCase()))
      )
      .map((phone) => phone);
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

  sortByMainNumber = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "main_number") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.main_number > b.main_number) return -1;
        if (a.main_number < b.main_number) return 1;
        return 0;
      });
      this.setState(
        {
          phoneNumbers: phonesSorted,
          sortedBy: "main_number",
        },
        () => this.pagination()
      );
    }
  };

  sortByMaintenanceNumber = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "maintenance_number") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.maintenance_number > b.maintenance_number) return -1;
        if (a.maintenance_number < b.maintenance_number) return 1;
        return 0;
      });
      this.setState(
        {
          phoneNumbers: phonesSorted,
          sortedBy: "maintenance_number",
        },
        () => this.pagination()
      );
    }
  };

  sortBy = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "zipCode") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted }, () => this.pagination());
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.zipCode > b.zipCode) return -1;
        if (a.zipCode < b.zipCode) return 1;
        return 0;
      });
      this.setState(
        {
          phoneNumbers: phonesSorted,
          sortedBy: "zipCode",
        },
        () => this.pagination()
      );
    }
  };

  deleteSlectedNumbers = () => {
    const { phoneNumbers } = this.state;
    const numbersForDelete = [];

    phoneNumbers.forEach((phone) => {
      if (phone.phoneNumbers) {
        phone.phoneNumbers.forEach((el) => {
          if (el.phoneChecked) {
            numbersForDelete.push(el);
          }
        });
      } else {
        if (phone.phoneChecked) {
          numbersForDelete.push(phone);
        }
      }
    });
    this.setState({ numbersForDelete, showDelete: true });
  };

  handleSelectAllClickPreActive = (e) => {
    const isChecked = e.target.checked;
    const newArr = this.state.phoneNumbers.map((el) => {
      if (el.phoneNumbers) {
        const arrayOfPhones = el.phoneNumbers.map((phone) => ({
          ...phone,
          preActive: isChecked,
          active: !isChecked,
          isChanged: !el.isChanged,
        }));
        return {
          ...el,
          preActive: isChecked,
          active: !isChecked,
          isChanged: !el.isChanged,
          phoneNumbers: arrayOfPhones,
        };
      }
      return {
        ...el,
        preActive: isChecked,
        active: !isChecked,
        isChanged: !el.isChanged,
      };
    });
    this.setState(
      {
        phoneNumbers: newArr,
        selectAllPreActive: !this.state.selectAllPreActive,
        selectAllActive: this.state.selectAllPreActive,
      },
      () => this.pagination()
    );
  };

  handleSelectAllClickActive = (e) => {
    const isChecked = e.target.checked;
    const newArr = this.state.phoneNumbers.map((el) => {
      if (el.phoneNumbers) {
        const arrayOfPhones = el.phoneNumbers.map((phone) => ({
          ...phone,
          active: isChecked,
          preActive: !isChecked,
          isChanged: !el.isChanged,
        }));
        return {
          ...el,
          active: isChecked,
          preActive: !isChecked,
          isChanged: !el.isChanged,
          phoneNumbers: arrayOfPhones,
        };
      }
      return {
        ...el,
        active: isChecked,
        preActive: !isChecked,
        isChanged: !el.isChanged,
      };
    });
    this.setState(
      {
        phoneNumbers: newArr,
        selectAllActive: !this.state.selectAllActive,
        selectAllPreActive: this.state.selectAllActive,
      },
      () => this.pagination()
    );
  };

  handleSelectAllClick = (e) => {
    const isChecked = e.target.checked;
    const newArr = this.state.phoneNumbers.map((el) => {
      if (el.phoneNumbers) {
        const arrayOfPhones = el.phoneNumbers.map((phone) => ({
          ...phone,
          phoneChecked: isChecked,
        }));
        return {
          ...el,
          phoneChecked: isChecked,
          phoneNumbers: arrayOfPhones,
        };
      }
      return {
        ...el,
        phoneChecked: isChecked,
      };
    });
    this.setState(
      { phoneNumbers: newArr, selectAll: !this.state.selectAll },
      () => this.pagination()
    );
  };

  handleSingleCheckboxClick = (phone, inRange) => {
    let newArr = [];
    const incomingPhone = phone;
    if (inRange) {
      newArr = this.state.phoneNumbers.map((number) => {
        if (
          number.rangeStart <= incomingPhone &&
          incomingPhone <= number.rangeEnd
        ) {
          return {
            ...number,
            phoneNumbers: number.phoneNumbers.map((el) => ({
              ...el,
              phoneChecked:
                el.phoneNumber === phone ? !el.phoneChecked : el.phoneChecked,
            })),
          };
        } else {
          return number;
        }
      });
    } else {
      newArr = this.state.phoneNumbers.map((el) => {
        if (el.phoneNumber === incomingPhone) {
          return {
            ...el,
            phoneChecked: !el.phoneChecked,
            phoneNumbers:
              el.phoneNumbers &&
              el.phoneNumbers.map((phone) => ({
                ...phone,
                phoneChecked: !phone.phoneChecked,
              })),
          };
        }
        return el;
      });
    }
    this.setState({ phoneNumbers: newArr, selectAll: false }, () => {
      console.log(this.state.phoneNumbers);
      this.pagination();
    });
  };

  handleSingleCheckboxClickActive = (phone, inRange) => {
    let newArr = [];
    const incomingPhone = phone;
    if (inRange) {
      newArr = this.state.phoneNumbers.map((number) => {
        if (
          number.rangeStart <= incomingPhone &&
          incomingPhone <= number.rangeEnd
        ) {
          return {
            ...number,
            phoneNumbers: number.phoneNumbers.map((el) => ({
              ...el,
              active: el.phoneNumber === incomingPhone ? !el.active : el.active,
              preActive:
                el.phoneNumber === incomingPhone ? !el.preActive : el.preActive,
              isChanged:
                el.phoneNumber === incomingPhone ? !el.isChanged : el.isChanged,
            })),
          };
        } else {
          return number;
        }
      });
    } else {
      newArr = this.state.phoneNumbers.map((el) => {
        if (el.phoneNumber === incomingPhone) {
          return {
            ...el,
            active: !el.active,
            preActive: !el.preActive,
            isChanged: !el.isChanged,
            phoneNumbers:
              el.phoneNumbers &&
              el.phoneNumbers.map((phone) => ({
                ...phone,
                active: !el.active,
                preActive: !el.preActive,
                isChanged: !el.isChanged,
              })),
          };
        }
        return el;
      });
    }
    this.setState({ phoneNumbers: newArr, selectAllPreActive: false }, () =>
      this.pagination()
    );
  };

  handleSingleCheckboxClickPreActive = (phone, inRange) => {
    let newArr = [];
    const incomingPhone = phone;
    if (inRange) {
      newArr = this.state.phoneNumbers.map((number) => {
        if (
          number.rangeStart <= incomingPhone &&
          incomingPhone <= number.rangeEnd
        ) {
          return {
            ...number,
            phoneNumbers: number.phoneNumbers.map((el) => ({
              ...el,
              active: el.phoneNumber === incomingPhone ? !el.active : el.active,
              preActive:
                el.phoneNumber === incomingPhone ? !el.preActive : el.preActive,
              isChanged:
                el.phoneNumber === incomingPhone ? !el.isChanged : el.isChanged,
            })),
          };
        } else {
          return number;
        }
      });
    } else {
      newArr = this.state.phoneNumbers.map((el) => {
        if (el.phoneNumber === incomingPhone) {
          return {
            ...el,
            active: !el.active,
            preActive: !el.preActive,
            isChanged: !el.isChanged,
            phoneNumbers:
              el.phoneNumbers &&
              el.phoneNumbers.map((phone) => ({
                ...phone,
                preActive: !el.preActive,
                active: !el.active,
                isChanged: !el.isChanged,
              })),
          };
        }
        return el;
      });
    }
    this.setState({ phoneNumbers: newArr, selectAllActive: false }, () =>
      this.pagination()
    );
  };

  handleChangeZipCode = (phone, newZipCode, inRange) => {
    let newArr = [];
    const incomingPhone = phone;
    if (inRange) {
      newArr = this.state.phoneNumbers.map((number) => {
        if (
          number.rangeStart <= incomingPhone &&
          incomingPhone <= number.rangeEnd
        ) {
          return {
            ...number,
            phoneNumbers: number.phoneNumbers.map((el) => ({
              ...el,
              zipCode:
                el.phoneNumber === incomingPhone ? newZipCode : el.zipCode,
              isChanged: el.phoneNumber === incomingPhone ? true : el.isChanged,
            })),
          };
        } else {
          return number;
        }
      });
    } else {
      newArr = this.state.phoneNumbers.map((el) => {
        if (el.phoneNumber === incomingPhone) {
          return {
            ...el,
            zipCode: newZipCode,
            isChanged: true,
            phoneNumbers:
              el.phoneNumbers &&
              el.phoneNumbers.map((phone) => ({
                ...phone,
                zipCode: newZipCode,
                isChanged: true,
              })),
          };
        }
        return el;
      });
    }
    this.setState({ phoneNumbers: newArr }, () => this.pagination());
  };
}

const mapStateToProps = (state) => ({
  phoneNumbers: state.phoneNumbersByGroup,
});

const mapDispatchToProps = {
  fetchGetPhoneNumbersByGroupId,
  fetchPutUpdateNumbersStatus,
  fetchGetPhoneNumbersWithRefreshDB,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhoneNumbersTab)
);
