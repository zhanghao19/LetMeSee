import requests
from lxml import etree


def get_videos():
    resp = requests.get('https://www.bilibili.com/ranking/')
    html = etree.HTML(resp.text)
    item = {}
    barrage = []

    title_ls = html.xpath('//div[@class="info"]//a[@class="title"]//text()')
    url_ls = html.xpath('//div[@class="info"]//a[@class="title"]/@href')
    for n in range(len(title_ls)):
        item['barrage_id'] = n
        item['text'] = title_ls[n]
        item['url'] = url_ls[n]
        item['barrage_type'] = "bilibili"
        barrage.append(dict(item))
    return barrage


if __name__ == '__main__':
    get_videos()
