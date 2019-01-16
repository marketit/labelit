import requests
from PIL import Image

import pymysql
from pymongo import MongoClient

import pandas as pd

import torchvision.transforms as transforms

class DataBaseHandler():
    def __init__(self, mode="ec2"):
        self.db_mongo = None
        self.cursor_mongo = None
        self.db_mysql = None
        self.cursor_mysql = None

    def get_mysql_engine(self):
        return self.cursor_mysql

    def set_mysql_engine(self, config):
        self.db_mysql =  pymysql.connect(host = config['HOST'],
                                            user = config['USER'],
                                            password = config['PW'],
                                            port = int(config['PORT']),
                                            db = config['DB'],
                                            charset = config['CHARSET'])
        self.db_mysql.autocommit(True)
        self.cursor_mysql = self.db_mysql.cursor(pymysql.cursors.DictCursor)

        return None

    def execute_sql(self, *sql, **kwards):
        self.cursor_mysql.execute(*sql)

        if "select" in sql[0].lower():
            if kwards.get('one'):
                rows = self.cursor_mysql.fetchone()
            else:
                rows = self.cursor_mysql.fetchall()
            return rows
        else:
            return None

    def excute_sql_dataframe(self, sql):
        df_tmp = pd.read_sql_query(sql, self.db_mysql)
        return df_tmp

    def set_mongodb_engine(self, config):

        self.db_mongo = MongoClient("mongodb://{user}:{pw}@{host}:{port}".format(user=config['USER'],
                                                                            pw=config['PW'],
                                                                            host=config['HOST'],
                                                                            port=int(config['PORT'])))
        self.db_mongo = self.db_mongo[config['DB']]
        self.cursor_mongo = self.db_mongo[config['COLLECTION']]

        return None

    def execute_find_mongodb(self, query_find, is_sort=False):
        result = self.cursor_mongo.find(query_find, no_cursor_timeout=True)

        if is_sort == True:
            result = result.sort([("_id", 1)])

        return result

    def execute_count_mongodb(self):
        return self.cursor_mongo.count()
