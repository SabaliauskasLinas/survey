import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { isEmptyOrSpaces } from '../../../helpers/stringHelper';

const MultipleChoice = (props) => {
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
            <RadioGroup  value={answer} onChange={handleAnswerChange}>
                { options.map((option, index) => (
                    <FormControlLabel key={`option-${option.id}`} value={option.name} control={<Radio />} label={option.name} />))
                }
            </RadioGroup>
            { error &&
                <Typography color='error' variant='caption'>
                    {error.message}
                </Typography>
            }
        </div>

    );
}

export default MultipleChoice;