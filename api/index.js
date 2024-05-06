require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const path = require("path");
const http = require("http");
// const { Server } = require("socket.io");

const { connectDB } = require("../config/db");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const currencyRoutes = require("../routes/currencyRoutes");

// const { isAuth, isAdmin } = require("../config/auth");
// const {
//   getGlobalSetting,
//   getStoreCustomizationSetting,
// } = require("../lib/notification/setting");

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cors());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard

app.use("/api/order/", customerOrderRoutes);
app.use("/api/currency/", currencyRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use("/api/orders/", orderRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


server.listen(PORT, () => console.log(`server running on port ${PORT}`));
