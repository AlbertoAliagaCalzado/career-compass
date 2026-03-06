import time
import os
from sqlalchemy import create_engine, exc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "mysql+mysqlconnector://dev_user:dev_password@db:3306/career_db?charset=utf8mb4"
)

Base = declarative_base()

def get_engine():
    retries = 5
    while retries > 0:
        try:
            engine = create_engine(
                SQLALCHEMY_DATABASE_URL,
                connect_args={"charset": "utf8mb4"}
            )
            with engine.connect() as conn:
                pass
            print("--- DATABASE CONNECTED SUCCESSFULLY ---")
            return engine
        except exc.OperationalError as e:
            retries -= 1
            print(f"--- DB NOT READY. Retrying in 5s... ({retries} left) ---")
            time.sleep(5)
    raise Exception("Could not connect to the database.")

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()