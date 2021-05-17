import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Table from "react-bootstrap/lib/Table";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import {
  fetchGetSearchIADs,
  clearSearchedIADs,
  setTransferedIADs,
  clearTransferedIADs,
  fetchGetConfig,
} from "../../store/actions";

import { FormattedMessage } from "react-intl";

import { removeEmpty } from "../remuveEmptyInObject";

import TableOfFetchedIADs from "./TableOfFetchedIIADs";

const LeftColumn = () => {
  const [allIads, setAllIads] = useState(false);
  const [enterpriseId, setEnterpriseId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [buttonName, setButtonName] = useState("Search");
  const [disableSearchButton, setDisableSearchButton] = useState(false);
  const [IADs, setIADs] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sortedBy, setSortedBy] = useState("");
  const [notFound, setNotFound] = useState("");

  const propsSearchedIADs = useSelector((state) => state.searchedIADs);
  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetConfig());
  }, []);

  useEffect(() => {
    setIADs(propsSearchedIADs);
    setDisableSearchButton(false);
    if (propsSearchedIADs.length === 0 && buttonName === "Clear") {
      setButtonName("Search");
      setNotFound("IADs not found");
    }
  }, [propsSearchedIADs]);

  useEffect(() => {
    const searchArray = propsSearchedIADs.filter((iad) =>
      iad.iad.toLowerCase().includes(searchValue.toLowerCase())
    );
    setIADs(searchArray);
  }, [searchValue]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchedIADs());
      dispatch(clearTransferedIADs());
    };
  }, []);

  const handleSearchButton = (newButtomName) => {
    if (buttonName === "Search") {
      setNotFound("");
      const data = {
        allIADs: allIads ? allIads : "",
        insensitiveTenantIdContains: enterpriseId,
        insensitiveGroupIdContains: groupId,
        sensitiveDeviceTypeEquals: deviceType,
      };
      const clearData = removeEmpty(data);
      const querySearch = Object.keys(clearData).reduce(
        (query, key) => (query = `${query}${key}=${clearData[key]}`),
        ""
      );
      if (!querySearch.length) {
        return;
      }
      setButtonName("Searching...");
      setDisableSearchButton(true);
      dispatch(fetchGetSearchIADs(querySearch)).then(() => {
        setButtonName(newButtomName);
      });
      return;
    }
    setButtonName(newButtomName);
    dispatch(clearSearchedIADs());
  };

  const handleSelectAllClick = (e) => {
    const isChecked = e.target.checked;
    const newArr = IADs.map((el) => ({
      ...el,
      checked: isChecked,
    }));
    setIADs(newArr);
    setSelectAll(isChecked);
  };

  const handleSingleCheckboxClick = (iad, checked) => {
    const newArr = IADs.map((el) => ({
      ...el,
      checked: el.iad === iad ? checked : el.checked,
    }));
    setIADs(newArr);
    newArr.every((iad) => iad.checked)
      ? setSelectAll(true)
      : setSelectAll(false);
  };

  const sortByIadType = () => {
    if (sortedBy === "iad") {
      const iadsSorted = [...IADs];
      iadsSorted.reverse();
      setIADs(iadsSorted);
    } else {
      const iadsSorted = IADs.sort((a, b) => {
        if (a.iad < b.iad) return -1;
        if (a.iad > b.iad) return 1;
        return 0;
      });
      setIADs(iadsSorted);
      setSortedBy("iad");
    }
  };

  const handleTransferClick = () => {
    const selectedIADs = IADs.reduce((arrayOfIAD, iad) => {
      if (iad.checked) {
        arrayOfIAD.push(iad.iad);
      }
      return arrayOfIAD;
    }, []);
    dispatch(setTransferedIADs(selectedIADs));
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12} className={"flex align-items-center"}>
          <div className={"margin-right-1 flex flex-basis-33"}>
            <ControlLabel>
              <FormattedMessage id="all" defaultMessage="All" />
            </ControlLabel>
          </div>
          <div className={"margin-right-1 flex-basis-66"}>
            <Checkbox
              checked={allIads}
              disabled={!!enterpriseId || !!groupId || !!deviceType} //expects only boolean value
              onChange={(e) => setAllIads(e.target.checked)}
            />
          </div>
        </Col>
      </Row>
      <Row className={"margin-top-1"}>
        <Col md={12} className={"flex align-items-center"}>
          <div className={"margin-right-1 flex flex-basis-33"}>
            <ControlLabel>
              <FormattedMessage
                id="enterpriseId"
                defaultMessage="Enterprise ID"
              />
            </ControlLabel>
          </div>
          <div className={"margin-right-1 flex-basis-66"}>
            <FormControl
              type="text"
              disabled={allIads || groupId || deviceType}
              value={enterpriseId}
              onChange={(e) => setEnterpriseId(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <Row className={"margin-top-1"}>
        <Col md={12} className={"flex align-items-center"}>
          <div className={"margin-right-1 flex flex-basis-33"}>
            <ControlLabel>
              <FormattedMessage id="groupId" defaultMessage="Group ID" />
            </ControlLabel>
          </div>
          <div className={"margin-right-1 flex-basis-66"}>
            <FormControl
              type="text"
              disabled={allIads || enterpriseId || deviceType}
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <Row className={"margin-top-1"}>
        <Col md={12} className={"flex align-items-center"}>
          <div
            className={"margin-right-1 flex flex-basis-33 font-weight-bold "}
          >
            <FormattedMessage id="deviceType" defaultMessage="Device Type" />
          </div>
          <div className={"margin-right-1 flex flex-basis-66"}>
            <FormControl
              componentClass="select"
              value={deviceType}
              disabled={allIads || enterpriseId || groupId}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <option key={"null"} value={""}>
                None
              </option>
              {config.iad_reboot.iadType.map((type, i) => (
                <option key={i} value={type.value}>
                  {type.label}
                </option>
              ))}
            </FormControl>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="button-row">
            <div className="pull-right">
              <Button
                onClick={() => {
                  buttonName === "Search"
                    ? handleSearchButton("Clear")
                    : handleSearchButton("Search");
                }}
                disabled={disableSearchButton}
                type="submit"
                className="btn-primary"
              >
                <Glyphicon glyph="glyphicon glyphicon-ok" /> {buttonName}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      {!!propsSearchedIADs.length ? (
        <React.Fragment>
          <Row className={"margin-top-1"}>
            <Col md={12}>
              <InputGroup>
                <InputGroup.Addon>
                  <Glyphicon glyph="lyphicon glyphicon-search" />
                </InputGroup.Addon>
                <FormattedMessage
                  id="search_placeholder"
                  defaultMessage="IAD ID"
                >
                  {(placeholder) => (
                    <FormControl
                      type="text"
                      value={searchValue}
                      placeholder={placeholder}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  )}
                </FormattedMessage>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table>
                <thead>
                  <tr>
                    <th>
                      <Checkbox
                        className={"margin-0"}
                        checked={selectAll}
                        onChange={(e) => handleSelectAllClick(e)}
                      >
                        <div className={"font-weight-bold"}>
                          <FormattedMessage
                            id="select"
                            defaultMessage="Select"
                          />
                        </div>
                      </Checkbox>
                    </th>
                    <th className={"no-wrap"}>
                      <FormattedMessage id="iad" defaultMessage="IAD" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={sortByIadType}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {IADs.map((iad) => (
                    <TableOfFetchedIADs
                      key={iad.iad}
                      iad={iad}
                      handleSingleCheckboxClick={handleSingleCheckboxClick}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    type="submit"
                    className="btn-primary"
                    onClick={handleTransferClick}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" /> Transfer
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <React.Fragment>{notFound}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(LeftColumn);
