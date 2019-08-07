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
    show: false
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
          isLoading: false
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
              {trunkGroupMode.map((mode, i) => (
                <Radio
                  key={i}
                  className={"margin-left-1"}
                  name="radioGroup"
                  value={mode.value}
                  checked={this.state.mode === mode.value}
                  onChange={e => this.setState({ mode: e.target.value })}
                >
                  <div>{mode.name}</div>
                </Radio>
              ))}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={"flex align-items-center"}>
              <div className={"margin-right-1"}>Destination:</div>
              <FormControl
                type="text"
                value={this.state.destination}
                disabled={this.state.mode !== "Forward"}
                onChange={e => this.setState({ destination: e.target.value })}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-2"}>
          <Col md={12}>
            <div className={"flex align-items-center"}>
              <div className={"margin-right-1"}>Backup trunk:</div>
              {this.state.trunk && (
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
              )}
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-2"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-left">
                <Button
                  className={"btn-primary"}
                  onClick={() => this.setState({ show: true })}
                >
                  <Glyphicon glyph="glyphicon glyphicon-pencil" />
                  &nbsp; Edit
                </Button>
              </div>
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
  trunkGroupBackup: state.trunkGroupBackup
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
