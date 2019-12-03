import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchDeleteEnterpriseTrunk } from "../../../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { onClose, trunk } = this.props;
    this.setState({ deleting: true });
    this.props
      .fetchDeleteEnterpriseTrunk(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        trunk.name
      )
      .then(() => {
        this.setState({ deleting: false });
        onClose && onClose(true);
      });
  }

  render() {
    const { tenantId, groupId, trunk, show, onClose } = this.props;
    const { deleting } = this.state;

    return (
      <Modal
        show={show}
        onHide={() => onClose && onClose(false)}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              id="confirm-delete"
              defaultMessage="Are you sure?"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleting && (
            <Alert bsStyle="info">
              <FormattedMessage id="deleting" defaultMessage="Deleting..." />
            </Alert>
          )}
          <p>
            <FormattedMessage
              id="confirm-delete-warning"
              defaultMessage={`You are about to delete the enterprise trunk ${trunk.name}!`}
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.onDelete()} bsStyle="danger">
            <FormattedMessage id="delete" defaultMessage="Delete" />
          </Button>
          <Button onClick={() => onClose && onClose(false)} disabled={deleting}>
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  fetchDeleteEnterpriseTrunk
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(DeleteModal)
);
