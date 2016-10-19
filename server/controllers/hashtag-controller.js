var Hashtag = require('../models/hashtag');

module.exports.create = function (req, res) {
  var hashtag = new Hashtag(req.body);
  console.log('2c');
  Hashtag.count({name: req.body.name, userid: req.body.userid}, function (err, count) {
    console.log('3c');
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
  console.log('2l');
  Hashtag.find({userid: req.params.userid}, function (err, results) {
    res.json(results);
    console.log('3l');
  });
}

module.exports.remove = function (req, res) {
  console.log('2r');
  Hashtag.remove({_id: req.params.hashid}, function (err, results) {
  	if (err) throw err;
    res.json(results);
    console.log('3r');
  });
}
