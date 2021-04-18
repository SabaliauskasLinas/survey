import { Box, Dialog, Tooltip, CardContent, withStyles, withWidth, TextField, Select, MenuItem, ListItemIcon, CardHeader, Avatar, CardActions, FormControlLabel, Switch, Divider, IconButton, Fab, Grid, Button, Modal, DialogTitle, DialogContent, DialogContentText, DialogActions, RadioGroup, Radio } from '@material-ui/core';
import { CheckBox, Delete, LinearScale, RadioButtonChecked, ShortText, Subject, Add } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router';
import { withSnackbar } from '../../helpers/notificationHelper';
import { postData } from '../../helpers/requestHelper';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';
import MultipleChoice from './customized/MultipleChoice';
import StyledCard from './customized/StyledCard';

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
	},
	{
		id: 2,
		text: "Paragraph",
		icon: <Subject />,
	},
	{
		id: 3,
		text: "Multiple choice",
		icon: <RadioButtonChecked />,
	},
	{
		id: 4,
		text: "Checkboxes",
		icon: <CheckBox />,
	},
	{
		id: 5,
		text: "Linear scale",
		icon: <LinearScale />,
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
	const { question, changeOptions } = props;

	switch (question.questionTypeId) {
		case 1: {
			return (
				<TextField
					placeholder='Short answer text'
					color='secondary'
					disabled
					style={{ width: '40%' }}
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
		case 3: {
			return (
				<MultipleChoice
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
			</div>
			<Warning />
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle id="form-dialog-title">Survey successfully created</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To share this survey, copy this link and send it to the interested parties.
          			</DialogContentText>
					<Tooltip title="Press CTRL + C to copy" disableHoverListener>
						<TextField
							id="survey-link"
							margin="dense"
							label="Link"
							type="text"
							fullWidth
							value={`http://localhost:3000/survey/answer/${surveyId}`}
							onClick={handleSurveyLinkClick}
							onFocus={handleSurveyLinkClick}
						/>
					</Tooltip>
				</DialogContent>
				<DialogActions>
					<Button id='exit-btn' onClick={handleDialogClose} color="primary">
						Exit
          			</Button>
					<Button variant='outlined' onClick={handleCopyClick} color="secondary">
						Copy
          			</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withWidth()(
	withStyles(styles, { withTheme: true })(withSnackbar(SurveyCreate))
);