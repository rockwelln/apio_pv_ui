import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

//import DeleteModal from "./DeleteModal";

import { isAllowed, pages } from "../../../../../../utils/user";

const SpecialCustomizedTagsTable = (props) => {
  const { tag } = props;
  const [entrerpriseName, setEntrerpriseName] = useState("");
  const [tinaId, setTinaId] = useState("");
  const [buttonName, setButtonName] = useState("Create");
  const createdTenant = useSelector((state) => state.createdTenant);
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{tag.name}</td>
      <td>{tag.value}</td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default withRouter(SpecialCustomizedTagsTable);
