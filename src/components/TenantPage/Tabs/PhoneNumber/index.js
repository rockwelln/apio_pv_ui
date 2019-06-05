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

import "./styles.css";

export class PhoneNumbersTab extends Component {
  state = {
    searchValue: "",
    phoneNumbers: [],
    sortedBy: "",
    isLoading: true
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
        sortedBy: "phoneNumber"
      })
    );
  }

  render() {
    const { phoneNumbers, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }
    console.log(phoneNumbers);
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
        <Row>
          <Col mdOffset={1} md={10}>
            <div style={{ display: "flex" }}>
              <Checkbox
                className={"margin-checbox"}
                onChange={this.handleCheckboxClick}
              >
                (Un)select all shown numbers
              </Checkbox>
              <Glyphicon glyph="glyphicon glyphicon-trash" />
              <div className={"margin-checbox"}>Delete selected numbers</div>
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
                      onClick={this.sortByID}
                    />
                  </th>
                  <th style={{ width: "30%" }}>
                    <FormattedMessage id="name" defaultMessage="Range end" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByName}
                    />
                  </th>
                  <th style={{ width: "30%" }}>
                    <FormattedMessage id="type" defaultMessage="Assigned to" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByUserLimit}
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
                    handleCheckbox={this.handleCheckbox}
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
    );
  }

  handleCheckboxClick = e => {
    const isChecked = e.target.checked;
    const newArr = this.state.phoneNumbers.map(el => ({
      ...el,
      phoneChecked: el.canBeDeleted ? isChecked : el.phoneChecked
    }));
    this.setState({ phoneNumbers: newArr });
  };

  handleCheckbox = index => {
    const newArr = this.state.phoneNumbers.map((el, i) => ({
      ...el,
      phoneChecked:
        index === i && el.canBeDeleted ? !el.phoneChecked : el.phoneChecked
    }));
    this.setState({ phoneNumbers: newArr });
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
