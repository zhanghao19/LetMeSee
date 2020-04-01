from pymongo import MongoClient

coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee
barrage_id='86001'

barrage = coll.find_one({'BID': barrage_id}, {'_id': 0, 'WriteTime': 0})
print(barrage)