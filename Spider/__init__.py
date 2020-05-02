from pymongo import MongoClient

coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee


baidu_barrages = [i for i in coll.find(
    {'BType': 'baidu'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]

bilibili_barrages = [i for i in coll.find(
    {'BType': 'bilibili'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]

zhihu_barrages = [i for i in coll.find(
    {'BType': 'zhihu'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]