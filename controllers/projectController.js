const Project = require("../models/projectModel");
const factory = require("./handlerFactory");

const populateProjectOptions = [
  { path: "comments", select: "body _id" },
  { path: "manager", select: "name phoneNumber _id" },
  { path: "businessUnitManager", select: "name _id" },
  { path: "store", select: "retailer storeNumber _id" },
]

exports.getAllProjects = factory.getAll(Project, populateProjectOptions);
exports.getProject = factory.getOne(Project, populateProjectOptions);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
