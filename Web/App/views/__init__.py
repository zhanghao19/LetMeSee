from .first_blue import first_blue
from Web.App.my_filters.truncate_text import truncate_text


def init_view(app):
    # 在应用对象上注册这个蓝图对象
    app.register_blueprint(first_blue)
    # 指定jinja引擎
    env = app.jinja_env
    # 加载自定义过滤器
    env.filters["truncate_text"] = truncate_text
