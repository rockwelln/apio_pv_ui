import React, { Component } from "react";
import { withRouter } from "react-router";

import Radio from "react-bootstrap/lib/Radio";
import FormControl from "react-bootstrap/lib/FormControl";

class SericePack extends Component {
  state = {
    checkedMaximum: false
  };
  render() {
    const { userService } = this.props;
    return (
      <tr>
        <td>{userService.name}</td>
        <td>
          <Radio
            name={`allocated${userService.name}`}
            checked={this.props.userService.allocated.unlimited === true}
            onChange={() =>
              this.props.changeUserServicesUnlimeted(userService.name, true)
            }
          >
            <div className="font-weight-bold flex">unlimited</div>
          </Radio>
          <Radio
            name={`allocated${userService.name}`}
            checked={this.props.userService.allocated.unlimited === false}
            onChange={() =>
              this.props.changeUserServicesUnlimeted(userService.name, false)
            }
          >
            <div className="font-weight-bold flex">
              <FormControl
                type="number"
                disabled={this.props.userService.allocated.unlimited}
                value={this.props.userService.allocated.maximum}
                onChange={e =>
                  this.props.changeUserServicesMaximum(
                    userService.name,
                    Number(e.target.value)
                  )
                }
                min={0}
              />
            </div>
          </Radio>
        </td>
        <td>
          {this.props.userService.allocated.unlmited === false &&
          this.props.userService.allocated.maximum === 0
            ? "NO"
            : "YES"}
        </td>
      </tr>
    );
  }
}

export default withRouter(SericePack);
