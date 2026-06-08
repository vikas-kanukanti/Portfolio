from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.get("/", response_model=List[schemas.Skill])
def get_skills(category: str = None, db: Session = Depends(get_db)):
    q = db.query(models.Skill)
    if category:
        q = q.filter(models.Skill.category == category)
    return q.order_by(models.Skill.proficiency.desc()).all()


@router.post("/", response_model=schemas.Skill)
def create_skill(skill: schemas.SkillCreate, db: Session = Depends(get_db)):
    db_skill = models.Skill(**skill.model_dump())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill


@router.delete("/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    db_skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_skill)
    db.commit()
    return {"ok": True}
