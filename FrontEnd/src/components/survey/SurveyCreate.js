import { Box, CardContent, withStyles, withWidth, TextField, Select, MenuItem, ListItemIcon, ListItemText, CardHeader, Avatar, CardActions, Button, FormControlLabel, Switch, Divider, IconButton } from '@material-ui/core';
import { CheckBox, Delete, LinearScale, RadioButtonChecked, ShortText, Subject } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
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
    question: {
      width: "50%"
    },
    type: {
      width: "40%"
    },
    answer: {
      margin: theme.spacing(2)
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
        <ListItemText primary={item.text} />
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
          placeholder='Short answer'
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
          placeholder='Long answer'
          color='secondary'
          disabled
        />
      )
    }
  }
}

function SurveyCreate(props) {
    const { classes } = props;
    const initialTitle = 'Untitled survey';
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{order: 1, typeId: 1}, {order: 2, typeId: 2, required: true}]);

    //setQuestions([{}])

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
    }

    const handleTypeChange = index => e => {
      let newQuestions = [...questions];
      newQuestions[index].typeId = e.target.value;
      setQuestions(newQuestions);
    }
    
    const handleRequiredChange = index => e => {
      let newQuestions = [...questions];
      newQuestions[index].required = e.target.checked;
      setQuestions(newQuestions);
    }

    return (
        <div className={"lg-p-top"}>
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
                    <StyledCard key={`question-${index}`}>
                      <CardContent>
                        <div className={classes.inlineInputs}>
                          <TextField 
                            multiline
                            placeholder='Question'
                            variant="filled"
                            className={classes.question}
                            color='secondary'
                            onChange={handleQuestionChange(index)}
                            value={item.title}
                          />
                          <Select 
                            className={classes.type} 
                            variant="outlined" 
                            color='secondary' 
                            onChange={handleTypeChange(index)}
                            value={item.typeId}
                          >
                            { QuestionTypes() }
                          </Select>
                        </div>
                      </CardContent>
                      <div className={classes.answer}>
                        { <AnswerControl typeId={item.typeId} /> }
                      </div>
                      <Divider variant="middle"/>
                      <CardActions>
                        <IconButton>
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
                    </StyledCard>
                  ))
                  }
                </Box>
            </div>
        </div>
    );
}

export default withWidth()(
    withStyles(styles, { withTheme: true })(SurveyCreate)
  );