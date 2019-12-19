import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchPutUpdateGroupDetails } from "../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class RebootWindow extends Component {
  state = {};

  render() {
    const { show, onClose, data } = this.props;
    return (
      <Modal show={show} onHide={() => onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* <FormattedMessage
              id="confirm-delete"
              defaultMessage="Are you sure?"
            /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <FormattedMessage
              id="confirm-reboot-iad"
              defaultMessage={`To be effective, these changes require a reboot of the IAD`}
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.updateIad}>
            <FormattedMessage id="ok" defaultMessage="Ok" />
          </Button>
          <Button onClick={() => onClose()}>
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  updateIad = () => {
    const { data, onClose } = this.props;
    const dataForUpdate = {
      ...data,
      rebootRequest: {
        scheduled: false
      }
    };
    this.props
      .fetchPutUpdateGroupDetails(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        dataForUpdate
      )
      .then(res => res === "successful" && onClose());
  };
}

const mapDispatchToProps = { fetchPutUpdateGroupDetails };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(RebootWindow)
);
