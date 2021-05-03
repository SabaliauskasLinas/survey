import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { isEmptyOrSpaces } from '../../../helpers/stringHelper';

const SurveyAnsweredModal = (props) => {
    const { dialogOpen, handleDialogClose, handleSubmitAnotherClick, submissionMessage, oneSubmission } = props;
    return (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle id="form-dialog-title">Survey answered</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { isEmptyOrSpaces(submissionMessage) ? 'Your response has been recorded.' : submissionMessage }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button id='exit-btn' onClick={handleDialogClose} color="secondary">
                    Exit
                </Button>
                { !oneSubmission &&
                    <Button variant='outlined' onClick={handleSubmitAnotherClick} color="primary">
                        Submit another response
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default SurveyAnsweredModal;