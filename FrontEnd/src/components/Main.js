import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
//import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
//import "aos/dist/aos.css";
import Routing from "./Routing";
import smoothScrollTop from "../helpers/smoothScrollTop";

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

  return (
    <div className={classes.wrapper}>
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
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
