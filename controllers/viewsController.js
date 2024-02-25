const Store = require("../models/storeModel");
const Project = require("../models/projectModel");
const Item = require("../models/itemModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Inventory = require("../models/inventoryModel");

exports.getBase = (req, res) => {
  res.status(200).render("base", {
    title: "Management Solutions",
    project: "Store 2709890 - Flexroller Install",
    user: "Catherine",
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log Into Your Account",
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log Into Your Account",
  });
};

exports.getOverview = catchAsync(async (req, res, next) => {
  const stores = await Store.find();

  res.status(200).render("overview", {
    title: "All Stores",
    stores,
  });
});

exports.getStore = catchAsync(async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate({
    path: "projects",
    fields: "manager startDate",
  });

  if (!store) {
    return next(new AppError("There is no store with that number", 404));
  }
  res.status(200).render("store", {
    title: store.storeNumber,
    store,
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById({ _id: req.params.slug })
    .populate("store")
    .populate("manager")
    .populate("comments");

  if (!project) {
    return next(new AppError("There is no project with that number", 404));
  }
  res.status(200).render("project", {
    title: project.startDate,
    project,
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your Account",
  });
};

exports.getMyInventory = catchAsync(async (req, res, next) => {
  const myInventory = await Inventory.find({ user: req.user.id }).populate({
    path: "_items.itemId",
  });

  res.status(200).render("my-inventory", {
    title: "My Inventory",
    inventory: myInventory,
    // item: itemIDs,
  });
});

exports.getMyProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({ manager: req.user.id }).populate(
    "store",
  );

  res.status(200).render("my-projects", {
    title: "My Projects",
    projects,
  });
});

exports.updateStoreData = catchAsync(async (req, res, next) => {
  const updatedStore = await Store.findByIdAndUpdate(
    req.body.id,
    {
      totalDoors: req.body.totalDoors,
      nonAlcoholDoors: req.body.nonAlcoholDoors,
      phoneNumber: req.body.phoneNumber,
      glideType: req.body.glideType,
      glideDimensions: req.body.glideDimensions,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).render("store", {
    title: updatedStore.storeNumber,
    store: updatedStore,
  });
});
