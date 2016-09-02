const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

var appPerson = JSON.parse(fs.readFileSync(__dirname + '/data_mock/app_person.json', 'utf8'));
var appPersonGames = JSON.parse(fs.readFileSync(__dirname + '/data_mock/app_person_games.json', 'utf8'));
var steamPerson = JSON.parse(fs.readFileSync(__dirname + '/data_mock/steam_person.json', 'utf8'));
var steamPersonGames = JSON.parse(fs.readFileSync(__dirname + '/data_mock/steam_person_games.json', 'utf8'));

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, '../client')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'html');

app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/api/person/:steamId', function (request, response){
    response.json(appPersonGames);
});

app.get('/api/games/', function(request, response){
    response.json(appPersonGames);
});

app.get('/api/games/:gameId', function(request, response){
    response.json(appPersonGameDetails[request.params.gameId]);
});

app.get('*', function(request, response) {
    response.render('index.html');
});

app.use(function(request, response){
    response.sendStatus(404);
});

app.listen(app.get('port'), function() {
    //console.log('running on port', app.get('port'));
});
