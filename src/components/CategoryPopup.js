import React,{useState} from 'react'
import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CategoryPopup({ isOpen, onClose, refreshCategories, chooseFormType}) {
    const [newCategory, setNewCategory] = useState("");
  
    // Function to generate a random color
    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
      
        // Convert the hex color to rgba format with a transparency (alpha) value
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);
      
        // Set alpha to a value less than 1 for transparency (e.g., 0.5 for 50% transparency)
        return `rgba(${r}, ${g}, ${b}, 0.5)`;
      };
      
  
    const handleAddCategory = async (e) => {
      e.preventDefault();
  
      if (!newCategory.trim()) {
        alert("Category name cannot be empty!");
        return;
      }
  
      const color = generateRandomColor();
      try {
        await axios.post("http://localhost:3001/FormPost/addCategory", {
          formType:chooseFormType.Form_type,
          category: newCategory,
          color,
        });
        setNewCategory(""); // Reset input
        // refreshCategories(); // Refresh categories in parent component
        toast.success('Category added successfully!');
        onClose(); // Close popup
      } catch (error) {
        console.error("Error adding category:", error);
        toast.error('Category failed to add');

      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black">
          <h2 className="text-lg font-bold mb-4">Add New Category</h2>
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e)=> handleAddCategory(e)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CategoryPopup


