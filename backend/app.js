import express from 'express';
import productRoutes from './routes/blogs.js';
import mongoose from 'mongoose';
import config from "./config.js";
import bodyParser from 'body-parser';
import cors from 'cors';

const connectToDB = async () => {
    try {
        await mongoose.connect(config.db_uri, {})
    }catch (e) {
        console.log(e);
        process.exit(1)
    }
}

const app = express();

//middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true
}));

// Erhöhe das Limit für JSON-Payload
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/blogs', productRoutes);

await connectToDB();

export default app;