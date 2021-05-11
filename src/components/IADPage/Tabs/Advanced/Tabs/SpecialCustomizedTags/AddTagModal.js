import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Checkbox from "react-bootstrap/lib/Checkbox";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { FormattedMessage } from "react-intl";

import { fetchPostAddIADSpecialCustomTags } from "../../../../../../store/actions";

import { isAllowed, pages } from "../../../../../../utils/user";

const addTagModal = (props) => {
  const {
    isOpen,
    handleClose,
    match: {
      params: { tenantId, groupId, iadId },
    },
  } = props;

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [allIADs, setAllIADs] = useState(false);
  const [creating, setCreating] = useState(false);
  const [buttonName, setButtonName] = useState("Create");
  const dispatch = useDispatch();

  const startName = "%custom_";
  const endName = "%";

  const addSpecialCustomTag = () => {
    setCreating(true);
    setButtonName("Creating...");
    const callBack = () => {
      setCreating(false);
      setButtonName("Create");
      handleClose();
    };
    const data = {
      name: startName + name + endName,
      value,
      allIADs,
    };
    dispatch(
      fetchPostAddIADSpecialCustomTags(tenantId, groupId, iadId, data, callBack)
    );
  };

  return (
    <Modal show={isOpen} onHide={handleClose} backdrop={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage
            id="add-custom-tag"
            defaultMessage="Add special custom tag"
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <FormattedMessage id="name" defaultMessage="Name" />
            </div>
            <div className={"margin-right-1 width-100p"}>
              <InputGroup>
                <InputGroup.Addon>{startName}</InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.includes(" ")) {
                      return;
                    }
                    setName(e.target.value);
                  }}
                />
                <InputGroup.Addon>{endName}</InputGroup.Addon>
              </InputGroup>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <FormattedMessage id="value" defaultMessage="Value" />
            </div>
            <div className={"margin-right-1 width-100p"}>
              <FormControl
                type="text"
                placeholder={"Value"}
                value={value}
                onChange={(e) => {
                  if (e.target.value.length > 256) {
                    return;
                  }
                  setValue(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <FormattedMessage
                id="addOnAllIADs"
                defaultMessage="Add on all IADs"
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
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={addSpecialCustomTag}
          bsStyle="primary"
          disabled={creating}
        >
          <FormattedMessage id="create" defaultMessage={buttonName} />
        </Button>
        <Button onClick={handleClose} disabled={creating}>
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(addTagModal);
