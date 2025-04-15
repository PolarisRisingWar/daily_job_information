from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from models import db, Job
import json

app = Flask(__name__)
CORS(app)

# 配置 SQLite 数据库路径
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route("/api/jobs")
def get_jobs():
    jobs = Job.query.all()
    result = []
    for job in jobs:
        result.append({
            "id": job.id,
            "type": job.type,
            "category": job.category,
            "positionType": job.positionType,
            "title": job.title,
            "base": job.base,
            "company": job.company,
            "salary": job.salary,
            "benefits": job.benefits,
            "description": job.description,
            "requirement": job.requirement,
            "applyLink": json.loads(job.applyLinks),  # 转换为列表
            "autoApplySupport": job.autoApplySupport,
            "collectDate": job.collectDate,
            "deadline": job.deadline
        })
    return jsonify(result)

@app.route("/api/add_job", methods=["POST"])
def add_job():
    # 只能由本地发起请求
    allowed_ips = ["127.0.0.1"]
    if request.remote_addr not in allowed_ips:
        abort(403, description="非本地请求禁止访问新增岗位接口")

    data = request.get_json()
    if not data:
        abort(400, description="Invalid or missing JSON")

    # 创建 Job 实例
    job = Job(
        type=data.get("type"),
        category=data.get("category"),
        positionType=data.get("positionType"),
        title=data.get("title"),
        base=data.get("base"),
        company=data.get("company"),
        salary=data.get("salary"),
        benefits=data.get("benefits"),
        description=data.get("description"),
        requirement=data.get("requirement"),
        applyLinks=json.dumps(data.get("applyLink", [])),
        autoApplySupport=data.get("autoApplySupport"),
        collectDate=data.get("collectDate"),
        deadline=data.get("deadline")
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({"message": "Job added successfully", "id": job.id})

# 初始化数据库
@app.cli.command('init-db')
def init_db():
    db.create_all()
    print("数据库已初始化。")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
