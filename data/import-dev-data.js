const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const Store = require("../models/storeModel");
const Project = require("../models/projectModel")

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.PASSWORD
)

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

const projects = JSON.parse(
  fs.readFileSync("data/project-data-cw.json", "utf-8"),
);

const importData = async () => {
  try {
    await Project.create(projects);
    console.log("DATA SUCCESSFULLY LOADED!!!!");
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Project.deleteMany();
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

