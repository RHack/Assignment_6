#!/usr/bin/env node

"use strict";

var http = require("http"), querystring = require("querystring"), express = require("express");
var app = express();
app.use(express.static('public'));

//Function to write json to the res
function status(res, stat){
    res.json(stat);
}

//Function to play the game
function play(req, res, act, stat, obj2index, senario){
    //Randomly assign an item for the AI.
    var ai = Math.floor(Math.random() * 5);
    var result = senario[obj2index[act]][ai];
    stat.outcome = result;
    //Add onto win,loss,tie list
    if (result == "win"){
        stat.wins+=1;
    } else if (result == "lose") {
        stat.losses+=1;
    } else if (result == "tie") {
        stat.ties+=1;
    } else {
        stat.outcome= "did not count";
    }
    status(res, stat);
    
}

//Arrays for the options and their results with other options.
var obj2index = {rock: 0, paper: 1, scissors: 2, lizard: 3, spock: 4};
var senario = [ ["tie", "lose", "win" , "win", "lose"],
                ["win", "tie", "lose" , "lose", "win"],
                ["lose", "win", "tie" , "win", "lose"],
                ["lose", "win", "lose" , "tie", "win"],
                ["win", "lose", "win" , "lose", "tie"]];

//Display the outcome of a match.
var stat = {outcome: "no play", wins: 0, losses: 0, ties: 0};

//Create the action for the user and display the outcome.
app.all('/play/:move', function(req, res) {
    var move = req.params.move;
    if(move==="rock" || move==="paper" || move==="scissors" || move==="lizard" || move==="spock"){
        play(req, res, move, stat, obj2index, senario);
    } else {
        stat.outcome = "no play";
        status(res, stat);
    }
});

//If the page is not /play/... display no play and redirect.
app.all('*', function(req, res) {
    stat.outcome = "no play";
    res.sendFile(__dirname + '/public/play.html');
});

//Connect to server.
var server = app.listen(11111);
var address = server.address();
console.log("node is listening at http://localhost:" + address.port + "/");
