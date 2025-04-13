FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple --upgrade pip
RUN pip install flask flask-cors
EXPOSE 5001
CMD ["python", "app.py"]
