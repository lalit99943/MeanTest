var express = require('express');
var bodyParser = require("body-parser");
var Job = require('./models/jobs');
var mongoose = require("mongoose");
var mongoDbURI="mongodb://localhost:27017/tempdb";

mongoose.connect(mongoDbURI)
.then(function() {
  console.log("Connected to DataBase!");
})
.catch(function() {
  console.log("Connection Failed!");
});



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/getJobs",function(req,res,next){
  Job.find().then(function(documents)  {
    res.status(200).json({
      message: "Posts fetched successfully!",
      jobs: documents
    });
  });
});

app.post("/postJob",function(req,res,next){
  var job = new Job({
    title : req.body.title,
    desc : req.body.desc
  });
  job.save().then(function(createdPost) {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.put("/updateJob/:id", (req, res, next) => {
  var job = new Job({
    _id: req.body.id,
    title: req.body.title,
    desc: req.body.desc
  });
  Job.updateOne({ _id: req.params.id }, job).then(function(result) {
    res.status(200).json({ message: "Update successful!" });
  });
});

app.delete("/deleteJob/:id",function(req,res,next){
  Job.deleteOne({ _id: req.params.id }).then(function(result) {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});


module.exports = app;
