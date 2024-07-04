import express from 'express';
import { config } from 'dotenv';
// import connectToDB from './config/db.js';
import connectToDB from "./src/config/db.js";
import userRouter from './src/routes/userRoute.js';
import bookRoute from './src/routes/bookRoute.js';

config();

const port = process.env.PORT || 8080;
const dburl = process.env.DB_URL || null;

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/books', bookRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  try {
    await connectToDB(dburl);
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    console.log("stuck");
  }
});
