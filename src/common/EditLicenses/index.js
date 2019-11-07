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
    return (
      <React.Fragment>
        {/**Unlimeted checkbox */}
        <Checkbox
          defaultChecked={this.props.defaultChecked}
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
            defaultValue={this.props.defaultMaximum}
            onChange={e =>
              this.props.changePacksMaximum(
                this.props.index,
                parseInt(e.target.value, 10)
              )
            }
          />
        )}
      </React.Fragment>
    );
  }
}
