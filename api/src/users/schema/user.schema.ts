import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { hashSync, genSaltSync } from 'bcrypt'


export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: false, timestamps: true })
export class User {
    readonly _id: Types.ObjectId;

    @Prop({ unique: true, index: true })
    email: string;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
    .pre("save", function (next) {
        try {
            if (!this.isModified('password')) return next();
            const salt = genSaltSync(10);
            this.password = hashSync(this.password, salt);
        } catch (e) {
            console.log(e)
        }
        next()
    })
