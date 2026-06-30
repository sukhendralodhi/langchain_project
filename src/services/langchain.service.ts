import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogle } from "@langchain/google/node";
import dotnev from "dotenv";
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
        ["system", ""], // sytem message who the ai is + how it should behave (sent on every request before the users messages) - sets the personality and rules for the system
        ["human", ""]
    ]
);