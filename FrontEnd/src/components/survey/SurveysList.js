import React from 'react'
import { Badge, Box, Card, CardHeader, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography, withStyles } from "@material-ui/core";
import { Check, CheckCircle, Drafts, Inbox, Mail } from "@material-ui/icons";

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

function SurveysList(props) {
	const { title } = props;
	return (
		<Card>
			<CardHeader
				title={title}
			/>
			<List component="nav" aria-label="main mailbox folders">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
					<div>
						<Divider variant="middle" />
						<ListItem 
							button 
							key={`survey-${index}`}>
							<ListItemIcon>
								<Tooltip title="Total answers">
									<Badge badgeContent={4} color="secondary" showZero max={999}>
										<CheckCircle />
									</Badge>
								</Tooltip>
							</ListItemIcon>
							<ListItemText 
								primaryTypographyProps={{ noWrap: true, variant: 'h6' }}
								primary="Didžiausių Europos oro linijų bendrovių, vykdančių veiklą Lietuvos oro uostuose, taikomų vartotojų lojalumo programų naudos tyrimas (vartotojų požiūriu)"
								secondary={
									<React.Fragment>
									  <Typography
										component="span"
										variant="body2"
										color="textSecondary"
										noWrap
										display="block"
									  >
										Kiekvienas turi būti vertinamas pagal savo gebėjimus ir gauti atlygį, priklausantį nuo darbo rezultatų!Moterų informacijos centras organizuoją dešimtąjį „Lyg
									  </Typography>
									  	2021-03-29 20:50
									</React.Fragment>
								}/>
						</ListItem>
					</div>
				))
				}
			</List>
		</Card>
	)
}

export default SurveysList
