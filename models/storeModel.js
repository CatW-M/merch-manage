const mongoose = require(`mongoose`);
const slugify = require("slugify");

const storeSchema = new mongoose.Schema(
  {
    streetAddress: {
      type: String,
      required: [true, "A store must have an address."],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "A store must have a city."],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "A store must have a state."],
      trim: true,
    },
    zipCode: {
      type: Number,
      required: [true, "A store must have a zip code."],
    },
    storeNumber: {
      type: Number,
      required: [true, "A store must have a unique number."],
      unique: true,
    },
    slug: String,
    retailer: {
      type: String,
      required: [true, "A store must have a retailer, ie Circle K."],
      default: "Circle K",
    },
    businessUnit: {
      type: String,
      required: [true, "A store must have a business unit."],
      default: "Rocky Mountain",
    },
    totalDoors: {
      type: Number,
    },
    nonAlcoholDoors: {
      type: Number,
    },
    phoneNumber: {
      type: String,
    },
    glideType: {
      type: String,
      default: "unknown",
    },
    glideDimensions: {
      type: String,
    },
    reachInDoors: {
      type: Number,
    },
    reachInFootage: {
      type: Number,
    },
    reachInFootage2: {
      type: Number,
    },
    uprights: {
      type: Number,
    },
    vaultDoors: {
      type: Number,
    },
    vaultRun: String,
    vaultShelves: Number,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
        location: {
    // GeoJSON
    type: { type: String,
    default: 'Point',
    enum: ['Point']},
    coordinates: [Number],
    address: String,
    description: String

        },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// storeSchema.virtual("projectsScheduled").get(function () {
//   return this.projects.length;
// });

// storeSchema.virtual("projectsCompleted").get(function () {
//   let completed = 0;
//   for (let i = 0; i < this.projects.length; i++) {
//     if (this.projects[i].status === "completed") {
//       completed++;
//       return completed;
//     }
//   }
// });

// storeSchema.virtual("projectsRescheduled").get(function () {
//   let rescheduled = 0;
//   for (let i = 0; i < this.projects.length; i++) {
//     if (this.projects[i].status === "rescheduled") {
//       rescheduled++;
//       return rescheduled;
//     }
//   }
// });
storeSchema.virtual("projects", {
  ref: "Project",
  foreignField: "store",
  localField: "_id",
});

storeSchema.pre("save", function (next) {
  this.slug = slugify(this.retailer + "-" + this.storeNumber, { lower: true });
  next();
});

// storeSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "projects",
//     select: "-__v",
//   });
//   next();
// });
// storeSchema.pre("save", function (next) {
//   console.log("WILL SAVE DOCUMENT");
//   next();
// });

// storeSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });
// storeSchema.pre(/^find/, function (next) {
//   // console.log(this);
//   next();
// });

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
