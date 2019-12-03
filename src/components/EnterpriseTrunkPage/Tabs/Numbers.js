import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  fetchGetNumbersByEnterpriseTrunk,
  fetchPutUpdateNumbersByEnterpriseTrunk
} from "../../../store/actions";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Table from "react-bootstrap/lib/Table";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Button from "react-bootstrap/lib/Button";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import InputGroup from "react-bootstrap/lib/InputGroup";

import { removeEmpty } from "../../remuveEmptyInObject";

import { FormattedMessage } from "react-intl";

export class Numbers extends Component {
  state = {
    numbersFromEnterpriseTrunk: [],
    groupNumbers: [],
    searchValueEntNumbers: "",
    searchValueGroupNumbers: "",
    searchablePhoneNumber: []
  };

  fetchNumbers = () => {
    this.props
      .fetchGetNumbersByEnterpriseTrunk(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.entTrunkId
      )
      .then(() => {
        const groupNumbers = this.props.numbersByEnterpriseTrunk.group_numbers.map(
          el => ({
            ...el,
            checked: false
          })
        );
        this.setState({
          numbersFromEnterpriseTrunk: this.props.numbersByEnterpriseTrunk
            .enterprise_trunk_numbers,
          groupNumbers,
          searchablePhoneNumber: groupNumbers
        });
      });
  };

  componentDidMount() {
    this.fetchNumbers();
  }
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={5}>
            <ControlLabel>
              <FormattedMessage
                id="enterprisTrunkNumbers"
                defaultMessage="Enterprise trunk numbers"
              />
            </ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Search phone number"
              >
                {placeholder => (
                  <FormControl
                    type="text"
                    value={this.state.searchValueEntNumbers}
                    placeholder={placeholder}
                    onChange={e =>
                      this.setState(
                        {
                          searchValueEntNumbers: e.target.value
                        },
                        () => this.filterBySearchEntValue()
                      )
                    }
                  />
                )}
              </FormattedMessage>
            </InputGroup>
            <Table striped hover className={"text-center"}>
              <tbody>
                {this.state.numbersFromEnterpriseTrunk.length
                  ? this.state.numbersFromEnterpriseTrunk.map((num, i) => (
                      <tr key={i}>
                        <td className={"flex space-between align-items-center"}>
                          {num.phoneNumber}
                        </td>
                      </tr>
                    ))
                  : "Do not exist"}
              </tbody>
            </Table>
          </Col>
          <Col mdOffset={2} md={5}>
            <ControlLabel>
              <FormattedMessage
                id="groupNumbers"
                defaultMessage="Numbers from other enterprise trunks"
              />
            </ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Search phone number"
              >
                {placeholder => (
                  <FormControl
                    type="text"
                    value={this.state.searchValueGroupNumbers}
                    placeholder={placeholder}
                    onChange={e =>
                      this.setState(
                        {
                          searchValueGroupNumbers: e.target.value
                        },
                        () => this.filterBySearchGroupValue()
                      )
                    }
                  />
                )}
              </FormattedMessage>
            </InputGroup>
            <Table striped hover className={"text-center"}>
              <tbody>
                {this.state.groupNumbers.length
                  ? this.state.groupNumbers.map((num, i) => (
                      <tr key={i}>
                        <td>
                          <Checkbox
                            className={"table-checkbox margin-left-08"}
                            checked={num.checked}
                            onChange={e =>
                              this.changeStatusOfGroupNumbers(
                                e,
                                i,
                                num.phoneNumber
                              )
                            }
                          />
                        </td>
                        <td className={"flex space-between align-items-center"}>
                          {num.phoneNumber}
                        </td>
                      </tr>
                    ))
                  : "Do not exist"}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.updateEnterpriseTrunkGroup}
                  type="submit"
                  className="btn-primary"
                  disabled={
                    this.state.routeExhaustionAction === "Forward" &&
                    !this.state.routeExhaustionDestination
                  }
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  <FormattedMessage id="update" defaultMessage="Update" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  updateEnterpriseTrunkGroup = () => {
    const { groupNumbers } = this.state;
    let checkedPhoneNumbers = [];
    groupNumbers
      .filter(el => el.checked)
      .map(el => checkedPhoneNumbers.push(el.phoneNumber));
    const data = {
      added_numbers: checkedPhoneNumbers
    };
    const clearData = removeEmpty(data);
    this.props
      .fetchPutUpdateNumbersByEnterpriseTrunk(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.entTrunkId,
        clearData
      )
      .then(() => this.fetchNumbers());
  };

  filterBySearchEntValue = () => {
    const { searchValueEntNumbers } = this.state;
    const SearchArray = this.props.numbersByEnterpriseTrunk.enterprise_trunk_numbers
      .filter(number =>
        number.phoneNumber
          .toLowerCase()
          .includes(searchValueEntNumbers.toLowerCase())
      )
      .map(number => number);
    this.setState({ numbersFromEnterpriseTrunk: SearchArray });
  };

  filterBySearchGroupValue = () => {
    const { searchValueGroupNumbers } = this.state;
    const searchablePhoneNumber = [...this.state.searchablePhoneNumber];
    const SearchArray = searchablePhoneNumber
      .filter(number =>
        number.phoneNumber
          .toLowerCase()
          .includes(searchValueGroupNumbers.toLowerCase())
      )
      .map(number => number);
    this.setState({ groupNumbers: SearchArray });
  };

  changeStatusOfGroupNumbers = (e, i, phoneNumber) => {
    const groupNumbers = [...this.state.groupNumbers];
    const searchablePhoneNumber = [...this.state.searchablePhoneNumber];
    console.log(phoneNumber);
    let index;
    searchablePhoneNumber.map((num, i) => {
      if (num.phoneNumber === phoneNumber) {
        index = i;
      }
    });
    console.log(index);
    const elSearchArr = searchablePhoneNumber.splice(index, 1);
    const updatedSearchElArr = { ...elSearchArr[0], checked: e.target.checked };
    searchablePhoneNumber.splice(i, 0, updatedSearchElArr);

    const elArr = groupNumbers.splice(i, 1);
    const updatedElArr = { ...elArr[0], checked: e.target.checked };
    groupNumbers.splice(i, 0, updatedElArr);
    this.setState({ groupNumbers, searchablePhoneNumber });
  };
}

const mapStateToProps = state => ({
  numbersByEnterpriseTrunk: state.numbersByEnterpriseTrunk
});

const mapDispatchToProps = {
  fetchGetNumbersByEnterpriseTrunk,
  fetchPutUpdateNumbersByEnterpriseTrunk
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Numbers)
);
