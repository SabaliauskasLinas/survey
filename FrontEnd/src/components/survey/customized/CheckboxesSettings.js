import { FormGroup } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { isEmptyOrSpaces } from '../../../helpers/stringHelper';
import InputCheckbox from './InputCheckbox';

const CheckboxesSettings = (props) => {
    const { setQuestionOptions } = props;
    const [options, setOptions] = useState([{ name: 'Option 1', key: Math.random() }]);

    useEffect(() => {
        setQuestionOptions(options.filter(o => !isEmptyOrSpaces(o.name)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const handleInputCheckboxChange = (e, index) => {
        let newOptions = [...options];
        let duplicates = newOptions.filter(o => o.name === e.target.value);
		newOptions[index].name = e.target.value;
		newOptions[index].error = duplicates != null && duplicates.length > 0;
		setOptions(newOptions);
    }

    const handleInputCheckboxRemove = index => {
		options.splice(index, 1);
		setOptions([...options]);
    }

    const handleInputCheckboxCreation = e => {
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
        <FormGroup>
            { options.map((option, index) => (
                <InputCheckbox
                    key={`option-${option.key}`}
                    onTextChange={e => handleInputCheckboxChange(e, index)}
                    placeholder='Option'
                    value={option.name}
                    onRemove={() => handleInputCheckboxRemove(index)}
                    error={option.error}
                />))
            }
            <InputCheckbox
                onClick={handleInputCheckboxCreation}
                placeholder='Add option'
                checked={false}
                imitator
            />
        </FormGroup>
    );
}

export default CheckboxesSettings;