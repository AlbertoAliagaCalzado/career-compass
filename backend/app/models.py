from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

user_specialties = Table(
    "user_specialties",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("specialty_id", Integer, ForeignKey("specialties.id"), primary_key=True),
)

class Specialty(Base):
    __tablename__ = "specialties"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    color_code = Column(String(50))
    
    users = relationship("User", secondary=user_specialties, back_populates="specialties")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.id"))
    level = relationship("Level", back_populates="users")
    
    specialties = relationship("Specialty", secondary=user_specialties, back_populates="users")
    
class Level(Base):
    __tablename__ = "levels"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    rank_order = Column(Integer, nullable=False)
    
    users = relationship("User", back_populates="level")
    
class Competency(Base):
    __tablename__ = "competencies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    specialty_id = Column(Integer, ForeignKey("specialties.id"))
    
    specialty = relationship("Specialty", backref="competencies")