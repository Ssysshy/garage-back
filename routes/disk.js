/**
 * Created by c5sshy on 2018/12/05.
 */

const express = require('express');
const router = express.Router();

const dataCtrl = require('../controller/disk.controller');

router.post('/data',dataCtrl.create);
router.get('/data/:id',dataCtrl.get);
router.put('/data/:id',dataCtrl.update);

router.delete('/data/:id',dataCtrl.remove);

router.post('/list',dataCtrl.list);
router.post('/deletes',dataCtrl.deletes);

module.exports = router;
