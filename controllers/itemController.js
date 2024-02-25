const Item = require("../models/itemModel");
const factory = require("./handlerFactory");

exports.getAllItems = factory.getAll(Item);

exports.getItem = factory.getOne(Item);

exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);
