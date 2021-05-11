import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, CardContent, CardHeader, TextField, Typography } from '@material-ui/core';
import { withSnackbar } from '../../helpers/notificationHelper';
import StyledCard from './customized/StyledCard';
import { Prompt, useParams } from 'react-router-dom'
import { getData, postData } from '../../helpers/requestHelper';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';
import questionTypes from '../../enums/questionTypes';
import MultipleChoice from './customized/MultipleChoice';
import Checkboxes from './customized/Checkboxes';
import LinearScale from './customized/LinearScale';
import SurveyWrapper from './customized/SurveyWrapper';
import SurveyAnsweredModal from './customized/SurveyAnsweredModal';
import thumbUpGif from '../../assets/thumb-up.gif'
import Cookies from 'js-cookie';
import LoadingSpinner from '../helpers/LoadingSpinner';

const AnswerControl = props => {
    const { question, error, changeAnswers } = props;

    const handleAnswerChange = useCallback(answer => {
        changeAnswers(answer);
    }, [changeAnswers]);

    switch (question.questionTypeId) {
        case questionTypes.SHORT_ANSWER: {
            return (
                <TextField
                    key={question.id}
                    error={error != null}
                    helperText={error && error.message}
                    placeholder='Short answer text'
                    color='primary'
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
                    color='primary'
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
        case questionTypes.LINEAR_SCALE: {
            return (
                <LinearScale
                    options={question.options}
                    changeAnswers={answers => handleAnswerChange(answers)}
                    error={error}
                />
            )
        }
        default: {
            return <div />;
        }
    }
}

const SurveyAnswer = props => {
    const { snackbarShowMessage, selectSurveyAnswer, currentUser } = props;
    const { id } = useParams();
    const [survey, setSurvey] = useState({});
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [shouldBlockNavigation] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alreadyAnswered, setAlreadyAnswered] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        selectSurveyAnswer();
        getData(`Survey/GetSurveyWithOptions/${id}`)
            .then(res => {
                if(res.oneSubmission) {
                    if(currentUser) {
                        getData(`Submission/SubmissionExists`, { surveyId: id, userId: currentUser.id })
                            .then(exists => {
                                setAlreadyAnswered(exists);
                                setSurvey(res);
                                setQuestions(res.questions);
                                setUser(res.user);
                                setLoading(false);
                            })
                            .catch(er => {
                                console.log(er);
                                setAlreadyAnswered(false);
                                setSurvey(res);
                                setQuestions(res.questions);
                                setUser(res.user);
                                setLoading(false);
                            })
                    }
                    else {
                        var submissions = Cookies.getJSON('submissions');
                        setAlreadyAnswered(submissions ? submissions.includes(parseInt(id)) : false);
                        setSurvey(res);
                        setQuestions(res.questions);
                        setUser(res.user);
                        setLoading(false);
                    }
                }
                else {
                    setSurvey(res);
                    setQuestions(res.questions);
                    setUser(res.user);
                    setLoading(false);
                }
            })
            .catch(er => {
                console.log(er)
            });
    }, [selectSurveyAnswer, id, currentUser]);

    const validateSurvey = () => {
        let newErrors = [];
        questions.forEach(q => {
            if (q.required && (q.answers == null || q.answers.length === 0 || q.answers.filter(a => isEmptyOrSpaces(a)).length > 0))
                newErrors.push({ questionId: q.id, message: 'Answer is required' });
        });

        setErrors(newErrors);
        return newErrors;
    }

    const setSubmissionCookie = () => {
        let submissionsJson = Cookies.get('submissions');
        let submissions = submissionsJson ? JSON.parse(submissionsJson) : [];
        submissions.push(survey.id);
        submissionsJson = JSON.stringify(submissions);
        Cookies.set('submissions', submissionsJson, {
			expires: 365,
		});
    }

    //#region handlers
    const handleDialogClose = () => {
		window.location.href = '/surveys';
	}

    const handleSubmitAnotherClick = () => {
		window.location.reload();
	}

    const handleAnswersChange = useCallback(
        (answers, index) => {
        let newQuestions = [...questions];
        newQuestions[index].answers = answers;
        setQuestions(newQuestions);
    }, [questions]);

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
            userId: currentUser ? currentUser.id : null,
        }

        postData('Submission', submission)
            .then(res => {
                if (res && res.id) {
                    snackbarShowMessage('Submission successful');
                    setDialogOpen(true);
                    if(!currentUser && survey.oneSubmission)
                        setSubmissionCookie();
                }
                else
                    snackbarShowMessage('Something went wrong', 'error');
            })
            .catch(er => {
                console.log(er)
                snackbarShowMessage('Something went wrong', 'error');
            });
    };
    //#endregion

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

    if (loading)
        return <LoadingSpinner />

    if (alreadyAnswered)
        return (
            <SurveyWrapper>
                <Box display="flex" justifyContent="center" className="row">
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" align='center'>
                                Survey already answered. Thank you for your participation.
                            </Typography>
                            <Box display="flex" justifyContent="center" className="row">
                                <img src={thumbUpGif} alt="thumbs-up" style={{width: '200px'}}/>
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Box>
            </SurveyWrapper>
        )

    return (
        <SurveyWrapper>
            <Box display="flex" justifyContent="center" className="row">
                <StyledCard>
                    <CardHeader
                        avatar={
							<Fragment>
								{ user 
                                    ?   ( user.avatar
                                            ? <Avatar style={{width: '100px', height: '100px' }} src={'data:image/jpeg;base64,' + user.avatar} />
                                            : <Avatar style={{width: '100px', height: '100px' }}> {user.firstName && user.firstName[0]}{user.lastName && user.lastName[0]} </Avatar>
                                        ) 
                                    : <div></div>
								}
							</Fragment>
                        }
						title={`${user.firstName} ${user.lastName}`}
						subheader={user.description}
						titleTypographyProps={{ variant: 'h5' }}
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
                                <Typography variant='subtitle2' color='primary'>
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
                <Button variant="contained" color="primary" onClick={handleSubmitClick}>
                    Submit
                </Button>
            </Box>
            <Warning />
            <SurveyAnsweredModal
				dialogOpen={dialogOpen}
                handleDialogClose={handleDialogClose}
                handleSubmitAnotherClick={handleSubmitAnotherClick}
                submissionMessage={survey.submissionMessage}
                oneSubmission={survey.oneSubmission}
			/>
        </SurveyWrapper>
    );
};

SurveyAnswer.propTypes = {
    snackbarShowMessage: PropTypes.func.isRequired,
    selectSurveyAnswer: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
};

export default withSnackbar(SurveyAnswer);