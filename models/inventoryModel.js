const mongoose = require(`mongoose`);

const inventorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    storageUnitFacility: String,
    storageUnitAddress: String,
    storageUnitCity: String,
    storageUnitState: String,
    storageUnitZip: Number,
    storageUnitPhone: String,
    storageUnitSize: String,
    unitNumber: String,
    key: Boolean,
    keyHolder: String,
    gateCode: String,
    combination: String,
    _items: [
      {
        itemId: {
          type: mongoose.Schema.ObjectId,
          ref: "Item",
        },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// inventorySchema.pre(/^find/, function (next) {
//   const iDs = this;
//   console.log(iDs);
//   next();
// });

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
