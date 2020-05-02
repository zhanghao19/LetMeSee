#!/usr/bin/env python
#-*- coding: utf-8 -*-
# author: hao 2020/3/27-19:55
from datetime import datetime
import json
import requests
import re

from pymongo import MongoClient

coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee

resp = requests.get('https://www.bilibili.com/ranking')

data_url = re.findall('window.__INITIAL_STATE__=(.*);\(function', resp.text)[0]
data_loaded = json.loads(data_url)
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
