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