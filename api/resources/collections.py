from flask_restful import Resource, reqparse

from api.lock import lock
from api.models.accountModel import AccountModel, auth, g
from api.models.collectionModel import CollectionModel


class Collections(Resource):
    def get(self, id=None):
        with lock.lock:
            try:
                if id:
                    collection = CollectionModel.find_by_id(id)
                    if collection.exists:
                        my_json = collection.json()
                        try:
                            print(my_json)
                            return {'publication': my_json}, 200
                        except Exception as e:
                            return {
                                       'message': 'An error occurred while finding the content of publication. '
                                                  'Error {0}:{1}'.format(type(e), e)
                                   }, 404
                    return {'message': 'Publication does not exists'}, 404
                return {'message': 'No id were provided!'}, 400
            except Exception as e:
                return {'message': 'Internal server error. Error {0}:{1}'.format(type(e), e)}, 500

    def post(self, title=None, id=None):
        with lock.lock:
            parser = reqparse.RequestParser()
            parser.add_argument(CollectionModel.title_col_name, type=str, required=True)
            data = parser.parse_args()
            if data:
                try:
                    title = data[CollectionModel.title_col_name]
                    # email region
                    if title:
                        collection = CollectionModel.find_one_by_column(value=title,
                                                                        col_name=CollectionModel.title_col_name)
                        if collection and collection.exists:
                            # resource already exists
                            return {'message': 'Collection with title [{0}] already exists'.format(title)}, 409
                    else:
                        raise Exception('Error. no email were specified for this account!')
                    # password region

                    try:
                        # create new collection
                        collection = CollectionModel(title=title)
                        my_json = collection.save_to_db()
                        return {"collection": my_json}, 201
                    except Exception as e:
                        return {
                                   'message': 'An error occurred creating the collection. {0}:{1}'.format(type(e), e)
                               }, 500
                except Exception as e:
                    return {'message': 'An error occurred you send a bad request. {0}:{1}'.format(type(e), e)}, 400
            return {'message': 'An error occurred parsing arguments.'}, 400


class CollectionsList(Resource):
    def get(self):
        with lock.lock:
            try:
                collections = CollectionModel.get_all()
                return {'collections': [collections[key].json() for key in collections.keys()]}, 200
            except Exception as e:
                return {'Internal server error': '{0}:{1}'.format(type(e), e)}, 502
