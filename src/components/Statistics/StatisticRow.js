import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

const labels = {
  enterprisesCount: "Enterprises count:",
  groupsCount: "Groups count:",
  iadsCount: "IADs count:",
  iadsByTypeCount: "IADs by type count:",
  channelsCount: "Channels count:",
  licensed: "Licensed:",
  used: "Used:",
  channelsByTypeCount: "Channels by type count:",
  noIad: "No IAD:",
  iadAnomaliesCount: "IAD anomalies count:",
  timestamp: "Timestamp",
};

const StatisticRow = (props) => {
  return (
    <div className={"margin-left-1"}>
      {typeof props.statistics[props.objKey] === "object" ? (
        <>
          <Row className={"margin-left-1 margin-top-1 font-weight-bold"}>
            <Col md={2}>{labels[props.objKey] || props.objKey}</Col>
          </Row>
          {Object.keys(props.statistics[props.objKey]).map((el) => (
            <StatisticRow
              key={el}
              objKey={el}
              statistics={props.statistics[props.objKey]}
            />
          ))}
        </>
      ) : (
        <Row className={"margin-left-1 margin-top-1 word-break-all"}>
          <Col md={2}>{labels[props.objKey] || props.objKey}</Col>
          <Col md={8}>{props.statistics[props.objKey]}</Col>
        </Row>
      )}
    </div>
  );
};

export default withRouter(StatisticRow);
