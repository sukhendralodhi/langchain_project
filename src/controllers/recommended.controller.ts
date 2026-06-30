import { Request, Response } from "express";
import { getRecommendations } from "../services/langchain.service.js";

export async function recommendedMovies(req: Request, res: Response) {
    try {
        // console.log("hello from controller");
        // console.log("Request body:", req.body);
        // console.log("Request headers:", req.headers);

        // return res.status(200).json({
        //     message: "COntroller"
        // })

        const {
            userPrompt = "Suggest movies for a rainy night",
            genre = "Thriller",
            mood = "Relaxed",
            count = 2
        } = req.body;

        const result = await getRecommendations(
            {
                userPrompt,
                genre,
                mood,
                count: Number(count)
            }
        );

        return res.status(200).json({
            message: "Recommendations",
            data: result
        });

    } catch (error) {
        console.error("Error in controller:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}