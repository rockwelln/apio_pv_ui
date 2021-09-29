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
  fetchGetAvailableNumbers,
} from "../../../../store/actions";
import { removeEmpty } from "../../../remuveEmptyInObject";
import { FormattedMessage } from "react-intl";

const ForwardNumber = (props) => {
  const { forwardNumber } = props;

  return (
    <div className={"margin-top-1"}>
      <div className={"margin-top-1 flex"}>
        <FormControl
          className={"flex-basis-33 margin-right-1"}
          value={forwardNumber.number}
          componentClass="select"
        >
          <option value={forwardNumber.phoneNumber}>
            {forwardNumber.phoneNumber}
          </option>
          <option value={forwardNumber.phoneNumber}>
            {forwardNumber.phoneNumber + 1}
          </option>
        </FormControl>
        <FormControl className={"flex-basis-33"} componentClass="select">
          <option value={forwardNumber.frwdPort}>
            {forwardNumber.frwdPort}
          </option>
          <option value={forwardNumber.frwdPort + 1}>
            {forwardNumber.frwdPort + 1}
          </option>
        </FormControl>
      </div>
    </div>
  );
};

export default withRouter(ForwardNumber);
