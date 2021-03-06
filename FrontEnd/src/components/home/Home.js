import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  Card,
  Button,
  Box,
  withStyles,
  withWidth,
  isWidthUp,
} from "@material-ui/core";
import WaveBorder from "./WaveBorder";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
    extraLargeButtonLabel: {
      fontSize: theme.typography.body1.fontSize,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.h6.fontSize,
      },
    },
    extraLargeButton: {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      [theme.breakpoints.up("xs")]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      [theme.breakpoints.up("lg")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
    card: {
      boxShadow: theme.shadows[4],
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("xs")]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      [theme.breakpoints.up("sm")]: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(5.5),
        paddingBottom: theme.spacing(5.5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
      [theme.breakpoints.up("lg")]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      [theme.breakpoints.down("lg")]: {
        width: "auto",
      },
    },
    wrapper: {
      position: "relative",
      backgroundColor: theme.palette.primary.main,
      paddingBottom: theme.spacing(2),
    },
    image: {
      maxWidth: "100%",
      verticalAlign: "middle",
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[4],
    },
    container: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(12),
      [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(9),
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(6),
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(3),
      },
    },
    containerFix: {
      [theme.breakpoints.up("md")]: {
        maxWidth: "none !important",
      },
    },
    waveBorder: {
      paddingTop: theme.spacing(4),
    },
  });

function Home(props) {
  const { selectHome, setDialogOpen, classes, theme, width, currentUser } = props;
  var history = useHistory();

  useEffect(() => {
    selectHome();
  }, [selectHome]);

  const handleCreateSurveyClick = () => {
		history.push('/survey/create');
		if (!currentUser)
			setDialogOpen('login');
	}

  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className={classNames(classes.containerFix, "container")}>
                <Box justifyContent="space-between" className="row">
                  <Grid item> {/* xs={12} md={5}> */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="100%"
                    >
                      <Box mb={4}>
                        <Typography
                          variant={isWidthUp("lg", width) ? "h3" : "h4"}
                        >
                          Turn questions into answers.
                        </Typography>
                      </Box>
                      <div>
                        <Box mb={2}>
                          <Typography
                            variant={isWidthUp("lg", width) ? "h6" : "body1"}
                            color="textSecondary"
                          >
                            iWonder can help you to understand people better. Find out more about opinions, interests and the reasons behind decisions.
                            And all without much work on your part ??? thanks to our intuitive solutions for online surveys.
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          className={classes.extraLargeButton}
                          classes={{ label: classes.extraLargeButtonLabel }}
                          onClick={handleCreateSurveyClick}
                        >
                          Create Survey
                        </Button>
                      </div>
                    </Box>
                  </Grid>
                </Box>
              </div>
            </Card>
          </Box>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.primary.main}
        lowerColor="#f5f5f5"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

Home.propTypes = {
    selectHome: PropTypes.func.isRequired,
    setDialogOpen: PropTypes.func.isRequired,
    classes: PropTypes.object,
    currentUser: PropTypes.object,
    width: PropTypes.string,
    theme: PropTypes.object,
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(Home)
);
