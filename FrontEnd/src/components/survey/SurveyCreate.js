import { Box, CardContent, withStyles, withWidth, TextField, Select, MenuItem, ListItemIcon, CardHeader, Avatar, CardActions, FormControlLabel, Switch, Divider, IconButton, Grid, Button } from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router';
import { withSnackbar } from '../../helpers/notificationHelper';
import { postData } from '../../helpers/requestHelper';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';
import CheckboxesSettings from './customized/CheckboxesSettings';
import LinearScaleSettings from './customized/LinearScaleSettings';
import MultipleChoiceSettings from './customized/MultipleChoiceSettings';
import StyledCard from './customized/StyledCard';
import questionTypes from '../../enums/questionTypes';
import SurveyWrapper from './customized/SurveyWrapper';
import SurveyCreatedModal from './customized/SurveyCreatedModal';
import questionTypesExtended from '../../enums/questionTypesExtended';

const styles = (theme) => ({
	inlineInputs: {
		display: "flex",
		justifyContent: "space-between"
	},
	answer: {
		margin: theme.spacing(2)
	},
});


function QuestionTypes() {
	return (
		questionTypesExtended.map((item, index) => (
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
	const { question, changeOptions } = props;

	switch (question.questionTypeId) {
		case questionTypes.SHORT_ANSWER: {
			return (
				<TextField
					placeholder='Short answer text'
					color='secondary'
					disabled
					style={{ width: '40%' }}
				/>
			)
		}
		case questionTypes.PARAGRAPH: {
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
		case questionTypes.MULTIPLE_CHOICE: {
			return (
				<MultipleChoiceSettings
					setQuestionOptions={options => changeOptions(options)}
				/>
			)
		}
		case questionTypes.CHECKBOXES: {
			return (
				<CheckboxesSettings
					setQuestionOptions={options => changeOptions(options)}
				/>
			)
		}
		case questionTypes.LINEAR_SCALE: {
			return (
				<LinearScaleSettings
					setQuestionOptions={options => changeOptions(options)}
				/>
			)
		}
		default: {
			return (
				<TextField
					placeholder='Short answer text'
					color='secondary'
					disabled
					style={{ width: '40%' }}
				/>
			)
		}
	}
}

function SurveyCreate(props) {
	const { classes, snackbarShowMessage, selectSurveyCreate } = props;
	const initialTitle = 'Untitled survey';
	const [title, setTitle] = useState(initialTitle);
	const [description, setDescription] = useState('');
	const [submissionMessage, setSubmissionMessage] = useState('');
	const [questions, setQuestions] = useState([{ questionTypeId: 1, required: true, key: Math.random() }]);
	const [shouldBlockNavigation, SetShouldBlockNavigation] = useState(false);
	const [errors, setErrors] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [surveyId, setSurveyId] = useState(0);

	useEffect(() => {
		selectSurveyCreate();
	}, [selectSurveyCreate]);

	const validateSurvey = () => {
		let newErrors = [];

		if (!questions || questions.length === 0) {
			handleAddClick();
			snackbarShowMessage('At least one question is required', 'error');
			return false;
		}

		questions.forEach(q => {
			if (isEmptyOrSpaces(q.name))
				newErrors.push({ questionKey: q.key, message: 'Question is required' });

			if (q.hasError)
				newErrors.push({});
		});

		if (newErrors.length > 0) {
			setErrors(newErrors);
			snackbarShowMessage('Please fix validation errors', 'error');
			return false;
		}

		return true;
	}

	//#region handlers
	const handleDialogClose = () => {
		window.location.href = '/surveys';
	}

	const handleSurveyLinkClick = () => {
		var copyText = document.getElementById("survey-link");

		copyText.select();
		copyText.setSelectionRange(0, 99999);
	}

	const handleCopyClick = () => {
		var copyText = document.getElementById("survey-link");

		copyText.select();
		copyText.setSelectionRange(0, 99999);

		document.execCommand("copy");
		snackbarShowMessage('Copied to clipboard');

		document.getElementById("exit-btn").focus();
	}

	const handleAddClick = () => {
		setQuestions(oldQuestions => [...oldQuestions, { questionTypeId: 1, required: true, key: Math.random() }])
	};

	const handleDeleteClick = index => e => {
		questions.splice(index, 1);
		setQuestions([...questions]);
		snackbarShowMessage('Question deleted');
	};

	const handleCreateClick = e => {
		var valid = validateSurvey();
		if (!valid)
			return;

		let survey = {
			name: title,
			description: description,
			userId: 1,
			oneSubmission: false,
			questions: questions,
			submissionMessage: submissionMessage,
		};

		// TODO: postData('Survey', {...})
		postData('https://localhost:44303/api/Survey', survey)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if (res && res.id) {
					setSurveyId(res.id);
					setDialogOpen(true);
					snackbarShowMessage('Survey created');
				}
				else
					snackbarShowMessage('Something went wrong', 'error');
			})
			.catch(er => {
				console.log(er)
				snackbarShowMessage('Something went wrong', 'error');
			});
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleTitleBlur = (e) => {
		if (isEmptyOrSpaces(e.target.value))
			setTitle(initialTitle);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmissionMessageChange = (e) => {
		setSubmissionMessage(e.target.value);
	};

	const handleQuestionChange = index => e => {
		let newQuestions = [...questions];
		newQuestions[index].name = e.target.value;
		setQuestions(newQuestions);
	};

	const handleQuestionOptionsChange = (options, index) => {
		let newQuestions = [...questions];
		newQuestions[index].options = options;
		newQuestions[index].hasError = options.find(o => o.error) != null;
		setQuestions(newQuestions);
	};

	const handleTypeChange = index => e => {
		let newQuestions = [...questions];
		newQuestions[index].questionTypeId = e.target.value;
		setQuestions(newQuestions);
	};

	const handleRequiredChange = index => e => {
		let newQuestions = [...questions];
		newQuestions[index].required = e.target.checked;
		setQuestions(newQuestions);
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

	return (
		<SurveyWrapper>
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
							multiline
							fullWidth
							placeholder='Title'
							color='secondary'
							inputProps={{ style: { fontSize: 35, lineHeight: 1.5 } }}
							margin='dense'
							label="Title"
						/>
						<TextField
							value={description}
							onChange={handleDescriptionChange}
							multiline
							fullWidth
							color='secondary'
							label="Description"
							margin='dense'
						/>
						<TextField
							value={submissionMessage}
							onChange={handleSubmissionMessageChange}
							multiline
							fullWidth
							placeholder='Your response has been recorded.'
							color='secondary'
							label="Submission message"
							margin='dense'
						/>
					</CardContent>
				</StyledCard>
				{questions.map((item, index) => (
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
										error={errors.find(e => e.questionKey === item.key)}
										helperText={errors.find(e => e.questionKey === item.key) && errors.find(e => e.questionKey === item.key).message}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<Select
										className={classes.type}
										variant="outlined"
										color='secondary'
										onChange={handleTypeChange(index)}
										value={item.questionTypeId}
										fullWidth
									>
										{QuestionTypes()}
									</Select>
								</Grid>
							</Grid>
						</CardContent>
						<div className={classes.answer}>
							<AnswerControl question={item} changeOptions={options => handleQuestionOptionsChange(options, index)} />
						</div>
						<Divider variant="middle" />
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
			</Box>
			<Box display="flex" justifyContent="center" mb={2}>
				<Button variant="contained" color="secondary" onClick={handleAddClick}>
					<Add />
				</Button>
			</Box>
			<Box display="flex" justifyContent="center" >
				<Button variant="contained" color="primary" onClick={handleCreateClick}>
					Create
				</Button>
			</Box>
			<Warning />
			<SurveyCreatedModal
				dialogOpen={dialogOpen}
				handleDialogClose={handleDialogClose}
				handleCopyClick={handleCopyClick}
				handleSurveyLinkClick={handleSurveyLinkClick}
				surveyId={surveyId}
			/>
		</SurveyWrapper>
	);
}

export default withWidth()(
	withStyles(styles, { withTheme: true })(withSnackbar(SurveyCreate))
);