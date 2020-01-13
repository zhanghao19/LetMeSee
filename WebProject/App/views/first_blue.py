from flask import Blueprint, render_template

first_blue = Blueprint('index', __name__)


barrage = [
            {
                'url': 'https://www.baidu.com/',
                'text': '秋天爱美丽',
                'level': 10
            },
            {
                'url': 'https://www.baidu.com/',
                'text': '今天很开心啊',
                'level': 10
            },
            {
                'url': 'https://www.baidu.com/',
                'text': 'winter has come',
                'level': 10
            },
            {
                'url': 'https://www.baidu.com/',
                'text': '土耳其现在形势',
                'level': 10
            },
            {
                'url': 'https://www.baidu.com/',
                'text': '没事早点回家吃饭啊',
                'level': 10
            },
            {
                'url': 'https://www.baidu.com/',
                'text': '这主角真实醉了，不会回啊',
                'level': 10
            },
            {
                'url': 'https://www.baidu.com/',
                'text': '背景音乐真好听啊',
                'level': 10
            },
            {
                'url': 'https://www.baidu.com/',
                'text': '背景音乐是***',
                'level': 10
            },
            {
                'url': '',
                'text': '经费在燃烧啊',
                'level': 10
            },
            {
                'url': '',
                'text': '国产良心剧',
                'level': 10
            },
        ]


@first_blue.route('/test/')
def test():
    return render_template('test.html')


@first_blue.route('/')
def index():
    return render_template('barrage.html', barrage=barrage)\

@first_blue.route('/popups/')
def popups():
    return render_template('popups.html')
