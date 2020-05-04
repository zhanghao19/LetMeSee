let barrageList = document.querySelector('.barrage-list'),
    barrageDetailPanel = document.querySelector('.barrage-detail-panel');
//弹幕列表的实现
(function () {
    let expandBtn = document.querySelector('.expand');
    expandBtn.onclick = function () {
        //点击展开再次点击关闭
        if (barrageList.style.display === "none") {
            barrageList.style.display = "block";
        }else {
            barrageList.style.display = "none";
        }
        //关闭详情页显示列表页
        barrageDetailPanel.style.display = 'none'
    };

    let barrageItems = document.getElementsByClassName('barrage-list-item');    //li的集合
    for (let item of barrageItems){
        let barrageId = item.getAttribute('data-id');
        //点击单项打开详情页
        item.onclick = function () {
            let url = "/detail/",
                data = {barrage_id:barrageId};
            //ajax请求, 携带参数barrage_id
            $.ajax({
                type : "get",
                async : false,  //同步请求
                url : url,
                data : data,
                dataType: "json",
                success:function(barrage){
                    showDetailPanel(barrage)
                },
                error: function() {
                   alert("失败，请稍后再试！");
                }
            });
        };
    }
})();
