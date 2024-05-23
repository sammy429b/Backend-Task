// export class ApiConfig{
//     static transcation = `http://localhost:3000/transcations`
//     static all = `http://localhost:3000/all`
//     static stat = `http://localhost:3000/stats`
//     static pie = `http://localhost:3000/piechart`
//     static bar = `http://localhost:3000/barchart`
// }

import axios from "axios";

export const ApiConfig = axios.create({
    baseURL: 'https://sales-task-backend.vercel.app/',
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
  });
