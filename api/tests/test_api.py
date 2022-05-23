from operator import rshift
from urllib import response
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app, get_db
from database import Base

NEW_PROJECT = {
    'name': 'my test project',
    'begin_date': '2022-04-21T04:07:13.556Z',
    'end_date': '2022-04-21T04:07:13.556Z',
    'risk': '2',
    'value': '12.12',
    'participants': []
}

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app=app)

def test_get_projects():
    response = client.get('/projects')
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) == 0

def test_post_project():
    response = client.post('/projects/', json=NEW_PROJECT)
    assert response.status_code == 200, response.text

    data = response.json()
    assert data['name'] == NEW_PROJECT['name']
    assert 'id' in data
    NEW_PROJECT['project_id'] = data['id']

def test_get_project_by_id():
    response = client.get(f"/projects/{NEW_PROJECT['project_id']}")
    assert response.status_code == 200, response.text

    data = response.json()

    assert 'id' in data
    assert data['id'] == NEW_PROJECT['project_id']
    assert data['name'] == NEW_PROJECT['name']

def test_update_project():
    response = client.patch(f"/projects/{NEW_PROJECT['project_id']}", json={'name': 'my test project updated'})
    assert response.status_code == 200, response.text

    data = response.json()
    assert data == 'update'

    response = client.get(f"/projects/{NEW_PROJECT['project_id']}")
    assert response.status_code == 200, response.text

    data = response.json()

    assert 'id' in data
    assert data['id'] == NEW_PROJECT['project_id']
    assert data['name'] == 'my test project updated'

def test_delete_project():
    response = client.delete(f"/projects/{NEW_PROJECT['project_id']}")

    assert response.status_code == 200, response.text

    assert response.json() == 'deletado'
