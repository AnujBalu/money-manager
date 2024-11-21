import React ,{useState, useEffect} from 'react'
import '../styles/HomePage.css'
import { Title } from 'chart.js';

import ControlPointIcon from '@mui/icons-material/ControlPoint';

const sumTheGiven = (data, type) => {
  // Filter the data based on type and sum up the `amount`
  return data
    .filter((item) => item.formType === type)
    .reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
};

function Amount({setIsPieOrAmount ,setChooseFormType ,allData}) {
    const [hovered, setHovered] = useState({ income: false, totalAmount: false, expense: false });
    const [totIncome, setTotIncome] = useState(0);
    const [totExpense, setTotExpense] = useState(0)
    const [totAmount, setTotAmount] = useState(0)

    
    useEffect( () => {
      console.log("gg",allData)
      const income =  sumTheGiven(allData, "Income");
      const expense =  sumTheGiven(allData, 'Expense');
      setTotIncome(income);
      console.log(income)
      setTotExpense(expense);
      setTotAmount(income - expense); // Total amount is income minus expense
    }, [allData]);

    const HandleAdd = (type,title) =>{
        setIsPieOrAmount(true);
        setChooseFormType((preData) => ({
            ...preData,
            Form_type:type,
            Title:title,
        }));
    }

  return (
  <div className="relative w-full h-full overflow-hidden">
  {/* Inner Circle */}
  <div className="absolute top-[-5%] left-[60%] w-[70%] h-[110%] bg-transparent border-[12px] border-white rounded-full">
    {/* Animated Elements */}
    
    <div
      className="income relative w-[180px] h-[180px] rounded-full bg-gradient-to-b from-blue-500 to-blue-900 text-white 
        flex flex-col items-center justify-center left-0 top-[5%] hover:z-10 hover:scale-110 transition-transform duration-300 ease-in-out group"
      onMouseEnter={() => setHovered({ ...hovered, income: true })}
      onMouseLeave={() => setHovered({ ...hovered, income: false })}
    >
      <svg className="w-full h-[90%]">
        <defs>
          <path id="semi-circle-path-income" d="M 90,90 m -80,0 a 80,80 0 1,1 160,0" />
        </defs>
        <text fill="white" fontWeight="bold" fontSize="20" dy="4">
          <textPath
            href="#semi-circle-path-income"
            startOffset={hovered.income ? "50%" : "30%"}
            textAnchor="middle"
          >
            Income
          </textPath>
        </text>
      </svg>
      <p
        className={`absolute text-xl font-bold transition-all duration-300 ease-in-out text-green-300 ${
          hovered.income
            ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-green-500"
            : "top-[60%] left-[65%] transform -translate-x-1/2 -translate-y-1/2"
        }`}
      >
        Rs.{totIncome}
      </p>
      <button className={`absolute  text-5xl w-fit h-fit text-center rounded-full font-bold  top-2/3 left-1/2 
        transform -translate-x-1/2 -translate-y-2/5  ${hovered.income ?"block":"hidden"} `}
        onClick={() => HandleAdd("Income", "Add Income")}><ControlPointIcon style={{fontSize:'inherit'}}/></button>

    </div>

    {/* Total Amount Circle */}
    <div
      className="totAmount relative w-[180px] h-[180px] rounded-full bg-gradient-to-b from-blue-400 to-blue-800 text-white 
        flex flex-col items-center justify-center -left-[10%] top-[20%] hover:z-10 hover:scale-110 transition-transform duration-300 ease-in-out group"
      onMouseEnter={() => setHovered({ ...hovered, totalAmount: true })}
      onMouseLeave={() => setHovered({ ...hovered, totalAmount: false })}
    >
      <svg className="w-full h-[90%]">
        <defs>
          <path id="semi-circle-path" d="M 90,90 m -80,0 a 80,80 0 1,1 160,0" />
        </defs>
        <text fill="white" fontWeight="bold" fontSize="20" dy="4">
          <textPath
            href="#semi-circle-path"
            startOffset={hovered.totalAmount ? "50%" : "70%"}
            textAnchor="middle"
          >
            Total Amount
          </textPath>
        </text>
      </svg>
      <p
        className={`absolute text-xl font-bold transition-all duration-300 ease-in-out ${
          hovered.totalAmount
            ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl"
            : "mt-2"
        }`}
      >
        Rs.{totAmount}
      </p>
    </div>

    {/* Expense Circle */}
    <div
      className="expense relative w-[180px] h-[180px] rounded-full bg-gradient-to-b from-blue-600 to-blue-900 text-white 
        flex flex-col items-center justify-center left-0 top-[35%] hover:z-10 hover:scale-110 transition-transform duration-300 ease-in-out group"
      onMouseEnter={() => setHovered({ ...hovered, expense: true })}
      onMouseLeave={() => setHovered({ ...hovered, expense: false })}
    >
      <svg className="w-full h-[90%]">
        <defs>
          <path id="semi-circle-path-expense" d="M 90,90 m -80,0 a 80,80 0 1,1 160,0" />
        </defs>
        <text fill="white" fontWeight="bold" fontSize="20" dy="4">
          <textPath
            href="#semi-circle-path-expense"
            startOffset={hovered.expense ? "50%" : "70%"}
            textAnchor="middle"
          >
            Expense
          </textPath>
        </text>
      </svg>
      <p
        className={`absolute text-xl font-bold transition-all duration-300 ease-in-out top-1/2 left-4 text-red-400 ${
          hovered.expense
            ? "top-1/2 left-2/3 transform translate-x-14 -translate-y-1/2 text-3xl text-red-600"
            : "mt-2"
        }`}
      >
        Rs.{totExpense}
      </p>

      <button className={`absolute text-5xl w-fit h-fit text-center rounded-full font-bold  top-2/3 left-1/2 
        transform -translate-x-1/2 -translate-y-1/5  ${hovered.expense ?"block":"hidden"} `}
        onClick={() => HandleAdd("Expense", "Add Expense")}><ControlPointIcon style={{fontSize:'inherit'}}/></button>
    </div>


  </div>

  {/* Outter Circle */}
  <div className="absolute top-[-5%] left-[57%] w-[70%] h-[110%] bg-transparent border-[12px] border-white rounded-full"></div>
</div>

  )
}

export default Amount