var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, default: "Position available at NIO for fullStack developer" }
});

module.exports = mongoose.model('Job', jobSchema);
