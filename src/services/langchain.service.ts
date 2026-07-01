import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogle } from "@langchain/google/node";
import dotnev from "dotenv";
import { RecommendationSchema } from "../schemas/movie.schema.js";
dotnev.config();

const model = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0
    // lower the temprature = more consitent
    // less random answer
});

const promptTemplate = ChatPromptTemplate.fromMessages(
    [
        ["system", `
            You are a movie recommendation expert.
            Return high-quality recommendations based on:
            - user's request
            - genre
            - mood
            - count
            Every movie should feel intentional.
            Do not recommend only the most obvious titles every time.
            `], // sytem message who the ai is + how it should behave (sent on every request before the users messages) - sets the personality and rules for the system

        ["human",

            `
            User request: {userPrompt}

            Prefrences:
            - Genre: {genre},
            - Mood: {mood},
            - Number of movies: {count}
            `
        ] // human message (user request with variables)
    ]
);

export async function getRecommendations(
    input: {
        userPrompt: string,
        genre: string,
        mood: string,
        count: number
    }
) {

    // console.log("Inside getRecommendations");
    const chain = promptTemplate.pipe(model); // this .pipe(model) = LCEL - LangChain Expression Language
    // connect components into chain
    // input - promptTemplate -> variables -> call model(gemini) - > result
    // console.log("Before invoke");

    const response = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count: input.count
    })

    // console.log("After invoke");

    return response.text;
}


// zod + structured output
const structuredModel = model.withStructuredOutput(RecommendationSchema);

interface RecommendationInput {
    userPrompt: string;
    genre: string;
    mood: string;
    count: number;
}

export async function getStructuredRecommendation(
    input: RecommendationInput
) {
    const chain = promptTemplate.pipe(structuredModel);
    const result = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count: input.count
    });

    console.log(result);
    return result;
}
