from flask import Flask

from App.views import init_view


def create_app():
    app = Flask(__name__)
    # 调用该方法，以初始化路由
    init_view(app)

    return app
