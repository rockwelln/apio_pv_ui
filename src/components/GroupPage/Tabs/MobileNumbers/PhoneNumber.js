import React, { Component } from "react";
import { withRouter } from "react-router";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

import DeleteModal from "./DeleteModal";

import { Link } from "react-router-dom";

import "./styles.css";

class PhoneNumber extends Component {
  state = { showDelete: false };

  render() {
    const { number, onReload, index, tenantId } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={number.groupId}>
        <td>
          <Checkbox
            checked={number.phoneChecked}
            className={"table-checkbox"}
            onChange={() => {
              this.props.handleSingleCheckboxClick(index);
            }}
          />
        </td>
        <td>{number.phoneNumber}</td>
        <td>{number.userId}</td>
        <td>{number.firstName}</td>
        <td>{number.lastName}</td>
        <td>{number.extension}</td>
        <td>
          <React.Fragment>
            <ButtonToolbar>
              <Glyphicon
                glyph="glyphicon glyphicon-remove"
                onClick={() => this.setState({ showDelete: true })}
              />
            </ButtonToolbar>
            <DeleteModal
              number={number}
              show={showDelete}
              tenantId={this.props.tenantId}
              onClose={e => {
                onReload && onReload(number.rangeStart);
                this.setState({ showDelete: false });
              }}
              {...this.props}
            />
          </React.Fragment>
        </td>
      </tr>
    );
  }
}

export default withRouter(PhoneNumber);
