from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .routers import users, stats

models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="Career Compass API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/healthcheck")
def healthcheck():
    return "OK"

app.include_router(users.router)
app.include_router(stats.router)