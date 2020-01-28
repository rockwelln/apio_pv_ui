import React, { Component } from "react";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

import DeleteModal from "./DeleteModal";

import "./styles.css";

import { isAllowed, pages } from "../../../../utils/user";

export default class PhoneNumber extends Component {
  state = { showDelete: false };

  render() {
    const { number, onReload, index } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={number.groupId}>
        <td>
          <Checkbox
            checked={number.phoneChecked}
            className={"table-checkbox"}
            onChange={() => {
              this.props.handleSingleCheckboxClick(index);
            }}
          />
        </td>
        <React.Fragment>
          <td>
            <Checkbox
              checked={number.active}
              className={"table-checkbox"}
              onChange={() => {
                this.props.handleSingleCheckboxClickActive(index);
              }}
            />
          </td>
          <td>
            <Checkbox
              checked={number.preActive}
              className={"table-checkbox"}
              onChange={() => {
                this.props.handleSingleCheckboxClickPreActive(index);
              }}
            />
          </td>
        </React.Fragment>
        <td>{number.rangeStart}</td>
        <td>{number.rangeEnd}</td>
        <td>{number.main_number ? "Yes" : "No"}</td>
        <td>{number.maintenance_number ? "Yes" : "No"}</td>
        {isAllowed(
          localStorage.getItem("userProfile"),
          pages.delete_access
        ) && (
          <td>
            <React.Fragment>
              <ButtonToolbar>
                <Glyphicon
                  glyph="glyphicon glyphicon-remove"
                  onClick={() => this.setState({ showDelete: true })}
                />
              </ButtonToolbar>
              <DeleteModal
                number={number}
                show={showDelete}
                tenantId={this.props.tenantId}
                onClose={e => {
                  onReload && onReload(number.rangeStart);
                  this.setState({ showDelete: false });
                }}
                {...this.props}
              />
            </React.Fragment>
          </td>
        )}
      </tr>
    );
  }
}
