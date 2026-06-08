from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

if not db.query(models.Skill).first():
    skills = [
        models.Skill(name="Python", category="Backend", proficiency=95),
        models.Skill(name="FastAPI", category="Backend", proficiency=90),
        models.Skill(name="PostgreSQL", category="Backend", proficiency=85),
        models.Skill(name="React", category="Frontend", proficiency=88),
        models.Skill(name="TypeScript", category="Frontend", proficiency=82),
        models.Skill(name="TailwindCSS", category="Frontend", proficiency=90),
        models.Skill(name="Docker", category="DevOps", proficiency=80),
        models.Skill(name="Git", category="DevOps", proficiency=92),
    ]
    db.add_all(skills)

if not db.query(models.Experience).first():
    experiences = [
        models.Experience(
            company="BlueCopa",
            role="Software Engineer",
            start_date="2023-01",
            end_date="Present",
            description="Building scalable data platforms and APIs.",
            highlights=["Developed FastAPI microservices", "Led frontend migration to React", "Reduced API latency by 40%"],
            order=0,
        ),
        models.Experience(
            company="Previous Corp",
            role="Junior Developer",
            start_date="2021-06",
            end_date="2022-12",
            description="Full-stack development for enterprise clients.",
            highlights=["Built REST APIs with Django", "Maintained CI/CD pipelines"],
            order=1,
        ),
    ]
    db.add_all(experiences)

if not db.query(models.Project).first():
    projects = [
        models.Project(
            title="Portfolio Website",
            description="Personal portfolio built with FastAPI and React.",
            tech_stack=["Python", "FastAPI", "React", "TailwindCSS"],
            github_url="https://github.com/example/portfolio",
            featured=True,
            order=0,
        ),
        models.Project(
            title="Data Pipeline",
            description="Real-time data ingestion pipeline using Kafka and Python.",
            tech_stack=["Python", "Kafka", "PostgreSQL", "Docker"],
            github_url="https://github.com/example/pipeline",
            featured=True,
            order=1,
        ),
    ]
    db.add_all(projects)

if not db.query(models.BlogPost).first():
    posts = [
        models.BlogPost(
            title="Getting Started with FastAPI",
            slug="getting-started-fastapi",
            summary="A quick introduction to building APIs with FastAPI.",
            content="FastAPI is a modern, fast web framework for building APIs with Python...",
            tags=["Python", "FastAPI", "Backend"],
            published=True,
        ),
        models.BlogPost(
            title="React + TailwindCSS in 2024",
            slug="react-tailwind-2024",
            summary="Best practices for building UIs with React and TailwindCSS.",
            content="TailwindCSS has changed how we write CSS in React applications...",
            tags=["React", "TailwindCSS", "Frontend"],
            published=True,
        ),
    ]
    db.add_all(posts)

db.commit()
db.close()
print("Seed data inserted successfully.")
