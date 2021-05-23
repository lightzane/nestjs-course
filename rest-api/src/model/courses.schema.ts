import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

// Course Model
export const CoursesSchema = new mongoose.Schema({
    seqNo: Number,
    url: String,
    iconUrl: String,
    courseListIcon: String,
    description: String,
    longDescription: String,
    category: String,
    lessonsCount: Number,
    promo: Boolean,
});

export interface Course extends Document {
    seqNo: number;
    url: string;
    iconUrl: string;
    courseListIcon: string;
    description: string;
    longDescription: string;
    category: string;
    lessonsCount: number;
    promo: boolean;
}
