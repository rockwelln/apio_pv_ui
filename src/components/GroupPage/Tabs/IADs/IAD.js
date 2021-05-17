import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

import { fetchGetTimerForIAD } from "../../../../store/actions";

import { isAllowed, pages } from "../../../../utils/user";

class IAD extends Component {
  state = { showDelete: false, timers: [] };

  componentDidMount() {
    this.props.fetchGetTimerForIAD(this.props.iad.iadId).then((data) =>
      this.setState({
        timers: data.timers.filter((timer) => timer.status === "WAIT"),
      })
    );
  }

  render() {
    const { onReload, iad, group } = this.props;
    const { showDelete } = this.state;

    const showDeleteButton = !(
      group.accessType === "COAX" || group.accessType === "VDSL"
    );

    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/iad/${iad.iadId}`}
          >
            {iad.iadId}
          </Link>
        </td>
        <td>{iad.type}</td>
        <td>{iad.macAddress}</td>
        {this.state.timers.length ? (
          <td>
            {this.state.timers.map((timer) => (
              <p key={timer.id}>{timer.at}</p>
            ))}
          </td>
        ) : (
          <td>-</td>
        )}
        {isAllowed(localStorage.getItem("userProfile"), pages.delete_iad) &&
          showDeleteButton && (
            <td>
              <ButtonToolbar>
                <Glyphicon
                  glyph="glyphicon glyphicon-remove"
                  onClick={() => this.setState({ showDelete: true })}
                />
              </ButtonToolbar>
              <DeleteModal
                notifications={this.props.notifications}
                iadId={iad.iadId}
                tenantId={this.props.match.params.tenantId}
                groupId={this.props.match.params.groupId}
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

const mapStateToProps = (state) => ({
  iadTimer: state.iadTimer,
  group: state.group,
});

const mapDispatchToProps = {
  fetchGetTimerForIAD,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IAD));
