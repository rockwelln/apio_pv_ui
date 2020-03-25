import React, { useEffect, useState } from "react";

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
    value,
    onChange,
    onSave,
    infinity,
    isEditMaxBursting,
    onChangeInfinity,
    licenseTitle,
    isEditPacks,
    isEditTunkLicenses,
    allocated,
    isEditGroup,
    isEditUserLimit,
    tenantId,
    apiRequest,
    pack
  } = props;

  const [groupServiceMax, setGroupServiceMax] = useState(9999);
  const [groupServiceMin, setGroupServiceMin] = useState(0);

  console.log(pack);

  useEffect(() => {
    if (isEditPacks && isEditGroup) {
      setGroupServiceMin(allocated);
      console.log(value, pack.allocated.maximum, pack.currentlyAllocated);
      if (pack.allocated.unlimited) {
        console.log("if");
        return;
      } else {
        console.log("else");
        console.log(value, pack.allocated.maximum, pack.currentlyAllocated);
        const max = value + pack.allocated.maximum - pack.currentlyAllocated;
        console.log(max);
        setGroupServiceMax(max);
      }
    }
  }, [pack]);

  useEffect(() => {
    isEditPacks && isEditGroup && apiRequest(tenantId, licenseTitle);
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          {!isEditTunkLicenses && (
            <thead>
              <tr>
                <th width="50%" className={"licenses-th"} />
                <th className={"licenses-th text-right"}>
                  {!isEditMaxBursting &&
                    (isEditGroup ? (
                      <FormattedMessage id="in_use" defaultMessage="in use" />
                    ) : (
                      <FormattedMessage
                        id="allocated"
                        defaultMessage="allocated"
                      />
                    ))}
                </th>
                <th
                  className={`licenses-th ${
                    isEditPacks ? "text-center" : "text-right"
                  }`}
                >
                  {!isEditMaxBursting && (
                    <FormattedMessage id="limited" defaultMessage="limited" />
                  )}
                </th>
                {!isEditTunkLicenses && !isEditUserLimit && (
                  <th className={"text-center licenses-th"}>
                    {String.fromCharCode(INFINITY)}
                  </th>
                )}
              </tr>
            </thead>
          )}
          <tbody>
            <tr>
              <td className={"vertical-middle"}>{licenseTitle}</td>
              <td className={"text-right vertical-middle"}>
                {(isEditPacks || isEditUserLimit) && allocated}
              </td>
              <td className={`${isEditPacks ? "text-center" : "text-right"}`}>
                <FormControl
                  type="number"
                  min={groupServiceMin}
                  max={groupServiceMax}
                  className={"width-8 display-table-cell"}
                  disabled={infinity}
                  value={value || 0}
                  onChange={e => {
                    const value = e.target.value;
                    onChange(value);
                  }}
                />
              </td>
              {!isEditTunkLicenses && !isEditUserLimit && (
                <td className={"text-center"}>
                  <FormControl
                    className={"infinity-checkbox"}
                    type="checkbox"
                    checked={infinity}
                    onChange={e => onChangeInfinity(e.target.checked)}
                  />
                </td>
              )}
            </tr>
          </tbody>
        </Table>
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
