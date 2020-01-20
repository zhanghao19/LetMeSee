from flask import Blueprint, render_template

from SpiderProject import barrage

first_blue = Blueprint('index', __name__)

# barrage = [
#     {
#         'barrage_id': 0,
#         'url': '',
#         'text': '国产良心剧',
#         'level': 10
#     },
#     {
#         'barrage_id': 1,
#         'url': 'https://www.baidu.com/',
#         'text': '秋天爱美丽',
#         'level': 10
#     },
#     {
#         'barrage_id': 2,
#         'url': 'https://www.baidu.com/',
#         'text': '今天很开心啊',
#         'level': 10
#     },
#     {
#         'barrage_id': 3,
#         'url': 'https://www.baidu.com/',
#         'text': 'winter has come',
#         'level': 10
#     },
#     {
#         'barrage_id': 4,
#         'url': 'https://www.baidu.com/',
#         'text': '土耳其现在形势',
#         'level': 10
#     },
#     {
#         'barrage_id': 5,
#         'url': 'https://www.baidu.com/',
#         'text': '没事早点回家吃饭啊',
#         'level': 10
#     },
#     {
#         'barrage_id': 6,
#         'url': 'https://www.baidu.com/',
#         'text': '这主角真实醉了，不会回啊',
#         'level': 10
#     },
#     {
#         'barrage_id': 7,
#         'url': 'https://www.baidu.com/',
#         'text': '背景音乐真好听啊',
#         'level': 10
#     },
#     {
#         'barrage_id': 8,
#         'url': 'https://www.baidu.com/',
#         'text': '背景音乐是***',
#         'level': 10
#     },
#     {
#         'barrage_id': 9,
#         'url': '',
#         'text': '经费在燃烧啊',
#         'level': 10
#     },
# ]
@first_blue.route('/test/')
def test():
    return render_template('test.html')


@first_blue.route('/')
def index():
    return render_template('barrage.html', barrage=barrage)


@first_blue.route('/popups/<barrage_id>')
def popups(barrage_id):
    return render_template('popups.html', barrage=barrage[int(barrage_id)])
