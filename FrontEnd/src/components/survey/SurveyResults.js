import { Box, CardContent, withStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import questionTypes from '../../enums/questionTypes';
import { groupBy } from '../../helpers/groupByHelper';
import { getData } from '../../helpers/requestHelper';
import PieChartPreview from './charts/PieChartPreview';
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
    grayBackground: {
        padding: theme.spacing(1),
        background: '#f8f9fa'
    },
});

const DataControl = props => {
    const { question, classes } = props;

    switch (question.questionTypeId) {
        case questionTypes.SHORT_ANSWER:
        case questionTypes.PARAGRAPH: {
            return (
                <div>
                    { question.answers.map((answer, index) => (
                        <Typography paragraph className={classes.grayBackground}>
                            {answer.content}
                        </Typography>))
                    }
                </div>
            )
        }
        case questionTypes.MULTIPLE_CHOICE: {
            return (
                <PieChartPreview question={question} />
            )
        }
        case questionTypes.CHECKBOXES: {
            return (
                <div>labas3</div>
            )
        }
        case questionTypes.LINEAR_SCALE: {
            return (
                <div>labas4</div>
            )
        }
        default: {
            return <div/>;
        }
    }
}

const SurveyResults = (props) => {
    const { classes, selectSurveyResults } = props;
    const [ survey, setSurvey ] = useState({});
    const { id } = useParams();

    useEffect(() => {
        selectSurveyResults();
        getData(`https://localhost:44303/api/Survey/GetSurveyWithAnswers/${id}`)
            .then(res => res.json())
            .then(res => {
                setSurvey(res);
            })
            .catch(er => {
                console.log(er)
            });
    }, [selectSurveyResults, id]);

    return (
        <div className={"sm-p-top"}>
            <div className={classNames("container-fluid", classes.container)}>
                <Box display="flex" justifyContent="center" className="row">
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h4">
                                {survey.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                {survey.description}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                    {survey.questions && survey.questions.map((item, index) => (
                        <StyledCard key={`question-${item.id}`}>
                            <CardContent>
                                <Typography variant='subtitle2' color='secondary'>
                                    {groupBy(item.answers, 'submissionId').length} responses
                                </Typography>
                                <Typography variant='h5'>
                                    {item.name}
                                </Typography>
                                <Box mt={2}>
                                    <DataControl question={item} classes={classes} />
                                </Box>
                            </CardContent>
                        </StyledCard>))
                    }
                </Box>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(SurveyResults);