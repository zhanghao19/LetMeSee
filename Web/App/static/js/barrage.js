//弹幕的实现
(function () {
    /*******定义参数********/
    let barrageColorArray = {baidu : '#5519EB', bilibili: '#ff53e0', zhihu: '#0099cc'};
    let barrageBoxWrap = document.querySelector('.barrage-container-wrap');
    let barrageBox = document.querySelector('.barrage-container');

    //容器的宽高度
    let contentWidth = ~~window.getComputedStyle(barrageBoxWrap).width.replace('px', '');
    let boxHeight = ~~window.getComputedStyle(barrageBox).height.replace('px', '');
    //当前窗口可以垂直展示多少个弹幕, 30代表弹幕字体大小
    let howManyBarrageY = Math.round(boxHeight / 30);
    //定义一个包含弹幕的宽和高度范围的数组
    let heightArray = [];
    // console.log(heightArray);
    //将每个可用的高度,放入数组, 以便在创建数组时使用
    for (let i = 30; i < boxHeight - 10; i += 30) {
        heightArray.push(i)
    }

    /*******创建弹幕**********/
    function createBarrage(item, index, forTime) {
        if (index >= howManyBarrageY) {
            //如果索引达到高度数组的长度,则需重置索引到0,因此取余数
            index = index % howManyBarrageY;
        }
        let divNode = document.createElement('div');    //弹幕的标签
        let divChildNode = document.createElement('div');  //提示文本的标签

        divNode.innerHTML = item.BText;    //将弹幕内容插入标签中， innerHTML表示这个标签中的字符内容
        divNode.classList.add('barrage-item');  //追加class
        barrageBox.appendChild(divNode);    //弹幕的标签作为弹幕容器的子代标签

        // let barragePopups = "/popups?id=" + item.barrage_id + "&type=" +item.barrage_type; //弹幕详情页的url
        // divChildNode.innerHTML = '<iframe class="barrages-popup" src=' + barragePopups + '></iframe>';  //鼠标悬停展示的内容
        divChildNode.innerHTML = '点击查看详情';  //鼠标悬停展示的内容
        divChildNode.classList.add('barrage-link');
        divNode.appendChild(divChildNode);  //提示文本的标签作为弹幕标签的子代标签

        //***设置弹幕的初始位置***
        //以容器的宽度为基准随机生成每条弹幕的左侧偏移值
        let barrageOffsetLeft = getRandom(contentWidth * forTime, contentWidth * (forTime + 0.618));
        //以容器的高度为基准随机生成每条弹幕的上方偏移值
        let barrageOffsetTop = heightArray[index];
        //随机选择一个颜色数组中的元素，从数组中取值的标准写法
        // let barrageColor = barrageColorArray[Math.floor(Math.random() * (barrageColorArray.length))];
        //通过弹幕类型选择颜色
        let barrageColor = barrageColorArray[item.BType];
        //执行初始化滚动
        //fun.call()传入的第一个参数作为之后的this，详解：https://codeplayer.vip/p/j7sj5
        initBarrage.call(divNode, {
            left: barrageOffsetLeft,
            top: barrageOffsetTop,
            color: barrageColor,
            barrageId: item.BID,
        });
    }

    /*******初始化弹幕的移动事件*********/
    function initBarrage(obj) {
        //初始化位置颜色
        this.style.left = obj.left + 'px';
        this.style.top = obj.top + 'px';
        this.style.color = obj.color;

        //添加属性
        this.distance = 0;  //移动速度基准值
        this.width = ~~window.getComputedStyle(this).width.replace('px', '');   //弹幕的长度
        this.offsetLeft = obj.left;
        this.timer = null;

        //运动
        barrageAnimate(this);

        //鼠标悬停停止
        this.onmouseenter = function () {
            cancelAnimationFrame(this.timer);//弹幕停止移动
        };

        //鼠标移走
        this.onmouseleave = function () {
            //鼠标移走
            barrageAnimate(this);//弹幕继续移动
        };

        //打开弹幕对应的目标页面
        this.onclick = function () {
            let url = "/detail/",
                data = {barrage_id:obj.barrageId};
            $.ajax({
                type : "get",
                async : false,  //同步请求
                url : url,
                data : data,
                dataType: "json",
                success:function(barrage){
                    showDetailPanel(barrage)
                    // console.log(barrage)
                },
                error: function() {
                   alert("失败，请稍后再试！");
                }
            });
        };

    }

    /*******辅助弹幕移动*********/
    //弹幕动画
    function barrageAnimate(obj) {
        move(obj);

        if (Math.abs(obj.distance) < obj.width + obj.offsetLeft) {
            //满足以上条件说明弹幕在可见范围内
            obj.timer = requestAnimationFrame(function () {
                //在页面重绘之前会调用这个回调函数-->让弹幕继续移动
                barrageAnimate(obj);
            });
        } else {
            //超出可见范围，取消回调函数的调用-->让弹幕停止移动
            cancelAnimationFrame(obj.timer);

        }
    }//回流：增删元素会引起回流，重绘：改变样式会引起重绘

    //弹幕移动
    function move(obj) {
        obj.distance -= 2; //移动速度为一次1像素
        //transform可以对元素进行翻转、移动、倾斜等操作，这里主要使用了移动元素的效果
        obj.style.transform = 'translateX(' + obj.distance + 'px)';
    }

    //随机获取区间内的一个值
    function getRandom(start, end) {
        return start + (Math.random() * (end - start)); //Math.random()随机获取一个0~1之间的值
    }

    /*******初始化事件**********/    //整个事件的入口
    //获取弹幕数据集
    let barrageArray = Server.barrages;
    //循环弹幕数组所需的切片次数, 弹幕总数/垂直可以显示的弹幕数=弹幕播放组数
    let howManyGroupBarrages = Math.ceil(barrageArray.length / howManyBarrageY);
    for (let i = 0; i < howManyGroupBarrages; i++) {
        //对弹幕数组切片,取出一部分要显示的弹幕,一直循环到取完
        let eachBarrageArray = barrageArray.slice(howManyBarrageY * i, howManyBarrageY * (i + 1));
        for (let item of eachBarrageArray) {
            //遍历每个弹幕, 并传入弹幕元素的索引,和循环次数(用作定位)
            createBarrage(item, eachBarrageArray.indexOf(item), i + 1);
        }
    }
})();



