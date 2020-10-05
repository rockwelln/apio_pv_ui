import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";
//import Modal from "react-bootstrap/lib/Modal";
//import Button from "react-bootstrap/lib/Button";

import TrunkGroup from "./TrunkGroup";

import { fetchGetTrunkGroupByTenant } from "../../../../store/actions";

import { FormattedMessage } from "react-intl";

import { countsPerPages } from "../../../../constants";
import Loading from "../../../../common/Loading";

const Trunking = props => {
  const [trunkGroups, setTrunkGroups] = useState([]);
  const [countPerPage, setCountPerPage] = useState(25);
  const [paginationTrunksGroups, setPaginationTrunksGroups] = useState([]);
  const [countPages, setCountPages] = useState(null);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortedBy, setSortedBy] = useState("");

  const propsTrunkGroup = useSelector(state => state.trunkGroupsByTenant);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTrunkGroupByTenant(props.match.params.tenantId)).then(() =>
      setIsLoading(false)
    );
  }, []);

  useEffect(() => {
    setTrunkGroups(propsTrunkGroup);
  }, [propsTrunkGroup]);

  useEffect(() => {
    pagination();
  }, [trunkGroups, countPerPage]);

  useEffect(() => {
    const searchArray = propsTrunkGroup.filter(trunk =>
      trunk.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTrunkGroups(searchArray);
    setPage(0);
  }, [searchValue]);

  const pagination = () => {
    const calculatedCountPages = Math.ceil(trunkGroups.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < calculatedCountPages; i++) {
      if (i === 0) {
        const item = trunkGroups.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = trunkGroups.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }
    setPaginationTrunksGroups(paginationItems);
    setCountPages(calculatedCountPages);
    setPage(page);
  };

  const changeCoutOnPage = e => {
    setCountPerPage(Number(e.target.value));
    setPage(0);
  };

  const incrementPage = () => {
    if (page >= countPages - 1) {
      return;
    }
    setPage(page + 1);
  };

  const decrementPage = () => {
    if (page === 0) {
      return;
    }
    setPage(page - 1);
  };

  const sortByName = () => {
    if (sortedBy === "name") {
      const trunksSorted = [...trunkGroups];
      trunksSorted.reverse();
      setTrunkGroups(trunksSorted);
    } else {
      const trunksSorted = [...propsTrunkGroup];

      trunksSorted.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setTrunkGroups(trunksSorted);
      setSortedBy("name");
    }
  };

  const sortByRoutingMode = () => {
    if (sortedBy === "routingMode") {
      const trunksSorted = [...trunkGroups];
      trunksSorted.reverse();
      setTrunkGroups(trunksSorted);
    } else {
      const trunksSorted = [...propsTrunkGroup];

      trunksSorted.sort((a, b) => {
        if (a.routingMode < b.routingMode) return -1;
        if (a.routingMode > b.routingMode) return 1;
        return 0;
      });
      setTrunkGroups(trunksSorted);
      setSortedBy("routingMode");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Row className={"margin-top-2"}>
        <Col mdOffset={1} md={10}>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="lyphicon glyphicon-search" />
            </InputGroup.Addon>
            <FormattedMessage id="search_placeholder" defaultMessage="Name">
              {placeholder => (
                <FormControl
                  type="text"
                  value={searchValue}
                  placeholder={placeholder}
                  onChange={e => setSearchValue(e.target.value)}
                />
              )}
            </FormattedMessage>
          </InputGroup>
        </Col>
        <Col md={1}>
          <Glyphicon
            className={"x-large"}
            glyph="glyphicon glyphicon-plus-sign"
            //onClick={this.addTrunkGroup}
          />
        </Col>
        {/* <Modal
      show={this.state.showErrorCreate}
      onHide={() => this.setState({ showErrorCreate: false })}
      container={this}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          Excess of limit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Text info</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.setState({ showErrorCreate: false })}>
          Close
        </Button>
      </Modal.Footer>
    </Modal> */}
      </Row>
      <Row>
        <Col md={11}>
          <div className="flex flex-row flex-end-center indent-top-bottom-1">
            <div>Item per page</div>
            <FormControl
              componentClass="select"
              defaultValue={countPerPage}
              style={{ display: "inline", width: "auto" }}
              className={"margin-left-1"}
              onChange={changeCoutOnPage}
            >
              {countsPerPages.map(counts => (
                <option key={counts.value} value={counts.value}>
                  {counts.title}
                </option>
              ))}
            </FormControl>
          </div>
        </Col>
      </Row>
      {paginationTrunksGroups.length ? (
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <Table hover>
                <thead>
                  <tr>
                    <th className={"nowrap"}>
                      <FormattedMessage id="Name" defaultMessage="Name" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={sortByName}
                      />
                    </th>
                    <th className={"nowrap"}>
                      <FormattedMessage
                        id="routingMode"
                        defaultMessage="Routing mode"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={sortByRoutingMode}
                      />
                    </th>
                    <th className={"nowrap"} />
                  </tr>
                </thead>
                <tbody>
                  {paginationTrunksGroups[page].map((trunkGroup, i) => (
                    <TrunkGroup
                      key={i}
                      trunkGroup={trunkGroup}
                      onReload={() =>
                        dispatch(
                          fetchGetTrunkGroupByTenant(
                            props.match.params.tenantId
                          )
                        )
                      }
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={11}>
              <div className="flex flex-row flex-end-center">
                <Pagination className={"indent-top-bottom-1"}>
                  <Pagination.Prev onClick={decrementPage} />
                  <Pagination.Item>{page + 1}</Pagination.Item>
                  <Pagination.Next onClick={incrementPage} />
                </Pagination>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <Col mdOffset={1} md={10}>
          <FormattedMessage
            id="notFound"
            defaultMessage="No trunks were found"
          />
        </Col>
      )}
    </React.Fragment>
  );
};

export default withRouter(Trunking);
