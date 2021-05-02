import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { isEmptyOrSpaces } from '../../../helpers/stringHelper';

const LinearScale = (props) => {
    const { options, changeAnswers, error } = props;
    const [answer, setAnswer] = useState('');

    const handleAnswerChange = e => {
        setAnswer(e.target.value);
    }

    useEffect(() => {
        if (!isEmptyOrSpaces(answer))
            changeAnswers([answer]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answer]);

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <RadioGroup row value={answer} onChange={handleAnswerChange}>
                    {options.sort((a, b) => a.name - b.name).map((option, index) => (
                        <FormControlLabel labelPlacement='top' key={`option-${option.id}`} value={option.name} control={<Radio />} label={option.name} />))
                    }
                </RadioGroup>
            </Box>
            { error &&
                <Typography color='error' variant='caption'>
                    {error.message}
                </Typography>
            }
        </div>
    );
}

export default LinearScale;