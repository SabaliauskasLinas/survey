import React, { useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import RegisterDialog from "./RegisterDialog";
import TermsOfServiceDialog from "./TermsOfServiceDialog";
import LoginDialog from "./LoginDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "../../helpers/ModalBackdrop";

function DialogSelector(props) {
	const {
		dialogOpen,
		openTermsDialog,
		openRegisterDialog,
		openLoginDialog,
		openChangePasswordDialog,
		onClose,
	} = props;

	const showDialog = useCallback(() => {
		switch (dialogOpen) {
			case "register":
				return <RegisterDialog onClose={onClose} openTermsDialog={openTermsDialog} />
			case "termsOfService":
				return <TermsOfServiceDialog onClose={openRegisterDialog} />;
			case "login":
				return <LoginDialog onClose={onClose} openChangePasswordDialog={openChangePasswordDialog} />
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
	openTermsDialog: PropTypes.func.isRequired,
	openRegisterDialog: PropTypes.func.isRequired,
	openChangePasswordDialog: PropTypes.func.isRequired,
};

export default DialogSelector;
