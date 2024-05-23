import express from "express"
import dotenv from "dotenv"
import DBconnection from "./utils/DBconnect.js"
import { dataInitialization } from "./controllers/Transcation.controller.js";
import TransactionRoute from "./routes/Transcation.route.js";
import cors from "cors"

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
// app.use(cors({
//     origin: 'https://sales-task-frontend.vercel.app', 
//   }));
  
app.use(cors())
app.use(express.json()); // If you're working with JSON requests

// Routes
app.use('/', TransactionRoute);

// Error handling for unhandled routes
app.use((req, res, next) => {
    res.status(404).send({ message: 'Route not found' });
});

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    DBconnection();
    dataInitialization();
});