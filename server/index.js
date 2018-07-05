require('newrelic');
const express = require('express');
const path = require('path');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

const app = express();
const port = process.env.PORT || 8080;

const menusMicroservice = 'http://ec2-52-90-53-154.compute-1.amazonaws.com:3005';
const overviewsMicroservice = 'http://ec2-52-201-248-49.compute-1.amazonaws.com:3000';
const reviewsMicroservice = 'http://ec2-35-183-93-87.ca-central-1.compute.amazonaws.com:3000';

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

// app.use('/overviews', proxy('http://ec2-52-201-248-49.compute-1.amazonaws.com:3000/'));
// app.use('/photos', proxy('http://cavatablephotosv3-env.ispdbjpura.us-west-1.elasticbeanstalk.com/'));
// app.use('/menus', proxy('http://cavatablemenus-env.5sves92ky9.us-west-1.elasticbeanstalk.com/'));
// app.use('/reviews', proxy('http://ec2-35-183-93-87.ca-central-1.compute.amazonaws.com/restaurant'));
// app.use('/reservations', proxy('http://cavareservations.us-west-2.elasticbeanstalk.com/'));

app.all('/menus/*', function(req, res) {
  console.log(`redirecting to ${menusMicroservice}`);
  apiProxy.web(req, res, {target: menusMicroservice});
});

app.all('/restaurant/*/overview', function(req, res) {
  console.log(`redirecting to ${overviewsMicroservice}`);
  apiProxy.web(req, res, {target: overviewsMicroservice});
});

app.all('/restaurant/*/reviews', function(req, res) {
  console.log(`redirecting to ${reviewsMicroservice}`);
  apiProxy.web(req, res, {target: reviewsMicroservice});
});

//Menus Static Files
app.use('/menusBundle.js', function(req, res) {
  console.log('hit here')
  res.redirect(307, `${menusMicroservice}/menusBundle.js`)
});

// Overviews Static Files
app.use('/overviews/', function(req, res) {
  res.redirect(307, 'http://ec2-52-201-248-49.compute-1.amazonaws.com:3000/restaurant/:restaurantId/' + req.url)
});

// Reviews Static Files
app.use('/reviews/:pathname', function(req, res) {
  res.redirect(307, 'http://ec2-35-183-93-87.ca-central-1.compute.amazonaws.com:3000/restaurant/:restaurantId/' + req.params.pathname)
});

app.listen(port, () => console.log(`Listening on port ${port}!`));