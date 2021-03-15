import { Box, Card, CardContent, withStyles, withWidth, TextField } from '@material-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';

const styles = (theme) => ({
    card: {
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
  });

function SurveyCreate(props) {
    const { classes } = props;
    const initialTitle = 'Untitled survey';
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState('');
    const [raised, setRaised] = useState(false);

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleTitleBlur = (e) => {
      if(isEmptyOrSpaces(e.target.value))
        setTitle(initialTitle);
    };

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const toggleRaised = (e) => {
      setRaised(!raised);
    };
    return (
        <div className={"lg-p-top"}>
            <div className={classNames("container-fluid", classes.container)}>
                <Box display="flex" justifyContent="center" className="row">
                  <form>
                    <Card 
                      className={classes.card}
                      raised={raised}
                      onMouseOver={toggleRaised}
                      onMouseOut={toggleRaised}
                    >
                        <CardContent>
                          <TextField 
                            autoFocus
                            value={title} 
                            onChange={handleTitleChange} 
                            onBlur={handleTitleBlur}
                            required
                            multiline
                            fullWidth
                            placeholder='Survey title'
                            inputProps={{ style: { fontSize: 35, lineHeight: 1.5 } }}
                          />
                          <TextField 
                            value={description}
                            onChange={handleDescriptionChange} 
                            multiline
                            fullWidth
                            placeholder='Survey description'
                          />
                        </CardContent>
                    </Card>
                  </form>
                </Box>
            </div>
        </div>
    );
}

export default withWidth()(
    withStyles(styles, { withTheme: true })(SurveyCreate)
  );