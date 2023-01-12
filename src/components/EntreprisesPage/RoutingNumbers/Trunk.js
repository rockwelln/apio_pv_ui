import React, { Component } from "react";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

class Trunk extends Component {
  render() {
    const { trunk } = this.props;
    const style = { backgroundColor: trunk.color };
    return (
      <tr style={style}>
        <td>
          {this.props.groups.includes(trunk.groupId) ? (
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${trunk.groupId}/enterprisetrunk/${trunk.entTrunk}`}
          >
            {trunk.entTrunk}
          </Link>
          ) : trunk.entTrunk}
        </td>
        <td>{trunk.groupId}</td>
        <td>{trunk.groupName}</td>
        <td>{trunk.iad}</td>
      </tr>
    );
  }
}

export default withRouter(Trunk);
