import express from 'express';
import config from './config/env.js';
import userRouter from './routes/user.routes.js';
import movieRouter from './routes/movie.routes.js';


const app = express();
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', movieRouter);

app.get('/', (req, res) => {
  res.send('MovieWatch Server is running');
});

const PORT = config.port || 5500;
app.listen(PORT, () => {
  console.log(`MovieWatch Server running on http://localhost:${PORT}`);
});

export default app;