import React, { Component } from "react";

import Button from "react-bootstrap/lib/Button";
import { FormattedMessage } from "react-intl";

import SelectRange from "./assignRangeOfNumbers";

export default class PhoneNumber extends Component {
  state = {
    showModal: false
  };

  render() {
    const { number } = this.props;
    return (
      <React.Fragment>
        <tr key={number.groupId}>
          <td>{number.rangeStart}</td>
          <td>{number.rangeEnd}</td>
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
                onClick={() =>
                  this.props.assignNumbers({
                    numbers: [{ phoneNumber: number.rangeStart }]
                  })
                }
              >
                <FormattedMessage id="add_number" defaultMessage="Add number" />
              </Button>
            )}
          </td>
        </tr>
        {this.state.showModal && (
          <SelectRange
            show={this.state.showModal}
            onClose={() => this.setState({ showModal: false })}
            number={number}
            assignNumbers={this.props.assignNumbers}
          />
        )}
      </React.Fragment>
    );
  }
}
