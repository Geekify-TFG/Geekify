import pymongo
from decouple import config as config_decouple
from flask import Flask
from flask_restful import Api

from api.resources.collections import Collections, CollectionsList, CollectionGame
from api.resources.comments import Comments, CommentsList
from api.resources.news import News
from config import config
from flask_cors import CORS

from db import db
# models imports
from api.models.accountModel import AccountModel
from api.models.collectionModel import CollectionModel
from api.models.commentModel import CommentModel
# resources imports
from resources.account import Accounts, AccountLike, AccountsInfo
from resources.login import LogIn
from resources.games import Games, GamesByTitle, GamesByOrder, GameDetail, GameFilters, GameCommentsList

app = Flask(__name__)
environment = config['development']
if config_decouple('PRODUCTION', cast=bool, default=False):
    environment = config['production']

app.config.from_object(environment)

api = Api(app)
CORS(app, resources={r'/*': {'origins': '*'}})

db.get_instance().init_app(app)
AccountModel.collection = db.get_database.accounts
CollectionModel.collection = db.get_database.collections
CommentModel.collection = db.get_database.comments

CONNECTION_STRING = "mongodb+srv://jromero:050899@geekify.q6113.mongodb.net/test?retryWrites=true&w=majority"
mongo = pymongo.MongoClient(CONNECTION_STRING, tls=True, tlsAllowInvalidCertificates=True)

# Account

api.add_resource(Accounts, '/account/email/<string:email>', '/account/id/<string:id>', '/account/user')
api.add_resource(LogIn, '/login')
api.add_resource(AccountLike, '/account/like/<string:id>')

# Games
api.add_resource(Games, '/games')
api.add_resource(GameDetail, '/game/<string:id>')
api.add_resource(GamesByTitle, '/games/title/<string:title>')
api.add_resource(GamesByOrder, '/games/filter/<string:order>')
api.add_resource(GameFilters, '/games/filters')
api.add_resource(GameCommentsList, '/gameComments/<string:id>')

# Comments
api.add_resource(CommentsList, '/comments')
api.add_resource(Comments, '/comment/<string:id>')

# Collections
api.add_resource(Collections, '/collection', '/collection/<string:id>', '/collections/<string:email>/')
api.add_resource(CollectionsList, '/collections/user_email/<string:user_email>')
api.add_resource(CollectionGame, '/collectionGame/<string:id>')

# News
api.add_resource(News, '/news')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
