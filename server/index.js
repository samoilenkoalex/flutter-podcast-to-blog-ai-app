import express from 'express';
import routes from './routes/routes.js';
import 'dotenv/config'; // This will load the environment variables from .env file

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('HF_KEY:', process.env.HF_KEY);
    console.log(`Server is running on port ${PORT}`);
});
