import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
	TextField,
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	withStyles,
} from "@material-ui/core";
import LoadingSpinner from "../../helpers/LoadingSpinner";

const styles = (theme) => ({
	dialogContent: {
		paddingTop: theme.spacing(2),
	},
	dialogActions: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
});

function ChangePassword(props) {
	const { onClose, classes } = props;
	const [isLoading, setIsLoading] = useState(false);

	const sendPasswordEmail = useCallback(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			onClose();
		}, 1500);
	}, [setIsLoading, onClose]);

	return (
		<Dialog
			open
			hideBackdrop
			onClose={onClose}
			disableBackdropClick={isLoading}
			disableEscapeKeyDown={isLoading}
			maxWidth="xs"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					sendPasswordEmail();
				}}
			>
				<DialogContent className={classes.dialogContent}>
					<Typography paragraph>
						Enter your email address below and we will send you instructions on
						how to reset your password.
          			</Typography>
					<TextField
						variant="outlined"
						margin="dense"
						required
						fullWidth
						label="Email Address"
						autoFocus
						type="email"
						autoComplete="off"
					/>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button onClick={onClose} disabled={isLoading}>
						Cancel
          			</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={isLoading}
					>
						Reset password
            			{isLoading && <LoadingSpinner />}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

ChangePassword.propTypes = {
	onClose: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ChangePassword);
