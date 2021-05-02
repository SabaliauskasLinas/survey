import { Checkbox, FormControlLabel, FormGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const Checkboxes = (props) => {
    const { options, changeAnswers, error } = props;
    const [answers, setAnswers] = useState([]);

    const handleAnswerChange = e => {
        let newAnswers = [...answers];
        if (e.target.checked)
            newAnswers.push(e.target.value);
        else
            newAnswers.splice(newAnswers.indexOf(e.target.value), 1);
        
        setAnswers(newAnswers);
    }

    useEffect(() => {
        changeAnswers(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers]);

    return (
        <div>
            <FormGroup>
                { options.map((option, index) => (
                    <FormControlLabel key={`option-${option.id}`} value={option.name} control={<Checkbox onChange={handleAnswerChange}/>} label={option.name} />))
                }
            </FormGroup>
            { error &&
                <Typography color='error' variant='caption'>
                    {error.message}
                </Typography>
            }
        </div>

    );
}

export default Checkboxes;