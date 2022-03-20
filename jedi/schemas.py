from datetime import date
from typing import List, Optional

from pydantic import BaseModel


class ParticipantBase(BaseModel):
    name: str


class ParticipantCreate(ParticipantBase):
    pass


class Participant(ParticipantBase):
    id: int
    project_id: int

    class Config:
        orm_mode = True


class ProjectBase(BaseModel):
    name: str
    begin_date: date
    end_date: date
    value: float
    risk: int


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    participants: List[Participant] = []

    class Config:
        orm_mode = True

class ProjectUpdate(ProjectBase):
    risk: Optional[int]
    name: Optional[str]
    begin_date: Optional[date]
    end_date: Optional[date]
    value: Optional[float]
