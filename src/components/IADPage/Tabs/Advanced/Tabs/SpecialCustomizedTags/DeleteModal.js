import React, { useState } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Modal from "react-bootstrap/lib/Modal";
import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { FormattedMessage } from "react-intl";

import { fetchDeleteSpecialCustomTags } from "../../../../../../store/actions";

const DeleteModal = (props) => {
  const {
    show,
    onClose,
    tagName,
    match: {
      params: { tenantId, groupId, iadId },
    },
  } = props;
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const [allIADs, setAllIADs] = useState(false);

  const onDelete = () => {
    setDeleting(true);
    const data = {
      allIADs,
    };
    const callback = () => {
      setDeleting(false);
      onClose();
    };
    const errorCallback = () => {
      setDeleting(false);
    };
    dispatch(
      fetchDeleteSpecialCustomTags(
        tenantId,
        groupId,
        iadId,
        tagName,
        data,
        callback,
        errorCallback
      )
    );
  };

  return (
    <Modal show={show} backdrop={false} onHide={onClose}>
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
        <Row>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <FormattedMessage
                id="deleteOnAllIADs"
                defaultMessage="Delete on all IADs"
              />
            </div>
            <div className={"margin-right-1 width-100p"}>
              <Checkbox
                checked={allIADs}
                onChange={(e) => setAllIADs(e.target.checked)}
              />
            </div>
          </Col>
        </Row>
        <p>
          <FormattedMessage
            id="confirm-delete-warning"
            defaultMessage={`You are about to delete the special customized tag ${tagName}!`}
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onDelete} bsStyle="danger" disabled={deleting}>
          <FormattedMessage id="delete" defaultMessage="Delete" />
        </Button>
        <Button disabled={deleting} onClick={onClose}>
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(DeleteModal);
