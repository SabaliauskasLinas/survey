import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

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

const SurveyWrapper = (props) => {
    const { classes, children } = props;
    return (
        <div className={"sm-p-top"}>
            <div className={classNames("container-fluid", classes.container)}>
                {children}
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(SurveyWrapper);