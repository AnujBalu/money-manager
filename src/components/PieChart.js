import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the required elements with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ Category }) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [formType, setFormType] = useState('Expense'); // 'Expense' or 'Income'

  // Function to fetch data from the backend
  const fetchData = async (type) => {
    try {
      const response = await axios.get('http://localhost:3001/FormPost/PieChart'); // Adjust URL to match backend API
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

  // Match category and fetch colors from the Category prop
  const colors = labels.map((label) => {
    const category = Category.find(item => item.category === label);
    return category ? category.color : 'rgba(0, 0, 0, 0.5)'; // Default to black with 50% opacity if no color is found
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: `${formType} by Category`,
        data,
        backgroundColor: colors.map(color => {
          // Slightly reduce the opacity to make it more transparent (e.g., 50% opacity)
          const rgbaColor = color.match(/rgba\((\d+), (\d+), (\d+), (\d+\.\d+)\)/);
          if (rgbaColor) {
            return `rgba(${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]}, 0.5)`; // Set alpha to 0.5
          }
          return color; // Default behavior if no rgba match is found
        }),
        borderColor: colors.map(color => {
          // Similarly adjust the border color if needed
          const rgbaColor = color.match(/rgba\((\d+), (\d+), (\d+), (\d+\.\d+)\)/);
          if (rgbaColor) {
            return `rgba(${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]}, 1)`; // Keep border fully opaque
          }
          return color; // Default behavior if no rgba match is found
        }),
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
