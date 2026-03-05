from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, database, schemas
from .models import user_specialties
from .database import engine
from sqlalchemy import func

models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="Career Compass API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stats/specialties", response_model=list[schemas.SpecialtyStat])
def get_specialty_stats(db: Session = Depends(database.get_db)):
    results = db.query(
        models.Specialty.name,
        models.Specialty.color_code.label("fill"),
        func.count(user_specialties.c.user_id).label("value")
    ).join(user_specialties).group_by(models.Specialty.id).all()
    
    return results

@app.get("/api/stats/summary")
def get_summary_stats(db: Session = Depends(database.get_db)):
    total_users = db.query(models.User).count()
    total_specialties = db.query(models.Specialty).count()
    total_competencies = db.query(models.Competency).count() 
    
    return [
        {"label": "Total personas", "value": str(total_users), "change": "+12 este mes"},
        {"label": "Especialidades", "value": str(total_specialties), "change": "Todas activas"},
        {"label": "Competencias activas", "value": str(total_competencies), "change": "En todas las áreas"},
        {"label": "Cumplimiento medio", "value": "72%", "change": "+4% vs anterior"},
    ]
    
@app.get("/api/stats/levels", response_model=list[schemas.LevelStat])
def get_level_stats(db: Session = Depends(database.get_db)):
    results = db.query(
        models.Level.name,
        func.count(models.User.id).label("total")
    ).outerjoin(models.User).group_by(models.Level.id).order_by(models.Level.rank_order).all()
    
    return [{"name": r.name, "total": r.total} for r in results]