/*
	Popup.show("µ¯²ãid");
	Popup.hide();
*/
//µ¯´°º¯Êý
	var Popup = {
		cover: $("<div style='filter:alpha(opacity=70); opacity:0.7; width:100%; z-index:10000; background-color:#858585; position:absolute; left:0; top:0;height: 1000px; display:none;'>"),
		hasCover: 0,
		ifShow: 0,
		show: function(plate) {
			this.box = typeof(plate) == "string" ? $("#" + plate) : $(plate);
			this.bodyWidth = Math.max($(document).width(), $(window).width());
			this.bodyHeight = Math.max($(document).height(), $(window).height());
			if($.browser.msie){
				this.cover.append($("<iframe width='"+this.bodyWidth+"' height='"+this.bodyHeight+"' frameborder='0' style='position:absolute;left:0;top:0;filter:alpha(opacity=0);'></iframe>"));		
			}
			if (!this.hasCover) {
				$("body").append(this.cover);
				this.hasCover = 1;
			}
			this.cover.css({
				"height": this.bodyHeight,
				"width": this.bodyWidth
			}).show();

			this.box.css({
				"left": ($(window).width() - this.box.width()) / 2 + $(document).scrollLeft(),
				"top": ($(window).height() - this.box.height()) / 2 + $(document).scrollTop()
			}).show();
			this.ifShow = 1;
			var _this = this;
			$(window).bind("resize", function() {
				_this.resize.call(_this)
			});
		},
		hide: function() {
			var _this = this;
			this.box.hide();
			this.cover.hide();
			this.ifShow = 0;
			$(window).unbind("resize");
		},
		resize: function() {
			var _this = this;
			if (!this.ifShow) return;
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(function() {
				_this.box.css({
					"left": ($(window).width() - _this.box.width()) / 2 + $(document).scrollLeft(),
					"top": ($(window).height() - _this.box.height()) / 2 + $(document).scrollTop()
				}).show();
			}, 200);
		}
	};

	module.exports = Popup;

