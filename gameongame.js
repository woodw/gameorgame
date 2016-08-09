var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, '/app')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/app'));
app.set('view engine', 'html');

app.get('*', function(request, response) {
    response.render('/index.html');
});

app.get('/api', function(request, response){
    response.json({name:'api'});
});

app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});