//展示弹幕详情页
function showDetailPanel(obj) {
    let barrageTitle = document.querySelector('.title'),
        barrageAuthor = document.querySelector('.author'),
        barrageCover = document.querySelector('.cover'),
        barrageURL = document.querySelector('.source');
    //关闭列表页显示详情页
    barrageDetailPanel.style.display = 'block';
    barrageList.style.display = "none";
    //设置详情页的参数
    barrageTitle.innerHTML = obj.BText;
    barrageAuthor.innerHTML = '--' + obj.BAuthor;
    barrageCover.setAttribute('src', obj.BCover);

    barrageURL.onclick = function () {
        window.open(obj.BUrl);
    };
}

//close button event
let closeBtns = document.querySelectorAll('.close-btn');
for (let closeBtn of closeBtns){
    closeBtn.onclick = function () {
        barrageDetailPanel.style.display = "none";
        barrageList.style.display = "none";
    };
}
