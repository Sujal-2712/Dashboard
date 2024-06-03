import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const DonutChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return; // Do nothing if data is not an array or is empty
    }

    if (chartInstance && chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartContainer.current.getContext('2d');

    const colors = [
      '#97E7E1', '#FEC7B4', '#D0BFFF', '#9ED2BE', '#FFD778',
      '#FF829D', '#6FCDCD', '#5EB5EF', '#CEB6FF', '#FFD9C0'
    ];
    const totalCount = data.reduce((acc, company) => acc + company.count_of_wheels, 0);
    const dataWithPercentage = data.map(company => ({
      wheel_company_name: company.wheel_company_name,
      count_of_wheels: company.count_of_wheels,
      percentage: ((company.count_of_wheels / totalCount) * 100).toFixed(2)
  }));

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: dataWithPercentage.map(company => company.wheel_company_name),
        datasets: [{
          label: 'Wheels(%)',
          data: dataWithPercentage.map(company => company.percentage),
          backgroundColor: colors.slice(0, data.length),
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 0,
          hoverOffset:20
        }]
      },
      options: {
        cutout: '45%',
        plugins: {
          legend: {
            position: 'bottom',
            color:'black'
          }
        }
      }
    });

  }, [data]);

  return <canvas className="border p-3 border-gray-800  rounded-md shadow-lg" ref={chartContainer}/>;
};

export default DonutChart;
