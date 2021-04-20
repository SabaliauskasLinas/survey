import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, CardContent, CardHeader, TextField, Typography, withStyles } from '@material-ui/core';
import { withSnackbar } from '../../helpers/notificationHelper';
import classNames from 'classnames';
import StyledCard from './customized/StyledCard';
import { Prompt, useParams } from 'react-router-dom'
import { getData, postData } from '../../helpers/requestHelper';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';
import questionTypes from '../../enums/questionTypes';
import MultipleChoice from './customized/MultipleChoice';
import Checkboxes from './customized/Checkboxes';

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
    const { question, error, changeAnswers } = props;

    const handleAnswerChange = answer => {
        changeAnswers(answer);
    }

    switch (question.questionTypeId) {
        case questionTypes.SHORT_ANSWER: {
            return (
                <TextField
                    key={question.id}
                    error={error != null}
                    helperText={error && error.message}
                    placeholder='Short answer text'
                    color='secondary'
                    style={{ width: '40%' }}
                    onChange={e => handleAnswerChange([e.target.value])}
                    value={question && question.answers && question.answers.length > 0 ? question.answers[0] : ''}
                />
            )
        }
        case questionTypes.PARAGRAPH: {
            return (
                <TextField
                    error={error != null}
                    helperText={error && error.message}
                    multiline
                    fullWidth
                    placeholder='Long answer text'
                    color='secondary'
                    onChange={e => handleAnswerChange([e.target.value])}
                    value={question && question.answers && question.answers.length > 0 ? question.answers[0] : ''}
                />
            )
        }
        case questionTypes.MULTIPLE_CHOICE: {
            return (
                <MultipleChoice
                    options={question.options}
                    changeAnswers={answers => handleAnswerChange(answers)}
                    error={error}
                />
            )
        }
        case questionTypes.CHECKBOXES: {
            return (
                <Checkboxes
                    options={question.options}
                    changeAnswers={answers => handleAnswerChange(answers)}
                    error={error}
                />
            )
        }
        default: {
            return <div/>;
        }
    }
}

const SurveyAnswer = props => {
    const { classes, snackbarShowMessage, selectSurveyAnswer } = props;
    const { id } = useParams();
    const [survey, setSurvey] = useState({});
    const [questions, setQuestions] = useState([]);
    const [errors, setErrors] = useState([]);
    const [shouldBlockNavigation, SetShouldBlockNavigation] = useState(false);

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
            if (q.required && (q.answers == null || q.answers.length === 0 || q.answers.filter(a => isEmptyOrSpaces(a)).length > 0))
                newErrors.push({ questionId: q.id, message: 'Answer is required' });
        });

        setErrors(newErrors);
        return newErrors;
    }

    const handleAnswersChange = (answers, index) => {
        let newQuestions = [...questions];
        newQuestions[index].answers = answers;
        setQuestions(newQuestions);
    };

    const handleSubmitClick = e => {
        var newErrors = validateSurvey();
        if (newErrors.length > 0) {
            snackbarShowMessage('Please fix validation errors', 'error');
            return;
        }

        let answers = [];
        questions.forEach(q => 
            q.answers.forEach(a => 
                answers.push({ questionId: q.id, content: a })))

        let submission = {
            surveyId: survey.id,
            answers: answers,
        }

        postData('https://localhost:44303/api/Submission', submission)
            .then(res => res.json())
            .then(res => {
                if (res && res.id) {
                    snackbarShowMessage('Submission successful');
                    window.location.href = '/surveys';
                }
                else
                    snackbarShowMessage('Something went wrong', 'error');
            })
            .catch(er => {
                console.log(er)
                snackbarShowMessage('Something went wrong', 'error');
            });
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
        if (shouldBlockNavigation)
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
                                <Box mt={2}>
                                    <AnswerControl question={item} error={errors.find(e => e.questionId === item.id)} changeAnswers={answers => handleAnswersChange(answers, index)} />
                                </Box>
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
            <Warning />
        </div>
    );
};

SurveyAnswer.propTypes = {
    classes: PropTypes.object.isRequired,
    snackbarShowMessage: PropTypes.func.isRequired,
    selectSurveyAnswer: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(withSnackbar(SurveyAnswer))