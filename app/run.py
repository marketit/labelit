from flask import Flask, render_template, request, jsonify
from flask_restful import Resource, Api
from flask_bootstrap import Bootstrap
from utils.databasehandler import DataBaseHandler
import api.sql as sql
import api.local as local

app = Flask(__name__)
Bootstrap(app)
api = Api(app)

dbh = DataBaseHandler()
li_path_file = []

@app.route('/')
def home():
	return render_template('config-sql.html')

@app.route('/config/sql/set', methods = ["POST"])
def config_sql_set():
	bSuccess = True

	json_data = request.get_json(force=True)
	host = json_data.get('host')
	port = json_data.get('port')
	dbname = json_data.get('dbname')
	id = json_data.get('id')
	password = json_data.get('password', '')

	bSuccess = sql.set_config_for_mysql(dbh, host, port, dbname, id, password)

	if bSuccess:
		return jsonify({'code': 200})
	else:
		return jsonify({'code': 400})

@app.route('/config/file')
def config_file():
	return render_template('config-file.html')

@app.route('/config/file/set', methods = ["POST"])
def config_file_set():
	bSuccess = True

	json_data = request.get_json(force=True)
	path_file = json_data.get('path')
	bSuccess, li_path_file = local.get_filepath_from_local(path_file)
	print(li_path_file)

	if bSuccess:
		return jsonify({'code': 200})
	else:
		return jsonify({'code': 400})

@app.route('/config/signin')
def config_signin():
	return render_template('config-signin.html')
if __name__ == '__main__':
	app.run(debug=True)
