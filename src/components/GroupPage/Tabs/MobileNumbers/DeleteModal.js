import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchDeleteMobileNumberFromGroup } from "../../../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

import { getRange } from "../../../expandRangeOfPhoneNumber";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(number) {
    const { onClose } = this.props;
    this.setState({ deleting: true });

    const allNumbers = [];
    allNumbers.push(this.props.number.phoneNumber);

    const data = {
      phoneNumbers: allNumbers.map(number => ({ phoneNumber: number }))
    };

    this.props
      .fetchDeleteMobileNumberFromGroup(
        this.props.tenantId,
        this.props.groupId,
        data
      )
      .then(() => {
        this.setState({ deleting: false });
        onClose && onClose(true);
      });
  }

  render() {
    const { show, onClose } = this.props;
    const { deleting } = this.state;
    if (this.props.number) {
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
                defaultMessage={`You are about to delete the phone ${this.props.number.phoneNumber}!`}
              />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.onDelete(this.props.number)}
              bsStyle="danger"
            >
              <FormattedMessage id="delete" defaultMessage="Delete" />
            </Button>
            <Button
              onClick={() => onClose && onClose(false)}
              disabled={deleting}
            >
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  }
}

const mapDispatchToProps = {
  fetchDeleteMobileNumberFromGroup
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteModal);
