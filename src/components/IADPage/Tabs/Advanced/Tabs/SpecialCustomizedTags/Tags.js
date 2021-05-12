import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { fetchPutUpdateIADCustomTag } from "../../../../../../store/actions";

import { isAllowed, pages } from "../../../../../../utils/user";

const SpecialCustomizedTagsTable = (props) => {
  const {
    tag,
    isEditAll,
    match: {
      params: { tenantId, groupId, iadId },
    },
    singleEdit,
    editValue,
    setAllIADs,
    handleDelete,
    rebootCallBack,
  } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (isUpdating) {
      return;
    }
    setIsUpdating(true);
    const data = {
      value: tag.value,
      allIADs: tag.allIADs,
    };
    const callback = () => {
      setIsUpdating(false);
      singleEdit(tag.name, false);
      rebootCallBack(tag.allIADs, iadId);
    };
    const errorCallback = () => {
      setIsUpdating(false);
    };
    dispatch(
      fetchPutUpdateIADCustomTag(
        tenantId,
        groupId,
        iadId,
        tag.name,
        data,
        callback,
        errorCallback
      )
    );
  };

  const handleCancel = (tagName) => {
    if (isUpdating) {
      return;
    }
    singleEdit(tagName, false);
  };

  return (
    <tr style={{ height: 51 }}>
      <td style={{ verticalAlign: "middle" }}>{tag.name}</td>
      {isEditAll || tag.isEdit ? (
        <td style={{ verticalAlign: "middle" }}>
          <FormControl
            type="text"
            placeholder={"Value"}
            value={tag.value}
            onChange={(e) => {
              if (e.target.value.length > 256) {
                return;
              }
              editValue(tag.name, e.target.value);
            }}
          />
        </td>
      ) : (
        <td style={{ verticalAlign: "middle" }}>{tag.value}</td>
      )}
      {isAllowed(
        localStorage.getItem("userProfile"),
        pages.edit_iad_advanced_customized_tags
      ) && (
        <>
          <td style={{ verticalAlign: "middle" }}>
            <Checkbox
              checked={tag.allIADs}
              disabled={!isEditAll && !tag.isEdit}
              onChange={(e) => setAllIADs(tag.name, e.target.checked)}
            />
          </td>
          {!isEditAll && tag.isEdit ? (
            <td style={{ verticalAlign: "middle" }}>
              <Glyphicon
                className={`margin-right-1 ${isUpdating ? "opacity-50" : ""}`}
                glyph="glyphicon glyphicon-ok"
                onClick={handleUpdate}
              />
              <Glyphicon
                className={isUpdating ? "opacity-50" : ""}
                glyph="glyphicon glyphicon-ban-circle"
                onClick={() => handleCancel(tag.name)}
              />
            </td>
          ) : (
            <td style={{ verticalAlign: "middle" }}>
              <Glyphicon
                glyph="glyphicon glyphicon-pencil"
                onClick={() => !isEditAll && singleEdit(tag.name, true)}
              />
            </td>
          )}
          <td style={{ verticalAlign: "middle" }}>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => handleDelete(tag.name)}
            />
          </td>
        </>
      )}
    </tr>
  );
};

export default withRouter(SpecialCustomizedTagsTable);
