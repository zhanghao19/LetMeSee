(function () {
    let barrageColorArray = {baidu : '#0099cc', bilibili: '#ff53e0'};

    let barrageTipWidth = 50; //提示框的宽度
    let barrageBoxWrap = document.querySelector('.barrage-container-wrap');
    let barrageBox = document.querySelector('.barrage-container');

    //容器的宽高度
    let contentWidth = ~~window.getComputedStyle(barrageBoxWrap).width.replace('px', '');
    let boxHeight = ~~window.getComputedStyle(barrageBox).height.replace('px', '');

    let heightArrayLength = Math.round(boxHeight / 30);
    //定义一个包含弹幕的宽和高度范围的数组
    let heightArray = [];
    console.log(heightArray);
    //将每个可用的高度,放入数组, 以便在创建数组时使用
    for (let i = 30; i < boxHeight - 10; i += 30) {
        heightArray.push(i)
    }

    //创建弹幕
    function createBarrage(item, index, forTime) {
        if (index >= heightArrayLength) {
            //如果索引达到高度数组的长度,则需重置索引到0,因此取余数
            index = index % heightArrayLength;
        }
        let divNode = document.createElement('div');    //弹幕的标签
        let divChildNode = document.createElement('div');  //提示文本的标签

        divNode.innerHTML = item.text;    //将弹幕内容插入标签中， innerHTML表示这个标签中的字符内容
        divNode.classList.add('barrage-item');  //追加class
        barrageBox.appendChild(divNode);    //弹幕的标签作为弹幕容器的子代标签

        let barragePopups = "/popups?id=" + item.barrage_id + "&type=" +item.barrage_type; //弹幕详情页的url
        divChildNode.innerHTML = '<iframe class="barrage-popup" src=' + barragePopups + '></iframe>';  //鼠标悬停展示的内容
        divChildNode.classList.add('barrage-detail');
        divNode.appendChild(divChildNode);  //提示文本的标签作为弹幕标签的子代标签

        //***设置弹幕的初始位置***
        //以容器的宽度为基准随机生成每条弹幕的左侧偏移值
        let barrageOffsetLeft = getRandom(contentWidth * forTime, contentWidth * (forTime + 0.618));
        //以容器的高度为基准随机生成每条弹幕的上方偏移值
        let barrageOffsetTop = heightArray[index];
        //随机选择一个颜色数组中的元素，从数组中取值的标准写法
        // let barrageColor = barrageColorArray[Math.floor(Math.random() * (barrageColorArray.length))];
        //通过弹幕类型选择颜色
        let barrageColor = barrageColorArray[item.barrage_type];
        //执行初始化滚动
        //fun.call()传入的第一个参数作为之后的this，详解：https://codeplayer.vip/p/j7sj5
        initBarrage.call(divNode, {
            left: barrageOffsetLeft,
            top: barrageOffsetTop,
            color: barrageColor,
            barrageUrl: item.url
        });
    }

    //初始化弹幕移动(速度，延迟)
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
        this.timeOut = null;

        //弹幕子节点，即提示信息，span标签
        let barrageChileNode = this.children[0];
        barrageChileNode.style.left = (this.width - barrageTipWidth) / 2 + 'px';//定义span标签的位置

        //运动
        barrageAnimate(this);

        //鼠标悬停停止
        this.onmouseenter = function () {
            cancelAnimationFrame(this.timer);//弹幕停止移动
            function showDetailPopups() {
                //显示提示****此处用于展示详情窗口
                barrageChileNode.style.display = 'block';
            }
            //设置延迟显示
            this.timeOut = setTimeout(showDetailPopups, 1000);

        };

        //鼠标移走
        this.onmouseleave = function () {
            //鼠标移走，隐藏提示
            barrageChileNode.style.display = 'none';
            barrageAnimate(this);//弹幕继续移动
            clearTimeout(this.timeOut)
        };

        //打开弹幕对应的目标页面
        this.onclick = function () {
            window.open(obj.barrageUrl);
        };
    }

    //回流：增删元素会引起回流，重绘：改变样式会引起重绘
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
            //删除节点
            obj.parentNode.removeChild(obj);
        }
    }

    //弹幕移动
    function move(obj) {
        obj.distance -= 2; //移动速度为一次1像素
        //transform可以对元素进行翻转、移动、倾斜等操作，这里主要使用了移动元素的效果
        obj.style.transform = 'translateX(' + obj.distance + 'px)';
    }

    //随机获取区间内的一个值
    function getRandom(start, end) {
        return start + (Math.random() * (end - start));
    }

    //Math.random()随机获取一个0~1之间的值
    /*******初始化事件**********/    //整个事件的入口
    //获取弹幕数据集
    let barrageArray = Server.barrage;
    //循环弹幕数组所需的切片次数
    let forTime = Math.ceil(barrageArray.length / heightArrayLength);
    for (let i = 0; i < forTime; i++) {
        //对弹幕数组切片,取出一部分要显示的弹幕,一直循环到取完
        let eachBarrageArray = barrageArray.slice(heightArrayLength * i, heightArrayLength * (i + 1));
        for (let item of eachBarrageArray) {
            //遍历每个弹幕, 并传入弹幕元素的索引,和循环次数(用作定位)
            createBarrage(item, eachBarrageArray.indexOf(item), i + 1);
        }
    }
})();