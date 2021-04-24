import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getRandomColor } from '../../../helpers/randomColorHelper';

const PieChartPreview = (props) => {
    const { question } = props;
    const [ data, setData ] = useState({});

    useEffect(() => {
        let labels = [];
        let backgroundColors = [];
        let datasetData = [];

        question.options.forEach(o => {
            labels.push(o.name);
            backgroundColors.push(getRandomColor());
            datasetData.push(question.answers.filter(a => a.content === o.name).length);
        });

        setData({
            labels: labels,
            datasets: [
                {
                    backgroundColor: backgroundColors,
                    hoverOffset: 6,
                    data: datasetData,
                }
            ]
        })
    }, [question])

    return (
        <Pie
            width='500'
            height='250'
            data={data}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }
            }}
        />
    );
}

export default PieChartPreview;