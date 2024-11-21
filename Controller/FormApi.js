const mongoose = require('mongoose');
const FormDataSchema = require('../Model/FormData');
const CategorySchema = require('../Model/CategoryData');
const CategoryData = require('../Model/CategoryData');

exports.dataPost = async (req, res) => {
    try {
        const { formType, amount, date, category, note } = req.body;

        // Create a new FormData document
        const formData = new FormDataSchema({
            // userId: mongoose.Types.ObjectId(userId), // Ensure the userId is an ObjectId
            formType,
            amount,
            date,
            category,
            note
        });

        // Save the form data to the database
        const savedData = await formData.save();
        res.status(201).json({ message: 'Form data saved successfully', data: savedData });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error saving form data', error: error.message });
    }
};

exports.allData = async (req,res) =>{
  try{
    const data = await FormDataSchema.find({});
    res.status(200).json(data);
  }
  catch(err){
    res.status(500).json({message:err})
  }
}

exports.calendarData = async (req, res) => {
    try {
      // Fetch only "Expense" formType records from the database and group them by date
      const expenses = await FormDataSchema.aggregate([
        {
          $match: { formType: "Expense" },  // Filter only "Expense" records
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },  // Group by date (YYYY-MM-DD)
            totalAmount: { $sum: "$amount" },  // Sum the amounts for each date
            expenses: {
              $push: {
                amount: "$amount",
                description: "$note",
                category: "$category",
                formType: "$formType",
              },
            },  // Push expense details (amount, description, category, and formType)
          },
        },
        { 
          $project: { 
            date: "$_id", 
            expenses: 1, 
            totalAmount: 1, 
            _id: 0 
          },
        },
      ]);
  
      // Format expenses as an object where the key is the date string
      const formattedExpenses = expenses.reduce((acc, { date, expenses }) => {
        acc[date] = expenses;
        return acc;
      }, {});
  
      // Send the formatted expenses in the response
      res.json(formattedExpenses);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching expenses');
    }
  };
  
exports.PieChart = async (req, res) => {
    try {
      // Fetch only "Expense" formType records from the database and group them by date
      const expenses = await FormDataSchema.aggregate([
        
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },  // Group by date (YYYY-MM-DD)
            totalAmount: { $sum: "$amount" },  // Sum the amounts for each date
            expenses: {
              $push: {
                amount: "$amount",
                description: "$note",
                category: "$category",
                formType: "$formType",
              },
            },  // Push expense details (amount, description, category, and formType)
          },
        },
        { 
          $project: { 
            date: "$_id", 
            expenses: 1, 
            totalAmount: 1, 
            _id: 0 
          },
        },
      ]);
  
      // Format expenses as an object where the key is the date string
      const formattedExpenses = expenses.reduce((acc, { date, expenses }) => {
        acc[date] = expenses;
        return acc;
      }, {});
  
      // Send the formatted expenses in the response
      res.json(formattedExpenses);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching expenses');
    }
  };
  
exports.addCategory = async (req, res) => {
    const { formType, category, color } = req.body;
    console.log(formType, category, color)
    // Validate required fields
    if (!formType || !category || !color) {
        return res.status(400).json({ message: "Form type, category, and color are required." });
    }

    // Validate formType
    if (!["Income", "Expense"].includes(formType)) {
        return res.status(400).json({ message: "Invalid form type. Allowed values are 'Income' or 'Expense'." });
    }

    try {
        // Check for duplicate category
        const existingCategory = await CategorySchema.findOne({ formType, category });
        if (existingCategory) {
            return res.status(400).json({ message: `Category "${category}" already exists for ${formType}.` });
        }

        // Save new category
        const newCategory = new CategorySchema({ formType, category, color });
        const savedData = await newCategory.save();
        res.status(201).json({ message: "Category added successfully.", savedData });
    } catch (error) {
        console.error("Error adding category:", error.stack || error);
        res.status(500).json({ message: "Failed to add category. Please try again later." });
    }
  };

  exports.getCategory = async (req, res) => {
    try {
      const category = await CategorySchema.find({});
      res.status(200).json(category); 
    } catch (err) {
      console.error('Error retrieving categories:', err); // Log the error on the backend for debugging
      res.status(500).json({ message: err.message });
    }
  };