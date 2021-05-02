import { Select, MenuItem, Typography, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const LinearScaleSettings = (props) => {
    const { setQuestionOptions } = props;
    const [minimum, setMinimum] = useState(1);
    const [maximum, setMaximum] = useState(5);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        handleOptionsChange(minimum, maximum);
    }, [minimum, maximum]);

    useEffect(() => {
        setQuestionOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const handleMinimumChange = e => {
        setMinimum(e.target.value);
    }

    const handleMaximumChange = e => {
        setMaximum(e.target.value);
    }

    const handleOptionsChange = (minimum, maximum) => {
        let options = [];
        for (let i = minimum ; i <= maximum ; i++ )
            options.push({name: i});
        setOptions(options);
    }

    return (
        <Box display="flex">
            <Box ml={2} mr={4}>
                <Select
                    value={minimum}
                    onChange={handleMinimumChange}
                >
                    { [0, 1].map(item => <MenuItem key={`minimum-${item}`} value={item}>{item}</MenuItem>) }
                </Select>
            </Box>
            <Typography>
                to
            </Typography>
            <Box ml={4}>
                <Select
                    value={maximum}
                    onChange={handleMaximumChange}
                >
                    { [2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => <MenuItem key={`maximum-${item}`} value={item}>{item}</MenuItem>) }
                </Select>
            </Box>
        </Box>
    );
}

export default LinearScaleSettings;