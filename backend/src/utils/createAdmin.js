const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createAdmin = async () => {
    try {
        await connectDB();

        const username = 'admin';
        const password = 'admin123';
        const role = 'admin';

        const userExists = await User.findOne({ username });

        if (userExists) {
            userExists.password = 'admin123';
            await userExists.save();
            console.log('Admin user exists. Password has been RESET to: admin123');
            process.exit();
        }

        const user = await User.create({
            username,
            password: 'admin123',
            role
        });

        console.log(`Admin created: ${user.username} / admin123`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
