import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import recommendedRouter from "./routes/recommended.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Debug middleware (Moved before express.json to log requests even if JSON is invalid)
app.use((req, res, next) => {
    console.log(`[Incoming] ${req.method} ${req.path}`);
    console.log("Content-Type:", req.headers['content-type']);
    next();
});

app.use(cors());
app.use(express.json());

// Error handler specifically for JSON parsing issues
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
        console.error("❌ JSON parsing error:", err.message);
        return res.status(400).json({ error: "Invalid JSON format in request body" });
    }
    next();
});

app.get("/health", (req, res) => {
    console.log("hh");

    return res.status(200).json({
        message: "Server is healthy"
    })
});



app.use("/api/recommended", recommendedRouter);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});