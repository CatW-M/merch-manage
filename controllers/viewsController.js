const Store = require("../models/storeModel");
const catchAsync = require("../utils/catchAsync");

exports.getBase = (req, res) => {
  res.status(200).render("base", {
    title: "Management Solutions",
    project: "Store 2709890 - Flexroller Install",
    user: "Catherine",
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: "Log Into Your Account"
  })
}

exports.getSignupForm = (req, res) => {
  res.status(200).render('login', {
    title: "Log Into Your Account"
  })
}

exports.getOverview = catchAsync(async (req, res, next) => {
  const stores = await Store.find();

  res.status(200).render("overview", {
    title: "All Stores",
    stores,
  });
});

exports.getStore = catchAsync(async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate(
    {
      path: "comments",
      fields: "body user",
    }
  );
  res.status(200).render("store", {
    title: `${store.storeNumber}`,
    store,
  });
});
