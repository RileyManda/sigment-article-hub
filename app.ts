import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import apiRoutes from "./api/routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;
// Middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
