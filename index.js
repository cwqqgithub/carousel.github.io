
// jQuery 出让  $ 符号的使用权限 (也就是说,从这开始不是  $ jQuery,只能用变量  jQuery)
jQuery.noConflict();
// zySlide() 只要轮播图的根标签  (任何选择器)
jQuery('.slide').zySlide({speed:1000}).css({
	'backgroundColor':'yellow'
});
jQuery('#slide').zySlide({delay:2000,speed:5000}).css({
	'border':'2px solid red',
	'backgroundColor':'green'
});