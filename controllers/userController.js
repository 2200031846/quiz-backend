const User = require('../models/User'); // Ensure correct model import

// ✅ Fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.json({ message: `User with ID ${id} deleted successfully` });

    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Update user by ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body; // Fields to update

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only provided fields
        if (name) user.name = name;
        if (email) user.email = email;
    

        await user.save(); // Save updated user details
        res.json({ message: `User with ID ${id} updated successfully`, user });

    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Export functions
module.exports = { getUsers, deleteUser, updateUser };
