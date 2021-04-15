import React, { Component } from "react";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

import { isAllowed, pages } from "../../../utils/user";

class Group extends Component {
  state = { showDelete: false };
  render() {
    const { group, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={group.groupId}>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${group.groupId}`}
          >
            {group.groupId}
          </Link>
        </td>
        <td>{group.groupTpid ? group.groupTpid : "-"}</td>
        <td>{group.groupName ? group.groupName : "-"}</td>
        <td>{group.productType ? group.productType : "-"}</td>
        <td>{group.accessType ? group.accessType : "-"}</td>
        <td>{group.virtual ? "Yes" : "No"}</td>
        <td>{group.numberOfChannels ? group.numberOfChannels : "-"}</td>
        <td>{group.networkIdentifier ? group.networkIdentifier : "-"}</td>
        {!(group.accessType === "COAX" || group.accessType === "VDSL") &&
          isAllowed(
            localStorage.getItem("userProfile"),
            pages.delete_group
          ) && (
            <td>
              <ButtonToolbar>
                <Glyphicon
                  glyph="glyphicon glyphicon-remove"
                  onClick={() => this.setState({ showDelete: true })}
                />
              </ButtonToolbar>
              <DeleteModal
                groupId={group.groupId}
                show={showDelete}
                onClose={(e) => {
                  onReload && onReload();
                  this.setState({ showDelete: false });
                }}
                {...this.props}
              />
            </td>
          )}
      </tr>
    );
  }
}

export default withRouter(Group);
