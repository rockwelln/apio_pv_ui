import React, { Component } from "react";
import { connect } from "react-redux";

import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Alert from "react-bootstrap/lib/Alert";

import { FormattedMessage } from "react-intl";
import TableZTR from "./TableZTR";

import { fetchPostEmergencyRouting } from "../../../../store/actions";

export class ZipToRouting extends Component {
  state = {
    withHeaders: false,
    csvValue: [],
    showError: false,
    errorText: "",
    errorHeader: "",
    showWarning: false,
    disabledUpload: true,
    theInputKey: "inputKey",
    disableUploadButtonAPI: false
  };
  render() {
    return (
      <React.Fragment>
        {(this.state.showError || this.state.showWarning) && (
          <Row className={"margin-top-1"}>
            <Col md={12}>
              <Alert bsStyle={this.state.showWarning ? "warning" : "danger"}>
                {this.state.showWarning && <h4>Need to reimport file</h4>}
                <h4>{this.state.errorHeader}</h4>
                <p>{this.state.errorText}</p>
                <Row>
                  <Col md={12}>
                    <div className="button-row">
                      <div className="pull-right">
                        <Button
                          onClick={() =>
                            this.setState({
                              csvValue: [],
                              theInputKey: new Date(),
                              showWarning: false,
                              showError: false,
                              errorText: "",
                              errorHeader: ""
                            })
                          }
                        >
                          OK
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Alert>
            </Col>
          </Row>
        )}
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage
                  id="withHeaders"
                  defaultMessage="With Headers"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <Checkbox
                defaultChecked={this.state.withHeaders}
                onChange={e =>
                  this.setState({
                    withHeaders: e.target.checked,
                    showWarning: !!this.state.csvValue.length,
                    disabledUpload: true
                  })
                }
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage
                  id="importCsv"
                  defaultMessage="Import CSV file:"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                key={this.state.theInputKey || ""}
                type="file"
                onChange={this.handleInputChange}
                disabled={this.state.showWarning || this.state.showError}
                accept="text/csv"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.uploadFile}
                  type="submit"
                  className="btn-primary"
                  disabled={
                    this.state.disabledUpload ||
                    this.state.disableUploadButtonAPI
                  }
                >
                  {this.state.disableUploadButtonAPI
                    ? "Uploading..."
                    : "Upload"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        {!!this.props.emergencyRouting.length && (
          <TableZTR emergencyRouting={this.props.emergencyRouting} />
        )}
      </React.Fragment>
    );
  }

  uploadFile = () => {
    this.toBase64(this.state.file).then(res => {
      const b64 = res.replace(/^data:.+;base64,/, "");
      const data = {
        csv: b64,
        has_header: this.state.withHeaders
      };
      this.setState({ disableUploadButtonAPI: true }, () =>
        this.props.fetchPostEmergencyRouting(data).then(() =>
          this.setState({
            csvValue: [],
            theInputKey: new Date(),
            disabledUpload: true,
            disableUploadButtonAPI: false
          })
        )
      );
    });
  };

  handleInputChange = e => {
    const target = e.target;
    if (!target.files.length) {
      this.setState({ csvValue: [] });
      return;
    }
    if (
      !(
        target.files[0].type === "application/vnd.ms-excel" ||
        target.files[0].type === "text/csv"
      )
    ) {
      let errorHeader = "Invalid type file";
      let errorText = "Accepted file formats: csv ";
      this.setState({
        showError: true,
        errorHeader,
        errorText,
        disabledUpload: true
      });
      return;
    }
    let csvValue;
    this.readFile(target.files[0])
      .then(res => {
        csvValue = this.csvJSON(res, this.state.withHeaders);
      })
      .then(() =>
        this.setState({
          file: target.files[0],
          disabledUpload: this.state.showError,
          csvValue
        })
      );
  };

  csvJSON = (csv, withHeaders) => {
    let lines = csv.split("\n");

    let result = [];
    let headers;
    if (withHeaders) {
      headers = lines[0].split(";");
      if (headers.length > 2) {
        let errorHeader = "Count header error";
        let errorText = "You must have two headers in the file";
        this.setState({
          showError: true,
          errorHeader,
          errorText,
          disabledUpload: true
        });
        return [];
      }
    } else {
      headers = ["Zip Code", "Routing Profile"];
    }
    if (headers.join() !== ["Zip Code", "Routing Profile"].join()) {
      let errorHeader = "Invalid headers";
      let errorText = "Your headers must be Zip Code and Routing Profile";
      this.setState({
        showError: true,
        errorHeader,
        errorText,
        disabledUpload: true
      });
      return [];
    }

    for (let i = withHeaders ? 1 : 0; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(";");
      if (currentline.length !== 2) {
        let errorHeader = "Count columns error";
        let errorText = "You must have two columns in the file";

        this.setState({
          showError: true,
          errorHeader,
          errorText,
          disabledUpload: true
        });
        return [];
      }
      console.log(currentline);
      for (let j = 0; j < headers.length; j++) {
        console.log(currentline[j]);
        if (currentline[j].length && currentline[j].length > 255) {
          let errorHeader = "Value length error";
          let errorText = "Your max length of value must be not more 255";
          this.setState({
            showError: true,
            errorHeader,
            errorText,
            disabledUpload: true
          });
          return [];
        }
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  };

  readFile = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

const mapStateToProps = state => ({ emergencyRouting: state.emergencyRouting });

const mapDispatchToProps = { fetchPostEmergencyRouting };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZipToRouting);
