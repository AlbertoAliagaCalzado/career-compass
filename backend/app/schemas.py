from pydantic import BaseModel
from typing import List, Optional

class SpecialtyStat(BaseModel):
    id: int
    name: str
    fill: str
    value: int

    class Config:
        from_attributes = True
        
class LevelStat(BaseModel):
    name: str
    total: int

    class Config:
        from_attributes = True

class SpecialtyBase(BaseModel):
    id: int
    name: str
    color_code: Optional[str]

    class Config:
        from_attributes = True

class LevelBase(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class UserCompetencyOut(BaseModel):
    competency_id: int
    percent_completed: float
    competency_name: str 

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    full_name: str
    initials: str
    level: Optional[LevelBase]
    specialties: List[SpecialtyBase]
    competencies: List[UserCompetencyOut]

    class Config:
        from_attributes = True