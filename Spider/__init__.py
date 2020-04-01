from dbs.m_mongo import MyMongoDB

mg = MyMongoDB()


baidu_barrages = [i for i in mg.coll.find(
    {'BType': 'baidu'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]

bilibili_barrages = [i for i in mg.coll.find(
    {'BType': 'bilibili'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]