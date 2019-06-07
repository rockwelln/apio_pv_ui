import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { FormattedMessage } from "react-intl";

import { fetchGetPhoneNumbersByTenantId } from "../../../../store/actions";

import Loading from "../../../../common/Loading";
import PhoneNumber from "./PhoneNumber";
import DeleteModal from "./DeleteModal";

import "./styles.css";

export class PhoneNumbersTab extends Component {
  state = {
    searchValue: "",
    phoneNumbers: [],
    sortedBy: "",
    isLoading: true,
    selectAll: false,
    numbersForDelete: [],
    showDelete: false
  };

  componentDidMount() {
    this.props.fetchGetPhoneNumbersByTenantId(this.props.tenantId).then(() =>
      this.setState({
        phoneNumbers: this.props.phoneNumbers.sort((a, b) => {
          if (a.rangeStart < b.rangeStart) return -1;
          if (a.rangeStart > b.rangeStart) return 1;
          return 0;
        }),
        isLoading: false,
        sortedBy: "rangeStart"
      })
    );
  }

  render() {
    const {
      phoneNumbers,
      isLoading,
      showDelete,
      numbersForDelete
    } = this.state;

    const { onReload } = this.props;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
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
              defaultMessage="Number or Assigned to"
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
        {phoneNumbers.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={10}>
                <div style={{ display: "flex" }}>
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
              </Col>
            </Row>
            <Row>
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }} />
                      <th style={{ width: "30%" }}>
                        <FormattedMessage
                          id="tenant-id"
                          defaultMessage="Range start"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByRangeStart}
                        />
                      </th>
                      <th style={{ width: "30%" }}>
                        <FormattedMessage
                          id="name"
                          defaultMessage="Range end"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByRangeEnd}
                        />
                      </th>
                      <th style={{ width: "30%" }}>
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
                    {phoneNumbers.map((number, i) => (
                      <PhoneNumber
                        index={i}
                        key={number.rangeStart}
                        number={number}
                        handleSingleCheckboxClick={
                          this.handleSingleCheckboxClick
                        }
                        onReload={() =>
                          this.props.fetchGetPhoneNumbersByTenantId(
                            this.props.tenantId
                          )
                        }
                      />
                    ))}
                  </tbody>
                </Table>
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

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.phoneNumbers
      .filter(
        phone =>
          phone.rangeStart.toLowerCase().includes(searchValue.toLowerCase()) ||
          phone.rangeEnd.toLowerCase().includes(searchValue.toLowerCase()) ||
          phone.assignedToGroup
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      .map(phone => phone);
    this.setState({ phoneNumbers: SearchArray });
  };

  sortByRangeStart = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "rangeStart") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted });
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.rangeStart < b.rangeStart) return -1;
        if (a.rangeStart > b.rangeStart) return 1;
        return 0;
      });
      this.setState({ phoneNumbers: phonesSorted, sortedBy: "rangeStart" });
    }
  };

  sortByRangeEnd = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "rangeEnd") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted });
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.rangeEnd < b.rangeEnd) return -1;
        if (a.rangeEnd > b.rangeEnd) return 1;
        return 0;
      });
      this.setState({ phoneNumbers: phonesSorted, sortedBy: "rangeEnd" });
    }
  };

  sortByAssignedToGroup = () => {
    const { phoneNumbers, sortedBy } = this.state;
    if (sortedBy === "assignedToGroup") {
      const phonesSorted = phoneNumbers.reverse();
      this.setState({ phoneNumbers: phonesSorted });
    } else {
      const phonesSorted = phoneNumbers.sort((a, b) => {
        if (a.assignedToGroup < b.assignedToGroup) return -1;
        if (a.assignedToGroup > b.assignedToGroup) return 1;
        return 0;
      });
      this.setState({
        phoneNumbers: phonesSorted,
        sortedBy: "assignedToGroup"
      });
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
    this.setState({ phoneNumbers: newArr, selectAll: !this.state.selectAll });
  };

  handleSingleCheckboxClick = index => {
    const newArr = this.state.phoneNumbers.map((el, i) => ({
      ...el,
      phoneChecked:
        index === i && el.canBeDeleted ? !el.phoneChecked : el.phoneChecked
    }));
    this.setState({ phoneNumbers: newArr, selectAll: false });
  };
}

const mapStateToProps = state => ({
  phoneNumbers: state.phoneNumbers
});

const mapDispatchToProps = {
  fetchGetPhoneNumbersByTenantId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumbersTab);
