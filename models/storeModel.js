const mongoose = require(`mongoose`);

const storeSchema = new mongoose.Schema({
  streetAddress: {
    type: String,
    required: [true, 'A store must have an address.'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'A store must have a city.'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'A store must have a state.'],
    trim: true,
  },
  zipCode: {
    type: Number,
    required: [true, 'A store must have a zip code.'],
  },
  storeNumber: {
    type: Number,
    required: [true, 'A store must have a unique number.'],
    unique: true,
  },
  retailer: {
    type: String,
    required: [true, 'A store must have a client name, ie Circle K.'],
  },
  totalDoors: {
    type: Number,
  },
  phoneNumber: {
    type: String,
  },
  reachInDoors: {
    type: Number,
  },
  vaultRun: String,
  vaultShelves: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  projects: [
    {
      jobType: String,
      manager: String,
      startDate: Date,
      duration: Number,
      completed: Boolean,
    },
  ],
  comments: [
    {
      comment: String,
      initials: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
