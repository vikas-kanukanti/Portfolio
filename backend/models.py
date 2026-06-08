from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from sqlalchemy.sql import func
from database import Base


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    tech_stack = Column(JSON)
    github_url = Column(String(500))
    live_url = Column(String(500))
    image_url = Column(String(500))
    featured = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100))
    proficiency = Column(Integer)


class Experience(Base):
    __tablename__ = "experiences"
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(200), nullable=False)
    role = Column(String(200), nullable=False)
    start_date = Column(String(20))
    end_date = Column(String(20))
    description = Column(Text)
    highlights = Column(JSON)
    order = Column(Integer, default=0)


class BlogPost(Base):
    __tablename__ = "blog_posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    slug = Column(String(300), unique=True, nullable=False)
    summary = Column(Text)
    content = Column(Text)
    tags = Column(JSON)
    published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    subject = Column(String(300))
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
