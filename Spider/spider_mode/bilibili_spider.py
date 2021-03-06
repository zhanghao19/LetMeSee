# Spider/spider_mode/bilibili_spider.py
from datetime import datetime
import json
import requests
import re

from pymongo import MongoClient

coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee

resp = requests.get('https://www.bilibili.com/ranking')	# 请求页面
# 使用正则获取源码中存放在script标签中的数据
data_url = re.findall('window.__INITIAL_STATE__=(.*);\(function', resp.text)[0]
data_loaded = json.loads(data_url)  # 使用loads方法从 字符串 变成 字典
rankList = data_loaded['rankList']  # 排行榜中100个视频的信息

item ={}
for i in range(len(rankList)):
    item['BID'] = f'{i + 81000}'     # id
    item['BText'] = rankList[i]['title']    # 标题
    item['BAuthor'] = rankList[i]['author']  # 作者
    item['BUrl'] = 'https://www.bilibili.com/video/' + rankList[i]['bvid']   # 拼接的视频av号
    item['BType'] = 'bilibili'
    item['BCover'] = rankList[i]['pic']    # 封面
    item['WriteTime'] = datetime.utcnow()   # 写入时间, 用于设置过期时间
    coll.insert_one(dict(item))
print('B站榜单--爬取完成!')