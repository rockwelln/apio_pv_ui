import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Modal from "react-bootstrap/lib/Modal";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";
import Panel from "react-bootstrap/lib/Panel";

import {
  fetchGetTenantById,
  fetchGetGroupsByTenantId,
  fetchGetTrunksGroupsByGroup
} from "../../../../store/actions";

import Loading from "../../../../common/Loading";

export class EditFrom extends Component {
  state = {
    isLoading: true,
    loadingTrunks: ""
  };
  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() =>
        this.props.tenant.type === "Enterprise"
          ? this.props
              .fetchGetGroupsByTenantId(
                this.props.match.params.tenantId,
                this.props.match.params.groupId
              )
              .then(() => this.setState({ isLoading: false }))
          : this.setState({ isLoading: false })
      );
  }
  render() {
    console.log(this.props.tenant, this.props.groups, this.state.trunksGroups);
    if (this.state.isLoading) {
      return (
        <Modal show={this.props.show}>
          <Loading />
        </Modal>
      );
    }
    if (this.props.tenant.type === "Enterprise") {
      return (
        <Modal show={this.props.show}>
          <Panel className={"margin-0"}>
            <Panel.Heading>
              <div className={"header"}>Edit Form</div>
            </Panel.Heading>
            <Panel.Body>
              <Row>
                <Col md={12}>Select group:</Col>
              </Row>
              <Row>
                <Col md={12} className={"flex-row"}>
                  <FormGroup>
                    {this.props.groups.map((group, i) => (
                      <Radio
                        key={i}
                        className={"margin-left-1"}
                        name="radioGroupSel"
                        value={group.groupId}
                        onChange={() => {
                          this.setState({ loadingTrunks: "Loading..." }, () =>
                            this.props
                              .fetchGetTrunksGroupsByGroup(
                                this.props.match.params.tenantId,
                                group.groupId
                              )
                              .then(() =>
                                this.setState({
                                  trunksGroups: this.props.trunksGroups.filter(
                                    trunk =>
                                      trunk.name !==
                                      this.props.match.params.trunkGroupName
                                  ),
                                  loadingTrunks: ""
                                })
                              )
                          );
                        }}
                      >
                        <div>{`${group.groupName} (${group.groupId})`}</div>
                      </Radio>
                    ))}
                  </FormGroup>
                </Col>
              </Row>
              {this.state.loadingTrunks ? (
                <Row className={"margin-top-2"}>
                  <Col md={12}>{this.state.loadingTrunks}</Col>
                </Row>
              ) : this.state.trunksGroups && this.state.trunksGroups.length ? (
                <React.Fragment>
                  <Row className={"margin-top-2"}>
                    <Col md={12}>Select trunk:</Col>
                  </Row>
                  <Row>
                    <Col md={12} className={"flex-row"}>
                      <FormGroup>
                        {this.state.trunksGroups.map((group, i) => (
                          <Radio
                            key={i}
                            className={"margin-left-1"}
                            name="radioTrunk"
                            value={group.name}
                          >
                            <div>{group.name}</div>
                          </Radio>
                        ))}
                      </FormGroup>
                    </Col>
                  </Row>
                </React.Fragment>
              ) : (
                <Row className={"margin-top-2"}>
                  <Col md={12}>No trunks group were found</Col>
                </Row>
              )}
            </Panel.Body>
          </Panel>
        </Modal>
      );
    } else {
      return <Modal show={this.props.show}>EditFrom</Modal>;
    }
  }
}

const mapStateToProps = state => ({
  tenant: state.tenant,
  groups: state.groups,
  trunksGroups: state.trunksGroups
});

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchGetGroupsByTenantId,
  fetchGetTrunksGroupsByGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditFrom)
);
