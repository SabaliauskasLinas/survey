import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
	TextField,
	Button,
	Typography,
	withStyles,
} from "@material-ui/core";
import FormDialog from "./FormDialog";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import VisibilityPasswordTextField from "../../helpers/VisibilityPasswordTextField";
import { authenticationHelper } from "../../../helpers/authenticationHelper";

const styles = (theme) => ({
	additionalAction: {
		marginTop: theme.spacing(2),
		color: theme.palette.primary.main,
		cursor: "pointer",
		"&:enabled:hover": {
			color: theme.palette.primary.dark,
		},
		"&:enabled:focus": {
			color: theme.palette.primary.dark,
		},
	},
	disabledText: {
		cursor: "auto",
		color: theme.palette.text.disabled,
	},
	formControlLabel: {
		marginRight: 0,
	},
});

function LoginDialog(props) {
	const {
		classes,
		onClose,
		showMessage,
		//openChangePasswordDialog,
		setDialogOpen,
	} = props;
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const loginEmail = useRef();
	const loginPassword = useRef();

	const login = useCallback(() => {
		setIsLoading(true);
		setError(null);
		authenticationHelper.login(loginEmail.current.value, loginPassword.current.value)
			.then(
				user => {
					onClose();
					showMessage('Successfully logged in');
				},
				error => {
					setError(error);
					setIsLoading(false);
				}
			);
	}, [setIsLoading, loginEmail, loginPassword, onClose, showMessage]);

	return (
		<Fragment>
			<FormDialog
				open
				onClose={onClose}
				loading={isLoading}
				onFormSubmit={(e) => {
					e.preventDefault();
					login();
				}}
				hideBackdrop
				headline="Login"
				content={
					<Fragment>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Email Address"
							inputRef={loginEmail}
							autoFocus
							autoComplete="off"
							type="email"
							InputLabelProps={{ required: false }}
						/>
						<VisibilityPasswordTextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Password"
							inputRef={loginPassword}
							autoComplete="off"
							onVisibilityChange={setIsPasswordVisible}
							isVisible={isPasswordVisible}
							InputLabelProps={{ required: false }} 
						/>
						{/* <FormControlLabel
							className={classes.formControlLabel}
							control={<Checkbox color="primary" />}
							label={<Typography variant="body1">Remember me</Typography>}
						/> */}
						{ error &&
							<Typography color='error'>
								{error}
							</Typography>
						}
					</Fragment>
				}
				actions={
					<Fragment>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={isLoading}
							size="large"
						>
							Login
              				{isLoading && <LoadingSpinner />}
						</Button>
						<Typography
							align="center"
							className={classes.additionalAction}
							onClick={() => setDialogOpen('register')}
							tabIndex={0}
							role="button"
						>
							Don't have an account yet?
            			</Typography>
						{/* <Typography
							align="center"
							className={classNames(
								classes.additionalAction,
								isLoading ? classes.disabledText : null
							)}
							color="primary"
							onClick={isLoading ? null : openChangePasswordDialog}
							tabIndex={0}
							role="button"
							onKeyDown={() => openChangePasswordDialog()}
						>
							Forgot Password?
            			</Typography> */}
					</Fragment>
				}
			/>
		</Fragment>
	);
}

LoginDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	showMessage: PropTypes.func.isRequired,
	openChangePasswordDialog: PropTypes.func.isRequired,
	setDialogOpen: PropTypes.func.isRequired,
	status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
