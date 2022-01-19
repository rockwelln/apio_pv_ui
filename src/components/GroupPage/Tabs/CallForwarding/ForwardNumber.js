import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";

import {
  fetchGetNumbersForwarding,
  fetchPutUpdateNumbersForwarding,
  fetchGetAvailableNumbers,
} from "../../../../store/actions";
import { removeEmpty } from "../../../remuveEmptyInObject";
import { FormattedMessage } from "react-intl";

const ForwardNumber = (props) => {
  const {
    forwardingNumber,
    availableNumbers,
    forwardingNumbers,
    ports,
    trunkGroups,
    index,
    deleteForwardNumber,
    handleChangeForwardingNumber,
  } = props;

  return (
    <div className={"margin-top-1"}>
      <div className={"margin-top-1 flex"}>
        <FormControl
          className={"flex-basis-33 margin-right-1"}
          value={forwardingNumber.phoneNumber}
          onChange={(e) =>
            handleChangeForwardingNumber(index, "phoneNumber", e.target.value)
          }
          componentClass="select"
        >
          {forwardingNumber.phoneNumber === "" && (
            <option value={""} disabled>
              Select Forward Number
            </option>
          )}
          {availableNumbers.map((number) => (
            <option
              key={number}
              value={number}
              disabled={forwardingNumbers.some(
                (el) => el.phoneNumber === number
              )}
            >
              {number}
            </option>
          ))}
        </FormControl>
        <FormControl
          className={"flex-basis-33 margin-right-1"}
          componentClass="select"
          value={forwardingNumber.frwdPort}
          onChange={(e) =>
            handleChangeForwardingNumber(index, "frwdPort", +e.target.value)
          }
        >
          {forwardingNumber.frwdPort === "" && (
            <option value={""} disabled>
              Select Forward Port
            </option>
          )}
          {ports.filter((port) => {if (trunkGroups[ports.indexOf(port)] === "FORWARDING") return port;}).map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </FormControl>
        <ButtonToolbar className={"flex-basis-33 flex align-items-center"}>
          <Glyphicon
            glyph="glyphicon glyphicon-remove"
            onClick={() => deleteForwardNumber(index)}
          />
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default withRouter(ForwardNumber);
