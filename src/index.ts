import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    return res.status(200).json({
        message: "Server is healthy"
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});