from .first_blue import first_blue
from Web.App.my_filters.truncate_text import truncate_text


def init_view(app):
    app.register_blueprint(first_blue)
    env = app.jinja_env
    env.filters["truncate_text"] = truncate_text
