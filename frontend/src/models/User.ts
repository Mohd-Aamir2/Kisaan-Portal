import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  farmSize: number;
  soilType: string;
  location: string;
  cropPreference: string;
}

const UserSchema: Schema<IUser> = new Schema({  
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // ⚠️ hash in production
    farmSize: { type: Number, required: true },
    soilType: { type: String, required: true },
    location: { type: String, required: true },
    cropPreference: { type: String, required: true },
}
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
