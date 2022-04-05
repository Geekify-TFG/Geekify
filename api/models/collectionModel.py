import os
from datetime import date

from flask import g, current_app
from flask_httpauth import HTTPBasicAuth
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)
from passlib.apps import custom_app_context as pwd_context

from api.models.abstract.model_definition import DocumentModel

auth = HTTPBasicAuth()

'''
    account model specially is converted and protected as it were a relational model 
    all attribute are defined here and is a must have value
    account (email, password(encrypted), name, ...)
'''


class CollectionModel(DocumentModel):
    """
   class representing account model.
   mongodb - collection called accounts
   """

    __column_names__ = ['title', 'image', 'numGames', 'games', 'user_email']

    # columns is a dict where the value for each column are referenced
    title_col_name = __column_names__[0]
    image_col_name = __column_names__[1]
    num_games_col_name = __column_names__[2]
    games_col_name = __column_names__[3]
    user_email_col_name = __column_names__[4]

    def __init__(
            self,
            title=None,
            image='https://source.unsplash.com/random',
            num_games=0,
            games=None,
            user_email=None,
            doc=None
    ):
        super(CollectionModel, self).__init__(doc)
        if games is None:
            games = []
        columns = dict.fromkeys(self.__column_names__)
        if doc:
            dic = dict.fromkeys(self.__column_names__)
            dic.update(self.doc_ref)
            self.set_doc_ref(dic.copy())  # make sure doc_ref have all columns
            try:
                # -- check all args are there in case missing args throw exception -- this can omitted --
                for col in self.__column_names__:
                    columns[col] = self.doc_ref[u'{0}'.format(col)]
            except Exception as e:
                raise Exception('missing arguments! \n Error  {0}:{1}'.format(type(e), e))
        else:
            columns['{0}'.format(self.title_col_name)] = str(title)
            columns['{0}'.format(self.image_col_name)] = image
            columns['{0}'.format(self.num_games_col_name)] = str(num_games)
            columns['{0}'.format(self.games_col_name)] = games
            columns['{0}'.format(self.user_email_col_name)] = user_email
            self.set_doc_ref(columns.copy())

    # Create new document -- private method
    def __create(self):
        """
        if it's not created yet then create it otherwise ignore and return json just to have fun
        :return: void
        """
        if not self.exists:
            self.set_created()
            my_json = self.json()
            result = self.collection.insert_one(my_json['value'].copy())
            self.set_doc_ref(my_json['value'].copy())
            self.set_id(result.inserted_id)
            my_json['id'] = result.inserted_id.__str__()
            return my_json
        return self.json()

    def json(self):
        return {
            'id': u'{0}'.format(self.get_id()),
            'value':
                {
                    u'{}'.format(col_name): self.doc_ref[col_name]
                    for col_name in self.__column_names__ if self.created
                }
        }

    def save_to_db(self):
        return self.__create()

    def update_document(
            self, title=None, image=None, num_games=None, games=None, user_email=None
    ):
        # if it's already exists then update
        if self.exists:
            if title:
                self.__update_column__(self.title_col_name, str(title))
            if image:
                self.__update_column__(self.image_col_name, str(image))
            if num_games:
                self.__update_column__(self.num_games_col_name, num_games)
            if games:
                self.__update_column__(self.games_col_name, games)
            if games:
                self.__update_column__(self.user_email_col_name, user_email)
            self.collection.find_one_and_update(
                {'_id': self.id},
                {
                    '$set': self.doc_ref
                }
            )

    @classmethod
    def update_by_id(
            cls,
            id,
            title=None,
            image=None,
            num_games=None,
            games=None,
            user_email=None
    ):
        collection = cls.find_by_id(id)
        if collection.exists:
            collection.update_document(
                title=title,
                image=image,
                num_games=num_games,
                games=games,
                user_email=user_email
            )

    def update_tags(self, new_tag):
        self.collection.find_one_and_update(
            {'_id': self.id},
            {
                '$push': {
                    "games": new_tag
                }

            }
        )

    @classmethod
    def find_by_useremail(cls, user_email) -> dict:
        return cls.find_collection(user_email=user_email)

    def delete_from_db(self):
        super(CollectionModel, self).delete_from_db()

    @classmethod
    def find_collection(cls, user_email=None, title=None, id=None) -> dict:
        if user_email:
            collection = cls.find_by_column(user_email, 'user_email')
        elif title:
            collection = cls.find_one_by_column(title, cls.title_col_name)
        elif id:
            collection = cls.find_by_id(id)
        else:
            raise ValueError(
                "You need to give one the following: "
                "an existing title or existing user id"
            )
        return collection
