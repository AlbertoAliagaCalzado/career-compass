from sqlalchemy.orm import Session, joinedload
from typing import Optional
from .. import models

def get_users(db: Session, specialty_id: Optional[int] = None):
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