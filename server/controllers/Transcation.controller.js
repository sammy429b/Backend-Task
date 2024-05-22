import TransactionModel from "../models/Transcation.model.js";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config();

export const dataInitialization = async (req, res) => {
  try {
    const response = await axios.get(
      process.env.TRANSCATION_API
    );

    await TransactionModel.deleteMany(); // Clear existing data
    await TransactionModel.insertMany(response.data); // Insert new data

    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    console.log("Error in fetching in data fron api", error);
  }
};
