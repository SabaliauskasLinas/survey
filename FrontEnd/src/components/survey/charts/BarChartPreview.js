import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getRandomColor } from '../../../helpers/randomColorHelper';

const BarChartPreview = (props) => {
    const { question, axis } = props;
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
                    label: 'Count',
                    barPercentage: 0.7,
                    hoverBorderWidth: 2,
                    backgroundColor: backgroundColors,
                    data: datasetData,
                }
            ]
        })
    }, [question])

    return (
        <Bar
            width='500'
            height='250'
            data={data}
            options={{
                maintainAspectRatio: false,
                indexAxis: axis,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }}
        />
    );
}

export default BarChartPreview;