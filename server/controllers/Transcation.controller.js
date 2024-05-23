import axios from "axios";
import dotenv from "dotenv";
import TransactionModel from "../models/Transcation.model.js";
import { monthNumberMap, priceRanges } from "../utils/data.js"

dotenv.config();

// Initialize the database with seed data from a third-party API
export const dataInitialization = async (req, res) => {
  try {
    const response = await axios.get(process.env.TRANSCATION_API);
    await TransactionModel.deleteMany();
    await TransactionModel.insertMany(response.data);
    console.log("Database initialized with seed data")
    // res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    console.log("Error in fetching in data fron api", error);
  }
};

// Get all transactions with pagination and search functionality
export const allTranscation = async (req, res) => {
  const { page = 1, perPage = 10, search = "" } = req.query;
  try {
    // Construct the search query
    let searchQuery = {};

    if (search) {
      const priceRegex = /^\d+(\.\d+)?$/; // Regular expression to match numeric values
      const isPrice = priceRegex.test(search); // Check if search term is a number

      if (isPrice) {
        // If search term is a number, directly match it to the price field
        searchQuery = { price: parseFloat(search) };
      } else {
        // If search term is not a number, search in title and description fields
        searchQuery = {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        };
      }
    }

    // Fetch total count of matching documents
    const totalCount = await TransactionModel.countDocuments(searchQuery);

    // Fetch transactions with pagination and search applied
    const transactions = await TransactionModel.find(searchQuery)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    // Return the response with transactions and total count
    res.json({ transactions, totalCount });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).send("Error fetching transactions: " + error.message);
  }
};


// Get transaction statistics for a specified month
export const allTranscationStatistics = async (req, res) => {
  const { month, page = 1, perPage = 10, search = "" } = req.query;
  const intMonth = monthNumberMap[month];
  let SaleCount = 0;
  let soldCount = 0;
  let notSoldCount = 0;

  try {
    const transactions = await TransactionModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, intMonth],
      },
    });

    transactions.map((transaction) => {
      if (transaction.sold === true) {
        soldCount++;
      }

      if (transaction.sold === false) {
        notSoldCount++;
      }

      SaleCount = SaleCount + transaction.price;
    });

    res.json({ SaleCount, soldCount, notSoldCount });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).send("Error fetching transactions: " + error.message);
  }
};

// Get pie chart data for categories in a specified month
export const pieChartData = async (req, res) => {
  const { month, page = 1, perPage = 10, search = "" } = req.query;
  const intMonth = monthNumberMap[month];
  let SaleCount = 0;
  let soldCount = 0;
  let notSoldCount = 0;
  const categoryCounts = {};

  try {
    const transactions = await TransactionModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, intMonth],
      },
    });

    transactions.forEach((sale) => {
      const category = sale.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    res.json({ categoryCounts });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).send("Error fetching transactions: " + error.message);
  }
};

// Get pie chart data for categories in a specified month
export const barChartData = async (req, res) => {
  const { month, page = 1, perPage = 10, search = "" } = req.query;
  const intMonth = monthNumberMap[month];
  let SaleCount = 0;
  let soldCount = 0;
  let notSoldCount = 0;


  try {
    const transactions = await TransactionModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, intMonth],
      },
    });

    transactions.forEach(transaction => {
      priceRanges.forEach(range => {
        if (transaction.price >= range.min && transaction.price <= range.max) {
          range.count++;
        }
      });
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).send("Error fetching transactions: " + error.message);
  }
};

export const oneCallForALL = async (req, res) => {
  const { month } = req.query;

  try {
    const [statistics, barChart, pieChart] = await Promise.all([

      axios.get(`https://sales-task-frontend.vercel.app?month=${month}`),
      axios.get(`https://sales-task-frontend.vercel.app?month=${month}`),
      axios.get(`https://sales-task-frontend.vercel.app?month=${month}`)
    ]);

    res.status(200).json({

      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data
    });
  } catch (error) {
    res.status(500).send('Error fetching combined data: ' + error.message);
  }
}