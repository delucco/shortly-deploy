var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  username: {type: String, index: {unique: true } },
  password: String,
  created_at: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

// var hashify = function(){
// }

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    next();
  });
});

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(err, isMatch);
  });
};

var user = new User({
  username: 'omar',
  password: 'omar'
});

// user.save(function(err){
//   if (err) {console.error("there is an error");}
//   User.find(function(err, users){
//     if (err) {console.error("there is an error");}
//     console.log("user equals: ", users);
//     var query  = User.where({ username: 'omar' });
//     query.findOne(function(err, user){
//       if (err) {console.error('You fucked up');}
//       user.comparePassword('omar', function(err, isMatch){
//         if (err) {console.error('You REALLY fucked up');}
//         console.log(isMatch);
//       });
//     });
//   });
// });

module.exports = User;





// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   hashPassword: function(){
//   }
// });

