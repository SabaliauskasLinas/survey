import { Box, CardContent, withStyles, withWidth, TextField, Select, MenuItem, ListItemIcon, CardHeader, Avatar, CardActions, FormControlLabel, Switch, Divider, IconButton, Fab, Grid, Button } from '@material-ui/core';
import { CheckBox, Delete, LinearScale, RadioButtonChecked, ShortText, Subject, Add } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';
import StyledCard from '../../helpers/StyledCard';

const styles = (theme) => ({
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
    inlineInputs: {
      display: "flex",
      justifyContent: "space-between"
    },
    answer: {
      margin: theme.spacing(2)
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(8),
      right: theme.spacing(10),
      [theme.breakpoints.down("md")]: {
        bottom: theme.spacing(8),
        right: theme.spacing(8),
      },
      [theme.breakpoints.down("sm")]: {
        bottom: theme.spacing(8),
        right: theme.spacing(6),
      },
      [theme.breakpoints.down("sm")]: {
        bottom: theme.spacing(8),
        right: theme.spacing(2),
      },
      [theme.breakpoints.down("xs")]: {
        bottom: theme.spacing(8),
        right: theme.spacing(1),
      },
    }
});

const questionTypes = [
  {
    id: 1,
    text: "Short answer",
    icon: <ShortText />,
    disabled: false
  },
  {
    id: 2,
    text: "Paragraph",
    icon: <Subject />,
    disabled: false,
  },
  {
    id: 3,
    text: "Multiple choice",
    icon: <RadioButtonChecked />,
    disabled: true,
  },
  {
    id: 4,
    text: "Checkboxes",
    icon: <CheckBox />,
    disabled: true,
  },
  {
    id: 5,
    text: "Linear scale",
    icon: <LinearScale />,
    disabled: true,
  },
]


function QuestionTypes() {
  return (
    questionTypes.map((item, index) => (
      <MenuItem key={`menu-item-${index}`} value={item.id} disabled={item.disabled}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        {item.text}
      </MenuItem>
    ))
  )
}

function AnswerControl(props) {
  const { typeId } = props;
  switch(typeId) {
    case 1: {
      return (
        <TextField 
          placeholder='Short answer text'
          color='secondary'
          disabled
          style={{width: '40%'}}
        />
      )
    }
    case 2: {
      return (
        <TextField 
          multiline
          fullWidth
          placeholder='Long answer text'
          color='secondary'
          disabled
        />
      )
    }
    default: {
      <TextField 
          placeholder='Short answer text'
          color='secondary'
          disabled
          style={{width: '40%'}}
      />
    }
  }
}

function SurveyCreate(props) {
    const { classes } = props;
    const initialTitle = 'Untitled survey';
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ typeId: 1, required: false, key: Math.random() }]);
    const [shouldBlockNavigation, SetShouldBlockNavigation] = useState(false);

    const handleAddClick = () => { 
      setQuestions(oldQuestions => [...oldQuestions, { typeId: 1, required: false, key: Math.random() }])
    };

    const handleDeleteClick = index => e => {
      questions.splice(index, 1);
      setQuestions([...questions]);
    };

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

    const handleQuestionChange = index => e => {
      let newQuestions = [...questions];
      newQuestions[index].question = e.target.value;
      setQuestions(newQuestions);
    };

    const handleTypeChange = index => e => {
      let newQuestions = [...questions];
      newQuestions[index].typeId = e.target.value;
      setQuestions(newQuestions);
    };
    
    const handleRequiredChange = index => e => {
      let newQuestions = [...questions];
      newQuestions[index].required = e.target.checked;
      setQuestions(newQuestions);
    };

    const Warning = () => (
      <React.Fragment>
        <Prompt
          when={shouldBlockNavigation}
          message='You have unsaved changes, are you sure you want to leave?'
        />
      </React.Fragment>
    );

    useEffect(() => {
      if(shouldBlockNavigation)
        window.onbeforeunload = () => true
    })

    return (
        <div className={"sm-p-top"}>
            <div className={classNames("container-fluid", classes.container)}>
                <Box display="flex" justifyContent="center" className="row">
                  <StyledCard>
                    <CardHeader
                      avatar={
                        <Avatar>
                          R
                        </Avatar>
                      }
                      title="Varden Pavarden"
                      subheader="Varden description"
                    />
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
                        color='secondary'
                        inputProps={{ style: { fontSize: 35, lineHeight: 1.5 } }}
                      />
                      <TextField 
                        value={description}
                        onChange={handleDescriptionChange} 
                        multiline
                        fullWidth
                        placeholder='Survey description'
                        color='secondary'
                      />
                    </CardContent>
                  </StyledCard>
                  { questions.map((item, index) => (
                    <StyledCard key={`question-${item.key}`}>
                      <CardContent>
                        <Grid container spacing={5}>
                          <Grid item xs={12} md={8}>
                            <TextField 
                              multiline
                              placeholder='Question'
                              variant="filled"
                              className={classes.question}
                              color='secondary'
                              onChange={handleQuestionChange(index)}
                              value={item.title}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Select 
                              className={classes.type} 
                              variant="outlined" 
                              color='secondary' 
                              onChange={handleTypeChange(index)}
                              value={item.typeId}
                              fullWidth
                            >
                              { QuestionTypes() }
                            </Select>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <div className={classes.answer}>
                        { <AnswerControl typeId={item.typeId} /> }
                      </div>
                      <Divider variant="middle"/>
                      <CardActions>
                        <IconButton onClick={handleDeleteClick(index)}>
                          <Delete />
                        </IconButton>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={item.required}
                              onChange={handleRequiredChange(index)}
                              color="secondary"
                            />
                          }
                          label="Required"
                        />
                      </CardActions>
                    </StyledCard>))
                  }
                  <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleAddClick}>
                    <Add />
                  </Fab>
                </Box>
                <Box display="flex" justifyContent="center" >
                  <Button variant="contained" color="secondary">
                    Submit
                  </Button>
                </Box>
            </div>
            <Warning/>
        </div>
    );
}

export default withWidth()(
    withStyles(styles, { withTheme: true })(SurveyCreate)
  );