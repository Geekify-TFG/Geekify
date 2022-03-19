import pymongo
import requests
from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from bson.objectid import ObjectId

app = Flask(__name__)

CONNECTION_STRNG = "mongodb+srv://jromero:050899@geekify.q6113.mongodb.net/test?retryWrites=true&w=majority"
mongo = pymongo.MongoClient(CONNECTION_STRNG, tls=True, tlsAllowInvalidCertificates=True)
# client = pymongo.MongoClient("mongodb+srv://jromero:050899@geekify.q6113.mongodb.net/Geekify?retryWrites=true"
#                              "&w=majority")
# db = client["Geekify"]
# collection = db.users
# print(collection)
#
# collection.insert_one({"_id":0, "user_name":"Soumi"})


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


if __name__ == "__main__":
    app.run(port=5000, debug=True)
