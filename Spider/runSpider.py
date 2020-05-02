#!/usr/bin/env python
#-*- coding: utf-8 -*-
# author: hao 2020/3/29-18:19
from pymongo import MongoClient
import os


coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee
coll.drop()
coll.create_index([('WriteTime', 1)], expireAfterSeconds=43200)

os.system(r"python D:\Fire\PycharmProject\LetMeSee\Spider\spider_mode\bilibili_spider.py")
os.system(r"python D:\Fire\PycharmProject\LetMeSee\Spider\spider_mode\baidu_spider.py")
os.system(r"python D:\Fire\PycharmProject\LetMeSee\Spider\spider_mode\zhihu_spider.py")
