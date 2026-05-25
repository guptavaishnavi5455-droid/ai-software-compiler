# ai-software-compiler
ai-software-compiler/
├── apps/
│   ├── api/ (FastAPI backend)
│   ├── web/ (Next.js frontend)
│   └── runtime/ (compiler + templates)
├── packages/
│   ├── generators/
│   ├── validators/
│   ├── repair-engine/
│   └── ir/
├── docker-compose.yml
└── README.md
from fastapi import FastAPI
from routes.generate import router as generate_router

app = FastAPI()
app.include_router(generate_router)
from fastapi import APIRouter
from services.pipeline import run_pipeline

router = APIRouter()

@router.post("/generate")
async def generate_app(payload: dict):
    result = await run_pipeline(payload["prompt"])
    return result
async def run_pipeline(prompt: str):
    # Minimal demo pipeline
    ir = {"entities": [{"name": "Contact"}, {"name": "User"}]}
    generated = {
        "ui": ["/contacts", "/login"],
        "api": ["/api/contacts", "/api/users"],
        "database": """model Contact {
  id String @id @default(uuid())
  name String
  email String @unique
}
model User {
  id String @id @default(uuid())
  email String @unique
  password String
}"""
    }
    return {"ir": ir, "generated": generated, "runtime": {"status": "compiled"}}
port { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  async function generateApp() {
    const res = await fetch("https://ai-compiler-api.up.railway.app/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Software Compiler</h1>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button onClick={generateApp}>Generate App</button>
      <pre>{result && JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
import os

async def compile_runtime(spec):
    os.makedirs("generated-app", exist_ok=True)
    with open("generated-app/schema.prisma", "w") as f:
        f.write(spec["database"])
    return {"status": "compiled"}
version: '3'
services:
  api:
    build: ./apps/api
    ports:
      - "8000:8000"
  web:
    build: ./apps/web
    ports:
      - "3000:3000"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
fastapi
uvicorn
