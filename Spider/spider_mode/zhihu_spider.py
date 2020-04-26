#!/usr/bin/env python
#-*- coding: utf-8 -*-
# author: hao 2020/3/27-19:55
import json
from datetime import datetime

import requests
from lxml import etree
from dbs.m_mongo import MyMongoDB
# 用户登录后的cookies,直接F12->Network复制Request Headers的cookie即可
from util.zhihu_cookies import Cookies

mg = MyMongoDB()

headers = {'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
           'cache-control': 'max-age=0',
           'cookie': Cookies,
           'upgrade-insecure-requests': '1',
           'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'}
resp = requests.get('https://www.zhihu.com/hot', headers=headers)

html = etree.HTML(resp.text)

data = html.xpath('//*[@id="js-initialData"]/text()')[0]
data_loaded = json.loads(data)
hotList = data_loaded["initialState"]["topstory"]["hotList"]

item ={}
for i in range(len(hotList)):
    item['BID'] = f'{i + 83000}'     # id
    item['BText'] = hotList[i]["target"]["titleArea"]["text"]    # 标题
    item['BAuthor'] = hotList[i]["target"]["metricsArea"]["text"]    # 标题
    item['BUrl'] = hotList[i]["target"]["link"]["url"]   # 拼接的视频av号
    item['BType'] = 'zhihu'
    item['BCover'] = hotList[i]["target"]["imageArea"]["url"]    # 封面
    item['WriteTime'] = datetime.utcnow()   # 写入时间, 用于设置过期时间
    mg.coll.insert_one(dict(item))
