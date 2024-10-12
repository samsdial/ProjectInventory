import mongoose, { Schema, Document } from 'mongoose';

interface IWarehouse extends Document {
    name: string;
    location: string;
    id_user: mongoose.Types.ObjectId;
}

const warehouseSchema: Schema<IWarehouse> = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

export const Warehouse = mongoose.model<IWarehouse>('Warehouse', warehouseSchema);
