import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { fetchGetTrunkGroupByTenant } from "../../../../store/actions";

const Trunking = props => {
  const [trunkGroups, setTrunkGroups] = useState([]);
  const [countPerPage, setCountPerPage] = useState(25);
  const [paginationTrunksGroups, setPaginationTrunksGroups] = useState([]);
  const [countPages, setCountPages] = useState(null);
  const [page, setPage] = useState(0);

  const propsTrunkGroup = useSelector(state => state.trunkGroupsByTenant);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTrunkGroupByTenant(props.match.params.tenantId));
  }, []);

  useEffect(() => {
    setTrunkGroups(propsTrunkGroup);
  }, [propsTrunkGroup]);

  useEffect(() => {
    pagination();
  }, [trunkGroups]);

  const pagination = () => {
    const calculatedCountPages = Math.ceil(trunkGroups.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < calculatedCountPages; i++) {
      if (i === 0) {
        const item = trunkGroups.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = trunkGroups.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }
    setPaginationTrunksGroups(paginationItems);
    setCountPages(calculatedCountPages);
    setPage(page);
  };

  return <React.Fragment>Trunking in dev</React.Fragment>;
};

export default withRouter(Trunking);
