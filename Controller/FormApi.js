const mongoose = require('mongoose');
const FormDataSchema = require('../Model/FormData');

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
  
  