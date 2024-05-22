import TransactionModel from "../models/Transcation.model.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const monthNumberMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

// Initialize the database with seed data from a third-party API
export const dataInitialization = async (req, res) => {
  try {
    const response = await axios.get(process.env.TRANSCATION_API);
    await TransactionModel.deleteMany();
    await TransactionModel.insertMany(response.data);
    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    console.log("Error in fetching in data fron api", error);
  }
};

// Get all transactions with pagination and search functionality
export const allTranscation = async (req, res) => {
  const { page = 1, perPage = 10, search = "" } = req.query;
  try {
    const totalCount = await TransactionModel.countDocuments();
    const transactions = await TransactionModel.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);
    console.log(totalCount);
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

    console.log(SaleCount, soldCount, notSoldCount);
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
  
  const priceRanges = [
    { range: '0-100', min: 0, max: 100, count: 0 },
    { range: '101-200', min: 101, max: 200, count: 0 },
    { range: '201-300', min: 201, max: 300, count: 0 },
    { range: '301-400', min: 301, max: 400, count: 0 },
    { range: '401-500', min: 401, max: 500, count: 0 },
    { range: '501-600', min: 501, max: 600, count: 0 },
    { range: '601-700', min: 601, max: 700, count: 0 },
    { range: '701-800', min: 701, max: 800, count: 0 },
    { range: '801-900', min: 801, max: 900, count: 0 },
    { range: '901-above', min: 901, max: Infinity, count: 0 }
  ];

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
