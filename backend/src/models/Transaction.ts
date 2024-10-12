import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
    product_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    create_at: Date;
    quantity_moved: number;
    movement_type: 'in' | 'out';
    description?: string;
}

const transactionSchema: Schema<ITransaction> = new Schema({
    product_id: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    create_at: { type: Date, default: Date.now },
    quantity_moved: { type: Number, required: true },
    movement_type: { type: String, enum: ['in', 'out'], required: true },
    description: { type: String, default: '' },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
