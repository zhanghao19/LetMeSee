from pymongo import MongoClient


# 定义一个类, 完成数据库的读写操作
# 目标: 一个数据库的快速入口
class MyMongoDB:
    def __init__(self):
        self.coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee


if __name__ == '__main__':
    mg = MyMongoDB()
    # 设置过期时间, 第一次使用要先创建这个索引
    try:
        mg.coll.create_index([('WriteTime', 1)], expireAfterSeconds=43200)
    except Exception:
        print('Expire index already existing!')
