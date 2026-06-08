from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/", response_model=schemas.ContactMessage)
def submit_contact(msg: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    db_msg = models.ContactMessage(**msg.model_dump())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg
