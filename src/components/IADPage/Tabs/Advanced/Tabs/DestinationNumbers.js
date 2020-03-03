import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";

import {
  changeIAD,
  fetchPutUpdateIAD,
  fetchGetPhoneNumbersByGroupId
} from "../../../../../store/actions";
import { removeEmpty } from "../../../../remuveEmptyInObject";
import { get } from "../../../../get";
import Loading from "../../../../../common/Loading";

const DESTINATIONNUMBERS = [
  {
    id: 5,
    number: null,
    praSelected: null
  },
  {
    id: 6,
    number: null,
    praSelected: null
  },
  {
    id: 7,
    number: null,
    praSelected: null
  },
  {
    id: 8,
    number: null,
    praSelected: null
  },
  {
    id: 9,
    number: null,
    praSelected: null
  },
  {
    id: 10,
    number: null,
    praSelected: null
  }
];

export class TrunkId extends Component {
  state = {
    disabledButton: false,
    destinationNumbers: [],
    arrayOfNumbers: [],
    isLoading: true
  };

  fetchNumbers = () => {
    this.props
      .fetchGetPhoneNumbersByGroupId(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        true
      )
      .then(() => {
        const arrayOfNumbers = this.props.phoneNumbers
          .filter(el => !el.maintenance_number)
          .map(el => ({
            value: el.phoneNumber,
            label: el.phoneNumber
          }));
        this.setState({
          arrayOfNumbers,
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.fetchNumbers();
    this.setState({
      destinationNumbers: this.merge(
        DESTINATIONNUMBERS,
        this.props.iad.destinationNumbers
      )
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.phoneNumbers &&
      prevProps.phoneNumbers.length !== this.props.phoneNumbers.length
    ) {
      this.fetchNumbers();
    }
  }

  merge() {
    let hash = {};
    for (let l = 0; l < arguments.length; l++) {
      let arr = arguments[l];
      if (!arr.length) continue;
      for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        if (!("id" in el)) continue;
        let id = el.id;
        if (!hash[id]) hash[id] = {};
        for (let key in el) {
          if (el.hasOwnProperty(key)) hash[id][key] = el[key];
        }
      }
    }
    let result = [];
    for (let id in hash) {
      if (hash.hasOwnProperty(id)) result.push(hash[id]);
    }
    return result;
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        {this.state.destinationNumbers.map(el => (
          <Row className={"margin-top-1 flex align-items-center"} key={el.id}>
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage
                    id="destnr"
                    defaultMessage={`Destination numbers ${el.id}`}
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  componentClass="select"
                  value={el.number}
                  onChange={e => this.changeDestination(e, el.id)}
                >
                  {get(this.props, "config.tenant.group.iad.destnr") &&
                    this.props.config.tenant.group.iad.destnr.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.label}
                      </option>
                    ))}
                  {!!this.state.arrayOfNumbers.length &&
                    this.state.arrayOfNumbers.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.label}
                      </option>
                    ))}
                </FormControl>
              </div>
            </Col>
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="praLine" defaultMessage="PRA line" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  componentClass="select"
                  value={el.praSelected}
                  onChange={e => this.changePra(e, el.id)}
                >
                  {get(this.props, "config.tenant.group.iad.praSelected") &&
                    this.props.config.tenant.group.iad.praSelected.map(
                      (el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      )
                    )}
                </FormControl>
              </div>
            </Col>
          </Row>
        ))}
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.updateIAD}
                  type="submit"
                  className="btn-primary"
                  disabled={this.state.disabledButton}
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  <FormattedMessage id="update" defaultMessage="Update" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  changeDestination = (e, id) => {
    const index = this.state.destinationNumbers.findIndex(el => el.id === id);
    const newDestNum = [...this.state.destinationNumbers];
    const elArr = newDestNum.splice(index, 1);
    const updatedElArr = {
      ...elArr[0],
      number: e.target.value,
      praSelected: elArr[0].praSelected ? elArr[0].praSelected : 0
    };
    newDestNum.splice(index, 0, updatedElArr);
    this.setState({ destinationNumbers: newDestNum });
    const clearDestinationNumbers = newDestNum.filter(
      el => el.number && !isNaN(el.praSelected)
    );
    this.props.changeIAD("destinationNumbers", clearDestinationNumbers);
  };

  changePra = (e, id) => {
    const index = this.state.destinationNumbers.findIndex(el => el.id === id);
    const newDestNum = [...this.state.destinationNumbers];
    const elArr = newDestNum.splice(index, 1);
    const updatedElArr = {
      ...elArr[0],
      number: elArr[0].number ? elArr[0].number : "None",
      praSelected: Number(e.target.value)
    };
    newDestNum.splice(index, 0, updatedElArr);
    this.setState({ destinationNumbers: newDestNum });
    const clearDestinationNumbers = newDestNum.filter(
      el => el.number && !isNaN(el.praSelected)
    );
    this.props.changeIAD("destinationNumbers", clearDestinationNumbers);
  };

  updateIAD = () => {
    const { destinationNumbers } = this.state;
    const clearDestinationNumbers = [...destinationNumbers].filter(
      el => el.number && !isNaN(el.praSelected)
    );
    const data = { destinationNumbers: clearDestinationNumbers };
    const clearData = removeEmpty(data);
    if (Object.keys(clearData).length) {
      this.setState({ disabledButton: true }, () =>
        this.props
          .fetchPutUpdateIAD(
            this.props.match.params.tenantId,
            this.props.match.params.groupId,
            this.props.match.params.iadId,
            clearData
          )
          .then(() => this.setState({ disabledButton: false }))
      );
    } else {
      this.setState({ disabledButton: true }, () =>
        this.setState({ disabledButton: false })
      );
    }
  };
}

const mapStateToProps = state => ({
  iad: state.iad,
  config: state.config,
  phoneNumbers: state.destinationNumbers
});

const mapDispatchToProps = {
  changeIAD,
  fetchPutUpdateIAD,
  fetchGetPhoneNumbersByGroupId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrunkId)
);
