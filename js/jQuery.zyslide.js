
// 自运行的匿名函数
/*
(function(){
	alert('自运行匿名函数');
})()

$(function(){
	alert('自运行匿名函数');
});
*/

(function($) {
	// 本函数每次调用只负责一个轮播图的功能
	// 也就是说只会产生一个轮播图，这个函数的作用域只能分配一个轮播图
	// 所以要求在调用本函数的时候务必把当前轮播图的根标签传递过来。
	// 这里的形参  ele 就是某个轮播的根标签
	var slide = function(ele,options) {
		// 转化为   jquery 标签对象
		var $ele = $(ele);
		// 默认设置选项
		var setting = {
			// 控制刚炸开的时间
			delay: 1000,
			// 控制  interval 的时间 (轮播速度)
			speed: 2000
		};
		// 对象合并
		$.extend(true, setting, options);
		// 规定好每张图片处于的位置和状态
		var states = [
			{ ZIndex: 1, width: 120, height: 150, top: 69, left: 134, ZOpacity: 0.2 },
			{ ZIndex: 2, width: 130, height: 170, top: 59, left: 0, ZOpacity: 0.5 },
			{ ZIndex: 3, width: 170, height: 218, top: 35, left: 110, ZOpacity: 0.7 },
			{ ZIndex: 4, width: 224, height: 288, top: 0, left: 263, ZOpacity: 1 },
			{ ZIndex: 3, width: 170, height: 218, top: 35, left: 470, ZOpacity: 0.7 },
			{ ZIndex: 2, width: 130, height: 170, top: 59, left: 620, ZOpacity: 0.5 },
			{ ZIndex: 1, width: 120, height: 150, top: 69, left: 500, ZOpacity: 0.2 }
		];
		var lis = $ele.find('li');
		// 让每个  li 对应上面  states 的每个状态
		function move() {
			lis.each(function(index, value) {
				var state = states[index];
				$(value).css('z-index', state.ZIndex).finish().animate(state, setting.delay).find('img').css('opacity', state.ZOpacity);
			});
		}
		// 让  li 从正中间展开
		move();

		// 下一张，让轮播图发生偏移
		function next() {
			// 原理：把数据最后一个元素移到数组的第一个
			//	var obj = states.pop();
			//	states.unshift(obj);
			states.unshift(states.pop());
			move();
		}

		// 点击下一张  (section)
		$ele.find('.zy-next').click(function() {
			next();
		});

		// 上一张
		function prev() {
			// 原理：把数据第一个元素移到数组最后一个
			//	var obj = states.shift();
			//	states.push(obj);
			states.push(states.shift());
			move();
		}

		// 点击上一张  (section)
		$ele.find('.zy-prev').click(function() {
			prev();
		});
		// 自动轮播
		var interval = null;

		function autoPlay() {
			interval = setInterval(function() {
				next();
			}, setting.speed);
		}
		autoPlay();

		// 停止轮播
		$ele.find($ele.children('[data-slide="direction"]')).add(lis).hover(function() {
			clearInterval(interval);
		}, function() {
			autoPlay();
		});
	}
	// 找到要轮播的轮播图的根标签，调用  slide 方法
	$.fn.zySlide = function(options){
		console.log(this);
		$(this).each(function(i,ele){
			slide(ele,options);
		});
		// 支持链式调用
		return this;
	}
})(jQuery)

/*
 * 用  jQuery 封装插件的几种写法:
 * 
 * 插件类写法:
 * $.fn.customFun = function(){
 * 		// 自定义插件的代码
 * }
 * 
 * 用法:
 * $('selector').customFun();
 * 
 * 工具类写法:
 * $.customFun = function(){
 * 		// 自定义工具类的代码
 * }
 * 
 * 用法:
 * $.customFun();
 */










/*
 * 中午遗留问题: 想一想我们的轮播图能封装成插件吗? 会产生什么问题?
 * 1.插件中最好不要使用  id，原因：插件是能够被重复使用的，也就是说在同一个页面中可能多次使用，造成冲突。
 * 2.变量的命名和方法的命名: states、interval、move()、next()。用户在使用这个插件的时候，可以还会
 * 引用自己创建的  js 文件，也有这样的命名，那么就产生冲突了。
 * 3.标签  class 的值的问题: prev、next。这些  class 太大众化了，谁写标签都想命名为  prev 或者  next，势必会冲突。
 * 4.插件文件名命名问题: index.js、index.css，命名大众化。比如这样修改: jQuery.ZYSlide.js
 */

/*
 * 首先我们准备把代码这样改:
 * function slide(){
 * // 把下面的所有代码全部粘贴过来
 * // 轮播图代码……
 * }
 * slide();
 */

/*
function slide() {
	// 规定好每张图片处于的位置和状态
	var states = [
		{ ZIndex: 1, width: 120, height: 150, top: 69, left: 134, ZOpacity: 0.2 },
		{ ZIndex: 2, width: 130, height: 170, top: 59, left: 0, ZOpacity: 0.5 },
		{ ZIndex: 3, width: 170, height: 218, top: 35, left: 110, ZOpacity: 0.7 },
		{ ZIndex: 4, width: 224, height: 288, top: 0, left: 263, ZOpacity: 1 },
		{ ZIndex: 3, width: 170, height: 218, top: 35, left: 470, ZOpacity: 0.7 },
		{ ZIndex: 2, width: 130, height: 170, top: 59, left: 620, ZOpacity: 0.5 },
		{ ZIndex: 1, width: 120, height: 150, top: 69, left: 500, ZOpacity: 0.2 }
	];
	var lis = $('#box li');
	// 让每个  li 对应上面  states 的每个状态
	function move() {
		lis.each(function(index, ele) {
			var state = states[index];
			$(ele).css('z-index', state.ZIndex).finish().animate(state, 1000).find('img').css('opacity', state.ZOpacity);
		});
	}
	// 让  li 从正中间展开
	move();

	// 下一张，让轮播图发生偏移
	function next() {
		// 原理：把数据最后一个元素移到数组的第一个
		//	var obj = states.pop();
		//	states.unshift(obj);
		states.unshift(states.pop());
		move();
	}

	// 点击下一张  (section)
	$('#box .next').click(function() {
		next();
	});

	// 上一张
	function prev() {
		// 原理：把数据最后一个元素移到数组的第一个
		//	var obj = states.pop();
		//	states.unshift(obj);
		states.push(states.shift());
		move();
	}

	// 点击上一张  (section)
	$('#box .prev').click(function() {
		prev();
	});
	// 自动轮播
	var interval = null;

	function autoPlay() {
		interval = setInterval(function() {
			next();
		}, 3000);
	}
	autoPlay();

	// 停止轮播
	$('#box li').add('#box section').hover(function() {
		clearInterval(interval);
	}, function() {
		autoPlay();
	});
}

// 调用全局变量  slide
slide();
*/

/*
 * 变量的作用域问题:
 * 1.全局域 [Window]     2.函数域名(Function 域) (3.Block域) 
 * 全局域: 从页面被打开之后到页面被关闭之前始终存在的。
 * 函数域: 存在于函数调用的一瞬间  (也不一定，考虑下闭包的存在)
 * 
 * 闭包的理解: 
 * 闭包的作用: 可以保留函数的作用域 (要不然闭包里面的函数   move 就不能使用   slide 函数域里面的变量: states、lis等)
 * 闭包产生的必要条件: 函数里面套函数  (内层函数要使用外层函数的作用域里面的变量)
 * 
 * 全局变量会产生闭包吗?
 * 不会。因为全局变量存在全局域里。
 */