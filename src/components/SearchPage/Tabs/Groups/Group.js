import React, { Component } from "react";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

class Group extends Component {
  render() {
    const { group } = this.props;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${
              group.tenantId
            }/groups/${group.groupId}`}
          >
            {group.groupId}
          </Link>
        </td>
        <td>{group.groupName}</td>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${
              group.tenantId
            }`}
          >
            {group.tenantId}
          </Link>
        </td>
        <td>{group.userLimit}</td>
      </tr>
    );
  }
}

export default withRouter(Group);
