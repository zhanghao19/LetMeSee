from .spider_mode.spider import get_barrages


baidu_barrages = get_barrages(
    name='baidu',
    url='https://news.baidu.com/',
    title_xpath='//*[@id="pane-news"]//a//text()',
    url_xpath='//*[@id="pane-news"]//a/@href')

bilibili_barrages = get_barrages(
    name='bilibili',
    url='https://www.bilibili.com/ranking/',
    title_xpath='//div[@class="info"]//a[@class="title"]//text()',
    url_xpath='//div[@class="info"]//a[@class="title"]/@href')

