import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchDeletePhoneFromGroup } from "../../../../store/actions";

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

  onDelete(rangeStart) {
    const { onClose } = this.props;
    this.setState({ deleting: true });
    const allNumbers = [];

    if (this.props.number.rangeEnd) {
      const expandedRange = getRange(
        this.props.number.rangeStart,
        this.props.number.rangeEnd
      );
      allNumbers.push(...expandedRange);
    } else allNumbers.push(this.props.number.rangeStart);

    const data = {
      numbers: allNumbers.map(number => ({ phoneNumber: number }))
    };

    this.props
      .fetchDeletePhoneFromGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        data
      )
      .then(() => {
        this.setState({ deleting: false });
        onClose && onClose(true);
      });
  }

  render() {
    const { rangeStart, show, onClose } = this.props;
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
              defaultMessage={
                rangeStart.length
                  ? `You are about to delete the phone ${rangeStart}!`
                  : "Select phone numbers first"
              }
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.onDelete(rangeStart)}
            bsStyle="danger"
            disabled={rangeStart.length === 0}
          >
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
  fetchDeletePhoneFromGroup
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(DeleteModal)
);
