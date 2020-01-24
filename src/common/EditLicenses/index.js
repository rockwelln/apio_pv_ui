import React, { Component } from "react";

import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";

const INFINITY = 8734;

export default class EditLicenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.defaultChecked
    };
  }

  render() {
    console.log(this.props.changePacksUnlimeted, this.props.changePacksMaximum);
    if (this.props.maximumAllowed) {
      return (
        <React.Fragment>
          {/**Unlimeted checkbox */}
          <Checkbox
            checked={this.props.defaultChecked}
            disabled={
              this.props.maximumAllowed
                ? !this.props.defaultChecked &&
                  !this.props.maximumAllowed.unlimited
                : false
            }
            onChange={e => {
              this.props.changePacksUnlimeted(
                this.props.index,
                e.target.checked
              );
              this.setState({ isChecked: e.target.checked });
            }}
          >
            {String.fromCharCode(INFINITY)}
          </Checkbox>
          {/**Value of maximum */}
          {!this.state.isChecked && (
            <FormControl
              type="number"
              min={0}
              max={
                this.props.maximumAllowed
                  ? this.props.maximumAllowed.unlimited
                    ? ""
                    : this.props.maximumAllowed.maximum
                  : ""
              }
              value={this.props.defaultMaximum}
              onChange={e => {
                if (
                  this.props.maximumAllowed &&
                  !this.props.maximumAllowed.unlimited &&
                  e.target.value > this.props.maximumAllowed.maximum
                ) {
                  return;
                }
                this.props.changePacksMaximum(
                  this.props.index,
                  parseInt(e.target.value, 10)
                );
              }}
            />
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {/**Unlimeted checkbox */}
        <Checkbox
          checked={this.props.defaultChecked}
          onChange={e => {
            this.props.changePacksUnlimeted(this.props.index, e.target.checked);
            this.setState({ isChecked: e.target.checked });
          }}
        >
          {String.fromCharCode(INFINITY)}
        </Checkbox>
        {/**Value of maximum */}
        {!this.state.isChecked && (
          <FormControl
            type="number"
            min={0}
            value={this.props.defaultMaximum}
            onChange={e => {
              this.props.changePacksMaximum(
                this.props.index,
                parseInt(e.target.value, 10)
              );
            }}
          />
        )}
      </React.Fragment>
    );
  }
}
