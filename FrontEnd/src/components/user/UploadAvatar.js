import { Avatar, Box, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { updateUser } from '../../helpers/authenticationHelper';
import { withSnackbar } from '../../helpers/notificationHelper';
import { postData } from '../../helpers/requestHelper';

const UploadAvatar = (props) => {
    const { currentUser, snackbarShowMessage } = props;
    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [error, setError] = useState(undefined);

    const selectFile = (e) => {
        setError(undefined);

        var fileSize = ((e.target.files[0].size/1024)/1024).toFixed(4); // MB
        if (fileSize > 2) {
            setCurrentFile(undefined);
            setPreviewImage(undefined);
            setError('File size must not exceed 2 MB')
            return;
        }

        setCurrentFile(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    const uploadFile = (e) => {
        var formData = new FormData();
        formData.set("file", currentFile);

        postData(`Users/UploadAvatar/${currentUser.id}`, formData, [ { key:'Content-Type', value: undefined } ], false)
            .then(res => {
                if(res.success) {
                    setError(undefined);
                    snackbarShowMessage('Avatar changed successfuly')
                    currentUser.avatar = res.data;
                    updateUser(currentUser);
                }
                else {
                    setError(res.errorMessage)
                    snackbarShowMessage('Avatar upload failed', 'error')
                }
            })
            .catch(er => {
                console.log(er);
                snackbarShowMessage('Avatar upload failed', 'error')
            });
    }

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box display='flex' alignItems='center'>
                <Box mr={2}>
                    { previewImage || currentUser.avatar
                        ?
                            <Avatar src={previewImage ? previewImage : 'data:image/jpeg;base64,' + currentUser.avatar} style={{width: '60px', height: '60px' }} />
                        :
                            <Avatar style={{width: '60px', height: '60px' }} >
                                {currentUser.firstName[0]}{currentUser.lastName[0]}
                            </Avatar>
                    }
                </Box>
                <label htmlFor="btn-upload">
                    <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange={selectFile} 
                    />
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span" 
                    >
                        Choose Image
                    </Button>
                </label>
                <Box ml={2}>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        display="block"
                    >
                        {currentFile ? currentFile.name : null}
                    </Typography>
                    { error &&
                        <Typography
                            component="span"
                            color='error' 
                            variant='caption'
                            display="block"
                        >
                            {error}
                        </Typography>
                    }
                </Box>
            </Box>
            <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!currentFile}
                onClick={uploadFile}
            >
                Save
            </Button>
        </Box>
    )
}

export default withSnackbar(UploadAvatar);