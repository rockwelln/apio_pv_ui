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
  const [isLoadingNumbersForwarding, setIsLoadingNumbersForwarding] =
    useState(false);
  const [isLoadingAvailableNumbers, setIsLoadingAvailableNumbers] =
    useState(false);

  console.log(props);

  const group = useSelector((state) => state.group);
  const forwardingNumbers = useSelector((state) => state.forwardingNumbers);
  const availableNumbers = useSelector((state) => state.availableNumbers);
  const availableRoutes = useSelector((state) => state.availableRoutes);

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

  if (isLoadingNumbersForwarding || isLoadingAvailableNumbers) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className={"margin-top-1 flex"}>
        <div className={"flex-basis-33 margin-right-1"}>Forward Number</div>
        <div className={"flex-basis-33"}>Forward port</div>
      </div>
      {forwardingNumbers.map((el) => (
        <ForwardNumber
          forwardingNumber={el}
          key={el.phoneNumber}
          availableNumbers={availableNumbers}
          forwardingNumbers={forwardingNumbers}
          ports={availableRoutes.configured.ports}
        />
      ))}
    </React.Fragment>
  );
};

export default withRouter(CallForwarding);
