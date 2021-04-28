import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
	FormHelperText,
	TextField,
	Button,
	Checkbox,
	Typography,
	FormControlLabel,
	withStyles,
} from "@material-ui/core";
import FormDialog from "./FormDialog";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import VisibilityPasswordTextField from "../../helpers/VisibilityPasswordTextField";
import { postData } from "../../../helpers/requestHelper";

const styles = (theme) => ({
	link: {
		transition: theme.transitions.create(["background-color"], {
			duration: theme.transitions.duration.complex,
			easing: theme.transitions.easing.easeInOut,
		}),
		cursor: "pointer",
		color: theme.palette.primary.main,
		"&:enabled:hover": {
			color: theme.palette.primary.dark,
		},
		"&:enabled:focus": {
			color: theme.palette.primary.dark,
		},
	},
});

function RegisterDialog(props) {
	const { theme, onClose, openTermsDialog, classes } = props;
	const [status, setStatus] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const registerTermsCheckbox = useRef();
	const registerEmail = useRef();
	const registerFirstName = useRef();
	const registerLastName = useRef();
	const registerPassword = useRef();
	const registerPasswordRepeat = useRef();

	const register = useCallback(() => {
		if (!registerTermsCheckbox.current.checked) {
			setHasTermsOfServiceError(true);
			return;
		}
		if (registerPassword.current.value !== registerPasswordRepeat.current.value) {
			setStatus("passwordsDontMatch");
			return;
		}
		setStatus(null);
		setIsLoading(true);
		postData('https://localhost:44303/api/Users/Register', { 
			email: registerEmail.current.value,
			firstName: registerFirstName.current.value,
			lastName: registerLastName.current.value,
			password: registerPassword.current.value 
		});
	}, [
		setIsLoading,
		setStatus,
		setHasTermsOfServiceError,
		registerPassword,
		registerPasswordRepeat,
		registerTermsCheckbox,
		registerEmail,
		registerFirstName,
		registerLastName
	]);

	return (
		<FormDialog
			loading={isLoading}
			onClose={onClose}
			open
			headline="Register"
			onFormSubmit={(e) => {
				e.preventDefault();
				register();
			}}
			hideBackdrop
			hasCloseIcon
			content={
				<Fragment>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						error={status === "invalidEmail"}
						label="Email Address"
						autoFocus
						autoComplete="off"
						type="email"
						inputRef={registerEmail}
						onChange={() => {
							if (status === "invalidEmail")
								setStatus(null);
						}}
						FormHelperTextProps={{ error: true }}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						error={status === "invalidFirstName"}
						label="First Name"
						autoComplete="off"
						type="text"
						inputRef={registerFirstName}
						onChange={() => {
							if (status === "invalidFirstName")
								setStatus(null);
						}}
						FormHelperTextProps={{ error: true }}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						error={status === "invalidLastName"}
						label="Last Name"
						autoComplete="off"
						type="text"
						inputRef={registerLastName}
						onChange={() => {
							if (status === "invalidLastName")
								setStatus(null);
						}}
						FormHelperTextProps={{ error: true }}
					/>
					<VisibilityPasswordTextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						error={status === "passwordTooShort" || status === "passwordsDontMatch"}
						label="Password"
						inputRef={registerPassword}
						autoComplete="off"
						onChange={() => {
							if (status === "passwordTooShort" || status === "passwordsDontMatch")
								setStatus(null);
						}}
						helperText={(() => {
							if (status === "passwordTooShort")
								return "Create a password at least 6 characters long.";
							if (status === "passwordsDontMatch")
								return "Your passwords dont match.";
							return null;
						})()}
						FormHelperTextProps={{ error: true }}
						isVisible={isPasswordVisible}
						onVisibilityChange={setIsPasswordVisible}
					/>
					<VisibilityPasswordTextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						error={status === "passwordTooShort" || status === "passwordsDontMatch"}
						label="Repeat Password"
						inputRef={registerPasswordRepeat}
						autoComplete="off"
						onChange={() => {
							if (status === "passwordTooShort" || status === "passwordsDontMatch")
								setStatus(null);
						}}
						helperText={(() => {
							if (status === "passwordTooShort")
								return "Create a password at least 6 characters long.";
							if (status === "passwordsDontMatch")
								return "Your passwords dont match.";
						})()}
						FormHelperTextProps={{ error: true }}
						isVisible={isPasswordVisible}
						onVisibilityChange={setIsPasswordVisible}
					/>
					<FormControlLabel
						style={{ marginRight: 0 }}
						control={
							<Checkbox
								color="primary"
								inputRef={registerTermsCheckbox}
								onChange={() => setHasTermsOfServiceError(false)}
							/>
						}
						label={
							<Typography variant="body1">
								I agree to the
                				<span
									className={classes.link}
									onClick={isLoading ? null : openTermsDialog}
									tabIndex={0}
									role="button"
									onKeyDown={() => openTermsDialog()}
								>
									{" "}
									terms of service
								</span>
							</Typography>
						}
					/>
					{ hasTermsOfServiceError && (
						<FormHelperText
							error
							style={{
								display: "block",
								marginTop: theme.spacing(-1),
							}}
						>
							In order to create an account, you have to accept our terms of
							service.
						</FormHelperText>
					)}
				</Fragment>
			}
			actions={
				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					color="primary"
					disabled={isLoading}
				>
					Register
          			{isLoading && <LoadingSpinner />}
				</Button>
			}
		/>
	);
}

RegisterDialog.propTypes = {
	theme: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	openTermsDialog: PropTypes.func.isRequired,
	status: PropTypes.string,
	setStatus: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
