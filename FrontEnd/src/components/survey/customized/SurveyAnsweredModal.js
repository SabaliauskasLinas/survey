import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Tooltip, TextField, DialogActions, Button } from '@material-ui/core';
import { isEmptyOrSpaces } from '../../../helpers/stringHelper';

const SurveyAnsweredModal = (props) => {
    const { dialogOpen, handleDialogClose, handleSubmitAnotherClick, submissionMessage } = props;
    return (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle id="form-dialog-title">Survey answered</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { isEmptyOrSpaces(submissionMessage) ? 'Your response has been recorded.' : submissionMessage }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button id='exit-btn' onClick={handleDialogClose} color="primary">
                    Exit
                </Button>
                <Button variant='outlined' onClick={handleSubmitAnotherClick} color="secondary">
                    Submit another response
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SurveyAnsweredModal;