const express = require('express')
const {recordPurchase, listPurchaseHistory, validateToken} = require('../controllers/purchase.controller')
const router = express.Router();


router.post('/create', recordPurchase);
router.post('/list', listPurchaseHistory);
router.post('/validate', validateToken);

module.exports = router;
