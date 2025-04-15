from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20))  # 实习/校招/社招
    category = db.Column(db.String(50))
    positionType = db.Column(db.String(50))
    title = db.Column(db.String(100))
    base = db.Column(db.String(100))
    company = db.Column(db.String(100))
    salary = db.Column(db.String(100))
    benefits = db.Column(db.Text)
    description = db.Column(db.Text)
    requirement = db.Column(db.Text)
    applyLinks = db.Column(db.Text)  # 存 JSON 字符串
    autoApplySupport = db.Column(db.String(20))
    collectDate = db.Column(db.String(20))
    deadline = db.Column(db.String(20))
