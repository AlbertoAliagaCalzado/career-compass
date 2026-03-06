from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from typing import Optional
from .. import models
from ..models import user_specialties

def get_summary_stats(db: Session):
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

def get_specialty_stats(db: Session):
    results = db.query(
        models.Specialty.id,
        models.Specialty.name,
        models.Specialty.color_code.label("fill"),
        func.count(user_specialties.c.user_id).label("value")
    ).join(user_specialties).group_by(models.Specialty.id).all()
    
    return results

def get_level_stats(db: Session, specialty_id: Optional[int] = None):
    query = db.query(
        models.Level.name,
        func.count(models.User.id).label("total")
    )
    
    if specialty_id:
        users_in_specialty = (
            db.query(models.User.id)
            .join(models.User.specialties)
            .filter(models.Specialty.id == specialty_id)
        )
        query = query.outerjoin(
            models.User,
            and_(
                models.Level.id == models.User.level_id,
                models.User.id.in_(users_in_specialty)
            )
        )
    else:
        query = query.outerjoin(models.User)
        
    results = query.group_by(models.Level.id).order_by(models.Level.rank_order).all()
    return [{"name": r.name, "total": r.total} for r in results]

