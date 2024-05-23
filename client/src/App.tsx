import { useEffect, useState } from "react"
import axios from "axios";
import TransactionsTable from "./Components/Transcation";
import StatCard from "./Components/StatisticsCard";
import { PieChart } from "./Components/PieChart";
import { BarChart } from "./Components/BarChart";

function App() {
  const [month, setMonth] = useState('March')
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState();
  const [pieChart, setPieChart] = useState();


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/transcations`);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log("Error in transcation api call", error.message)
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/all/?month=${month}`);
      setStatistics(response.data.statistics)
      setBarChart(response.data.barChart)
      setPieChart(response.data.pieChart.categoryCounts)
    } catch (error) {
      console.log("Error in combines api call", error.message)
    }
  };

  const fetchStat = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/stats?month=${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.log("Error in Statistics api call", error.message)
    }
  }

  const fetchPieData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/piechart?month=${month}`);
      setPieChart(response.data.categoryCounts);
    } catch (error) {
      console.log("Error in Piechart api call", error.message)
    }
  }

  const fetchBarData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/barchart?month=${month}`);
      setBarChart(response.data);
    } catch (error) {
      console.log("Error in Barchart api call", error.message)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchAllData();
    // fetchStat();
    // fetchPieData()
    // fetchBarData()
  }, [month]);
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="w-2/3 mt-16">
          <header className="">
            <h1 className="text-3xl font-medium">Transactions Dashboard</h1>
          </header>

          <section className="flex justify-between my-2">
            <div>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="border p-2">
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <h2 className="text-2xl">Statistics of {month} </h2>
            <StatCard statistics={statistics} />
          </section>
          <TransactionsTable transactions={transactions} setTransactions={setTransactions} />
          <PieChart pieData={pieChart} />
          <BarChart barChart={barChart} />
        </div>
      </div>
    </>
  )
}

export default App