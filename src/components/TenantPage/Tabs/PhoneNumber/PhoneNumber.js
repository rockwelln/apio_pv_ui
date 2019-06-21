import React, { Component } from "react";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

import DeleteModal from "./DeleteModal";

import { Link } from "react-router-dom";

import "./styles.css";

export default class PhoneNumber extends Component {
  state = { showDelete: false };

  render() {
    const { number, onReload, index, tenantId } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={number.groupId}>
        <td>
          {number.canBeDeleted && (
            <Checkbox
              checked={number.phoneChecked}
              className={"table-checkbox"}
              onChange={() => {
                this.props.handleSingleCheckboxClick(index);
              }}
            />
          )}
        </td>
        <td>{number.rangeStart}</td>
        <td>{number.rangeEnd}</td>
        <td>
          <Link
            to={`/provisioning/broadsoft_xsp1_as1/tenants/${tenantId}/groups/${
              number.assignedToGroup
            }`}
          >
            {number.assignedToGroup}
          </Link>
        </td>
        <td>
          {number.canBeDeleted && (
            <React.Fragment>
              <ButtonToolbar>
                <Glyphicon
                  glyph="glyphicon glyphicon-remove"
                  onClick={() => this.setState({ showDelete: true })}
                />
              </ButtonToolbar>
              <DeleteModal
                rangeStart={number.rangeStart}
                show={showDelete}
                onClose={e => {
                  onReload && onReload(number.rangeStart);
                  this.setState({ showDelete: false });
                }}
                {...this.props}
              />
            </React.Fragment>
          )}
        </td>
      </tr>
    );
  }
}
