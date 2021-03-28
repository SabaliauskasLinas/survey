import React from 'react'
import { Box, Card, CardHeader, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, withStyles } from "@material-ui/core";
import { Drafts, Inbox } from "@material-ui/icons";

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
						<ListItem button key={`survey-${index}`}>
							<Grid container spacing={5}>
								<Grid item xs={12}>
									Labas
								</Grid>
								<Grid item xs={12}>
									Labas
								</Grid>
							</Grid>
							{/* <ListItemIcon>
								<Inbox />
							</ListItemIcon>
							<ListItemText primary="Apklausytė" /> */}
						</ListItem>
					</div>
				))
				}
			</List>
		</Card>
	)
}

export default SurveysList
