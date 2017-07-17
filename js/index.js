window.onload = function() {
    var animated = false;
    var index = 1;
    var timer;
    var interval = 3000;
    var wrap = document.getElementById('wrap');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    //Banner动画函数
    function animate(offset){
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
            }
        }
        go();
    }
    function showButton(){
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index-1].className = 'on';
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(){
            if (animated) {
                return;
            }
            if (this.className == 'on') {
                return;
            }
            var myIndex = this.getAttribute('index');
            var offset = -600*(myIndex-index);
            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    //箭头点击事件函数
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

    //自动&&暂停函数
    function play() {
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
}