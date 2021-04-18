import { RadioGroup } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { isEmptyOrSpaces } from '../../../helpers/stringHelper';
import InputRadio from './InputRadio';

const MultipleChoice = (props) => {
    const { setQuestionOptions } = props;
    const [options, setOptions] = useState([{ name: 'Option 1', key: Math.random() }]);

    useEffect(() => {
        setQuestionOptions(options.filter(o => !isEmptyOrSpaces(o.name)));
    }, [options]);
    
    const handleInputRadioChange = (e, index) => {
        let newOptions = [...options];
        let duplicates = newOptions.filter(o => o.name === e.target.value);
		newOptions[index].name = e.target.value;
		newOptions[index].error = duplicates != null && duplicates.length > 0;
		setOptions(newOptions);
    }

    const handleInputRadioRemove = index => {
		options.splice(index, 1);
		setOptions([...options]);
    }

    const handleInputRadioCreation = e => {
        let name = `Option ${options.length + 1}`;
        let duplicates = options.filter(o => o.name === name);
        setOptions(oldOptions => [...oldOptions, 
            { 
                name: name, 
                key: Math.random(),
                error: duplicates != null && duplicates.length > 0
            }])
    }

    return (
        <RadioGroup>
            { options.map((option, index) => (
                <InputRadio
                    key={`option-${option.key}`}
                    onTextChange={e => handleInputRadioChange(e, index)}
                    placeholder='Option'
                    value={option.name}
                    onRemove={() => handleInputRadioRemove(index)}
                    error={option.error}
                />))
            }
            <InputRadio
                onClick={handleInputRadioCreation}
                placeholder='Add option'
                checked={false}
                imitator
            />
        </RadioGroup>
    );
}

export default MultipleChoice;