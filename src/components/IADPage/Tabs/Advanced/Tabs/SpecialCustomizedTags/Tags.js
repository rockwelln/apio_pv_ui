import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";

import { fetchPutUpdateIADCustomTag } from "../../../../../../store/actions";
//import DeleteModal from "./DeleteModal";

import { isAllowed, pages } from "../../../../../../utils/user";

const SpecialCustomizedTagsTable = (props) => {
  const {
    tag,
    match: {
      params: { tenantId, groupId, iadId },
    },
  } = props;
  const [tagValue, setTagValue] = useState(tag.value);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const createdTenant = useSelector((state) => state.createdTenant);
  const dispatch = useDispatch();

  const handleCancelEdit = () => {
    if (isUpdating) {
      return;
    }
    setTagValue(tag.value);
    setIsEdit(false);
  };

  const handleUpdate = () => {
    if (isUpdating) {
      return;
    }
    setIsUpdating(true);
    const data = {
      value: tagValue,
    };
    const callback = () => {
      setIsEdit(false);
      setIsUpdating(false);
    };
    dispatch(
      fetchPutUpdateIADCustomTag(
        tenantId,
        groupId,
        iadId,
        tag.name,
        data,
        callback
      )
    );
  };

  return (
    <tr style={{ height: 51 }}>
      <td style={{ verticalAlign: "middle" }}>{tag.name}</td>
      {isEdit ? (
        <td style={{ verticalAlign: "middle" }}>
          <FormControl
            type="text"
            placeholder={"Value"}
            value={tagValue}
            onChange={(e) => {
              if (e.target.value.length > 256) {
                return;
              }
              setTagValue(e.target.value);
            }}
          />
        </td>
      ) : (
        <td style={{ verticalAlign: "middle" }}>{tagValue}</td>
      )}
      {isEdit ? (
        <td style={{ verticalAlign: "middle" }}>
          <Glyphicon
            className={"margin-right-1"}
            glyph="glyphicon glyphicon-ok"
            onClick={handleUpdate}
          />
          <Glyphicon
            glyph="glyphicon glyphicon-ban-circle"
            onClick={handleCancelEdit}
          />
        </td>
      ) : (
        <td style={{ verticalAlign: "middle" }}>
          <Glyphicon
            glyph="glyphicon glyphicon-pencil"
            onClick={() => setIsEdit(true)}
          />
        </td>
      )}
      <td style={{ verticalAlign: "middle" }}>
        <Glyphicon glyph="glyphicon glyphicon-remove" />
      </td>
    </tr>
  );
};

export default withRouter(SpecialCustomizedTagsTable);
