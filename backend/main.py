from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import projects, skills, experience, blog, contact

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(experience.router)
app.include_router(blog.router)
app.include_router(contact.router)


@app.get("/")
def root():
    return {"message": "Portfolio API is running"}
