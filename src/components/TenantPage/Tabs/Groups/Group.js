import React, { Component } from "react";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

export default class Group extends Component {
  state = { showDelete: false };
  render() {
    const { group, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={group.groupId}>
        <td>
          <Link
            to={`/provisioning/broadsoft_xsp1_as1/tenants/${
              group.tenantId
            }/groups/${group.groupId}`}
          >
            {group.groupId}
          </Link>
        </td>
        <td>{group.groupName}</td>
        <td>{group.userLimit}</td>
        <td>/</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            tenantId={group.groupId}
            show={showDelete}
            onClose={e => {
              onReload && onReload(group.tenantId);
              this.setState({ showDelete: false });
            }}
            {...this.props}
          />
        </td>
      </tr>
    );
  }
}
