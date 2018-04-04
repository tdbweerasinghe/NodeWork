
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'You need to go to /employees to see the employees' });
};
