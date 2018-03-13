var friends = require("../data/friends.js");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    
    app.post("/api/friends", function(req, res) {
       
    var newFriend = {
        name: req.body.name,
        photo: req.body.photo,
        scores: JSON.parse(req.body.scores)
        };
    
    var compareArray = [];

    friends.forEach(function(item, index) {
        var diff = 0;
        for (var x = 0; item.score.length; x++) {
            diff += Math.abs(item.scores[x] - newFriend.scores[x]);
            compareArray.push({"difference": diff, "index": index});           
        }
    });
    compareArray.sort(function(friend1, friend2){
        return friend1.diff - friend2.diff;
    });
    friends.push(newFriend);
    res.json(friends[compareArray[0].index]);
    });
};