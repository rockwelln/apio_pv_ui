import React, { useState } from "react";

import Modal from "react-bootstrap/lib/Modal";
import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { FormattedMessage } from "react-intl";

const INFINITY = 8734;

const SingleEdit = props => {
  const {
    title,
    show,
    onClose,
    isEditTrunkLicenses,
    value,
    onChange,
    onSave,
    infinity,
    isEditMaxBursting,
    onChangeInfinity
  } = props;
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isEditTrunkLicenses && (
          <Table>
            <tbody>
              <tr>
                <td>
                  <FormattedMessage
                    id="trunking_licenses"
                    defaultMessage={`Trunking licenses:`}
                  />
                </td>
                <td className={"text-right"}>
                  <FormControl
                    type="number"
                    className={"width-8 display-table-cell"}
                    value={value}
                    onChange={e => onChange(e)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
        {isEditMaxBursting && (
          <Table>
            <thead>
              <tr>
                <th />
                <th />
                <th className={"text-center"}>
                  {String.fromCharCode(INFINITY)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormattedMessage
                    id="max_bursting"
                    defaultMessage={`Max bursting:`}
                  />
                </td>
                <td className={"text-right"}>
                  <FormControl
                    type="number"
                    className={"width-8 display-table-cell"}
                    value={value}
                    disabled={infinity}
                    onChange={e => onChange(e)}
                  />
                </td>
                <td className={"text-center"}>
                  <Checkbox
                    value={infinity}
                    onChange={() => onChangeInfinity()}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle="danger"
          onClick={() => onClose()}
          className={"width-8 margin-right-2"}
        >
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
        <Button className={"width-8 btn-success"} onClick={() => onSave()}>
          <FormattedMessage id="save" defaultMessage="Save" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SingleEdit;
