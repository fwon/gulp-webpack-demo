/**
    分页组件
*/
    
    var $ = require('jquery');

    function mixin(a, b) {
        for(var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }
    var defaults = {
        size: 0,    //页数
        showSize: 5,
        current: 1,
        container: 'paging', //父容器id
        itemType: 'span', //分页dom类型
        action: null //点击分页回调函数
    };
    var Paging  = function (options) {
        defaults = mixin(defaults, options);
        defaults.$container = $('#' + defaults.container);
        this.show();
    };
    var proto = Paging.prototype;
    proto.show = function () {
        var indexs = getIndex();
        var prev = getPrev();
        var next = getNext();
        var $container = defaults.$container;

        if (! $container) return;
        $container.html(prev + indexs + next);
        this.bind();
    };
    proto.bind = function () {
        var $container = defaults.$container;
        var $prev = $container.find('.prev');
        var $next = $container.find('.next');
        var $items = $container.find('.item');
        var pages = defaults.size;
        var that = this;

        $prev.off().on('click', function() {
            if (defaults.current > 1) {
                defaults.current -= 1; 
            }
            _action();
        });
        $next.off().on('click', function() {
            if (defaults.current < pages) {
                defaults.current += 1;
            }
            _action();
        });
        $items.off().on('click', function(e) {
            var _index = $(e.currentTarget).data("num");
            defaults.current = +_index;
            _action();
        });

        //外部回调
        function _action() {
            that.show();
            if (defaults.action && typeof defaults.action === 'function') {
                defaults.action(defaults.current);
            }
        }
    };
    function getIndex() {
        var pages = defaults.size;
        var showSize = defaults.showSize;
        var item = defaults.itemType;
        var current = defaults.current;
        var items = '';
        var half = Math.floor(showSize/2);

        var startIndex = current > half ? (current - half - 1) : 0;
        var endIndex = (current + half <= pages) ? (current + half) : pages;

        if (pages < 1) return;
        for (var i = startIndex; i < endIndex; i++) {
            if (current === i + 1) {
                items  += '<' + item + ' class="actived item" data-num="'+ (i + 1) +'">' + (i + 1) + '</' + item + '>';
            } else {
                items  += '<' + item + ' class="item" data-num="'+ (i + 1) +'">' + (i + 1) + '</' + item + '>';
            }
        }
        return items;
    }
    function getPrev() {
        var pages = defaults.size;
        var item = defaults.itemType;
        var prev = '';

        if (pages > 1 && defaults.current !== 1) {
            prev = '<' + item + ' class="prev">上一页</' + item + '>';
        }
        return prev;
    }
    function getNext() {
        var pages = defaults.size;
        var item = defaults.itemType;
        var next = '';

        if (pages > 1 && defaults.current !== pages) {
            next = '<' + item + ' class="next">下一页</' + item + '>';
        }
        return next;
    }

    module.exports = Paging;
