import React, { Component } from "react";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

class Group extends Component {
  state = { showDelete: false };
  render() {
    const { team, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/configs/reconciliationteam/${team.name}`}
          >
            {team.name}
          </Link>
        </td>
        <td>{team.email}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            teamName={team.name}
            show={showDelete}
            onClose={e => {
              onReload && onReload();
              this.setState({ showDelete: false });
            }}
            {...this.props}
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(Group);
