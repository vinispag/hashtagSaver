var mongoose = require('mongoose');

module.exports = mongoose.model('Hashtag', {
  name: String,
  userid: String
});