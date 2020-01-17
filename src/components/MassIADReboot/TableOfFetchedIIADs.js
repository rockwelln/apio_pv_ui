import React from "react";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";

import Checkbox from "react-bootstrap/lib/Checkbox";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { FormattedMessage } from "react-intl";

const TableOfIADs = props => {
  return (
    <tr>
      <td>
        <Checkbox
          checked={props.iad.checked}
          onChange={e =>
            props.handleSingleCheckboxClick(props.iad.iad, e.target.checked)
          }
        />
      </td>
      <td>{props.iad.iad}</td>
    </tr>
  );
};

export default withRouter(TableOfIADs);
