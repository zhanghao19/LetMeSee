from .baidu.spider import get_news
from .bilibili.spider import get_videos

baidu_barrages = get_news()
bilibili_barrages = get_videos()
