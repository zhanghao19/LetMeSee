from flask import Flask

from Web.App.views import init_view


def create_app():
    # 创建一个应用对象
    app = Flask(__name__)
    # 调用该方法，以初始化路由
    init_view(app)
    return app
