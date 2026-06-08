from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    tech_stack: Optional[List[str]] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    order: int = 0


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None
    proficiency: Optional[int] = 80


class SkillCreate(SkillBase):
    pass


class Skill(SkillBase):
    id: int

    model_config = {"from_attributes": True}


class ExperienceBase(BaseModel):
    company: str
    role: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[str]] = []
    order: int = 0


class ExperienceCreate(ExperienceBase):
    pass


class Experience(ExperienceBase):
    id: int

    model_config = {"from_attributes": True}


class BlogPostBase(BaseModel):
    title: str
    slug: str
    summary: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = []
    published: bool = False


class BlogPostCreate(BlogPostBase):
    pass


class BlogPost(BlogPostBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str


class ContactMessage(ContactMessageCreate):
    id: int
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
