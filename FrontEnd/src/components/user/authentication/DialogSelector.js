import React, { useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import RegisterDialog from "./RegisterDialog";
import TermsOfServiceDialog from "./TermsOfServiceDialog";
import LoginDialog from "./LoginDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "../../helpers/ModalBackdrop";
import { withSnackbar } from "../../../helpers/notificationHelper";
import { isEmptyOrSpaces } from "../../../helpers/stringHelper";

function DialogSelector(props) {
	const {
		snackbarShowMessage,
		dialogOpen,
		setDialogOpen,
		openTermsDialog,
		openRegisterDialog,
		openLoginDialog,
		openChangePasswordDialog,
		onClose,
	} = props;

	const showMessage = useCallback(message => {
		if(!isEmptyOrSpaces(message))
			snackbarShowMessage(message);
	}, [snackbarShowMessage])

	const showDialog = useCallback(() => {
		switch (dialogOpen) {
			case "register":
				return <RegisterDialog onClose={onClose} showMessage={message => showMessage(message)} setDialogOpen={setDialogOpen} openTermsDialog={openTermsDialog} />
			case "termsOfService":
				return <TermsOfServiceDialog onClose={openRegisterDialog} />;
			case "login":
				return <LoginDialog onClose={onClose} showMessage={message => showMessage(message)} setDialogOpen={setDialogOpen}  openChangePasswordDialog={openChangePasswordDialog} />
			case "changePassword":
				return <ChangePasswordDialog onClose={openLoginDialog} />
			default:
		}
	}, [
		dialogOpen,
		openChangePasswordDialog,
		openLoginDialog,
		openRegisterDialog,
		openTermsDialog,
		onClose,
		showMessage,
		setDialogOpen,
	]);

	return (
		<Fragment>
			{dialogOpen && <ModalBackdrop open />}
			{showDialog()}
		</Fragment>
	);
}

DialogSelector.propTypes = {
	dialogOpen: PropTypes.string,
	openLoginDialog: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	setDialogOpen: PropTypes.func.isRequired,
	openTermsDialog: PropTypes.func.isRequired,
	openRegisterDialog: PropTypes.func.isRequired,
	openChangePasswordDialog: PropTypes.func.isRequired,
};

export default withSnackbar(DialogSelector);
