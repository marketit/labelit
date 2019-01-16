import os
import json
import datetime
import configparser

def set_config_for_mysql(dbh, host, port, dbname, id, password):

    config = {
    'HOST': host,
    'PORT': port,
    'DB': dbname,
    'USER': id,
    'PW': password,
    'CHARSET': 'utf8'
    }

    try:
        dbh.set_mysql_engine(config)
    except Exception as e:
        print(e)
        return False

    return True
