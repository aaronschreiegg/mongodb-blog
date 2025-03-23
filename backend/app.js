import express from 'express';
import productRoutes from './routes/blogs.js';
import mongoose from 'mongoose';
import config from "./config.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import blogCategoryRoutes from './routes/blog-category.routes.js';
import commentRoutes from './routes/comment.routes.js';
import userRoutes from './routes/blog-user.routes.js';

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
app.use('/users', userRoutes);
app.use('/blogs', productRoutes);
app.use('/categories', blogCategoryRoutes);
app.use('/comments', commentRoutes);

await connectToDB();

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Ein Fehler ist aufgetreten',
        error: err.message
    });
});

export default app;