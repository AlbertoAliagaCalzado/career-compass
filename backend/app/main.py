from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload

from . import models, database, schemas
from .models import user_specialties
from .database import engine
from sqlalchemy import func
from typing import Optional

models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="Career Compass API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/healthcheck")
def healtcheck():
    return "OK"

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
    avg_completion = db.query(func.avg(models.UserCompetency.percent_completed)).scalar()
    completion_val = f"{int(avg_completion or 0)}%"
    
    return [
        {"label": "Total personas", "value": str(total_users), "change": "+12 este mes"},
        {"label": "Especialidades", "value": str(total_specialties), "change": "Todas activas"},
        {"label": "Competencias activas", "value": str(total_competencies), "change": "En todas las áreas"},
        {"label": "Cumplimiento medio", "value": completion_val, "change": "+4% vs anterior"},
    ]
    
@app.get("/api/stats/levels", response_model=list[schemas.LevelStat])
def get_level_stats(db: Session = Depends(database.get_db)):
    results = db.query(
        models.Level.name,
        func.count(models.User.id).label("total")
    ).outerjoin(models.User).group_by(models.Level.id).order_by(models.Level.rank_order).all()
    
    return [{"name": r.name, "total": r.total} for r in results]

@app.get("/api/users", response_model=list[schemas.UserOut])
def get_users(specialty_id: Optional[int] = None, db: Session = Depends(database.get_db)):
    query = db.query(models.User).options(
        joinedload(models.User.specialties),
        joinedload(models.User.competencies_association)
    )
    
    if specialty_id:
        query = query.join(models.User.specialties).filter(models.Specialty.id == specialty_id)
    
    users = query.all()
    
    for user in users:
        names = user.full_name.split()
        user.initials = "".join([n[0].upper() for n in names[:2]]) if names else "??"
        
        user.competencies = [
            {
                "competency_id": c.competency_id,
                "percent_completed": c.percent_completed,
                "competency_name": c.competency.name
            } for c in user.competencies_association
        ]
        
    return users