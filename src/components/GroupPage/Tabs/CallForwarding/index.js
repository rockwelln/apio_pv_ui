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
import ForwardNumber from "./ForwardNumber";
import Loading from "../../../../common/Loading";

const CallForwarding = (props) => {
  const dispatch = useDispatch();

  const group = useSelector((state) => state.group);
  const forwardingNumbers = useSelector((state) => state.forwardingNumbers);
  const availableNumbers = useSelector((state) => state.availableNumbers);
  const availableRoutes = useSelector((state) => state.availableRoutes);

  const [isLoadingNumbersForwarding, setIsLoadingNumbersForwarding] =
    useState(false);
  const [isLoadingAvailableNumbers, setIsLoadingAvailableNumbers] =
    useState(false);
  const [stateForwardingNumbers, setStateForwardingNumbers] = useState([]);

  useEffect(() => {
    if (group.pbxType === "BRA") {
      setIsLoadingNumbersForwarding(true);
      setIsLoadingAvailableNumbers(true);
      dispatch(
        fetchGetNumbersForwarding(
          props.match.params.tenantId,
          props.match.params.groupId,
          () => setIsLoadingNumbersForwarding(false)
        )
      );
      dispatch(
        fetchGetAvailableNumbers(
          props.match.params.tenantId,
          props.match.params.groupId,
          () => setIsLoadingAvailableNumbers(false)
        )
      );
    }
  }, [props.location.hash]);

  useEffect(() => {
    setStateForwardingNumbers(forwardingNumbers);
  }, [forwardingNumbers]);

  const deleteForwardNumber = (index) => {
    const newForwardingNumbers = [...stateForwardingNumbers];
    newForwardingNumbers.splice(index, 1);
    setStateForwardingNumbers(newForwardingNumbers);
  };

  const handleUpdateForwardingNumbers = () => {
    setIsLoadingNumbersForwarding(true);
    dispatch(
      fetchPutUpdateNumbersForwarding(
        props.match.params.tenantId,
        props.match.params.groupId,
        { forwardingNumbers: stateForwardingNumbers },
        () => setIsLoadingNumbersForwarding(false)
      )
    );
  };

  const handleAddForwardingNumber = () => {
    const newForwardingNumbers = [...stateForwardingNumbers];
    newForwardingNumbers.push({ phoneNumber: "", frwdPort: "" });
    setStateForwardingNumbers(newForwardingNumbers);
  };

  const handleChangeForwardingNumber = (index, key, value) => {
    const newForwardingNumbers = [...stateForwardingNumbers];
    newForwardingNumbers[index][key] = value;
    setStateForwardingNumbers(newForwardingNumbers);
  };

  if (isLoadingNumbersForwarding || isLoadingAvailableNumbers) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="margin-top-1 flex flex-end-center">
        <Button
          bsStyle="primary"
          onClick={handleUpdateForwardingNumbers}
          disabled={stateForwardingNumbers.some(
            (el) => el.phoneNumber === "" || el.frwdPort === ""
          )}
        >
          Update Forwarding Numbers
        </Button>
      </div>
      <div className={"margin-top-1 flex"}>
        <div className={"flex-basis-33 margin-right-1"}>Forward Number</div>
        <div className={"flex-basis-33"}>Forward port</div>
      </div>
      {stateForwardingNumbers.map((el, index) => (
        <ForwardNumber
          forwardingNumber={el}
          index={index}
          key={index}
          availableNumbers={availableNumbers}
          forwardingNumbers={stateForwardingNumbers}
          ports={availableRoutes.configured.ports}
          deleteForwardNumber={deleteForwardNumber}
          handleChangeForwardingNumber={handleChangeForwardingNumber}
        />
      ))}
      <div className={"margin-top-1 flex justify-center width-66p"}>
        <Button
          bsStyle="primary"
          disabled={stateForwardingNumbers.length >= 50}
          onClick={handleAddForwardingNumber}
        >
          Add
        </Button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CallForwarding);
