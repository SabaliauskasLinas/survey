import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import Home from "./home/Home";
import Surveys from "./survey/Surveys";
import PropsRoute from "./navigation/PropsRoute";
import SurveyCreate from "./survey/SurveyCreate";
import SurveyAnswer from "./survey/SurveyAnswer";
import SurveyResults from "./survey/SurveyResults";
import { authenticationHelper } from "../helpers/authenticationHelper";

function Routing(props) {
	const { selectSurveys, selectSurveyCreate, selectSurveyAnswer, selectSurveyResults, selectHome, setDialogOpen } = props;
	const[ currentUser, setCurrentUser ] = useState(null);

	useEffect(() => {
		authenticationHelper.currentUser.subscribe(x => setCurrentUser(x));
	  }, [])

	return (
		<Switch>
			<PropsRoute
				exact
				path="/surveys"
				component={Surveys}
				selectSurveys={selectSurveys}
			/>
			<PropsRoute
				path="/survey/answer/:id"
				component={SurveyAnswer}
				selectSurveyAnswer={selectSurveyAnswer}
				currentUser={currentUser}
			/>
			{ currentUser &&
				<PropsRoute
					exact
					path="/survey/create"
					component={SurveyCreate}
					selectSurveyCreate={selectSurveyCreate}
					currentUser={currentUser}
				/>
			}
			{ currentUser &&
				<PropsRoute
					path="/survey/results/:id"
					component={SurveyResults}
					selectSurveyResults={selectSurveyResults}
				/>
			}
			<PropsRoute 
				path="/"
				component={Home}
				selectHome={selectHome}
				setDialogOpen={setDialogOpen}
				currentUser={currentUser}
			/>
		</Switch>
	);
}

Routing.propTypes = {
	selectHome: PropTypes.func.isRequired,
	setDialogOpen: PropTypes.func.isRequired,
	selectSurveys: PropTypes.func.isRequired,
	selectSurveyCreate: PropTypes.func.isRequired,
	selectSurveyAnswer: PropTypes.func.isRequired,
};

export default memo(Routing);
