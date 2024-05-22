import express from "express"
import dotenv from "dotenv"
import DBconnection from "./utils/DBconnect.js"

const app = express();
dotenv.config()

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
    DBconnection();
})