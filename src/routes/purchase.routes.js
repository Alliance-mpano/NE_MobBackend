const express = require('express')
const {recordPurchase, listPurchaseHistory, validateToken} = require('../controllers/purchase.controller')
const router = express.Router();

/**
 * @swagger
 * /api/purchase/create:
 *   post:
 *     summary: Purchase Electricity
 *     description: Generate a new token
 *     responses:
 *       '201':
 *         description: Token Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 * /api/purchase/list:
 *   get:
 *     summary: Get purchase
 *     description: Getting the purchase history
 *     responses:
 *       '200':
 *         description: Request Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 */
router.post('/create', recordPurchase);
router.get('/list', listPurchaseHistory);
router.get('/validate', validateToken);

module.exports = router;
