var express = require('express');
var path = require('path');
var app = express();
//var router = express.Router();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, '../../dist/client')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '../../dist/client'));
app.set('view engine', 'html');

app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/api/games/', function(request, response){
    response.json([
        {'id':'379720'},
        {'id':'377160'},
        {'id':'234140'}
    ]);
});

app.get('/api/games/:gameId', function(request, response){
    switch(request.params.gameId){
    case '379720':
        response.json({
            level:3,
            id:'379720',
            title:'Doom',
            review:'This game is the best!',
            categories:[
                {title:'gameplay',level:2},
                {title:'immersion',level:3},
                {title:'performance',level:1},
                {title:'sound',level:3},
                {title:'story',level:3},
                {title:'visuals',level:1}
            ]
        });
        break;
    case '377160':
        response.json({
            level:3,
            id:'377160',
            title:'Fallout 4',
            review:'Fallout 4 review',
            categories:[
                {title:'gameplay',level:2},
                {title:'immersion',level:3},
                {title:'performance',level:1},
                {title:'sound',level:3},
                {title:'story',level:3},
                {title:'visuals',level:1}
            ]
        });
        break;
    case '234140':
        response.json({
            level:3,
            id:'234140',
            title:'Mad Max',
            review:'Mad Max Review',
            categories:[
                {title:'gameplay',level:2},
                {title:'immersion',level:3},
                {title:'performance',level:1},
                {title:'sound',level:3},
                {title:'story',level:3},
                {title:'visuals',level:1}
            ]
        });
        break;
    }

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