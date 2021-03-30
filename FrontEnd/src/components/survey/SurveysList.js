import React, { useEffect, useState } from 'react'
import { Badge, Card, CardHeader, Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { getData } from '../../helpers/requestHelper';

function SurveysList(props) {
	const { title, type } = props;
	const [surveys, setSurveys] = useState([]);
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
				})
				.catch(er => {
					console.log(er)
				});
		}
	});

	return (
		<Card>
			<CardHeader
				title={title}
			/>
			<List component="nav" aria-label="main mailbox folders">
				{ (!surveys || surveys.length === 0) &&
					<Typography variant="h5" align={'center'}>
						Could not load data
					</Typography>
				}
				{surveys && surveys.map((item, index) => (
					<div>
						<Divider variant="middle" />
						<ListItem
							button
							key={`survey-${index}`}>
							<ListItemIcon>
								<Tooltip title="Total answers">
									<Badge badgeContent={item.totalAnswers} color="secondary" showZero max={999}>
										<CheckCircle />
									</Badge>
								</Tooltip>
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
					</div>
				))
				}
			</List>
		</Card>
	)
}

export default SurveysList
