import requests
from datetime import datetime
from lxml import etree

from dbs.m_mongo import MyMongoDB

mg = MyMongoDB()

# 百度和B站的爬虫相似,于是设计成通用方法
resp = requests.get('https://news.baidu.com/')
html = etree.HTML(resp.text)
barrage = []
item = {}

title_ls = html.xpath('//*[@id="pane-news"]//a//text()')
url_ls = html.xpath('//*[@id="pane-news"]//a/@href')

for n in range(len(title_ls)):
    item['BID'] = f'{n + 86000}'  # id
    item['BText'] = title_ls[n]
    item['BUrl'] = url_ls[n]
    item['BType'] = 'baidu'
    item['BCover'] = ''  # 封面
    item['BAuthor'] = '未知作者'  # 作者
    item['WriteTime'] = datetime.utcnow()  # 写入时间, 用于设置过期时间
    mg.coll.insert_one(dict(item))


