import pymongo
import requests
from decouple import config as config_decouple
from flask import Flask, request, jsonify, Response
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from bson.objectid import ObjectId
from flask_restful import Api
from config import config

from db import db
# models imports
from api.models.accountModel import AccountModel
# resources imports
from resources.account import Accounts
from resources.login import LogIn

app = Flask(__name__)
environment = config['development']
if config_decouple('PRODUCTION', cast=bool, default=False):
    environment = config['production']

app.config.from_object(environment)

api = Api(app)

db.get_instance().init_app(app)
AccountModel.collection = db.get_database.accounts

CONNECTION_STRNG = "mongodb+srv://jromero:050899@geekify.q6113.mongodb.net/test?retryWrites=true&w=majority"
mongo = pymongo.MongoClient(CONNECTION_STRNG, tls=True, tlsAllowInvalidCertificates=True)

api_rawg = "https://api.rawg.io/api/games?key=40f3cb2ff2c94a5889d3d6c865415ec5"
response = requests.get(api_rawg)


@app.route('/users', methods=['POST'])
def create_user():
    # Recieving data
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']

    if username and email and password:
        hashed_password = generate_password_hash(password)
        id = mongo.test.users.insert_one({
            'username': username,
            'email': email,
            'password': hashed_password,

        })
        response = {
            'id': str(id),
            'username': username,
            'email': email,
            'password': password,
        }
        return response
    else:
        return not_found()
    return {'message': 'recieved'}


@app.route('/users', methods=['GET'])
def get_users():
    users = mongo.test.users.find()
    response = json_util.dumps(users)
    return Response(response, mimetype='application/json')


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = mongo.test.users.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(user)
    return Response(response, mimetype='application/json')


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = mongo.test.users.delete_one({'_id': ObjectId(id)})
    response = jsonify({'message': 'User ' + id + 'was deleted'})
    return response


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    if username and email and password:
        hashed_password = generate_password_hash(password)
        mongo.test.users.update_one({'_id': ObjectId(id)}, {'$set': {
            'username': username,
            'email': email,
            'password': hashed_password,

        }})
        response = jsonify({'message': 'User ' + id + 'was updated succesfully'})

        return response


@app.errorhandler(404)
def not_found(error=None):
    message = jsonify({
        'message': 'Resource not found: ' + request.url,
        'status': 404,
    })
    message.status_code = 404
    return message


@app.route('/info', methods=['GET'])
def get_info():
    # Recieving data de la API de rawg
    return response.json()


api.add_resource(Accounts, '/account/email/<string:email>', '/account/id/<string:id>', '/account/user')
api.add_resource(LogIn, '/login')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
