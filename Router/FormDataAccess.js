const express = require('express');
const router = express.Router(); 

const FormApi = require('../Controller/FormApi.js');

// Define routes
router.post('/dataPost', FormApi.dataPost);
router.get('/allData',FormApi.allData);
router.get('/calendarData',FormApi.calendarData);
router.get('/PieChart',FormApi.PieChart);

router.post('/addCategory',FormApi.addCategory);
router.get('/getCategory',FormApi.getCategory)

module.exports = router; // Export the router for use in the main server
