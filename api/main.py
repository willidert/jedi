from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models, service, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:4200",
	"http://localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return service.create_project(db, project)

@app.get("/projects/", response_model=List[schemas.Project])
def get_all_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = service.get_projects(db, skip=skip, limit=limit)
    return projects

@app.get("/projects/{project_id}", response_model=schemas.Project)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = service.get_project(db, project_id=project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/projects/{project_id}/calc")
def calc_investment(project_id: int, value: schemas.ProjectInvestiment, db: Session = Depends(get_db)):
    return service.calc_investment_value(db, value, project_id=project_id)

@app.patch("/projects/{project_id}")
def update_project(project_id: int, project: schemas.ProjectUpdate, db: Session = Depends(get_db)):
    return service.update_project(db, project, project_id=project_id)

@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):    
    return service.delete_project(db, project_id=project_id)
