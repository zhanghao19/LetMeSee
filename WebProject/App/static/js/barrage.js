(function () {
    let barrageColorArray = [
        '#0099CC', '#333333', '#009966', '#9933FF', '#CCCCFF', '#CC9933'
    ];
    let barrageTipWidth = 50; //提示框的宽度
    let barrageBoxWrap = document.querySelector('.barrage-container-wrap');
    let barrageBox = document.querySelector('.barrage-container');

    //容器的宽高度
    let contentWidth = ~~window.getComputedStyle(barrageBoxWrap).width.replace('px', '');
    let barrageBoxHeight = ~~window.getComputedStyle(barrageBoxWrap).height.replace('px', '');

    //定义一个包含弹幕的长和宽的数组

    //定义一个包含弹幕的宽和高度范围的数组
    var barrageAreaArray = [];

    //创建弹幕
    function createBarrage(item, isSendMsg) {
        let divNode = document.createElement('div');    //弹幕的标签
        let divChildNode = document.createElement('div');  //提示文本的标签

        divNode.innerHTML = item.text;    //将弹幕内容插入标签中， innerHTML表示这个标签中的字符内容
        divNode.classList.add('barrage-item');  //追加class
        barrageBox.appendChild(divNode);    //弹幕的标签作为弹幕容器的子代标签

        let barragePopups = "/popups/" + item.barrage_id; //弹幕详情页的url
        divChildNode.innerHTML = '<iframe src=' + barragePopups + '></iframe>';  //鼠标悬停展示的内容
        divChildNode.classList.add('barrage-detail');
        divNode.appendChild(divChildNode);  //提示文本的标签作为弹幕标签的子代标签

        //***设置弹幕的初始位置***
        //以容器的宽度为基准随机生成每条弹幕的左侧偏移值
        let barrageOffsetLeft = getRandom(contentWidth, contentWidth * 3);
        //让新建的弹幕最快显示,d=a?b:c(判断a，为真返回b，否则返回c）
        //barrageOffsetLeft = isSendMsg ? contentWidth : barrageOffsetLeft;
        //以容器的高度为基准随机生成每条弹幕的上方偏移值
        let barrageOffsetTop = getRandom(30, barrageBoxHeight - 30);
        //随机选择一个颜色数组中的元素，从数组中取值的标准写法
        let barrageColor = barrageColorArray[Math.floor(Math.random() * (barrageColorArray.length))];
        //执行初始化滚动
        //fun.call()传入的第一个参数作为之后的this，详解：https://codeplayer.vip/p/j7sj5
        initBarrage.call(divNode, {
            left: barrageOffsetLeft,
            top: barrageOffsetTop,
            color: barrageColor,
            barrageUrl: item.url
        });
    }
    function getOffsetLeft(obj) {
        for (let i of barrageAreaArray){
            do {
                obj.left = getRandom(contentWidth, contentWidth * 3);
            } while (isOverlap(i, [obj.left, 800]));
        }
                //向数组中添加弹幕的位置属性
        barrageAreaArray.push([obj.left-10, 800]);
        console.log([obj.left-10, 800]);
        return obj.left + 'px';
    }
    //初始化弹幕移动(速度，延迟)
    function initBarrage(obj) {
        //初始化
        this.style.left = getOffsetLeft(obj);
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

        //鼠标移走移动
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

    //移动
    function move(obj) {
        obj.distance -= 2; //移动速度为一次1像素
        //transform可以对元素进行翻转、移动、倾斜等操作，这里主要使用了移动元素的效果
        obj.style.transform = 'translateX(' + obj.distance + 'px)';
    }

    //判断连个块级元素是否重叠（1维）
    function isOverlap(boxOne, boxTwo) {
        let leftOne = boxOne[0],
            leftTwo = boxTwo[0],
            rightOne = boxOne[0] + boxOne[1],
            rightTwo = boxTwo[0] + boxTwo[1];
        let situation1 = leftOne < leftTwo && leftTwo < rightOne,
            situation2 = leftTwo < leftOne && leftOne < rightTwo,
            situation3 = leftTwo < leftOne && rightOne < rightTwo,
            situation4 = leftOne < leftTwo && rightTwo < rightOne;
        return situation1 || situation2 || situation3 || situation4;
    }

    //随机获取高度
    function getRandom(start, end) {
        return start + (Math.random() * (end - start));
    }
    //Math.random()随机获取一个0~1之间的值
    /*******初始化事件**********/    //整个事件的入口
    let barrageArray = Server.barrage;

    //系统数据,forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数
    //barrageArray.forEach(function (item) {
        //从数组中移除一个弹幕
        //item = barrageArray.splice(0, 1)[0];
    //    createBarrage(item, false);
        //添加一个弹幕到数组中
        //barrageArray.push(item);    //作用好像并没有体现，forEach执行完数组后就没有再继续执行了
    //});//将barrageArray中的每个元素依次传入createBarrage方法中，创建弹幕，item.text表示弹幕内容
    for (let item of barrageArray){
        createBarrage(item, false);
    }
    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
})();