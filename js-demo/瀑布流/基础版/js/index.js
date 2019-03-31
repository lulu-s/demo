// 实现瀑布流布局
waterFull("main", "box");

window.onscroll = ()=>{
	if(checkWillLoadImage("box")){
		// 造数据
		var dataArr = [
                {"src": "img04.jpg"},
                {"src": "img06.jpg"},
                {"src": "img08.jpg"},
                {"src": "img09.jpg"},
                {"src": "img10.jpg"},
                {"src": "img12.jpg"},
                {"src": "img14.jpg"},
                {"src": "img16.jpg"},
                {"src": "img18.jpg"}
		];
		// 创建盒子
		for (var i = 0; i < dataArr.length; i++) {
			var newBox = document.createElement("div");
			newBox.className = "box";
			$("main").appendChild(newBox);

			var newPic = document.createElement("div");
			newPic.className = "pic";
			newBox.appendChild(newPic);

			var newImg = document.createElement("img");
			newImg.src = `images/${dataArr[i].src}`;
			newPic.appendChild(newImg);		
		}

		waterFull("main", "box");
	}
}


/*
 * 实现瀑布流布局
 * @param parent 父盒子id
 * @param child  子盒子class
 * @return {null}
 */
function waterFull(parent, child) {

	// 1.父盒子居中

	var allBox = $(parent).getElementsByClassName(child);
	// 获取子盒子的宽度
	var boxWidth = allBox[0].offsetWidth;
	// 获取屏幕的宽度
	var screenX = document.documentElement.clientWidth;
	// 盒子列数 = 屏幕宽度 / 子盒子宽度
	var cols = parseInt(screenX / boxWidth);
	// 获取多余的padding
	var boxStyle = allBox[0].currentStyle || window.getComputedStyle(allBox[0]);
	// 父盒子居中
	$(parent).style.width = cols * boxWidth + parseInt(boxStyle.paddingLeft) + "px";
	$(parent).style.margin = `0 auto`;

	// 2.子盒子定位
	var heightArr = [], 	// 盒子高度容器
		boxHeight = 0,		// 盒子高度
		minBoxHeight = 0;	// 最小盒子高度
	for (var i = 0; i < allBox.length; i++) {
		boxHeight = allBox[i].offsetHeight;
		
		if (i < cols) { // 第一行
			heightArr.push(boxHeight);
		} else { // 剩余行
			// 取出最矮盒子的高度
			// minBoxHeight = Math.min.apply(this,heightArr);
			minBoxHeight = _.min(heightArr);

			// 求出最矮盒子对应的索引
			var index = getMinBoxIndex(heightArr, minBoxHeight);

			// 子盒子定位
			allBox[i].style.position = `absolute`;
			allBox[i].style.left = `${index * boxWidth}px`;
			allBox[i].style.top = `${minBoxHeight}px`;

			// 更新高度
			heightArr[index] += boxHeight;
		}
	}
	console.log(heightArr, minBoxHeight, index);
}

/*
 * 获取id
 * @param id 标签id
 * @return {obj}
 */
function $(id) {
	return typeof id === "string" ? document.getElementById(id) : null;
}

/*
 * 获取数组中最矮盒子的索引
 * @param arr 数组
 * @param val 最矮盒子高度
 * @return i 索引
 */
function getMinBoxIndex(arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] === val) {
			return i;
		}
	}
}

/*
 * 判断是否加载图片的条件
 * @param parent 父盒子id
 * @param child  子盒子class
 * @return {boolean}
 */
 function checkWillLoadImage(child) {
 	// 获取最后一个盒子
 	var allBox = document.getElementsByClassName(child);

 	var lastBox = allBox[allBox.length - 1];

 	// 求出最后一个盒子自身高度的一半 + lastBox.offsetTop
 	var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

 	// 屏幕的高度
 	var screenH = document.body.clientHeight || document.documentElement.clientHeight;

 	// 页面偏离浏览器的高度
 	var scrollTop = scroll().top;
 	return lastBoxDis <= screenH + scrollTop;
 }