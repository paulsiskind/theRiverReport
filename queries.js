// var promise = require('bluebird');

// var options = {
//   // Initialization Options
//   promiseLib: promise
// };

// var pgp = require('pg-promise')(options);
// var connectionString = process.env.DATABASE_URL || "postgres://@localhost/theriverreport";
// var db = pgp(connectionString);

// // add query functions

// function getAllFavotite(req, res, next) {
//   db.any('select * from pups')
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL puppies'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// module.exports = {
//   getAllFavorite: getAllFavorite,
  
// };