from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship

from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(length=200))
    begin_date = Column(DateTime)
    end_date = Column(DateTime)
    risk = Column(Integer)
    value = Column(Float(precision=2, asdecimal=True))

    participants = relationship("Participant", back_populates="member")


class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(length=200))
    project_id = Column(Integer, ForeignKey("projects.id"))
    
    member = relationship("Project", back_populates="participants")
