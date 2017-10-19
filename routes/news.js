/**
 * Created by aliez on 2017/10/17.
 */

var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var dataCtrl = require('../controller/news.controller');

router.post('/data',dataCtrl.create);
router.get('/data/:id',dataCtrl.get);
router.put('/data/:id',dataCtrl.update);

router.delete('/data/:id',dataCtrl.remove);

router.post('/list',dataCtrl.list);
router.post('/deletes',dataCtrl.deletes);

router.post('/finds',dataCtrl.finds);



module.exports = router;