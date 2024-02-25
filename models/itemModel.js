const mongoose = require(`mongoose`);

const itemSchema = new mongoose.Schema(
  {
    itemNumber: Number,
    description: String,
    boxQuantity: Number,
    height: String,
    width: String,
    depth: String,
    color: String,
    fitsFR: String,
    additionalInfo: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
