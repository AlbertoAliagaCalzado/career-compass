from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from .. import database, schemas
from ..services import stat_service

router = APIRouter(prefix="/api/stats", tags=["Stats"])

@router.get("/summary")
def get_summary_stats_controller(db: Session = Depends(database.get_db)):
    return stat_service.get_summary_stats(db=db)

@router.get("/specialties", response_model=list[schemas.SpecialtyStat])
def get_specialty_stats_controller(db: Session = Depends(database.get_db)):
    return stat_service.get_specialty_stats(db=db)

@router.get("/levels", response_model=list[schemas.LevelStat])
def get_level_stats_controller(specialty_id: Optional[int] = None, db: Session = Depends(database.get_db)):
    return stat_service.get_level_stats(db=db, specialty_id=specialty_id)