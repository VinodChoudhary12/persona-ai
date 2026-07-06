# Persona AI

Persona AI is a full-stack chat application where users can talk with different AI personas. The frontend is a React + Vite chat interface, and the backend is an Express API that sends the user's message to Gemini with a selected persona prompt.

## Features

- Chat-style UI built with React and Tailwind CSS.
- Persona selector with Hitesh and Piyush personas.
- Express backend with a `/api/chat` endpoint.
- Gemini integration using `@google/generative-ai`.
- Persona prompts stored separately in `server/personas`.

## Project Structure

```text
persona-ai/
  client/
    src/
      components/
        Chat.jsx
        Sidebar.jsx
        Message.jsx
      pages/
        Home.jsx
      App.jsx
      main.jsx
    package.json

  server/
    routes/
      chat.js
    personas/
      hitesh.js
      piyush.js
    app.js
    package.json
```

## How It Works

1. The user opens the React app and selects a persona from the sidebar.
2. The user types a message in the chat box.
3. `Chat.jsx` sends a POST request to the backend:

```http
POST http://localhost:5000/api/chat
```

Request body:

```json
{
  "persona": "hitesh",
  "message": "Explain full stack development"
}
```

4. The Express route in `server/routes/chat.js` checks the selected persona.
5. The server loads the matching prompt from `server/personas/hitesh.js` or `server/personas/piyush.js`.
6. The server combines the persona prompt with the user's question and sends it to Gemini.
7. Gemini returns an answer in that persona's style.
8. The frontend displays the response in the chat window.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, CORS, dotenv
- AI: Google Gemini through `@google/generative-ai`

## Setup

### 1. Install Client Dependencies

```bash
cd client
npm install
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Add Environment Variables

Create a `.env` file inside the `server` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

`PORT` is optional. If it is not provided, the server uses port `5000`.

## Running The Project

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

The frontend will run on the Vite dev server, usually:

```text
http://localhost:5173
```

The backend API runs on:

```text
http://localhost:5000
```

## Available Personas

### Hitesh

Hitesh answers in a friendly, motivating Roman Hindi + English teaching style with practical examples.

### Piyush

Piyush answers in a structured, technical, production-focused style with problem, solution, tradeoff, and production considerations.

## API Endpoint

### POST `/api/chat`

Request:

```json
{
  "persona": "piyush",
  "message": "What is Docker?"
}
```

Response:

```json
{
  "success": true,
  "answer": "Generated persona-based response"
}
```

## Build

To build the frontend for production:

```bash
cd client
npm run build
```

## Notes

- Keep your Gemini API key private and do not commit `.env`.
- The frontend currently calls `http://localhost:5000/api/chat` directly.
- Add new personas by creating a new prompt file in `server/personas` and updating the persona selection logic in the client and server.
