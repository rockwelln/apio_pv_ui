import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

//import DeleteModal from "./DeleteModal";

import { fetchGetConfig } from "../../store/actions";

import Loading from "../../common/Loading";

class Anomalies extends Component {
  state = {
    showDelete: false,
    isLoading: true,
    event: "",
    status: "",
    result: ""
  };

  setValues = () => {
    const event = this.props.config.reconciliation.anomaly.event.find(
      evnt => evnt.value === this.props.anomalies.anomaly_event
    );
    const status = this.props.config.reconciliation.anomaly.status.find(
      evnt => evnt.value === this.props.anomalies.anomaly_status
    );
    const result = this.props.config.reconciliation.anomaly.result.find(
      evnt => evnt.value === this.props.anomalies.result
    );
    this.setState({ event, status, result });
  };

  componentDidMount() {
    this.props.fetchGetConfig().then(() => {
      this.setState({ isLoading: false });
      this.setValues();
    });
  }

  render() {
    const { anomalies, onReload } = this.props;
    const { showDelete } = this.state;
    console.log(this.props.config);
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <tr
        onClick={() =>
          this.props.history.push(
            `/provisioning/${this.props.match.params.gwName}/reconciliations/${anomalies.hash_ref}`
          )
        }
        style={{ cursor: "pointer" }}
      >
        <td>{anomalies.enterprise_id}</td>
        <td>{anomalies.group_id}</td>
        <td>{anomalies.iad_id}</td>
        <td>
          {typeof this.state.event === "object" ? this.state.event.label : ""}
        </td>
        <td>
          {anomalies.creation_date
            ? new Date(anomalies.creation_date).toString()
            : ""}
        </td>
        <td>{anomalies.norm_data}</td>
        <td>{anomalies.apio_db_data}</td>
        <td>{anomalies.broadsoft_data}</td>
        <td>{anomalies.reconciliation_report}</td>
        <td>
          {typeof this.state.status === "object" ? this.state.status.label : ""}
        </td>
        <td>{anomalies.assigned_team}</td>
        <td>{anomalies.assigned_user}</td>
        <td>
          {anomalies.assigned_user_date
            ? new Date(anomalies.assigned_user_date).toString()
            : ""}
        </td>
        <td>
          {anomalies.last_update_date
            ? new Date(anomalies.last_update_date).toString()
            : ""}
        </td>
        <td>
          {typeof this.state.result === "object" ? this.state.result.label : ""}
        </td>
        <td>{anomalies.comments}</td>
        {/* <td>
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
        </td> */}
      </tr>
    );
  }
}

const mapStateToProps = state => ({ config: state.config });

const mapDispatchToProps = { fetchGetConfig };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Anomalies)
);
