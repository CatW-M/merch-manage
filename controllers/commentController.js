const Comment = require("../models/commentModel");
const factory = require("./handlerFactory");

exports.setProjectUserIds = (req, res, next) => {
  if (!req.body.project) req.body.project = req.params.projectId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
