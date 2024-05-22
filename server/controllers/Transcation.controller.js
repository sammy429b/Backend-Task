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
    // console.log(response.data)

    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    console.log("Error in fetching in data fron api", error);
  }
};


// export const allTranscation = async (req, res) =>{
//   const { month, page = 1, perPage = 10, search = '' } = req.query;

//     try {
//         const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth();
//         console.log(monthIndex)
//         const regex = new RegExp(search, 'i');
//         console.log(regex)
//         const transactions = await TransactionModel.find({
//             dateOfSale: { $gte: new Date(2021, monthIndex, 1), $lt: new Date(2021, monthIndex + 1, 1) },
//             $or: [
//                 { title: regex },
//                 { description: regex }
//                 // Removed price search since price is a number
//             ]
//         }).skip((page - 1) * parseInt(perPage)).limit(parseInt(perPage));
//         console.log(transactions)
//         res.status(200).json(transactions);
//     } catch (error) {
//         res.status(500).send('Error fetching transactions: ' + error.message);
//     }
// }




export const allTranscation = async (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;

  
   
  try {
    const totalCount = await TransactionModel.countDocuments();
    const transactions = await TransactionModel.find({}).skip((page-1 )* perPage).limit(perPage);
    console.log(totalCount)
  res.json({transactions,totalCount});
  } catch (error) {
      console.error('Error fetching transactions:', error.message);
      res.status(500).send('Error fetching transactions: ' + error.message);
  }
}

export const allTranscationStatistics = async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;
  const monthNumberMap = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
};
  
  const intMonth = monthNumberMap[month]
  let SaleCount = 0;
  let soldCount = 0;
  let notSoldCount = 0;
   
  try {
    
    const transactions = await TransactionModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, intMonth]
      },
    })

    transactions.map((transaction)=>{
      if(transaction.sold===true){
        soldCount++;
      }

      if(transaction.sold===false){
        notSoldCount++;
      }

      SaleCount = SaleCount + transaction.price
    })

    console.log(SaleCount, soldCount, notSoldCount)
  res.json({SaleCount, soldCount, notSoldCount});
  } catch (error) {
      console.error('Error fetching transactions:', error.message);
      res.status(500).send('Error fetching transactions: ' + error.message);
  }
}