import React, { useState } from "react";
import { withRouter } from "react-router";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

import { isAllowed, pages } from "../../../../utils/user";

const PBX = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  const { pbx, onReload } = props;
  //   const dispatch = useDispatch();
  //   const propsCertifiedPBX = useSelector((state) => state.certifiedPBX);

  //   useEffect(() => {
  //     dispatch(fetchGetCertifiedPBX());
  //   }, []);

  const onClose = () => {
    onReload();
    setShowDelete(false);
  };

  return (
    <tr>
      <td>{pbx.brand}</td>
      <td>{pbx.version}</td>
      <td>{pbx.iad_type}</td>
      <td>{pbx.certified}</td>
      <td>{pbx.cfu}</td>
      <td>{pbx.cfb}</td>
      <td>{pbx.cfnr}</td>
      <td>{pbx.cfdiversion}</td>
      <td>{pbx.cf302movetemp}</td>
      <td>{pbx.clip}</td>
      <td>{pbx.clir}</td>
      <td>{pbx.colp}</td>
      <td>{pbx.colr}</td>
      <td>{pbx.weergavenr}</td>
      <td>{pbx.signaal2deoproep}</td>
      <td>{pbx.gesprekmet3}</td>
      <td>{pbx.calltransfer}</td>
      <td>{pbx.blindcalltransfer}</td>
      <td>{pbx.blindcalltransferwithrefer}</td>
      <td>{pbx.aoc}</td>
      <td>{pbx.fax}</td>
      <td>
        <ButtonToolbar>
          <Glyphicon
            glyph="glyphicon glyphicon-remove"
            onClick={() => setShowDelete(true)}
          />
        </ButtonToolbar>
      </td>
      <DeleteModal
        show={showDelete}
        onClose={onClose}
        pbxBrand={pbx.brand}
        pbxVersion={pbx.version}
      />
    </tr>
  );
};

export default withRouter(PBX);
