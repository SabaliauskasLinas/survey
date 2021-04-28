import React, { useEffect, useState } from 'react'
import { Badge, Card, CardHeader, Divider, Fab, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@material-ui/core";
import { BarChart } from "@material-ui/icons";
import { getData } from '../../helpers/requestHelper';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../helpers/LoadingSpinner';

function SurveysList(props) {
	const { title, type } = props;
	const [surveys, setSurveys] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let endpoint = '';
		switch (type) {
			case 'popular':
				endpoint = 'GetMostPopularSurveys';
				break;
			case 'recent':
				endpoint = 'GetMostRecentSurveys';
				break;
			default:
				console.log('Survey type not handled');
		}

		if (endpoint) {
			getData(`https://localhost:44303/api/Survey/${endpoint}`)
				.then(res => res.json())
				.then(res => {
					setSurveys(res);
					setLoading(false);
				})
				.catch(er => {
					console.log(er)
					setLoading(false);
				});
		}
	}, [type]);

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
						<ListItem button component={Link} to={`/survey/answer/${item.id}`}>
							{/* <ListItemIcon>
								<Tooltip title="Total answers">
									<Badge badgeContent={item.totalAnswers} color="secondary" showZero max={999}>
										<CheckCircle />
									</Badge>
								</Tooltip>
							</ListItemIcon> */}
							<ListItemIcon>
								<Link to={`/survey/results/${item.id}`}>
									<Tooltip title="Results">
										<Badge badgeContent={item.totalAnswers} color="primary" showZero max={999}>
											<Fab size='small' color='primary'>
												<BarChart />
											</Fab>
										</Badge>
									</Tooltip>
								</Link>
							</ListItemIcon>
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
					</div>))
				}
			</List>
		</Card>
	)
}

export default SurveysList
