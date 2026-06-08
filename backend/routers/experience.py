from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/experience", tags=["experience"])


@router.get("/", response_model=List[schemas.Experience])
def get_experiences(db: Session = Depends(get_db)):
    return db.query(models.Experience).order_by(models.Experience.order).all()


@router.post("/", response_model=schemas.Experience)
def create_experience(exp: schemas.ExperienceCreate, db: Session = Depends(get_db)):
    db_exp = models.Experience(**exp.model_dump())
    db.add(db_exp)
    db.commit()
    db.refresh(db_exp)
    return db_exp


@router.put("/{exp_id}", response_model=schemas.Experience)
def update_experience(exp_id: int, exp: schemas.ExperienceCreate, db: Session = Depends(get_db)):
    db_exp = db.query(models.Experience).filter(models.Experience.id == exp_id).first()
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    for k, v in exp.model_dump().items():
        setattr(db_exp, k, v)
    db.commit()
    db.refresh(db_exp)
    return db_exp


@router.delete("/{exp_id}")
def delete_experience(exp_id: int, db: Session = Depends(get_db)):
    db_exp = db.query(models.Experience).filter(models.Experience.id == exp_id).first()
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(db_exp)
    db.commit()
    return {"ok": True}
