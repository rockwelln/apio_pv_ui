import React, { Component } from "react";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";

import DeleteModal from "./DeleteModal";

import "./styles.css";

import { isAllowed, pages } from "../../../../utils/user";

export default class PhoneNumber extends Component {
  state = { showDelete: false, showRange: false };

  render() {
    const { number, onReload, index, style } = this.props;
    const { showDelete, showRange } = this.state;
    return (
      <React.Fragment>
        <tr key={number.groupId} style={style}>
          <td>
            <Checkbox
              checked={number.phoneChecked}
              className={"table-checkbox"}
              onChange={() => {
                this.props.handleSingleCheckboxClick(
                  number.phoneNumber,
                  number.inRange
                );
              }}
              disabled={
                !isAllowed(
                  localStorage.getItem("userProfile"),
                  pages.group_numbers_other_actions
                )
              }
            />
          </td>
          <React.Fragment>
            <td>
              <Checkbox
                checked={number.active}
                className={"table-checkbox"}
                onChange={() => {
                  this.props.handleSingleCheckboxClickActive(
                    number.phoneNumber,
                    number.inRange
                  );
                }}
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.group_numbers_other_actions
                  )
                }
              />
            </td>
            <td>
              <Checkbox
                checked={number.preActive}
                className={"table-checkbox"}
                onChange={() => {
                  this.props.handleSingleCheckboxClickPreActive(
                    number.phoneNumber,
                    number.inRange
                  );
                }}
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.group_numbers_other_actions
                  )
                }
              />
            </td>
          </React.Fragment>
          <td>{number.rangeStart}</td>
          <td>{number.rangeEnd}</td>
          {number.rangeEnd ? (
            <td>
              {showRange ? (
                <Glyphicon
                  glyph="glyphicon glyphicon-triangle-top"
                  onClick={() => this.setState({ showRange: false })}
                />
              ) : (
                <Glyphicon
                  glyph="glyphicon glyphicon-triangle-bottom"
                  onClick={() => this.setState({ showRange: true })}
                />
              )}
            </td>
          ) : (
            <td />
          )}
          <td>
            <FormControl
              type="text"
              value={number.zipCode}
              placeholder={"Zip code"}
              onChange={(e) => {
                this.props.handleChangeZipCode(
                  number.phoneNumber,
                  e.target.value,
                  number.inRange
                );
              }}
            />
            {}
          </td>
          <td>{`${number.main_number ? "Yes" : "No"}/${
            number.maintenance_number ? "Yes" : "No"
          }`}</td>
          {isAllowed(
            localStorage.getItem("userProfile"),
            pages.group_numbers_other_actions
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
                  onClose={(e) => {
                    onReload && onReload(number.rangeStart);
                    this.setState({ showDelete: false });
                  }}
                  {...this.props}
                />
              </React.Fragment>
            </td>
          )}
        </tr>
        {showRange &&
          number.phoneNumbers &&
          number.phoneNumbers.map((number, i) => (
            <PhoneNumber
              style={{ backgroundColor: "#F5F5F5" }}
              index={i}
              key={i}
              number={number}
              showWithStatus={this.props.showWithStatus}
              handleSingleCheckboxClick={this.props.handleSingleCheckboxClick}
              handleSingleCheckboxClickActive={
                this.props.handleSingleCheckboxClickActive
              }
              handleChangeZipCode={this.props.handleChangeZipCode}
              handleSingleCheckboxClickPreActive={
                this.props.handleSingleCheckboxClickPreActive
              }
              onReload={() => this.props.onReload()}
            />
          ))}
      </React.Fragment>
    );
  }
}
