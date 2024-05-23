import axios from "axios";

// export const ApiConfig = axios.create({
//     baseURL: 'http://localhost:3000/',
//         headers: {
//           "Cache-Control": "no-cache",
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//   });


export const ApiConfig = axios.create({
    baseURL: 'https://sales-task-backend.vercel.app/',
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
  });
