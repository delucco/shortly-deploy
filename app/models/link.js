var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

var linkSchema =  mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  created_at: { type: Date, default: Date.now }
});


var Link = mongoose.model('Link', linkSchema);

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

// var link = new Link({
//   url: 'http://www.google.com'
// });

// link.save(function(err) {
//   if (err) { console.error('There is an error!!:', err); }

//   Link.find(function(err, links) {
//     if (err) { console.error('WTF!'); }
//     console.log('Links: ', links);
//   })
// });


module.exports = Link;
