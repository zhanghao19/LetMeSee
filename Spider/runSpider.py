#!/usr/bin/env python
#-*- coding: utf-8 -*-
# author: hao 2020/3/29-18:19
import os

from dbs.m_mongo import MyMongoDB

mg = MyMongoDB()
mg.coll.drop()

os.system(r"python D:\Fire\PycharmProject\LetMeSee\Spider\spider_mode\bilibili_spider.py")
os.system(r"python D:\Fire\PycharmProject\LetMeSee\Spider\spider_mode\baidu_spider.py")
os.system(r"python D:\Fire\PycharmProject\LetMeSee\Spider\spider_mode\zhihu_spider.py")
