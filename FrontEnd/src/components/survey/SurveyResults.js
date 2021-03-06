import { Box, CardContent, withStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import questionTypes from '../../enums/questionTypes';
import { groupBy } from '../../helpers/groupByHelper';
import { getData } from '../../helpers/requestHelper';
import BarChartPreview from './charts/BarChartPreview';
import PieChartPreview from './charts/PieChartPreview';
import StyledCard from './customized/StyledCard';
import SurveyWrapper from './customized/SurveyWrapper';

const styles = (theme) => ({
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
                        <Typography key={`answer-${answer.id}`} paragraph className={classes.grayBackground}>
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
                <BarChartPreview question={question} axis={'y'} />
            )
        }
        case questionTypes.LINEAR_SCALE: {
            return (
                <BarChartPreview question={question} axis={'x'} />
            )
        }
        default: {
            return <div />;
        }
    }
}

const SurveyResults = (props) => {
    const { classes, selectSurveyResults, currentUser } = props;
    const [survey, setSurvey] = useState({});
    const { id } = useParams();
    var history = useHistory();

    useEffect(() => {
        selectSurveyResults();
        getData(`Survey/GetSurveyWithAnswers/${id}`)
            .then(res => {
                if (currentUser.id !== res.userId) {
                    history.push('/');
                    return;
                }

                setSurvey(res)
            })
            .catch(er => {
                console.log(er)
            });
    }, [selectSurveyResults, id, currentUser, history]);

    return (
        <SurveyWrapper>
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
                            <Typography variant='subtitle2' color='primary'>
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
        </SurveyWrapper>
    );
}

export default withStyles(styles, { withTheme: true })(SurveyResults);