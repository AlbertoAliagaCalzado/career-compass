from pydantic import BaseModel

class SpecialtyStat(BaseModel):
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