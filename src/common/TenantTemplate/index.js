import React from "react";

import Well from "react-bootstrap/lib/Well";

import "./styles.css";

const Template = ({ name, description, onClick }) => {
  return (
    <Well className={"well-style"} onClick={onClick}>
      <p className={"name-style"}>{name}</p>
      <p>{description}</p>
    </Well>
  );
};

export default Template;
