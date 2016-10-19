var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    hashtagController = require('./server/controllers/hashtag-controller');

mongoose.connect('mongodb://hashtaguser:123@130.211.147.147:27017/hashtag');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/views/css'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/app'));

//REST API
app.get('/api/hashtag/:userid', hashtagController.list);
app.post('/api/hashtag', hashtagController.create);
app.delete('/api/hashtag/:hashid', hashtagController.remove);

app.listen(3000, function() {
  console.log('Server up');
})
