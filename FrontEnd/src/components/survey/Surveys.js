import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, withStyles } from "@material-ui/core";
import SurveysList from "./SurveysList";

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
	const { selectSurveys, classes } = props;
	useEffect(() => {
		selectSurveys();
	}, [selectSurveys]);
	return (
		<div className={"sm-p-top"}>
			<div className={classNames("container-fluid", classes.container)}>
				<Grid container spacing={5}>
					<Grid item xs={12} md={6}>
						<SurveysList title={'Most popular'}/>
          			</Grid>
					<Grid item xs={12} md={6}>
						<SurveysList title={'Most recent'}/>
          			</Grid>
				</Grid>
			</div>
		</div>
	);
}

Surveys.propTypes = {
	selectSurveys: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Surveys);
