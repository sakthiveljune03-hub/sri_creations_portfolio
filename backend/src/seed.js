import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@cinematicportfolio.com';
    const password = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
    const name = process.env.ADMIN_NAME || 'Portfolio Admin';

    const existingAdmin = await User.findOne({ role: 'Admin' });

    if (existingAdmin) {
      console.log(`Admin user already exists with email: ${existingAdmin.email}`);
      console.log('Will not overwrite or duplicate existing admin.');
      process.exit(0);
    }

    const admin = new User({
      name,
      email,
      password,
      role: 'Admin'
    });

    await admin.save();
    console.log('✅ Admin user seeded successfully!');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('Use these credentials to authenticate in the Admin Dashboard.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
