var Hashtag = require('../models/hashtag');

module.exports.create = function (req, res) {
  var hashtag = new Hashtag(req.body);
  hashtag.save(function (err, result) {
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  Hashtag.find({}, function (err, results) {
    res.json(results);
  });
}