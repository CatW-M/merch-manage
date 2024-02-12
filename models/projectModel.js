const mongoose = require(`mongoose`);
const slugify = require("slugify");

// const Comment = require("./commentModel");

const projectSchema = new mongoose.Schema(
  {
    jobType: String,
    store: { type: mongoose.Schema.ObjectId, ref: "Store" },
    manager: { type: mongoose.Schema.ObjectId, ref: "User" },
    businessUnitManager: { type: mongoose.Schema.ObjectId, ref: "User" },
    projectTime: {
      type: String,
      enum: ["AM", "PM", "Full"],
      message: 'projectTime must be AM, PM, or "Full',
      default: "Full",
      required: true,
    },
    startDate: Date,
    duration: Number,
    scheduleStatus: {
      type: String,
      enum: {
        values: ["scheduled", "rescheduled", "cancelled"],
        message: "Status is either: scheduled, rescheduled, or cancelled.",
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

projectSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "project",
  localField: "_id",
});

projectSchema.pre("save", function (next) {
  const date = this.startDate.toDateString();
  this.slug = slugify(this.jobType + "-" + date, {
    lower: true,
  });
  console.log(this);
  next();
});

// projectSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "store",
//     select: "retailer storeNumber _id",
//   })
//   .populate({
//     path: "manager",
//     select: "name _id",
//   });
//   next();
// });

// projectSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "store",
//     select: "retailer storeNumber",
//   });

//   next();
// });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
