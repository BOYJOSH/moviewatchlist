import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 5500
}
export default config;