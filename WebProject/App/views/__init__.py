from .first_blue import first_blue

# 将其定义为一个懒调用模式，只在被调用时生效
# def init_route(app):
#     """定义路由"""
#     @app.route('/')
#     def index():
#         return render_template('base.html')


def init_view(app):
    app.register_blueprint(first_blue)
