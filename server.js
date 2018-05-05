let express = require('express');
var bodyParser = require("body-parser");
let path = require('path');

let app = express();
let PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var character = [
    {
        routeName: "yoda",
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
    },

    {
        routeName: "darthmaul",
        name: "Darth Maul",
        role: "Sith Lord",
        age: 200,
        forcePoints: 1200
    },

    {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        role: "Jedi",
        age: 150,
        forcePoints: 1500
    }];

app.get('/', function (req, res) {
    // res.send('welcome to the stars page');
    // console.log('home page!');
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/add', function (req, res) {
    // res.send('welcome to the stars page');
    // console.log('home page!');
    res.sendFile(path.join(__dirname,'add.html'));
});

app.get("/api/characters", function (req, res) {
    return res.json(character);
});

app.get('/api/characters/:character', function (req, res) {
    let chosen = req.params.character;

    for (var i = 0; i < character.length; i++) {
        if (character[i].routeName == chosen) {
            return res.json(character[i]);
        }
    }

    return res.send('no characters found');
});

// create new characters
app.post('/api/characters', function(req, res){
    let newCharacter = req.body;
    console.log(newCharacter);

    character.push(newCharacter);
    res.json(newCharacter);
});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});