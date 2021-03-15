import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import Home from "./home/Home";
import Surveys from "./survey/Surveys";
import PropsRoute from "./navigation/PropsRoute";
import SurveyCreate from "./survey/SurveyCreate";

function Routing(props) {
  const { blogPosts, selectSurveys, selectHome } = props;
  return (
    <Switch>
      {blogPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={Surveys}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(
            (blogPost) => blogPost.id !== post.id
          )}
        />
      ))}
      <PropsRoute
        exact
        path="/surveys"
        component={Surveys}
        selectSurveys={selectSurveys}
        blogPosts={blogPosts}
      />
      <PropsRoute
        exact
        path="/survey"
        component={SurveyCreate}
        selectSurveys={selectSurveys}
        blogPosts={blogPosts}
      />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

Routing.propTypes = {
  blogPosts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectSurveys: PropTypes.func.isRequired,
};

export default memo(Routing);
