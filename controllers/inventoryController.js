const Inventory = require("../models/inventoryModel");
const factory = require("./handlerFactory");

const populateInventoryOptions = [{ path: "_items.itemId" }];

exports.getAllInventories = factory.getAll(Inventory);

exports.getInventory = factory.getOne(Inventory, populateInventoryOptions);

exports.createInventory = factory.createOne(Inventory);
exports.updateInventory = factory.updateOne(Inventory);
exports.deleteInventory = factory.deleteOne(Inventory);
