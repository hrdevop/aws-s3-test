import { config } from 'dotenv';

config();

const AWS_REGION: string = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID: string = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY: string = process.env.AWS_SECRET_ACCESS_KEY;
const MONGOOSE_URL: string = process.env.MONGOOSE_URL;

export { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, MONGOOSE_URL };
