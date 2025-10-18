# AI Agent Backend

A modular backend system designed to power intelligent AI Agents for customer service, marketing, and knowledge-based automation.  
Built with **TypeScript**, **Hono**, and **pgvector**, this project demonstrates how to combine clean backend architecture with **LLM-powered reasoning** and **semantic search**.

---

## Overview

It provides a foundation for building multi-agent systems that:

- Retrieve context from vector databases
- Generate dynamic prompts for different agent roles
- Interact with LLMs to produce natural, business-aware responses

---

## Features

- **Prompt Builder System** – Dynamically constructs prompts based on tone, persona, and context
- **Vector Similarity Search** – Finds semantically relevant chunks using `pgvector`
- **Modular Architecture** – Built with scalability and multi-agent use in mind
- **Strategy Pattern for Agent Types** – Example: KnowledgeAgent, SupportAgent
- **Structured Logging** – Inspired by Go’s Logrus style

## Run Locally

To install dependencies:

```sh
bun install
```

To run migration:

```sh
bun drizzle-kit migrate
```

To run:

```sh
bun run dev
```
