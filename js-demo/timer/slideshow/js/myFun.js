/*
 * 获取滚动的头部距离和左边距离
 * scroll().top scroll().left
 * @returns {*}
 */
function scroll() {
	if (window.pageYOffset !== null) {
		return {
			top : window.pageYOffset,
			left : window.pageXOffset
		}
	} else if (document.compatMode === "CSS1Compat") {
		return {
			top : document.documentElement.scrollTop,
			left : document.documentElement.scrollLeft
		}			
	} else {
		return {
			top : document.body.scrollTop,
			left : document.body.scrollLeft
		}					
	}
}
/*
 * 获取id
 * @param id 标签id
 * @return {obj}
 */
function $(id) {
	return typeof id === "string" ? document.getElementById(id) : null;
}

// 缓动动画公式
// begin = begin + (end - begin) * 0.2; 向下
// begin = begin + (end - begin) / 20;  向上

/*
 * 块级显示
 * @param 对象
 * @return 
 */
 function show(obj) {
 	return obj.style.display = "block";
 }

 /*
 * 隐藏
 * @param 对象
 * @return 
 */
 function hidden(obj) {
 	return obj.style.display = "none";
 }

 /*
 * 获取可视区域的的宽度和高度
 * client().width client().height
 * @returns {*}
 */
 function client() {
 	// IE9+最新浏览器
 	if (window.innerWidth) {
 		return {
 			width : window.innerWidth,
 			height : window.innerHeight
 		}
 	} else if (document.compatMode === "CSS1Compat") { // W3C
 		return {
 			width : document.documentElement.clientWidth,
 			height : document.documentElement.clientHeight
 		}
 	} else {
 		return {
 			width : document.body.clientWidth,
 			height : document.body.clientHeight
 		} 		
 	}
 }



/*
 * 阻止冒泡
 * stopPro() 
 * @returns 
 */
 function stopPro(event) {
 	// W3C
 	if (event && event.stopPropagation) {
 		event.stopPropagation();
 	} else {
 		// IE678
 		window.event.cancelBubble = true;
 	}
 }

 /*
 * 获取用户选择内容
 * checked() 
 * @returns {string}
 */
 function checked() {
 	var selectedText;
 	if (window.getSelection) { // 标志浏览器
 		selectedText = window.getSelection().toString();
 	} else { //IE系列
 		selectedText = document.selection.createRange().text;
 	}
 	return selectedText;
 }

 /*
 * 防止拖拽时选中代码
 * noChecked() 
 * @returns {string}
 */
 function noChecked() {
 	 window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();;
 }

 /**
  * 匀速动画函数
  * @param {object} ele 元素
  * @param {number} target 目标位置
  * @param {number} speed 步长 
  */
 function constant(ele, target, speed) {
	//  清除定时器
	clearInterval(ele.timer);

	// 判断方向，当前位置大于目标位置就是向左，否则向右
	var dir = ele.offsetLeft > target ? -speed : speed;

	// 设置定时器
	ele.timer = setInterval(()=>{
		ele.style.left = ele.offsetLeft + dir +"px";
		// 由于步长不定，会导致结果位置多余目标位置，所有要修正
		if (Math.abs(target-ele.offsetLeft) < Math.abs(dir) ){
			clearInterval(ele.timer);
			ele.style.left = target +"px";
		}
	},20);
 }