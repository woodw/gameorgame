var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, '/app')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/app'));
app.set('view engine', 'html');

app.get('/', function(request, response) {
    response.render('/index.html');
});

app.get('/api/games/:gameId', function(request, response){
    switch(request.params.gameId){
        case '379720':
        response.json({title:'Doom',review:'This game is the best!'});
            break;
        case '377160':
        response.json({title:'Fallout 4',review:'Why does this not work. I mean... why is this game so good'});
            break;
    }
    
});

app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});