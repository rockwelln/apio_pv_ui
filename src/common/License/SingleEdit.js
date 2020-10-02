import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/lib/Modal";
import Table from "react-bootstrap/lib/Table";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";

import { FormattedMessage } from "react-intl";

import { get } from "../../components/get";

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

  const [groupServiceMax, setGroupServiceMax] = useState();
  const [groupServiceMin, setGroupServiceMin] = useState(
    isNaN(allocated) ? 0 : allocated
  );

  useEffect(() => {
    if (isEditPacks && isEditGroup) {
      setGroupServiceMin(allocated);
      if (get(pack, "allocated.unlimited") && pack.allocated.unlimited) {
        return;
      } else if (get(pack, "allocated.unlimited")) {
        const max = value + pack.allocated.maximum - pack.currentlyAllocated;
        setGroupServiceMax(isNaN(max) ? undefined : max);
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
                  pattern="\d [0-9]"
                  className={"width-8 display-table-cell"}
                  disabled={infinity}
                  defaultValue={value}
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
