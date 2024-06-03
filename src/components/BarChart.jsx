import React, { useEffect, useRef } from 'react';
// import axios from 'axios';
import Chart from 'chart.js/auto';

const BarChart = ({ data, setdata }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null)
  const companies = data;
  useEffect(() => {
    if (data.length === 0) {
      return; // Do nothing if data is not an array or is empty
    }

    if (chartInstance && chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartContainer.current.getContext('2d');

    // Define an array of different colors
    const colors = [
      '#97E7E1', '#FEC7B4', '#D0BFFF', '#9ED2BE', '#FFD778',
      '#FF829D', '#6FCDCD', '#5EB5EF', '#CEB6FF', '#FFD9C0'
    ];

    const labels = Object.keys(companies);
    const softData = labels.map(company => companies[company].Soft);
    const mediumData = labels.map(company => companies[company].Medium);
    const hardData = labels.map(company => companies[company].Hard);
    const totalData = labels.map(company => companies[company].total);

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Count of Cards',
          data: totalData,
          backgroundColor: colors.slice(0, data.length),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0,

        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const companyIndex = context.dataIndex;
                return [
                  `Totals: ${totalData[companyIndex]}`,
                  `Soft: ${softData[companyIndex]}`,
                  `Medium: ${mediumData[companyIndex]}`,
                  `Hard: ${hardData[companyIndex]}`
                ];
              }
            }
          },
          legend: {
            display: true // Hide the legend since we don't need it
          }
        }
      }
    });

  }, [data]);

  return <canvas className="border border-gray-800 rounded-md shadow-lg" ref={chartContainer} />;
};
export default BarChart;