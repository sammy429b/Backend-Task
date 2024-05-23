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
const corsOptions = {
    origin: 'sales-task-frontend.vercel.app',
    // origin: 'http://localhost:5173/',
    optionsSuccessStatus: 200,
  };
 
app.use(cors(corsOptions));
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