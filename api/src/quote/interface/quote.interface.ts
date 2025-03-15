import { Document } from 'mongoose';

export interface IQuote extends Document {
    readonly amount: number;
    readonly from: string;
    readonly to: string;
}