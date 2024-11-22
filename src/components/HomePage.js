import React , {useEffect, useState} from 'react';
import Calendar from './Calendar';
import '../styles/HomePage.css'

import homeBg from '../img/home-bg.png';
import logo from '../img/logo1.png'
import PieChart from './PieChart';
import Form from './Form';
import Amount from './Amount';
import axios from 'axios';
// import { Title } from 'chart.js';




const HomePage = () => {

  const [isPieOrAmount, setIsPieOrAmount] = useState(false);
  const [Category , setCategory] = useState([]);
  
  const [chooseFormType , setChooseFormType] = useState(
    {
      Form_type:"",
      Title:""
    }
  )

  const [allData , setAllData] = useState([])

  const fetchAllData = async ()=>{
    try{
      let response = await axios.get('http://localhost:3001/FormPost/allData')
      let fetchData = response.data
      setAllData(fetchData)
    }
    catch(err){
      console.log(`Home page error : ${err}`)
    }
  }
  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/FormPost/getCategory');
      const fetchData = response.data;
      setCategory(fetchData);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  

  useEffect(()=>{
    fetchAllData()
    fetchCategory()

  },[])

  return (
<div
  className="mainClass bg-center bg-cover h-screen overflow-hidden"
  style={{ backgroundImage: `url(${homeBg})` }}
>
  {/* Logo */}
  <img src={logo} alt="Logo" className="absolute top-0 left-0 p-2 w-[160px] h-auto" />


  {/* Calendar Component */}
  <div
    className="absolute w-fit h-fit top-1/4 z-10"
    style={{ left: "10%" }}
  >
    <Calendar />
  </div>


  {/* Amount - Income , Expense , Tot Amount */}
  <Amount setIsPieOrAmount = {setIsPieOrAmount} setChooseFormType={setChooseFormType} allData={allData} />


  {/* Pie Chart */}

  <div className='' >
    {isPieOrAmount ?  
    <div className='absolute z-10 w-1/4 h-auto right-0 top-1'>
      <Form setIsPieOrAmount = {setIsPieOrAmount}  chooseFormType={chooseFormType} Category={Category}/> 
    </div>
    :
    <div className='absolute z-10 w-1/4 h-auto right-0 top-1/3'>
    <PieChart Category={Category}/>
    </div>}
    
    
  </div>
</div>

  );
};

export default HomePage;
