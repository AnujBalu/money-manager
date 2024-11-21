import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the required elements with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate random RGBA colors with higher opacity
const generateColors = (count) => {
  return Array.from({ length: count }, () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return {
      background: `rgba(${r}, ${g}, ${b}, 0.7)`, // Increased opacity
      border: `rgba(${r}, ${g}, ${b}, 1)`,
    };
  });
};

const PieChart = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [formType, setFormType] = useState('Expense'); // 'Expense' or 'Income'

  // Function to fetch data from the backend
  const fetchData = async (type) => {
    try {
      const response = await axios.get(`http://localhost:3001/FormPost/PieChart`); // Adjust URL to match backend API
      const fetchedData = response.data;
      
      // Filter data by formType and calculate totals by category
      const filteredData = Object.values(fetchedData)
        .flat()
        .filter((item) => item.formType === type)
        .reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + item.amount;
          return acc;
        }, {});

      const updatedLabels = Object.keys(filteredData);
      const updatedData = Object.values(filteredData);

      setLabels(updatedLabels);
      setData(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(formType); // Fetch initial data for 'Expense'
  }, [formType]);

  // Generate colors dynamically based on labels
  const colors = generateColors(labels.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${formType} by Category`,
        data,
        backgroundColor: colors.map((color) => color.background),
        borderColor: colors.map((color) => color.border),
        borderWidth: 1,
      },
    ],
  };

  // Chart options to set text color to white
  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Set legend text color to white
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
        },
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={options} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setFormType('Income')}
          style={{
            marginRight: '10px',
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: formType === 'Income' ? 'blue' : 'gray',
            color: 'white',
          }}
        >
          Show Income
        </button>
        <button
          onClick={() => setFormType('Expense')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: formType === 'Expense' ? 'blue' : 'gray',
            color: 'white',
          }}
        >
          Show Expense
        </button>
      </div>
    </div>
  );
};

export default PieChart;
