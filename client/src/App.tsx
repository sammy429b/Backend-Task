import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios";
import TransactionsTable from "./Components/Transcation";
import StatCard from "./Components/StatCard";
import { PieChart } from "./Components/PieChart";

function App() {
  const [month, setMonth] = useState('March')
  const [maxsize, setMaxsize] = useState(0)
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState([]);
  const [pieChart, setPieChart] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3000/transcations`);
    console.log(response.data.transactions)
    setTransactions(response.data.transactions);
  };

  const fetchStat = async() =>{
    const response = await axios.get(`http://localhost:3000/stats?month=${month}`);
    console.log(response.data)
    setStatistics(response.data);
  }

  const fetchPieData = async() =>{
    const response = await axios.get(`http://localhost:3000/piechart?month=${month}`);
    console.log(response.data.categoryCounts)
    setPieChart(response.data.categoryCounts);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchStat();
    fetchPieData()
  }, [month]);
  return (
    <>
      <div className="flex justify-center items-center ">

        <div className="w-2/3">
          <header className="">
            <h1 className="text-3xl font-medium">Transactions Dashboard</h1>
          </header>

          <section className="flex justify-between my-2">
          <div>
            <div className=" border-2 rounded flex items-center ">
              <input type="search" className="w-[80%] px-2 py-2 outline-none" name="" id=""  placeholder="search transcation"/>
              <button className="font-normal text-sm "><Search/></button>
            </div>
          </div>
          <div>

            <select value={month} onChange={(e) => setMonth(e.target.value)} className="border p-2">
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
        </div>
        </section>
              <h2 className="text-2xl">Statistics {month}</h2>
          <StatCard statistics={statistics}/>
          <TransactionsTable transactions={transactions} setTransactions={setTransactions} maxsize={maxsize}/>

          <PieChart pieData={pieChart}/>

        </div>
      </div>
    </>
  )
}

export default App