import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Table from "react-bootstrap/lib/Table";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import { countsPerPages } from "../../../../constants";
import PBX from "./PBX";
import Loading from "../../../../common/Loading";

import { fetchGetCertifiedPBX } from "../../../../store/actions";

const CertifiedPBXs = (props) => {
  const [certifiedPBX, setCertifiedPBX] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedBy, setSortedBy] = useState("");
  const [countPerPage, setCountPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [paginatedCertifiedPBX, setPaginatedCertifiedPBX] = useState([]);
  const [countPages, setCountPages] = useState(null);
  const dispatch = useDispatch();
  const propsCertifiedPBX = useSelector((state) => state.certifiedPBX);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchGetCertifiedPBX());
  }, []);

  useEffect(() => {
    const tmp = [...propsCertifiedPBX];
    const pbx = tmp.sort((a, b) => {
      if (a.brand < b.brand) return -1;
      if (a.brand > b.brand) return 1;
      return 0;
    });
    setCertifiedPBX(pbx);
    setIsLoading(false);
    setSortedBy("brand");
  }, [propsCertifiedPBX]);

  useEffect(() => {
    pagination();
  }, [certifiedPBX]);

  const pagination = () => {
    const tmp = [...certifiedPBX];
    const tmpPage = page;
    const countPages = Math.ceil(tmp.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = tmp.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = tmp.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    setPaginatedCertifiedPBX(paginationItems);
    setCountPages(countPages);
    setPage(tmpPage);
  };

  const sort = (sortCriteria) => {
    const tmp = [...certifiedPBX];
    if (sortedBy === sortCriteria) {
      const pbx = tmp.reverse();
      setCertifiedPBX(pbx);
    } else {
      const pbx = tmp.sort((a, b) => {
        if (a[sortCriteria] < b[sortCriteria]) return -1;
        if (a[sortCriteria] > b[sortCriteria]) return 1;
        return 0;
      });
      setCertifiedPBX(pbx);
      setSortedBy(sortCriteria);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Row className={"margin-top-1"}>
        <Col mdOffset={1} md={10}>
          <InputGroup className={"margin-left-negative-4"}>
            <InputGroup.Addon>
              <Glyphicon glyph="lyphicon glyphicon-search" />
            </InputGroup.Addon>
            <FormattedMessage id="search_placeholder" defaultMessage=" ">
              {(placeholder) => (
                <FormControl
                  type="text"
                  //value={this.state.searchValue}
                  placeholder={placeholder}
                  // onChange={e =>
                  //   this.setState(
                  //     {
                  //       searchValue: e.target.value
                  //     },
                  //     () => this.filterBySearchValue()
                  //   )
                  // }
                />
              )}
            </FormattedMessage>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={11}>
          <div className="flex flex-row flex-end-center indent-top-bottom-1">
            <div>Item per page</div>
            <FormControl
              componentClass="select"
              //defaultValue={this.state.countPerPage}
              style={{ display: "inline", width: "auto" }}
              className={"margin-left-1"}
              //onChange={this.changeCoutOnPage}
            >
              {countsPerPages.map((counts) => (
                <option key={counts.value} value={counts.value}>
                  {counts.title}
                </option>
              ))}
            </FormControl>
          </div>
        </Col>
      </Row>
      {paginatedCertifiedPBX.length ? (
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>
                      <FormattedMessage id="brand" defaultMessage="Brand" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("brand")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="verison" defaultMessage="Version" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("verison")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="iad_type"
                        defaultMessage="IAD type"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("iad_type")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="certified"
                        defaultMessage="Certified"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("certified")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="cfu" defaultMessage="CFU" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("cfu")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="cfb" defaultMessage="CFB" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("cfb")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="cfnr" defaultMessage="CFNR" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("cfnr")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="cfdiversion"
                        defaultMessage="CFDI version"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("cfdiversion")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="cf302movetemp"
                        defaultMessage="CF 302 move temp"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("cf302movetemp")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="clip" defaultMessage="CLIP" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("clip")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="clir" defaultMessage="CLIR" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("clir")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="colp" defaultMessage="COLP" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("colp")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="colr" defaultMessage="COLR" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("colr")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="weergavenr"
                        defaultMessage="Weergavenr"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("weergavenr")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="signaal2deoproep"
                        defaultMessage="Signaal to deoproep"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("signaal2deoproep")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="gesprekmet3"
                        defaultMessage="Gesprek met 3"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("gesprekmet3")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="calltransfer"
                        defaultMessage="Call transfer"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("calltransfer")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="blindcalltransfer"
                        defaultMessage="Blind call transfer"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("blindcalltransfer")}
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="blindcalltransferwithrefer"
                        defaultMessage="Blind call transfer with refer"
                      />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("blindcalltransferwithrefer")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="aoc" defaultMessage="AOC" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("aoc")}
                      />
                    </th>
                    <th>
                      <FormattedMessage id="fax" defaultMessage="FAX" />
                      <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={() => sort("fax")}
                      />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {paginatedCertifiedPBX[page].map((pbx) => (
                    <PBX
                      key={pbx.brand}
                      pbx={pbx}
                      //onReload={() => this.fetchReq()}
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
                  <Pagination.Prev
                  //onClick={this.decrementPage}
                  />
                  <Pagination.Item>{page + 1}</Pagination.Item>
                  <Pagination.Next
                  //onClick={this.incrementPage}
                  />
                </Pagination>
              </div>
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
};

export default withRouter(CertifiedPBXs);
