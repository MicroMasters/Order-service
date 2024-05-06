require("dotenv").config();
const { connectDB } = require("../config/db");

const Order = require("../models/Order");
const orderData = require("../utils/orders");

const Currency = require("../models/Currency");
const currencyData = require("../utils/currency");

const Setting = require("../models/Setting");
const settingData = require("../utils/settings");

connectDB();
const importData = async () => {
  try {
    await Currency.deleteMany();
    await Currency.insertMany(currencyData);

    await Order.deleteMany();
    await Order.insertMany(orderData);

    await Setting.deleteMany();
    await Setting.insertMany(settingData);

    console.log("data inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

importData();
