import random
from flask import Blueprint, render_template, request

from SpiderProject import baidu_barrages, bilibili_barrages

first_blue = Blueprint('index', __name__)


@first_blue.route('/')
def index():
    # 拼接两个弹幕列表
    barrages = baidu_barrages + bilibili_barrages
    random.shuffle(barrages)    # 打乱列表的顺序
    return render_template('barrage.html', barrage=barrages)


@first_blue.route('/baidu/')
def baidu():
    return render_template('barrage.html', barrage=baidu_barrages)


@first_blue.route('/bilibili/')
def bilibili():
    return render_template('barrage.html', barrage=bilibili_barrages)


@first_blue.route('/popups')
def popups():
    barrage_id = int(request.args.get('id'))
    barrage_type = request.args.get('type')
    if "bilibili" in barrage_type:
        return render_template('popups.html', barrage=bilibili_barrages[barrage_id])
    elif "baidu" in barrage_type:
        return render_template('popups.html', barrage=baidu_barrages[barrage_id])
