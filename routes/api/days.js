var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

router.get('/', function(req, res, next) {
    //get all the days
    Day.findAll({})
    .then(function(days) {
      res.json(days);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
  // get specific day
  Day.findOne({where:{number: req.params.id}})
  .then(function(days) {
    res.json(days);
  })
  .catch(next);
});

router.post('/add/:dayNum', function(req, res, next) {
  Day.findOrCreate({where: {number: req.params.dayNum} })
  .then(function (day) {
    res.json(day);
  })
  .catch(next);
});

router.post('/addAttraction/:dayNum/:type/:id', function(req, res, next) {
  // add an attraction
  console.log('in the route');
  var currentDayPromise = Day.findOne({where: {number: req.params.dayNum}});
  if (req.params.type === 'hotel') {
    currentDayPromise.then(function(day) {
      day.setHotel(req.params.id);
    })
    .then(function(day) {
      console.log('the day is', day);
      res.json(day);
    })
    .catch(next);
  } else {
    console.log('not there');
  }

});

router.delete('/:id', function(req, res, next) {
  // delete a day
});

router.delete('/:id/:type', function(req, res, next) {
  // delete an activity
});

module.exports = router;
