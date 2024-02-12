const Store = require("../models/storeModel");
const factory = require("./handlerFactory");

exports.getAllStores = factory.getAll(Store);

exports.getStore = factory.getOne(Store, {
  path: "projects",
  select: "startDate jobType",
});

exports.createStore = factory.createOne(Store);
exports.updateStore = factory.updateOne(Store);
exports.deleteStore = factory.deleteOne(Store);
