from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/blog", tags=["blog"])


@router.get("/", response_model=List[schemas.BlogPost])
def get_posts(published_only: bool = True, db: Session = Depends(get_db)):
    q = db.query(models.BlogPost)
    if published_only:
        q = q.filter(models.BlogPost.published == True)
    return q.order_by(models.BlogPost.created_at.desc()).all()


@router.get("/{slug}", response_model=schemas.BlogPost)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(models.BlogPost).filter(models.BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("/", response_model=schemas.BlogPost)
def create_post(post: schemas.BlogPostCreate, db: Session = Depends(get_db)):
    db_post = models.BlogPost(**post.model_dump())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.put("/{post_id}", response_model=schemas.BlogPost)
def update_post(post_id: int, post: schemas.BlogPostCreate, db: Session = Depends(get_db)):
    db_post = db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    for k, v in post.model_dump().items():
        setattr(db_post, k, v)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"ok": True}
