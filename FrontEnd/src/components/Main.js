import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
//import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
//import "aos/dist/aos.css";
import dummyBlogPosts from "../dummy_data/blogPosts";
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
  const [blogPosts, setBlogPosts] = useState([]);

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

  const handleSurveyCreateOpen = useCallback(() => {
    smoothScrollTop();
    document.title = "iWonder - Create survey";
    setSelectedTab("SurveyCreate");
  }, [setSelectedTab]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const fetchBlogPosts = useCallback(() => {
    const blogPosts = dummyBlogPosts.map((blogPost) => {
      let title = blogPost.title;
      title = title.toLowerCase();
      /* Remove unwanted characters, only accept alphanumeric and space */
      title = title.replace(/[^A-Za-z0-9 ]/g, "");
      /* Replace multi spaces with a single space */
      title = title.replace(/\s{2,}/g, " ");
      /* Replace space with a '-' symbol */
      title = title.replace(/\s/g, "-");
      blogPost.url = `/blog/post/${title}`;
      blogPost.params = `?id=${blogPost.id}`;
      return blogPost;
    });
    setBlogPosts(blogPosts);
  }, [setBlogPosts]);

  useEffect(fetchBlogPosts, [fetchBlogPosts]);

  return (
    <div className={classes.wrapper}>
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleSurveyCreateOpen={handleSurveyCreateOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <Routing
        blogPosts={blogPosts}
        selectHome={selectHome}
        selectSurveys={selectSurveys}
      />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
