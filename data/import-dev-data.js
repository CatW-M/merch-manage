const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Store = require("../models/storeModel");

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

const stores = JSON.parse(
  fs.readFileSync("data/merch-manage-data.json", "utf-8"),
);

const importData = async () => {
  try {
    await Store.create(stores);
    console.log("DATA SUCCESSFULLY LOADED!!!!");
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Store.deleteMany();
    console.log("DATA SUCCESSFULLY DELETED!!!!");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

