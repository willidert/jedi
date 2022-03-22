from sqlalchemy.orm import Session

import models, schemas


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Project).offset(skip).limit(limit).all()

def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()

def create_project(db: Session, project: schemas.ProjectBase):
    project_clean = project.dict()
    project = models.Project(
        name=project_clean['name'],
        value=project_clean['value'],
        begin_date=project_clean['begin_date'],
        end_date=project_clean['end_date'],
        risk=project_clean['risk']
        )
    db.add(project)
    db.commit()
    for participant in project_clean['participants']:
        create_project_participant(db, participant, project.id)
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
    db_participant = models.Participant(**participant, project_id=project_id)
    db.add(db_participant)
    db.commit()
