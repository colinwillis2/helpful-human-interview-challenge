// import dbConnect from './mongodb';
import HexColor from '../models/hexColor';
import colorList from './color-list.json';
import mongoose from 'mongoose';

async function seedColors() {
    try {
        // await dbConnect();
        // console.log('Connected to MongoDB');

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const insertedColors = await HexColor.insertMany(colorList);
        console.log(`Inserted ${insertedColors.length} colors`);
    } catch (error) {
        console.log('Error seeding colors:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
        console.log('Seeding completed');
        process.exit(0);
    }
}

seedColors();