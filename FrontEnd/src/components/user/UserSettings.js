import { Box, Button, CardContent, CardHeader, Divider, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import StyledCard from '../survey/customized/StyledCard';
import SurveyWrapper from '../survey/customized/SurveyWrapper';
import UploadAvatar from './UploadAvatar';

const UserSettings = (props) => {
    const { selectUserSettings, currentUser } = props;

    useEffect(() => {
        selectUserSettings();
    }, [selectUserSettings]);

    return (
        <SurveyWrapper>
			<Box display="flex" justifyContent="center" className="row">
				<StyledCard>
                    <CardHeader
                        title={'Settings'}
                    />
                    <CardContent>
                        <Box mb={1}>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6'>
                                    Personal info
                                </Typography>
                                <Button
                                    className="btn-upload"
                                    color="primary"
                                    variant="contained"
                                    component="span"
                                    disabled
                                    //onClick={this.upload}
                                >
                                    Save
                                </Button>
                            </Box>
                            <TextField
                                value={currentUser.email}
                                disabled
                                fullWidth
                                color='primary'
                                label="Email"
                                margin='normal'
                                variant='outlined'
                                autoComplete='off'
                            />
                            <TextField
                                value={currentUser.firstName}
                                fullWidth
                                color='primary'
                                label="First name"
                                margin='normal'
                                variant='outlined'
                                autoComplete='off'
                            />
                            <TextField
                                value={currentUser.lastName}
                                fullWidth
                                color='primary'
                                label="Last name"
                                margin='normal'
                                variant='outlined'
                                autoComplete='off'
                            />
                            <TextField
                                value={currentUser.description}
                                fullWidth
                                color='primary'
                                label="Description"
                                margin='normal'
                                variant='outlined'
                                autoComplete='false'
                                name='description'
                                inputProps={{
                                    autoComplete: 'description',
                                    form: {
                                        autoComplete: 'off',
                                    },
                                }}
                            />
                        </Box>
                        <Divider/>
                        <Box mt={1} mb={2} >
                            <Typography variant='h6'>
                                Avatar
                            </Typography>
                            <Box mt={1}>
                                <UploadAvatar currentUser={currentUser} />
                            </Box>
                        </Box>
                        <Divider/>
                        <Box mt={2}>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6'>
                                    Change password
                                </Typography>
                                <Button
                                    className="btn-upload"
                                    color="primary"
                                    variant="contained"
                                    component="span"
                                    disabled
                                    //onClick={this.upload}
                                >
                                    Save
                                </Button>
                            </Box>
                            <TextField
                                fullWidth
                                color='primary'
                                label="Current password"
                                margin='normal'
                                variant='outlined'
                                type='password'
                                autoComplete='off'
                                inputProps={{
                                    autoComplete: 'new-password',
                                    form: {
                                        autoComplete: 'off',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                color='primary'
                                label="New password"
                                margin='normal'
                                variant='outlined'
                                type='password'
                                autoComplete='off'
                            />
                            <TextField
                                fullWidth
                                color='primary'
                                label="Repeat new password"
                                margin='normal'
                                variant='outlined'
                                type='password'
                                autoComplete='off'
                            />
                        </Box>
                    </CardContent>
                </StyledCard>
            </Box>
        </SurveyWrapper>
    )
}

export default UserSettings;