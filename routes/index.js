var express = require('express');
var router = express.Router();
var state = require('.././state')
state.start()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/labcheck', function(req, res, next) {
  state.pushState('OK')
  res.send("ok")
});

router.get('/labcheck/shutdown', function(req, res, next) {
  state.pushState('shutdown')
  res.send("ok")
});

router.get('/labcheck/set/interval/:interval',function(req,res,next){
	let interval = parseInt(req.params.interval)
	typeof interval === "number" ? state.setInterval(interval) : null
	res.send(`set interval to: ${interval}`)
})
router.get('/labcheck/set/limit/:limit',function(req,res,next){
	let limit = parseInt(req.params.limit)
	typeof limit === "number" ? state.setlimit(limit) : null
	res.send(`set limit to: ${limit}`)
})

router.get('/labcheck/areyouup?',function(req,res,next){
	res.json(state.calculateState())
})
router.get('/labcheck/get/stateSnapshot',function(req,res,next){
	res.json(state.getSnap())
})
router.get('/labcheck/get/limit',function(req,res,next){
	res.json(state.getLimit())
})
router.get('/labcheck/get/interval',function(req,res,next){
	res.json(state.getInterval())
})

module.exports = router;
