import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

function Surveys(props) {
  const { selectSurveys } = props;
  useEffect(() => {
    selectSurveys();
  }, [selectSurveys]);
  return (
    <Fragment>
      <div>Apklausa</div>
      <div>Apklausa</div>
      <div>Apklausa</div>
      <div>Apklausa</div>
      <div>Apklausa</div>
      <div>Apklausa</div>
      <div>Apklausa</div>
      <div>Apklausa</div>
      <div>Apklausa</div>
    </Fragment>
  );
}

Surveys.propTypes = {
  selectSurveys: PropTypes.func.isRequired
};

export default Surveys;
