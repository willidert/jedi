from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel, condecimal, conlist


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
    begin_date: datetime
    end_date: datetime
    value: condecimal(gt=0)
    risk: int
    participants: conlist(ParticipantBase, min_items=1)


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    participants: List[Participant]

    class Config:
        orm_mode = True

class ProjectUpdate(ProjectBase):
    risk: Optional[int]
    name: Optional[str]
    begin_date: Optional[datetime]
    end_date: Optional[datetime]
    value: Optional[condecimal(gt=0)]
    participants: Optional[conlist(ParticipantBase, min_items=1)]


class ProjectInvestiment(BaseModel):
    value: condecimal(gt=0)


class ResponseProjectInvestment(BaseModel):
    returned_value: float
