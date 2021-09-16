import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Table from "react-bootstrap/lib/Table";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import { countsPerPages } from "../../../../constants";
import PBX from "./PBX";
import Loading from "../../../../common/Loading";

import { isAllowed, pages } from "../../../../utils/user";

import {
  fetchGetCertifiedPBX,
  fetchPostUpdateCertifiedPBXList,
} from "../../../../store/actions";

const CertifiedPBXs = (props) => {
  const [certifiedPBX, setCertifiedPBX] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedBy, setSortedBy] = useState("");
  const [countPerPage, setCountPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [paginatedCertifiedPBX, setPaginatedCertifiedPBX] = useState([]);
  const [countPages, setCountPages] = useState(null);
  const [inputFileKey, setInputFileKey] = useState(Date.now() + Math.random());
  const dispatch = useDispatch();
  const propsCertifiedPBX = useSelector((state) => state.certifiedPBX);

  useEffect(() => {
    fetchReq();
  }, []);

  useEffect(() => {
    const tmp = [...propsCertifiedPBX];
    const pbx = tmp.sort((a, b) => {
      if (a.brand < b.brand) return -1;
      if (a.brand > b.brand) return 1;
      return 0;
    });
    setCertifiedPBX(pbx);
    setSortedBy(sortedBy || "brand");
  }, [propsCertifiedPBX]);

  useEffect(() => {
    pagination();
  }, [certifiedPBX, countPerPage]);

  const fetchReq = () => {
    const setStartLoading = () => {
      setIsLoading(true);
    };
    const setEndLoading = () => {
      setIsLoading(false);
    };
    dispatch(fetchGetCertifiedPBX(setStartLoading, setEndLoading));
  };

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

  const filterBySearchValue = (searchValue) => {
    const searchArray = [...propsCertifiedPBX].filter(
      (pbx) =>
        pbx.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
        pbx.version.toLowerCase().includes(searchValue.toLowerCase()) ||
        pbx.iad_type.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCertifiedPBX(searchArray);
  };

  const changeCoutOnPage = (e) => {
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

  const uploadFile = (e) => {
    const target = e.target;
    if (!target.files.length) {
      return;
    }

    toBase64(target.files[0]).then((res) => {
      const b64 = res.replace(/^data:.+;base64,/, "");
      dispatch(fetchPostUpdateCertifiedPBXList({ csv: b64 }, fetchReq));
      setInputFileKey(Date.now() + Math.random());
    });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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
                  placeholder={placeholder}
                  onChange={(e) => filterBySearchValue(e.target.value)}
                />
              )}
            </FormattedMessage>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={11}>
          <div className="flex flex-row flex-end-center indent-top-bottom-1">
            {isAllowed(
              localStorage.getItem("userProfile"),
              pages.add_config_certified_pbx
            ) && (
              <label htmlFor="contained-button-file" className={"margin-0"}>
                <input
                  id="contained-button-file"
                  key={inputFileKey}
                  type="file"
                  style={{ display: "none" }}
                  accept="text/csv"
                  onChange={uploadFile}
                />
                <div className={"fake-button btn-primary margin-right-1"}>
                  <FormattedMessage
                    id="add_or_replace_by_csv"
                    defaultMessage="Add or Replace by CSV"
                  />
                </div>
              </label>
            )}
            <>
              <div>Item per page</div>
              <FormControl
                componentClass="select"
                defaultValue={countPerPage}
                style={{ display: "inline", width: "auto" }}
                className={"margin-left-1"}
                onChange={changeCoutOnPage}
              >
                {countsPerPages.map((counts) => (
                  <option key={counts.value} value={counts.value}>
                    {counts.title}
                  </option>
                ))}
              </FormControl>
            </>
          </div>
        </Col>
      </Row>
      {paginatedCertifiedPBX.length ? (
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <Table hover responsive>
                <thead>
                  <tr className="no-wrap">
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
                    <PBX key={pbx.brand} pbx={pbx} onReload={fetchReq} />
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
            defaultMessage="No groups were found"
          />
        </Col>
      )}
    </React.Fragment>
  );
};

export default withRouter(CertifiedPBXs);
