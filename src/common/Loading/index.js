import React from "react";
import loading from "../../loading.gif";

const Loading = () => (
  <React.Fragment>
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 50%)"
      }}
    >
      <img src={loading} width="200" height="200" alt="please wait..." />
    </div>
  </React.Fragment>
);

export default Loading;
