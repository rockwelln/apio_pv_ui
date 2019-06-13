import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGetDevicesByGroupId } from "../../../../store/actions";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";
import Device from "./Device";
import { countsPerPages } from "../../../../constants";

export class Devices extends Component {
  state = {
    searchValue: "",
    devices: [],
    isLoading: true,
    sortedBy: "",
    paginationDevices: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };

  fetchDevices = () => {
    this.props
      .fetchGetDevicesByGroupId(this.props.tenantId, this.props.groupId)
      .then(() =>
        this.setState(
          {
            devices: this.props.devices.sort((a, b) => {
              if (a.deviceName < b.deviceName) return -1;
              if (a.deviceName > b.deviceName) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "deviceName"
          },
          () => this.pagination()
        )
      );
  };

  componentDidMount() {
    this.fetchDevices();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.devices.length !== this.props.devices.length) {
      this.fetchDevices();
    }
  }

  render() {
    const {
      devices,
      isLoading,
      pagination,
      paginationDevices,
      countPerPage,
      page
    } = this.state;

    if ((isLoading, pagination)) {
      return <Loading />;
    }
    console.log(devices);
    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col mdOffset={1} md={11}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Device name or device type or mac address"
              >
                {placeholder => (
                  <FormControl
                    type="text"
                    value={this.state.searchValue}
                    placeholder={placeholder}
                    onChange={e =>
                      this.setState(
                        {
                          searchValue: e.target.value
                        },
                        () => this.filterBySearchValue()
                      )
                    }
                  />
                )}
              </FormattedMessage>
            </InputGroup>
          </Col>
        </Row>
        {paginationDevices.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={11}>
                <FormattedMessage
                  id="number_of_devices"
                  defaultMessage={`Number of devices: ${devices.length}`}
                />
              </Col>
            </Row>
            <Row>
              <Col mdOffset={1} md={11}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="devices_name"
                          defaultMessage="Name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByName}
                        />
                      </th>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="devices_Type"
                          defaultMessage="Type"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByType}
                        />
                      </th>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="mac_addess"
                          defaultMessage="Mac addesss"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByMacAddress}
                        />
                      </th>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="free_ports"
                          defaultMessage="Free ports"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByFreePorts}
                        />
                      </th>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="devices_status"
                          defaultMessage="Status"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByFreePorts}
                        />
                      </th>
                      <th style={{ width: "5%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationDevices[page].map(device => (
                      <Device
                        key={device.deviceName}
                        device={device}
                        tenantId={this.props.tenantId}
                        groupId={this.props.groupId}
                        notifications={this.props.notifications}
                        onReload={() =>
                          this.props.fetchGetDevicesByGroupId(
                            this.props.tenantId,
                            this.props.groupId
                          )
                        }
                      />
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col mdOffset={9} md={2}>
                <FormControl
                  componentClass="select"
                  defaultValue={countPerPage}
                  style={{ display: "inline", width: "auto" }}
                  className={"margin-1"}
                  onChange={this.changeCoutOnPage}
                >
                  {countsPerPages.map(counts => (
                    <option key={counts.value} value={counts.value}>
                      {counts.title}
                    </option>
                  ))}
                </FormControl>
                <Glyphicon
                  glyph="glyphicon glyphicon-chevron-left"
                  onClick={this.decrementPage}
                />
                {this.state.page + 1}
                <Glyphicon
                  glyph="glyphicon glyphicon-chevron-right"
                  onClick={this.incrementPage}
                />
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <Col mdOffset={1} md={10}>
            <FormattedMessage
              id="notFound"
              defaultMessage="No groups were found"
            />
          </Col>
        )}
      </React.Fragment>
    );
  }

  changeCoutOnPage = e => {
    this.setState({ countPerPage: Number(e.target.value), page: 0 }, () =>
      this.pagination()
    );
  };

  incrementPage = () => {
    if (this.state.page >= this.state.countPages - 1) {
      return;
    }
    this.setState({ page: this.state.page + 1 });
  };

  decrementPage = () => {
    if (this.state.page === 0) {
      return;
    }
    this.setState({ page: this.state.page - 1 });
  };

  pagination = () => {
    const { countPerPage, devices } = this.state;
    const countPages = Math.ceil(devices.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = devices.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = devices.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationDevices: paginationItems,
      pagination: false,
      countPages,
      page: 0
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.devices
      .filter(
        device =>
          device.deviceName.toLowerCase().includes(searchValue.toLowerCase()) ||
          device.deviceType.toLowerCase().includes(searchValue.toLowerCase()) ||
          device.macAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
          device.status.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(device => device);
    this.setState({ devices: SearchArray }, () => this.pagination());
  };

  sortByName = () => {
    const { devices, sortedBy } = this.state;
    if (sortedBy === "deviceName") {
      const devicesSorted = devices.reverse();
      this.setState({ devices: devicesSorted }, () => this.pagination());
    } else {
      const devicesSorted = devices.sort((a, b) => {
        if (a.deviceName < b.deviceName) return -1;
        if (a.deviceName > b.deviceName) return 1;
        return 0;
      });
      this.setState({ devices: devicesSorted, sortedBy: "deviceName" }, () =>
        this.pagination()
      );
    }
  };

  sortByType = () => {
    const { devices, sortedBy } = this.state;
    if (sortedBy === "deviceType") {
      const devicesSorted = devices.reverse();
      this.setState({ devices: devicesSorted }, () => this.pagination());
    } else {
      const devicesSorted = devices.sort((a, b) => {
        if (a.deviceType < b.deviceType) return -1;
        if (a.deviceType > b.deviceType) return 1;
        return 0;
      });
      this.setState({ devices: devicesSorted, sortedBy: "deviceType" }, () =>
        this.pagination()
      );
    }
  };

  sortByMacAddress = () => {
    const { devices, sortedBy } = this.state;
    if (sortedBy === "macAddress") {
      const devicesSorted = devices.reverse();
      this.setState({ devices: devicesSorted }, () => this.pagination());
    } else {
      const devicesSorted = devices.sort((a, b) => {
        if (a.macAddress < b.macAddress) return -1;
        if (a.macAddress > b.macAddress) return 1;
        return 0;
      });
      this.setState({ devices: devicesSorted, sortedBy: "macAddress" }, () =>
        this.pagination()
      );
    }
  };

  sortByFreePorts = () => {
    const { devices, sortedBy } = this.state;
    if (sortedBy === "freePorts") {
      const devicesSorted = devices.reverse();
      this.setState({ devices: devicesSorted }, () => this.pagination());
    } else {
      const devicesSorted = devices.sort((a, b) => {
        if (a.freePorts < b.freePorts) return -1;
        if (a.freePorts > b.freePorts) return 1;
        return 0;
      });
      this.setState({ devices: devicesSorted, sortedBy: "freePorts" }, () =>
        this.pagination()
      );
    }
  };

  sortByStatus = () => {
    const { devices, sortedBy } = this.state;
    if (sortedBy === "status") {
      const devicesSorted = devices.reverse();
      this.setState({ devices: devicesSorted }, () => this.pagination());
    } else {
      const devicesSorted = devices.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
      this.setState({ devices: devicesSorted, sortedBy: "status" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  devices: state.devices
});

const mapDispatchToProps = {
  fetchGetDevicesByGroupId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Devices);
