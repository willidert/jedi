from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app, get_db
from database import Base

MOCKED_PROJECT = {
    'name': 'my test project',
    'begin_date': '2022-04-21T04:07:13.556Z',
    'end_date': '2022-04-21T04:07:13.556Z',
    'risk': '2',
    'value': '12.12',
    'participants': [
        {
            'name': 'jose'
        }
    ]
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
    response = client.post('/projects/', json=MOCKED_PROJECT)
    assert response.status_code == 200, response.text

    data = response.json()
    assert data['name'] == MOCKED_PROJECT['name']
    assert 'id' in data
    MOCKED_PROJECT['project_id'] = data['id']

def test_post_project_without_participants():
    MOCKED_PROJECT['participants'] = []
    response = client.post('/projects/', json=MOCKED_PROJECT)
    assert response.status_code == 422, response.text

    data = response.json()
    assert 'detail' in data
    assert len(data['detail']) > 0
    assert data['detail'][0]['msg'] == 'ensure this value has at least 1 items'
    assert data['detail'][0]['type'] == 'value_error.list.min_items'
    assert data['detail'][0]['loc'] == ['body', 'participants']

def test_post_project_without_name():
    project_body = {
        'begin_date': '2022-04-21T04:07:13.556Z',
        'end_date': '2022-04-21T04:07:13.556Z',
        'risk': '2',
        'value': '12.12',
        'participants': [{'name': 'jose'}]
    }
    response = client.post('/projects/', json=project_body)
    assert response.status_code == 422, response.text

    data = response.json()
    assert 'detail' in data
    assert len(data['detail']) > 0
    assert data['detail'][0]['msg'] == 'field required'
    assert data['detail'][0]['type'] == 'value_error.missing'
    assert data['detail'][0]['loc'] == ['body', 'name']

def test_post_project_with_invalid_risk():
    project_body = {
        'name': 'my project',
        'begin_date': '2022-04-21T04:07:13.556Z',
        'end_date': '2022-04-21T04:07:13.556Z',
        'risk': 'a',
        'value': '12.12',
        'participants': [{'name': 'jose'}]
    }
    response = client.post('/projects/', json=project_body)
    assert response.status_code == 422, response.text

    data = response.json()
    assert 'detail' in data
    assert len(data['detail']) > 0
    assert data['detail'][0]['msg'] == 'value is not a valid integer'
    assert data['detail'][0]['type'] == 'type_error.integer'
    assert data['detail'][0]['loc'] == ['body', 'risk']

def test_get_project_by_invalid_id():
    response = client.get(f"/projects/{MOCKED_PROJECT['project_id'] + 2}")
    assert response.status_code == 404, response.text

    data = response.json()

    assert 'detail' in data
    assert data['detail'] == 'Project not found'

def test_get_project_by_id():
    response = client.get(f"/projects/{MOCKED_PROJECT['project_id']}")
    assert response.status_code == 200, response.text

    data = response.json()

    assert 'id' in data
    assert data['id'] == MOCKED_PROJECT['project_id']
    assert data['name'] == MOCKED_PROJECT['name']

def test_update_project():
    response = client.patch(f"/projects/{MOCKED_PROJECT['project_id']}", json={'name': 'my test project updated'})
    assert response.status_code == 200, response.text

    data = response.json()
    assert data == 'update'

    response = client.get(f"/projects/{MOCKED_PROJECT['project_id']}")
    assert response.status_code == 200, response.text

    data = response.json()

    assert 'id' in data
    assert data['id'] == MOCKED_PROJECT['project_id']
    assert data['name'] == 'my test project updated'

def test_calc_investment():
    response = client.post(f"/projects/{MOCKED_PROJECT['project_id']}/calc", json={"value": "0"})

    assert response.status_code == 422, response.text
    data = response.json()
    print(data)
    assert data['detail'][0]['msg'] == 'ensure this value is greater than 0'
    assert data['detail'][0]['type'] == 'value_error.number.not_gt'

    response = client.post(f"/projects/{MOCKED_PROJECT['project_id']}/calc", json={"value": "1"})

    assert response.status_code == 400, response.text
    data = response.json()
    assert data['detail'] == 'amount invested cannot be less than the value of the project'

    response = client.post(f"/projects/{MOCKED_PROJECT['project_id']}/calc", json={"value": "15"})

    assert response.status_code == 200, response.text
    data = response.json()

def test_delete_project():
    response = client.delete(f"/projects/{MOCKED_PROJECT['project_id']}")
    assert response.status_code == 200, response.text
    assert response.json() == 'deletado'

