import mongoose from 'mongoose';

export interface IHexColor extends mongoose.Document {
    hex: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const hexColorSchema: mongoose.Schema<IHexColor> = new mongoose.Schema({
    hex: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const HexColor = mongoose.models.HexColor || mongoose.model<IHexColor>('HexColor', hexColorSchema);

export default HexColor;