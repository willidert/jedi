from sqlalchemy.orm import Session

from . import models, schemas


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Project).offset(skip).limit(limit).all()

def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()

def create_project(db: Session, project: schemas.ProjectBase):
    project = models.Project(**project.dict())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

def update_project(db: Session, project: schemas.ProjectBase, project_id: int):
    db.query(models.Project).filter(models.Project.id == project_id).update(project.dict(exclude_unset=True))
    db.commit()
    return f'update'

def delete_project(db: Session, project_id: int):
    db.query(models.Project).filter(models.Project.id == project_id).delete()
    db.commit()
    return f'deletado'

def get_participants(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Participant).offset(skip).limit(limit).all()

def create_project_participant(db: Session, participant: schemas.ParticipantCreate, project_id: int):
    db_participant = models.Participant(**participant.dict(), owner_id=project_id)
    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)
    return db_participant
