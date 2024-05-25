import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgres://khuonfpdzownwg:2b8ff96c60949c662d7317ce2710b9b011d8db315a0a16e96b784350db631a3d@ec2-54-144-112-84.compute-1.amazonaws.com:5432/d87t8paomcq7o1')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
