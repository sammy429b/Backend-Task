import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function BarChart({ barChart }) {
    if (!barChart || barChart.length === 0) {
        return <div>No data available</div>;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Distribution by Price Range',
            },
        },
    };

    // Extracting labels and data from the barChart prop
    const labels = barChart.map(item => item.range);
    const dataSet = barChart.map(item => item.count);

    const data = {
        labels,
        datasets: [
            {
                label: 'Number of Items',
                data: dataSet,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    );
}


