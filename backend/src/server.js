import 'dotenv/config'; // ✅ Load env once (ESM way)
import express from 'express';
import cors from 'cors';

import StudentRoutes from './routes/StudentRoutes.js';
import AttendanceRoutes from './routes/AttendanceRoutes.js';

import { db } from './config/db.js';
import RateLimiter from './middleware/RateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  
    'http://localhost:5173', // Vite default port
    'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// middleware
app.use(express.json());
app.use(RateLimiter);




// routes

app.use("/api/students", StudentRoutes);
app.use("/api/attendance", AttendanceRoutes);

// start server AFTER DB connects
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);

    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
