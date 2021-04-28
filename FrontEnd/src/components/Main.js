import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
//import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
//import "aos/dist/aos.css";
import Routing from "./Routing";
import smoothScrollTop from "../helpers/smoothScrollTop";
import CookieConsent from "./cookies/CookieConsent";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import DialogSelector from "./user/authentication/DialogSelector";

//AOS.init({ once: true });

const styles = (theme) => ({
	wrapper: {
		//backgroundColor: theme.palette.common.white,
		overflowX: "hidden",
	},
});

function Main(props) {
	const { classes } = props;
	const [selectedTab, setSelectedTab] = useState(null);
	const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(null);
	const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);

	const selectHome = useCallback(() => {
		smoothScrollTop();
		document.title = "iWonder";
		setSelectedTab("Home");
	}, [setSelectedTab]);

	const selectSurveys = useCallback(() => {
		smoothScrollTop();
		document.title = "iWonder - Surveys";
		setSelectedTab("Surveys");
	}, [setSelectedTab]);

	const selectSurveyCreate = () => {
		smoothScrollTop();
		document.title = "iWonder - Survey Create";
	};

	const selectSurveyAnswer = () => {
		smoothScrollTop();
		document.title = "iWonder - Survey Answer";
	};

	const selectSurveyResults = () => {
		smoothScrollTop();
		document.title = "iWonder - Survey Results";
	};

	const handleMobileDrawerOpen = useCallback(() => {
		setIsMobileDrawerOpen(true);
	}, [setIsMobileDrawerOpen]);

	const handleMobileDrawerClose = useCallback(() => {
		setIsMobileDrawerOpen(false);
	}, [setIsMobileDrawerOpen]);

	const openLoginDialog = useCallback(() => {
		setDialogOpen("login");
		setIsMobileDrawerOpen(false);
	}, [setDialogOpen, setIsMobileDrawerOpen]);

	const closeDialog = useCallback(() => {
		setDialogOpen(null);
	}, [setDialogOpen]);

	const openRegisterDialog = useCallback(() => {
		setDialogOpen("register");
		setIsMobileDrawerOpen(false);
	}, [setDialogOpen, setIsMobileDrawerOpen]);

	const openTermsDialog = useCallback(() => {
		setDialogOpen("termsOfService");
	}, [setDialogOpen]);

	const handleCookieRulesDialogOpen = useCallback(() => {
		setIsCookieRulesDialogOpen(true);
	}, [setIsCookieRulesDialogOpen]);

	const handleCookieRulesDialogClose = useCallback(() => {
		setIsCookieRulesDialogOpen(false);
	}, [setIsCookieRulesDialogOpen]);

	const openChangePasswordDialog = useCallback(() => {
		setDialogOpen("changePassword");
	}, [setDialogOpen]);


	return (
		<div className={classes.wrapper}>
			{ !isCookieRulesDialogOpen &&
				<CookieConsent
					handleCookieRulesDialogOpen={handleCookieRulesDialogOpen}
				/>
			}
			<CookieRulesDialog
				open={isCookieRulesDialogOpen}
				onClose={handleCookieRulesDialogClose}
			/>
			<DialogSelector
				openLoginDialog={openLoginDialog}
				dialogOpen={dialogOpen}
				onClose={closeDialog}
				openTermsDialog={openTermsDialog}
				openRegisterDialog={openRegisterDialog}
				openChangePasswordDialog={openChangePasswordDialog}
			/>
			<NavBar
				selectedTab={selectedTab}
				selectTab={setSelectedTab}
				mobileDrawerOpen={isMobileDrawerOpen}
				handleMobileDrawerOpen={handleMobileDrawerOpen}
				handleMobileDrawerClose={handleMobileDrawerClose}
				openLoginDialog={openLoginDialog}
				openRegisterDialog={openRegisterDialog}
			/>
			<Routing
				selectHome={selectHome}
				selectSurveys={selectSurveys}
				selectSurveyCreate={selectSurveyCreate}
				selectSurveyAnswer={selectSurveyAnswer}
				selectSurveyResults={selectSurveyResults}
			/>
		</div>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
