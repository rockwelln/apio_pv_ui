import React from "react";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Col from "react-bootstrap/lib/Col";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";

import Checkbox from "react-bootstrap/lib/Checkbox";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { FormattedMessage } from "react-intl";

const TableOfIADs = props => {
  return (
    <tr>
      <td>{props.iad}</td>
      <td>
        <ButtonToolbar onClick={() => props.removeSingleIAD(props.iad)}>
          <Glyphicon glyph="glyphicon glyphicon-remove" />
        </ButtonToolbar>
      </td>
    </tr>
  );
};

export default withRouter(TableOfIADs);
