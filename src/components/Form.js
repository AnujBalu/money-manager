import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import axios from "axios";
import CategoryPopup from "./CategoryPopup";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form({ setIsPieOrAmount, chooseFormType, Category, setShowForm }) {  // Pass setShowForm to close the form

  const [formData, setFormData] = useState({
    formType: chooseFormType.Form_type,
    amount: 0,
    date: "",
    category: "",
    note: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const refreshCategories = async () => {
    // Fetch updated categories from the server
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.amount || !formData.date || !formData.category) {
        alert("Please fill out all required fields.");
        return;
      }
      const response = await axios.post("http://localhost:3001/FormPost/dataPost", {
        ...formData,
        formType: chooseFormType.Form_type, // Pass required field
        title: chooseFormType.Title, // Ensure "title" is included
      });

      console.log("Form Data Submitted:", response.data);
    } catch (err) {
      console.error("Error submitting form data:", err.response?.data || err.message);
      alert("Failed to submit data. Please check the input fields.");
    }

    setIsPieOrAmount(false);
  };

  // Close form handler
  const handleClose = () => {
    setIsPieOrAmount(false);  // Close form by changing parent state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">{chooseFormType.Title}</h2>
          <button
            type="button"
            onClick={handleClose}  // Close form on button click
            className="text-white text-2xl"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-3 py-2 rounded-lg bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category:{" "}
            <button
              type="button"
              className="left-24"
              onClick={() => setIsPopupOpen(true)}
            >
              <AddIcon />
            </button>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {Category
              .filter((data) => {
                if (data.formType === chooseFormType.Form_type) {
                  return data;
                }
              })
              .map((data, index) => (
                <option key={index} value={data.category}>
                  {data.category}
                </option>
              ))}
          </select>
          <CategoryPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            refreshCategories={refreshCategories}
            chooseFormType={chooseFormType}
          />
          <ToastContainer /> {/* ToastContainer is here */}
        </div>

        <div className="mb-4">
          <label htmlFor="note" className="block text-sm font-medium mb-2">
            Note:
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Enter a note"
            className="w-full px-3 py-2 rounded-lg bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
