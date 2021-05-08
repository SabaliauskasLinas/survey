import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Hidden,
	IconButton,
	withStyles,
	Box,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Avatar, 
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BookIcon from "@material-ui/icons/Book";
import NavigationDrawer from "./NavigationDrawer";
import AddIcon from '@material-ui/icons/Add';
import { authenticationHelper, logout } from "../../helpers/authenticationHelper";
import { AccountCircle, ExitToApp, List, Settings } from "@material-ui/icons";
import { withSnackbar } from "../../helpers/notificationHelper";

const styles = theme => ({
	appBar: {
		boxShadow: theme.shadows[6],
		backgroundColor: theme.palette.common.white
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between"
	},
	menuButtonText: {
		fontSize: theme.typography.body1.fontSize,
		fontWeight: theme.typography.h6.fontWeight
	},
	brandText: {
		fontFamily: "'Roboto', cursive",
		fontWeight: 800
	},
	noDecoration: {
		textDecoration: "none !important"
	},
	createSurveyButton: {
		marginLeft: theme.spacing(3),
	}
});

function NavBar(props) {
	const {
		classes,
		snackbarShowMessage,
		openRegisterDialog,
		openLoginDialog,
		handleMobileDrawerOpen,
		handleMobileDrawerClose,
		mobileDrawerOpen,
		selectedTab,
		setDialogOpen,
	} = props;

	const [currentUser, setCurrentUser] = useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	var history = useHistory();

	const handleLogOut = () => {
		handleMenuClose();
		logout();
		snackbarShowMessage('Successfully logged out');
	}

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const menuItems = [
		{
			link: "/",
			name: "Home",
			icon: <HomeIcon />
		},
		{
			link: "/surveys",
			name: "Surveys",
			icon: <BookIcon />
		},
		{
			name: "Register",
			onClick: openRegisterDialog,
			icon: <HowToRegIcon />,
			authenticated: false,
		},
		{
			name: "Login",
			onClick: openLoginDialog,
			icon: <LockOpenIcon />,
			authenticated: false,
		},
		{
			name: "Account",
			onClick: handleProfileMenuOpen,
			icon: <AccountCircle />,
			authenticated: true,
			iconButton: true,
		},
	];

	const accountMenuItems = [
		{
			name: 'Activity',
			onClick: () => history.push('/profile/activity'),
			icon: <List />,
		},
		{
			name: 'Settings',
			onClick: () => history.push('/profile/settings'),
			icon: <Settings />,
		},
		{
			name: 'Log Out',
			onClick: handleLogOut,
			icon: <ExitToApp />,
		},
	];

	useEffect(() => {
		authenticationHelper.currentUser.subscribe(x => setCurrentUser(x));
	}, [])

	const getMenuItems = () => {
		return menuItems.filter(m => m.authenticated === undefined || (currentUser && m.authenticated) || (!currentUser && !m.authenticated));
	}

	const handleCreateSurveyClick = () => {
		history.push('/survey/create');
		if (!currentUser)
			setDialogOpen('login');
	}

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Box display="flex">
						<Link to={"/"} className={classes.noDecoration}>
							<Typography
								variant="h4"
								className={classes.brandText}
								display="inline"
								color="secondary"
							>
								i
              				</Typography>
							<Typography
								variant="h4"
								className={classes.brandText}
								display="inline"
								color="primary"
							>
								Wonder
              				</Typography>
						</Link>
						<Button
							onClick={handleCreateSurveyClick}
							variant="outlined"
							color="secondary"
							className={classes.createSurveyButton}
							startIcon={<AddIcon />}
							size="large"
						>
							Create
           				</Button>
					</Box>
					<div>
						<Hidden mdUp>
							<IconButton
								className={classes.menuButton}
								onClick={handleMobileDrawerOpen}
								aria-label="Open Navigation"
							>
								<MenuIcon color="primary" />
							</IconButton>
						</Hidden>
						<Hidden smDown>
							<Box display='flex' alignItems='center'>
								{getMenuItems().map(element => {
									if (element.link) {
										return (
											<Link
												key={element.name}
												to={element.link}
												className={classes.noDecoration}
												onClick={handleMobileDrawerClose}
											>
												<Button
													color="secondary"
													size="large"
													classes={{ text: classes.menuButtonText }}
												>
													{element.name}
												</Button>
											</Link>
										);
									}
									else if(element.iconButton) {
										return (
											<IconButton
											edge="end"
											onClick={element.onClick}
											color="inherit"
											key={element.name}
										>
											{ currentUser && currentUser.avatar 
												? <Avatar src={'data:image/jpeg;base64,' + currentUser.avatar} />
												: element.icon
											}
										</IconButton>
										)
									}
									return (
										<Button
											color="secondary"
											size="large"
											onClick={element.onClick}
											classes={{ text: classes.menuButtonText }}
											key={element.name}
										>
											{element.name}
										</Button>
									);
								})}
							</Box>
						</Hidden>
					</div>
				</Toolbar>
			</AppBar>
			<NavigationDrawer
				menuItems={getMenuItems()}
				anchor="right"
				open={mobileDrawerOpen}
				selectedItem={selectedTab}
				onClose={handleMobileDrawerClose}
			/>
			{ currentUser &&
				<Menu
					anchorEl={anchorEl}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					getContentAnchorEl={null}
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={isMenuOpen}
					onClose={handleMenuClose}
					style={{ zIndex: 1600, marginTop: '1rem'}}
				>
					<Box mx={2}>
						<Typography component="div">
							<Box fontWeight="fontWeightBold">
								{currentUser.firstName} {currentUser.lastName}
							</Box>
						</Typography>
					</Box>
					{ accountMenuItems.map((item, index) => (
						<MenuItem key={`menu-item-${item.name}`} onClick={item.onClick}>
							<ListItemIcon>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.name} />
						</MenuItem>))
					}
				</Menu>
			}
		</div>
	);
}

NavBar.propTypes = {
	classes: PropTypes.object.isRequired,
	handleMobileDrawerOpen: PropTypes.func,
	handleMobileDrawerClose: PropTypes.func,
	mobileDrawerOpen: PropTypes.bool,
	selectedTab: PropTypes.string,
	openRegisterDialog: PropTypes.func.isRequired,
	openLoginDialog: PropTypes.func.isRequired,
	snackbarShowMessage: PropTypes.func.isRequired,
	setDialogOpen: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(withSnackbar(NavBar)));
