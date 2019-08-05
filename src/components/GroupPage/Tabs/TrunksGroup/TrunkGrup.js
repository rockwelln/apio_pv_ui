import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

//import DeleteModal from "./DeleteModal";

class TrunkGrup extends Component {
  state = { showDelete: false };
  render() {
    const { trunkGrup, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${
              this.props.match.params.tenantId
            }/groups/${this.props.match.params.groupId}/trunkgroup/${
              trunkGrup.name
            }`}
          >
            {trunkGrup.name}
          </Link>
        </td>
        <td>{trunkGrup.groupId}</td>
        <td>{trunkGrup.deviceName}</td>
        <td>{trunkGrup.deviceLevel}</td>
        <td>{trunkGrup.department}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          {/* <DeleteModal
            notifications={this.props.notifications}
            adminId={admin.userId}
            tenantId={this.props.tenantId}
            groupId={this.props.groupId}
            show={showDelete}
            onClose={e => {
              onReload && onReload();
              this.setState({ showDelete: false });
            }}
            {...this.props}
          /> */}
        </td>
      </tr>
    );
  }
}

export default withRouter(TrunkGrup);
