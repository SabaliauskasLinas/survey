import { Box, FormControlLabel, TextField, IconButton, Checkbox } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React from 'react';

const InputCheckbox = (props) => {
    const { value, onChange, checked, placeholder, onTextChange, onClick, imitator, onRemove, error } = props;
    return (
        <FormControlLabel
            value={value}
            onChange={onChange}
            checked={checked}
            control={<Checkbox disabled />}
            label={
                <Box display="flex">
                    <TextField
                        placeholder={placeholder}
                        margin="normal"
                        onChange={onTextChange}
                        style={imitator ? { width: '50%' } : {}}
                        onClick={onClick}
                        autoFocus
                        value={value}
                        error={error}
                        helperText={error && 'Duplicate options not supported'}
                    />
                    { !imitator &&
                        <IconButton onClick={onRemove}>
                            <Clear />
                        </IconButton>
                    }
                </Box>
            }
        />
    );
}

export default InputCheckbox;