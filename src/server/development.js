const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const appPersonGames = retrieveJSON('./data_mock/app_person_games.json');
const appPersonGameDetails = retrieveJSON('./data_mock/app_person_game_details.json');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, '../client')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'html');

app.get('/', function(request, response) {
    response.render('index.html');
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

function retrieveJSON(path){
    fs.readFile(path, 'utf8', function (err, data) {
        return JSON.parse(data) || {};
    });
    return {};
}
