import { Card, withStyles } from '@material-ui/core'
import React, { useState } from 'react'

const styles = (theme) => ({
    card: {
      marginBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: "70%",
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

function StyledCard(props) {
    const { classes } = props;
    const [raised, setRaised] = useState(false);

    const toggleRaised = (e) => {
        setRaised(!raised);
      };

    return (
        <Card
            className={classes.card} 
            onMouseOver={toggleRaised}
            onMouseOut={toggleRaised}
            raised={raised}
            {...props}
        >
            {props.children}
        </Card>
    )
}

export default withStyles(styles, { withTheme: true })(StyledCard);
