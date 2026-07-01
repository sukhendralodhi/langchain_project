import { z } from "zod";

// zod = ts first schema validation library
// langchain = zod to define the EXACT shape of the ai output

export const MoviesSchema = z.object({
    title: z.string().describe("Movie title"),
    // ts = langchain seeds this descriptions to the model
    // model will know each field should contain what
    year: z.number().describe("Release year"),
    genre: z.array(z.string()).describe("List of genre"),
    cast: z.array(z.string()).describe("Top 3 cast members"),
    reason: z.string().describe("Why this matches the user's mood and prefrence"),
    rating: z.number().min(1).max(10).describe("IMDB style rating out of 10")
});

export const RecommendationSchema = z.object({
    movies: z.array(MoviesSchema).describe("List of recommended movies")
});

export type Movie = z.infer<typeof MoviesSchema>
export type Recommendation = z.infer<typeof RecommendationSchema>