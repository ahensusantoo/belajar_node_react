import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const baseURL = process.env.BASE_URL_BACKEND || 'http://localhost';

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware for handling errors
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, baseURL,() => {
  console.log(`Server is listening on ${baseURL}:${port}`);
});
