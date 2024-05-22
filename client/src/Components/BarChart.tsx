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
    // Check if barChart is not defined or empty array
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
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Price Range',
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Number of Items',
                },
            },
        },
    };

    // Extracting labels and data from the barChart prop
    const labels = barChart.map(item => item.range);
    const counts = barChart.map(item => item.count);

    const data = {
        labels,
        datasets: [
            {
                label: 'Count',
                data: counts,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className='mt-8'>
            <h2 className='text-2xl'> Bar Chart</h2>
            <Bar options={options} data={data} />
        </div>
    );
}
