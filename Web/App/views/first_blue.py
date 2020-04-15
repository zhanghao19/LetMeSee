import random
from pymongo import MongoClient

from flask import Blueprint, render_template, request, jsonify

from Spider import bilibili_barrages, baidu_barrages, zhihu_barrages


first_blue = Blueprint('index', __name__)

coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee


@first_blue.route('/')
def index():
    # 拼接两个弹幕列表
    barrages = baidu_barrages + bilibili_barrages + zhihu_barrages
    random.shuffle(barrages)    # 打乱列表的顺序
    return render_template('barrage.html', barrages=barrages)


@first_blue.route('/baidu/')
def baidu():
    return render_template('barrage.html', barrages=baidu_barrages)


@first_blue.route('/bilibili/')
def bilibili():
    return render_template('barrage.html', barrages=bilibili_barrages)


@first_blue.route('/zhihu/')
def zhihu():
    return render_template('barrage.html', barrages=zhihu_barrages)


@first_blue.route('/detail/')
def barrage_details():
    barrage_id = request.args.get('barrage_id')
    barrage = coll.find_one(
        {'BID': barrage_id},
        {'_id': 0, 'WriteTime': 0})
    print(barrage, barrage_id, type(barrage_id))
    return jsonify(barrage)

