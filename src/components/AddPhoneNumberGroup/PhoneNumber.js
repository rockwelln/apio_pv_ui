import React, { Component } from "react";
import { withRouter } from "react-router";

import Button from "react-bootstrap/lib/Button";
import { FormattedMessage } from "react-intl";

import SelectRange from "./assignRangeOfNumbers";

export class PhoneNumber extends Component {
  state = {
    showModal: false
  };

  render() {
    const { number } = this.props;
    const pathNameArr = this.props.location.pathname.split("/");
    return (
      <React.Fragment>
        <tr key={number.groupId}>
          {pathNameArr[pathNameArr.length - 1] === "add-mobile-phone" ? (
            <td>{number}</td>
          ) : (
            <React.Fragment>
              <td>{number.rangeStart}</td>
              <td>{number.rangeEnd}</td>
            </React.Fragment>
          )}
          <td>
            {number.rangeEnd ? (
              <Button
                bsStyle="link"
                onClick={() => this.setState({ showModal: true })}
              >
                <FormattedMessage
                  id="Add_sub_range"
                  defaultMessage="Add (sub)range"
                />
              </Button>
            ) : (
              <Button
                bsStyle="link"
                onClick={() => {
                  pathNameArr[pathNameArr.length - 1] === "add-mobile-phone"
                    ? this.props.assignNumbers({
                        numbers: [{ phoneNumber: number }]
                      })
                    : this.props.assignNumbers({
                        numbers: [{ phoneNumber: number.rangeStart }]
                      });
                }}
              >
                <FormattedMessage id="add_number" defaultMessage="Add number" />
              </Button>
            )}
          </td>
        </tr>
        {this.state.showModal && (
          <SelectRange
            show={this.state.showModal}
            onClose={() => {
              this.setState({ showModal: false });
              this.props.toUpdate();
            }}
            number={number}
            assignNumbers={this.props.assignNumbers}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(PhoneNumber);
