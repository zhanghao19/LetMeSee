import requests
from lxml import etree


def get_barrages(name, url, title_xpath, url_xpath):
    # 百度和B站的爬虫相似,于是设计成通用方法
    resp = requests.get(url)
    html = etree.HTML(resp.text)
    barrage = []
    item = {}

    title_ls = html.xpath(title_xpath)
    url_ls = html.xpath(url_xpath)

    for n in range(len(title_ls)):
        item['barrage_id'] = n
        item['text'] = title_ls[n]
        item['url'] = url_ls[n]
        item['barrage_type'] = name
        barrage.append(dict(item))
    return barrage

