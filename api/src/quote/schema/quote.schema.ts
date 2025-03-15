import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema({ collection: 'quotes', versionKey: false, timestamps: { updatedAt: false } })
export class Quote {
    readonly _id: Types.ObjectId;

    @Prop()
    amount: number;

    @Prop()
    from: string;

    @Prop()
    to: string;

    @Prop()
    expiresAt: Date;

    @Prop()
    rate: number;

    @Prop()
    convertedAmount: number
}

// Pre-hooking before save on quote model
export const QuoteSchema = SchemaFactory.
    createForClass(Quote).
    pre("save", function (next) {
        const d = new Date()
        // set expiresAt by adding five min to current time
        d.setTime(d.getTime() + 3e5)
        this.expiresAt = d

        // set converted amount 
        this.convertedAmount = this.rate * this.amount
        next()
    });