import React, { Component } from "react";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { Link } from "react-router-dom";

import DeleteModal from "./DeleteModal";

export default class Group extends Component {
  state = { showDelete: false };
  render() {
    const { user, onReload, tenantId, groupId, index } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={user.userId}>
        <td>
          <Checkbox
            checked={user.userChecked}
            className={"table-checkbox"}
            onChange={() => {
              this.props.handleSingleCheckboxClick(index);
            }}
          />
        </td>
        <td>
          <Link
            to={`/provisioning/broadsoft_xsp1_as1/tenants/${tenantId}/groups/${groupId}/users/${
              user.userId
            }`}
          >
            {user.userId}
          </Link>
        </td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.extension}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.type}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            userId={user.userId}
            show={showDelete}
            onClose={e => {
              onReload && onReload(tenantId, groupId);
              this.setState({ showDelete: false });
            }}
            {...this.props}
          />
        </td>
      </tr>
    );
  }
}
