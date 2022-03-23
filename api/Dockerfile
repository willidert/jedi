FROM python:3.7

WORKDIR /app

# RUN apt-get update
# RUN apt-get -y install build-essential libssl-dev libffi-dev libblas3 libc6 liblapack3 gcc python3-dev python3-pip cython3
# RUN apt-get -y install python3-numpy python3-scipy

# RUN apt install -y netcat

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
