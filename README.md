# Financial Management Application

An interactive financial management application designed to help users track, manage, and visualize their income and expenses effectively. With a sleek and modern interface, users can add, edit, and analyze their financial data dynamically.

---

## 🚀 Features

### 1. **Dynamic Financial Tracking**
- Categorize and manage **income** and **expenses**.
- Real-time computation of:
  - Total Income
  - Total Expenses
  - Net Balance (Income - Expenses)

### 2. **Interactive Visualizations**
- **Pie Chart Representation**:
  - Visual breakdown of financial data by categories.
  - Dynamic chart updates as data changes.
- Hover effects and tooltips for detailed insights.

### 3. **Form Management**
- Add **Income** or **Expense** entries using an intuitive form.
- Categorize financial data based on user-defined types.

### 4. **Responsive Design**
- Designed with **black and blue gradients** for a modern, aesthetic appeal.
- Fully responsive and optimized for different screen sizes.

### 5. **Backend Integration**
- Fetches and stores categorized financial data dynamically using APIs.
- Ensures smooth interaction with the database for real-time updates.

---

## 📋 Table of Contents
1. [Technologies Used](#-technologies-used)
2. [Installation](#-installation)
3. [Usage](#-usage)
4. [Project Structure](#-project-structure)
5. [Future Enhancements](#-future-enhancements)
6. [Contributing](#-contributing)

---

## 🛠 Technologies Used
- **Frontend**:
  - React.js
  - Chart.js (for data visualization)
  - Material-UI (for icons and components)
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB (NoSQL database)

---

## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AnujBalu/money-manager.git
   cd money-manager

2. Install dependencies:
  ```bash
  npm install
```

3. Install dependencies
  ```bash
    npm start
```
4. Ensure your backend server is running and connected to MongoDB.

.

## 🎮 Usage
### Home Page
- View Total Income, Total Expenses, and Net Balance in a visually appealing layout.
- Hover over sections for detailed insights.
### Pie Chart
- Visualize financial data breakdown by categories.
- Switch dynamically between Income and Expense data using buttons.
### Add Financial Data
- Use buttons on the home page to open forms for adding Income or Expense entries.

## 🗂 Project Structure

## Project Structure

The project is organized into the following directory structure:

📁 **src/**  
├── 📁 **components/**  
│   ├── **PieChart.js**      // Displays the Pie Chart with dynamic data  
│   ├── **Amount.js**        // Shows income, expense, and total balance  
│   ├── **AddForm.js**       // Form to add income/expense  
├── 📁 **styles/**  
│   ├── **HomePage.css**      // Styles for the home page  
├── **App.js**                // Main application file  
├── **index.js**              // Entry point  

📁 **backend/**  
├── **server.js**             // Express server setup  
├── 📁 **controllers/**  
│   ├── **dataController.js** // API to fetch data from MongoDB  
├── 📁 **models/**  
│   ├── **FinancialData.js**  // MongoDB schema for storing financial data  


## 🚀 Future Enhancements
### User Authentication:
- Personalize financial data for individual users with secure login.

### Budget Tracking:
- Allow users to set and monitor monthly budgets.

### AI-Powered Insights:
- Predict future expenses and provide financial advice.

### Data Export:
- Enable data download as CSV or PDF.

### Real-Time Updates:
- Implement WebSockets for live data updates.

## 🤝 Contributing
### Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name.
3. Commit your changes: git commit -m "Add some feature".
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.


## 📧 Contact
### For any queries or feedback, feel free to reach out:

- Name: ANUJ
- Email: anujbalu18@gmail.com
- GitHub: https://github.com/AnujBalu

