const Wallet = require('../models/Wallet');
const CoinHistory = require('../models/CoinHistory');
const User = require('../models/User');

// 📌 Get Wallet Balance (User)
exports.getWalletBalance = async (req, res) => {
    try {
        const { user_id } = req.params;

        const wallet = await Wallet.findOne({ where: { user_id } });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallet balance', error });
    }
};

// 📌 Add Coins to Wallet (User)
exports.addCoins = async (req, res) => {
    try {
        const { amount, reason } = req.body;
        const user_id = req.user.id;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

        let wallet = await Wallet.findOne({ where: { user_id } });

        if (!wallet) {
            wallet = await Wallet.create({ user_id, coins: 0 });
        }

        await wallet.increment('coins', { by: amount });

        await CoinHistory.create({ user_id, coins_added: amount, reason });

        res.json({ message: 'Coins added successfully', wallet });
    } catch (error) {
        res.status(500).json({ message: 'Error adding coins', error });
    }
};

// 📌 Spend Coins from Wallet (User)
exports.spendCoins = async (req, res) => {
    try {
        const { amount, reason } = req.body;
        const user_id = req.user.id;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

        let wallet = await Wallet.findOne({ where: { user_id } });

        if (!wallet || wallet.coins < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        await wallet.decrement('coins', { by: amount });

        await CoinHistory.create({ user_id, coins_used: amount, reason });

        res.json({ message: 'Coins spent successfully', wallet });
    } catch (error) {
        res.status(500).json({ message: 'Error spending coins', error });
    }
};

// 📌 Delete a Wallet Transaction (Admin Only)
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await CoinHistory.findByPk(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.destroy();
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error });
    }
};
