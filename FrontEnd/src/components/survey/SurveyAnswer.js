import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, CardContent, CardHeader, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import { withSnackbar } from '../../helpers/notificationHelper';
import classNames from 'classnames';
import StyledCard from '../../helpers/StyledCard';
import { useHistory, useParams } from 'react-router-dom'
import { getData, postData } from '../../helpers/requestHelper';
import { spacing } from '@material-ui/system';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';

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
});

const AnswerControl = props => {
    const { question, error } = props;

    const handleAnswerChange = e => {
        question.answer = e.target.value;
    }

    //#region Answer Control Types
    const ShortAnswer = props => {
        return (
            <TextField
                error={error != null}
                helperText={error && error.message}
                placeholder='Short answer text'
                color='secondary'
                style={{ width: '40%' }}
                onChange={handleAnswerChange}
                //value={answer}
            />
        )
    }

    const LongAnswer = props => {
        return (
            <TextField
                error={error != null}
                helperText={error && error.message}
                multiline
                fullWidth
                placeholder='Long answer text'
                color='secondary'
                onChange={handleAnswerChange}
                //value={answer}
            />
        )
    }
    //#endregion

    switch (question.questionTypeId) {
        case 1: {
            return <ShortAnswer />
        }
        case 2: {
            return <LongAnswer />
        }
        default: {
            return <ShortAnswer />
        }
    }
}

const SurveyAnswer = props => {
    const { classes, snackbarShowMessage, selectSurveyAnswer } = props;
    const { id } = useParams();
    const [survey, setSurvey] = useState({});
    const [questions, setQuestions] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        selectSurveyAnswer();
        getData(`https://localhost:44303/api/Survey/${id}`)
            .then(res => res.json())
            .then(res => {
                setSurvey(res);
                setQuestions(res.questions);
            })
            .catch(er => {
                console.log(er)
            });
    }, [selectSurveyAnswer, id]);

    const validateSurvey = () => {
        let newErrors = [];
        questions.forEach(q => {
            if (q.required && isEmptyOrSpaces(q.answer))
                newErrors.push({questionId: q.id, message: 'Answer is required'});
        });

        setErrors(newErrors);
        return newErrors;
    }

    const handleSubmitClick = e => {
        var newErrors = validateSurvey();
        if (newErrors.length > 0){
            snackbarShowMessage('Please fix validation errors','error');
            return;
        }

        let submission = {
            surveyId: survey.id,
            answers: questions.map(q => { return {questionId: q.id, text: q.answer }})
        }

        postData('https://localhost:44303/api/Submission', submission)
          .then(res => res.json())
          .then(res => {
            if(res && res.id)
              snackbarShowMessage('Submission successful');
            else
              snackbarShowMessage('Something went wrong','error');
          })
          .catch(er => {
            console.log(er)
            snackbarShowMessage('Something went wrong','error');
          });
    };
    
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
                            <Typography variant="h4">
                                {survey.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                {survey.description}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                    {questions && questions.map((item, index) => (
                        <StyledCard key={`question-${item.id}`}>
                            <CardContent>
                                {item.required &&
                                    <Typography variant='subtitle2' color='secondary'>
                                        Required
                                    </Typography>
                                }
                                <Typography variant='h5'>
                                    {item.name}
                                </Typography>
                                <AnswerControl question={item} error={errors.find(e => e.questionId === item.id)} />
                            </CardContent>
                        </StyledCard>))
                    }
                </Box>
                <Box display="flex" justifyContent="center" >
                    <Button variant="contained" color="secondary" onClick={handleSubmitClick}>
                        Submit
                    </Button>
                </Box>
            </div>
        </div>
    );
};

SurveyAnswer.propTypes = {
    classes: PropTypes.object.isRequired,
    snackbarShowMessage: PropTypes.func.isRequired,
    selectSurveyAnswer: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(withSnackbar(SurveyAnswer))