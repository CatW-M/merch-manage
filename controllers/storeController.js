const Store = require("../models/storeModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllStores = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Store.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const stores = await features.query;

  res.status(200).json({
    status: "success",
    results: stores.length,
    data: {
      stores,
    },
  });
});

exports.getStore = catchAsync(async (req, res, next) => {
 
  const store = await Store.findById(req.params.id);

  if(!store) {
return next(new AppError('No Store Found With That ID!', 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      store,
    },
  });
});

exports.createStore = catchAsync(async (req, res, next) => {
  const newStore = await Store.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      store: newStore,
    },
  });
});

exports.updateStore = catchAsync(async (req, res, next) => {
  const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!store) {
    return next(new AppError('No Store Found With That ID!', 404))
      }

  res.status(200).json({
    status: "success",
    data: {
      store,
    },
  });
});

exports.deleteStore = catchAsync(async (req, res, next) => {
  const store = await Store.findByIdAndDelete(req.params.id);

  if(!store) {
    return next(new AppError('No Store Found With That ID!', 404))
      }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
