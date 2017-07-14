window.onload = function() {
    var index = 1;
    var animated = false;
    var interval = 3000;
    var wrap = document.getElementById('wrap');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    console.log(buttons);

    //动画封装函数
    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 50;
        var speed = offset/(time/inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function() {
            if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go,inteval);
            } else {
                list.style.left = left + 'px';
                if (left > -600) {
                    list.style.left = -3000 + 'px';
                }
                if (left < -3000) {
                    list.style.left = -600 + 'px';
                }
                animated = false;
                console.log(animated);
            }
        }
        go();
    }
    //焦点动画
    function showButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index-1].className = 'on';
    }
    //焦点点击事件
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(){
            if (animated) {
                return;
            }
            if (this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600*(myIndex-index);
            animate(offset);
            index = myIndex;
            showButton();

        }
    }
    //自动播放与停止播放
    function play(){
        timer = setTimeout(function(){
            prev.onclick();
            play();
        },interval)
    }
    play();
    function stop(){
        clearTimeout(timer);
    }
    wrap.onmouseover = stop;
    wrap.onmouseout = play;
    //左箭头
    prev.onclick = function(){
        if (animated) {
            return;
        }
        if (index == 5) {
            index = 1;
        } else {
            index += 1;
        }
        animate(-600);
        showButton();
    }
    //右箭头
    next.onclick = function(){
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 5;
        } else {
            index -= 1;
        }
        animate(600);
        showButton();
    }
}