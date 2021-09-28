import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import {
  fetchGetNumbersForwarding,
  fetchPutUpdateNumbersForwarding,
} from "../../../../store/actions";
import { removeEmpty } from "../../../remuveEmptyInObject";
import { FormattedMessage } from "react-intl";

const CallForwarding = (props) => {
  const dispatch = useDispatch();

  const group = useSelector((state) => state.group);

  useEffect(() => {
    group.pbxType === "BRA" &&
      dispatch(
        fetchGetNumbersForwarding(
          props.match.params.tenantId,
          props.match.params.groupId
        )
      );
    // dispatch(
    //   fetchPutUpdateNumbersForwarding(
    //     props.match.params.tenantId,
    //     props.match.params.groupId,
    //     [{ phoneNumber: "+3250000200", frwdPort: 1 }]
    //   )
    // );
  }, []);

  return <React.Fragment>CallForwarding</React.Fragment>;
};

export default withRouter(CallForwarding);
