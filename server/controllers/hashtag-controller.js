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

module.exports.remove = function (req, res) {
 console.log(req.params.hashid);
  Hashtag.remove({_id: req.params.hashid}, function (err, results) {
  	if (err) throw err;
    res.json(results);
  });
}
