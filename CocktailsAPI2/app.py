from flask import Flask
from config import Config
from models import db, login_manager
from views.auth import auth_bp
from views.drinks import drinks_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(drinks_bp)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
