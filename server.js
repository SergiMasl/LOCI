// require("dotenv").config({ path: __dirname + "/.env" });
// const cors = require("cors");
// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const path = require("path");
// const http = require("http");
// const app = express();
// const { sendEmail } = require("./mail-sender");
// const jsonParser = bodyParser.json();
// const allowedOrigins = ["http://localhost:8080", "https://localhost:8080"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       const msg =
//         "The CORS policy for this site does not " +
//         "allow access from the specified Origin." +
//         origin;

//       if (allowedOrigins.indexOf(origin) === -1) {
//         // return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     exposedHeaders: [
//       "Content-Length",
//       "Accept",
//       "Accept-Encoding",
//       "Accept-Language",
//       "Access-Control-Request-Headers",
//       "Access-Control-Request-Method",
//       "Cache-Control",
//       "Connection",
//       "Host",
//       "Origin",
//       "Pragma",
//       "Referer",
//       "Sec-Fetch-Mode",
//       "Sec-Fetch-Site",
//       "User-Agent",
//     ],
//   })
// );

// app.post("/api/send-mail", jsonParser, async (req, response) => {
//   try {
//     const data = await sendEmail(req.body);
//     return response.status(200).json({ message: "success", data });
//   } catch (error) {
//     console.log(error);
//     return response.status(400).json({ message: error.message });
//   }

//   return response.status(400).json({ message: "error" });
// });

// const httpServer = http.createServer(app);
// httpServer.listen(3000, () => console.log("HTTP started on port 3000"));


