import requests
from lxml import etree


def get_news():
    resp = requests.get('https://news.baidu.com/')
    html = etree.HTML(resp.text)
    item = {}
    barrage = []

    title_ls = html.xpath('//*[@id="pane-news"]//a/text()')
    url_ls = html.xpath('//*[@id="pane-news"]//a/@href')
    for n in range(len(title_ls)):
        item['barrage_id'] = n
        item['text'] = title_ls[n]
        item['url'] = url_ls[n]
        barrage.append(dict(item))
    return barrage


if __name__ == '__main__':
    get_news()
