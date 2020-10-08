import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchGetBWKSLicenses } from "../../store/actions";

import Loading from "../../common/Loading";

const BWKSLicenses = () => {
  const [isLoading, setIsLoading] = useState(false);

  const licenses = useSelector(state => state.bwksLicenses);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchGetBWKSLicenses()).then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className={"panel-heading"}>
        <div className={"header"}>{`BWKS Licenses`}</div>
      </div>
      <div className={"panel-body"}>
        <pre>{JSON.stringify(licenses, null, 2)}</pre>
      </div>
    </React.Fragment>
  );
};

export default BWKSLicenses;
