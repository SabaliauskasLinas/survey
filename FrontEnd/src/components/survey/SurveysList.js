import React, { useEffect, useState } from 'react'
import { Badge, Box, Card, CardHeader, Divider, Fab, List, ListItem, ListItemText, Tooltip, Typography } from "@material-ui/core";
import { BarChart } from "@material-ui/icons";
import { getData } from '../../helpers/requestHelper';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../helpers/LoadingSpinner';

function SurveysList(props) {
	const { title, type, currentUser } = props;
	const [surveys, setSurveys] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let endpoint = '';
		let userId = '';
		switch (type) {
			case 'popular':
				endpoint = 'GetMostPopularSurveys';
				break;
			case 'recent':
				endpoint = 'GetMostRecentSurveys';
				break;
			case 'my': {
				endpoint = 'GetUserSurveys';
				userId = currentUser.id;
				break;
			}
			case 'answered': {
				endpoint = 'GetUserAnsweredSurveys';
				userId = currentUser.id;
				break;
			}
			default:
				console.log('Survey type not handled');
		}

		if (endpoint) {
			getData(`Survey/${endpoint}/${userId}`)
				.then(res => {
					setSurveys(res);
					setLoading(false);
				})
				.catch(er => {
					console.log(er)
					setLoading(false);
				});
		}
	}, [type, currentUser]);

	return (
		<Card>
			<CardHeader
				title={title}
			/>
			<List component="nav" aria-label="main mailbox folders">
				{ loading && <LoadingSpinner /> }
				{ !loading && (!surveys || surveys.length === 0) &&
					<Typography variant="h5" align={'center'}>
						Could not load data
					</Typography>
				}
				{ !loading && surveys && surveys.map((item, index) => (
					<div key={`survey-${index}`}>
						<Divider variant="middle" />
						<Box display='flex' alignItems="center" ml={2}>
							<Box>
								{ type === 'my' && currentUser && item.userId === currentUser.id 
									?
										<Link to={`/survey/results/${item.id}`}>
											<Tooltip title="View results">
												<Badge badgeContent={item.totalAnswers} color="primary" showZero max={999}>
													<Fab size='small' color='primary'>
														<BarChart />
													</Fab>
												</Badge>
											</Tooltip>
										</Link>
									:
										<Tooltip title="Submissions">
											<Fab size='small' color='primary' style={{cursor: 'default'}}>
												<Box fontWeight="fontWeightBold">
													{item.totalAnswers}
												</Box>
											</Fab>
										</Tooltip>
								}
							</Box>
							<ListItem button component={Link} to={`/survey/answer/${item.id}`} style={{width: '90%'}}>
								<ListItemText
									primaryTypographyProps={{ noWrap: true, variant: 'h6' }}
									primary={item.name}
									secondary={
										<React.Fragment>
											<Typography
												component="span"
												variant="body2"
												color="textSecondary"
												noWrap
												display="block"
											>
												{item.description}
											</Typography>
											{new Date(item.createdAt).toLocaleString()}
										</React.Fragment>
									} />
							</ListItem>
						</Box>
					</div>))
				}
			</List>
		</Card>
	)
}

export default SurveysList
