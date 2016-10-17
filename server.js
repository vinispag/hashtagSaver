var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    hashtagController = require('./server/controllers/hashtag-controller');

mongoose.connect('mongodb://localhost:27017/hashtag');

app.use(bodyParser());

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/views/css'));

//REST API
app.get('/api/hashtag', hashtagController.list);
app.post('/api/hashtag', hashtagController.create);

app.listen(3000, function() {
  console.log('Server up');
})