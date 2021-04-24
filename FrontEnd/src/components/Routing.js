import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import Home from "./home/Home";
import Surveys from "./survey/Surveys";
import PropsRoute from "./navigation/PropsRoute";
import SurveyCreate from "./survey/SurveyCreate";
import SurveyAnswer from "./survey/SurveyAnswer";
import SurveyResults from "./survey/SurveyResults";

function Routing(props) {
  const { selectSurveys, selectSurveyCreate, selectSurveyAnswer, selectSurveyResults, selectHome } = props;
  return (
    <Switch>
      <PropsRoute
        exact
        path="/surveys"
        component={Surveys}
        selectSurveys={selectSurveys}
      />
      <PropsRoute
        exact
        path="/survey/create"
        component={SurveyCreate}
        selectSurveyCreate={selectSurveyCreate}
      />
      <PropsRoute
        path="/survey/answer/:id"
        component={SurveyAnswer}
        selectSurveyAnswer={selectSurveyAnswer}
      />
      <PropsRoute
        path="/survey/results/:id"
        component={SurveyResults}
        selectSurveyResults={selectSurveyResults}
      />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

Routing.propTypes = {
  selectHome: PropTypes.func.isRequired,
  selectSurveys: PropTypes.func.isRequired,
  selectSurveyCreate: PropTypes.func.isRequired,
  selectSurveyAnswer: PropTypes.func.isRequired,
};

export default memo(Routing);
