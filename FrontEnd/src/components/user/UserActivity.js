import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, withStyles } from "@material-ui/core";
import SurveysList from "../survey/SurveysList";

const styles = (theme) => ({
	container: {
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(12),
		[theme.breakpoints.down("md")]: {
			marginBottom: theme.spacing(9),
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(6),
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(3),
		},
	},
});
function Surveys(props) {
	const { selectUserActivity, classes, currentUser } = props;
	useEffect(() => {
		selectUserActivity();
	}, [selectUserActivity]);
	return (
		<div className={"sm-p-top"}>
			<div className={classNames("container-fluid", classes.container)}>
				<Grid container spacing={5}>
					<Grid item xs={12} md={6}>
						<SurveysList title={'My surveys'} type={'my'} currentUser={currentUser}/>
          			</Grid>
					<Grid item xs={12} md={6}>
						<SurveysList title={'Recently answered'}  type={'answered'} currentUser={currentUser}/>
          			</Grid>
				</Grid>
			</div>
		</div>
	);
}

Surveys.propTypes = {
	selectUserActivity: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Surveys);