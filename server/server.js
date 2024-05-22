import express from "express"
import dotenv from "dotenv"
import DBconnection from "./utils/DBconnect.js"
import { dataInitialization } from "./controllers/Transcation.controller.js";
import TransactionRoute from "./routes/Transcation.route.js";
import cors from "cors"

dotenv.config()
const app = express();
const port = process.env.PORT || 4000

app.use(cors())
app.use('/', TransactionRoute)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
    DBconnection();
})