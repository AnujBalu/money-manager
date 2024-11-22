import React, { useState, useEffect } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';
import '../styles/HomePage.css';
import axios from 'axios';

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState({}); // State to hold expenses data

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/FormPost/calendarData'); // Adjust the URL to your backend API
        const fetchedExpenses = response.data; // Assuming the response contains the expenses data
        setExpenses(fetchedExpenses); // Set the expenses data
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const getDateString = (date) => {
    return date.toLocaleDateString('en-CA'); // Format as 'YYYY-MM-DD'
  };

  const handleDateClick = (selectedDate) => {
    const dateStr = getDateString(selectedDate);
    if (expenses[dateStr]) {
      setSelectedExpense({ date: dateStr, expenses: expenses[dateStr] });
    } else {
      setSelectedExpense(null);
    }
    setDate(selectedDate);
  };

  return (
    <>
      {/* Calendar Display */}
      <div className="react-calendar w-[400px] max-w-full bg-gray-900/80 backdrop-blur-md text-gray-300 rounded-lg shadow-lg font-sans leading-5 p-4">
        <CalendarComponent
          onChange={handleDateClick}
          value={date}
          tileContent={({ date, view }) =>
            view === 'month' && expenses[getDateString(date)] ? (
              <p className="text-sm text-blue-400 font-semibold">
                ${expenses[getDateString(date)].reduce(
                  (sum, expense) => sum + expense.amount,
                  0
                )}
              </p>
            ) : null
          }
        />
      </div>

      {/* Expense Details Modal */}
      {selectedExpense && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-opacity duration-500 ease-in-out"
          onClick={() => setSelectedExpense(null)} // Close when clicking outside the modal
        >
          <div
            className="expense-details w-[90%] max-w-md p-6 bg-gray-800/80 rounded-lg text-gray-300 shadow-lg relative transform transition-transform duration-700 ease-in-out"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedExpense(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-blue-400 mb-4">
              Details for {selectedExpense.date}
            </h3>
            {selectedExpense.expenses.map((expense, index) => (
              <div key={index} className="mt-2">
                <p>
                  <strong>Amount Spent:</strong> ${expense.amount}
                </p>
                <p>
                  <strong>Description:</strong> {expense.description}
                </p>
                <p>
                  <strong>Category:</strong> {expense.category}
                </p>
                <p>
                  <strong>Form Type:</strong> {expense.formType}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
