import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { fetchGetStatistics } from "../../store/actions";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Grid from "react-bootstrap/lib/Grid";

import StatisticRow from "./StatisticRow";
import Loading from "../../common/Loading";

const Statistics = (props) => {
  const statistics = useSelector((state) => state.statistics);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStatistics(setIsLoadingStatistics));
  }, []);

  if (isLoadingStatistics) {
    return <Loading />;
  }

  return (
    <Grid className={"padding-1"}>
      {Object.keys(statistics).map((el) => (
        <StatisticRow key={el} objKey={el} statistics={statistics} />
      ))}
    </Grid>
  );
};

export default withRouter(Statistics);
