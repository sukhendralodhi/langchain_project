# What is LangChain? 
LangChain is a open source framework for building applications that powered by LLM.

## Composable building blocks- 
models, prompts, parsers, chains and memory

## What is LangChain does | What problem LangChain solve?
move from calling an AI api once to desiging an AI pipelines

## Core Packages
@langchain/core prompts, runnables, parsers, messages
----
## Frameworks
-  LangChain - composable components
- LangGraph - graph based statefull agent flows
- LangSmith - observability, tracking, evals

------

- chat models = diff llm providers
- prompt template = reusable prompts with variables
- chain (LCEL) = pipe components
- output parser + structured output = bind one schema so that model returns typed json
(invoke, stream, batch)

## Runnable 
- invoke() = single inoput <-> signle output
- stream() = input <-> output arrives in chunks
- batch() = multiple inputs parralel
