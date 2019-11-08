import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Modal from "react-bootstrap/lib/Modal";

import { fetchGetDevice } from "../../store/actions";

export class DevicePage extends Component {
  componentDidMount() {
    this.props.fetchGetDevice(
      this.props.match.params.tenantId,
      this.props.match.params.groupId,
      this.props.deviceName
    );
  }
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.deviceName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
          ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { fetchGetDevice };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DevicePage)
);
