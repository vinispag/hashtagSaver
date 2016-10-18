var Hashtag = require('../models/hashtag');

module.exports.create = function (req, res) {
  var hashtag = new Hashtag(req.body);
  Hashtag.count({name: req.body.name}, function (err, count) {
    console.log(count);
    if (count==0){
      hashtag.save(function (err, result) {
        res.json(result);
      });
    }
    else 
      res.json(0);
  });
}

module.exports.list = function (req, res) {
  Hashtag.find({}, function (err, results) {
    res.json(results);
  });
}

module.exports.remove = function (req, res) {
  Hashtag.remove({_id: req.params.hashid}, function (err, results) {
  	if (err) throw err;
    res.json(results);
  });
}
