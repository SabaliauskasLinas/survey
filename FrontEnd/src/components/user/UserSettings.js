import { Box, Button, CardContent, CardHeader, Divider, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { updateUser } from '../../helpers/authenticationHelper';
import { withSnackbar } from '../../helpers/notificationHelper';
import { postData } from '../../helpers/requestHelper';
import { isEmptyOrSpaces } from '../../helpers/stringHelper';
import VisibilityPasswordTextField from '../helpers/VisibilityPasswordTextField';
import StyledCard from '../survey/customized/StyledCard';
import SurveyWrapper from '../survey/customized/SurveyWrapper';
import UploadAvatar from './UploadAvatar';

const UserSettings = (props) => {
    const { snackbarShowMessage, selectUserSettings, currentUser } = props;
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [description, setDescription] = useState(currentUser.description || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeated, setNewPasswordRepeated] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    
    const savePersonalInfo = () => {
        postData('Users/SavePersonalInfo', { userId: currentUser.id, firstName: firstName, lastName: lastName, description: description })
            .then(res => {
                if (res.success) {
                    currentUser.firstName = firstName;
                    currentUser.lastName = lastName;
                    currentUser.description = description;

                    updateUser(currentUser);
                    snackbarShowMessage('Personal info changed');
                }
            });
    }

    const changePassword = () => {
        if (newPassword !== newPasswordRepeated) {
            setError('passwordsDontMatch');
            return;
        }

        if (newPassword.length < 6) {
            setError('passwordTooShort');
            return;
        }

        postData('Users/ChangePassword', { userId: currentUser.id, currentPassword: currentPassword, newPassword: newPassword })
            .then(res => {
                if (res.success)
                    snackbarShowMessage('Password changed');
                else {
                    switch(res.code) {
                        case 1:
                            setError('wrongPassword');
                            break;
                        case 2:
                            setError('passwordTooShort');
                            break;
                        default:
                            console.log('Error code not handled');
                    }
                }
            })
            .catch(er => console.log(er));
    }

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
                                    disabled={firstName === currentUser.firstName && lastName === currentUser.lastName && description === (currentUser.description || '')}
                                    onClick={savePersonalInfo}
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
                                value={firstName}
                                fullWidth
                                color='primary'
                                label="First name"
                                margin='normal'
                                variant='outlined'
                                autoComplete='off'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                value={lastName}
                                fullWidth
                                color='primary'
                                label="Last name"
                                margin='normal'
                                variant='outlined'
                                autoComplete='off'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                value={description}
                                fullWidth
                                color='primary'
                                label="Description"
                                margin='normal'
                                variant='outlined'
                                autoComplete='false'
                                name='description'
                                onChange={(e) => setDescription(e.target.value)}
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
                                    disabled={isEmptyOrSpaces(currentPassword) || isEmptyOrSpaces(newPassword) || isEmptyOrSpaces(newPasswordRepeated)}
                                    onClick={changePassword}
                                >
                                    Save
                                </Button>
                            </Box>
                            <VisibilityPasswordTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={error === "wrongPassword"}
                                label="Current password"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (error === "wrongPassword")
                                        setError(null);
                                    
                                    setCurrentPassword(e.target.value)
                                }}
                                helperText={(() => {
                                    if (error === "wrongPassword")
                                        return "Wrong password";
                                    return null;
                                })()}
                                FormHelperTextProps={{ error: true }}
                                InputLabelProps={{ required: false }}
                                isVisible={isPasswordVisible}
                                onVisibilityChange={setIsPasswordVisible}
                            />
                            <VisibilityPasswordTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={error === "passwordTooShort" || error === "passwordsDontMatch"}
                                label="New password"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (error === "passwordTooShort" || error === "passwordsDontMatch")
                                        setError(null);
                                    
                                    setNewPassword(e.target.value)
                                }}
                                helperText={(() => {
                                    if (error === "passwordTooShort")
                                        return "Create a password at least 6 characters long.";
                                    if (error === "passwordsDontMatch")
                                        return "Passwords do not match.";
                                    return null;
                                })()}
                                FormHelperTextProps={{ error: true }}
                                InputLabelProps={{ required: false }}
                                isVisible={isPasswordVisible}
                                onVisibilityChange={setIsPasswordVisible}
                            />
                            <VisibilityPasswordTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={error === "passwordTooShort" || error === "passwordsDontMatch"}
                                label="Repeat new password"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (error === "passwordTooShort" || error === "passwordsDontMatch")
                                        setError(null);
                                    
                                    setNewPasswordRepeated(e.target.value)
                                }}
                                helperText={(() => {
                                    if (error === "passwordTooShort")
                                        return "Create a password at least 6 characters long.";
                                    if (error === "passwordsDontMatch")
                                        return "Passwords do not match.";
                                    return null;
                                })()}
                                FormHelperTextProps={{ error: true }}
                                InputLabelProps={{ required: false }}
                                isVisible={isPasswordVisible}
                                onVisibilityChange={setIsPasswordVisible}
                            />
                        </Box>
                    </CardContent>
                </StyledCard>
            </Box>
        </SurveyWrapper>
    )
}

export default withSnackbar(UserSettings);