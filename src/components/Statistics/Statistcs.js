import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { fetchGetStatistics } from "../../store/actions";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Grid from "react-bootstrap/lib/Grid";

const Statistics = (props) => {
  const statistics = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStatistics());
  }, []);

  console.log(statistics);

  return (
    <Grid>
      {Object.keys(statistics).map((el) =>
        typeof statistics[el] === "object" ? (
          <Row key={el}></Row>
        ) : (
          <Row key={el}>
            <Col md={2}>{el}</Col>
            <Col md={8}>{statistics[el]}</Col>
          </Row>
        )
      )}
    </Grid>
  );
};

export default withRouter(Statistics);
