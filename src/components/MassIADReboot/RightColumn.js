import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Table from "react-bootstrap/lib/Table";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

const RightColumn = () => {
  const [IADs, setIADs] = useState([]);
  const propsTransferedIADs = useSelector(state => state.transferedIADs);

  useEffect(() => {
    const newIADs = [...IADs];
    for (let i = 0; i < propsTransferedIADs.length; i++) {
      if (!newIADs.includes(propsTransferedIADs[i])) {
        newIADs.push(propsTransferedIADs[i]);
      }
    }
    setIADs(newIADs);
  }, [propsTransferedIADs.join()]);

  console.log(IADs, propsTransferedIADs);
  return <React.Fragment>RightColumn</React.Fragment>;
};

export default withRouter(RightColumn);
