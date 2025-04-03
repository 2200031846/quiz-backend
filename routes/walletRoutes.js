const express = require('express');
const { getWalletBalance, addCoins, spendCoins, deleteTransaction } = require('../controllers/walletController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/:user_id', authMiddleware, getWalletBalance);
router.post('/earn', authMiddleware, addCoins);
router.post('/spend', authMiddleware, spendCoins);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteTransaction);

module.exports = router;
