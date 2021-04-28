import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Tooltip, TextField, DialogActions, Button } from '@material-ui/core';

const SurveyCreatedModal = (props) => {
    const { dialogOpen, handleDialogClose, handleCopyClick, surveyId, handleSurveyLinkClick } = props;
    return (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle id="form-dialog-title">Survey successfully created</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To share this survey, copy this link and send it to the interested parties.
                </DialogContentText>
                <Tooltip title="Press CTRL + C to copy" disableHoverListener>
                    <TextField
                        id="survey-link"
                        margin="dense"
                        label="Link"
                        type="text"
                        fullWidth
                        value={`http://localhost:3000/survey/answer/${surveyId}`}
                        onClick={handleSurveyLinkClick}
                        onFocus={handleSurveyLinkClick}
                    />
                </Tooltip>
            </DialogContent>
            <DialogActions>
                <Button id='exit-btn' onClick={handleDialogClose} color="secondary">
                    Exit
                </Button>
                <Button variant='outlined' onClick={handleCopyClick} color="primary">
                    Copy
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SurveyCreatedModal;