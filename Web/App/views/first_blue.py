import random
from pymongo import MongoClient
from flask import Blueprint, render_template, request, jsonify


# Blueprint(蓝图),提供快速注册端口,方便快捷.
# https://dormousehole.readthedocs.io/en/latest/blueprints.html#blueprints
first_blue = Blueprint('index', __name__)   # 创建一个蓝图对象

coll = MongoClient(host="localhost", port=27017).Spider.LetMeSee

# 从数据库中获取数据
baidu_barrages = [i for i in coll.find(
    {'BType': 'baidu'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]

bilibili_barrages = [i for i in coll.find(
    {'BType': 'bilibili'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]

zhihu_barrages = [i for i in coll.find(
    {'BType': 'zhihu'},
    {'_id': 0, 'BID': 1, 'BText': 1, 'BUrl': 1, 'BType': 1})]


@first_blue.route('/')
def index():
    # 拼接两个弹幕列表
    barrages = baidu_barrages + bilibili_barrages + zhihu_barrages
    random.shuffle(barrages)    # 打乱列表的顺序
    # 渲染模板, 传递数据
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
    # 获取ajax请求携带的data中的barrage_id
    barrage_id = request.args.get('barrage_id')
    # 通过barrage_id取匹配数据库里的项
    barrage = coll.find_one(
        {'BID': barrage_id},
        {'_id': 0, 'WriteTime': 0})
    print(barrage, barrage_id, type(barrage_id))
    # 以json的形式返回响应
    return jsonify(barrage)

