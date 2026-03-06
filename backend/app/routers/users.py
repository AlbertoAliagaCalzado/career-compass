from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from .. import database, schemas
from ..services import user_service

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("", response_model=list[schemas.UserOut])
def get_users_controller(specialty_id: Optional[int] = None, db: Session = Depends(database.get_db)):
    return user_service.get_users(db=db, specialty_id=specialty_id)