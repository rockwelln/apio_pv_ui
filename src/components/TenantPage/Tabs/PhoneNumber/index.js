import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

import { fetchGetPhoneNumbersByTenantId } from "../../../../store/actions";

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
          if (a.phoneNumber < b.phoneNumber) return -1;
          if (a.phoneNumber > b.phoneNumber) return 1;
          return 0;
        }),
        isLoading: false,
        sortedBy: "phoneNumber"
      })
    );
  }

  render() {
    console.log(this.state);
    return (
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
            defaultMessage="Number or Assigned or Assigned to"
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
    );
  }
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
