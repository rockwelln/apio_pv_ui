import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";
import FormControl from "react-bootstrap/lib/FormControl";
import Well from "react-bootstrap/lib/Well";

import { trunkGroupMode } from "../../../../constants";
import { fetchGetBackupByTrunkGroup } from "../../../../store/actions";
import Loading from "../../../../common/Loading";
import EditFrom from "./EditFrom";

export class Backup extends Component {
  state = {
    isLoading: true,
    mode: null,
    destination: null,
    trunk: {},
    show: false,
    invitationTimeout: null
  };

  componentDidMount() {
    this.props
      .fetchGetBackupByTrunkGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.trunkGroupName
      )
      .then(() =>
        this.setState({
          mode: this.props.trunkGroupBackup.mode,
          destination: this.props.trunkGroupBackup.destination,
          trunk: this.props.trunkGroupBackup.trunk,
          isLoading: false,
          invitationTimeout: this.props.trunkGroup.invitationTimeout
        })
      );
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col md={12}>Mode:</Col>
        </Row>
        <Row>
          <Col md={12} className={"flex-row"}>
            <FormGroup>
              <Radio
                className={"margin-left-1 width-12"}
                name="radioGroup"
                checked={this.state.mode === ""}
                onChange={() => this.setState({ mode: "" })}
              >
                <div>Not active</div>
              </Radio>
              <div className={"flex align-items-center"}>
                <div className={"width-12"}>
                  <Radio
                    className={"margin-left-1"}
                    name="radioGroup"
                    checked={this.state.mode === "Forward"}
                    onChange={() => this.setState({ mode: "Forward" })}
                  >
                    <div>Forward</div>
                  </Radio>
                </div>
                <div className={"flex flex-1"}>
                  <FormControl
                    type="text"
                    value={this.state.destination}
                    disabled={this.state.mode !== "Forward"}
                    onChange={e =>
                      this.setState({ destination: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={"flex align-items-center"}>
                <div className={"width-12"}>
                  <Radio
                    className={"margin-left-1"}
                    name="radioGroup"
                    checked={this.state.mode === "Reroute"}
                    onChange={() => this.setState({ mode: "Reroute" })}
                  >
                    <div>Reroute</div>
                  </Radio>
                </div>
                {this.state.trunk && (
                  <Well className={"margin-0 disabled-input-well"}>
                    <Link
                      to={`/provisioning/${
                        this.props.match.params.gwName
                      }/tenants/${this.state.trunk.tenantId}/groups/${
                        this.state.trunk.groupId
                      }/trunkgroup/${this.state.trunk.name}`}
                    >
                      <div>{`${this.state.trunk.tenantId}/${
                        this.state.trunk.groupId
                      }/${this.state.trunk.name}`}</div>
                    </Link>
                  </Well>
                )}
                {this.state.mode === "Reroute" && (
                  <Button
                    className={"btn-primary margin-left-1"}
                    onClick={() => this.setState({ show: true })}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-pencil" />
                    &nbsp; Edit
                  </Button>
                )}
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex"}>
              Nb of seconds before detination timeout
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.invitationTimeout}
                onChange={e => {
                  this.setState({
                    invitationTimeout: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-2"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button className={"btn-primary"}>&nbsp; Update</Button>
              </div>
            </div>
          </Col>
        </Row>

        {this.state.show && (
          <EditFrom
            show={this.state.show}
            onClose={e => {
              this.setState({ show: false });
            }}
            onSave={this.changeGroups}
          />
        )}
      </React.Fragment>
    );
  }

  changeGroups = (groupId, name) => {
    this.setState({
      show: false,
      trunk: {
        ...this.state.trunk,
        groupId,
        name
      }
    });
  };
}

const mapStateToProps = state => ({
  trunkGroupBackup: state.trunkGroupBackup,
  trunkGroup: state.trunkGroup
});

const mapDispatchToProps = {
  fetchGetBackupByTrunkGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Backup)
);
