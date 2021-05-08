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
import UserActivity from "./user/UserActivity";
import UserSettings from "./user/UserSettings";

function Routing(props) {
	const { 
		selectSurveys,
		selectSurveyCreate,
		selectSurveyAnswer,
		selectSurveyResults,
		selectHome,
		setDialogOpen,
		selectUserActivity,
		selectUserSettings,
	} = props;

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
					currentUser={currentUser}
				/>
			}
			{ currentUser &&
				<PropsRoute
					path="/profile/activity/"
					component={UserActivity}
					selectUserActivity={selectUserActivity}
					currentUser={currentUser}
				/>
			}
			{ currentUser &&
				<PropsRoute
					path="/profile/settings/"
					component={UserSettings}
					selectUserSettings={selectUserSettings}
					currentUser={currentUser}
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
	selectUserActivity: PropTypes.func.isRequired,
	selectUserSettings: PropTypes.func.isRequired,
};

export default memo(Routing);
