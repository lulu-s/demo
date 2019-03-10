window.onload = function () {
	function $(id) {
		return typeof id === "string" ? document.getElementById(id) : null;
	}

	var alLis = $("tab_header").getElementsByTagName("li");
	var allDoms = $("tab_content").getElementsByClassName("dom");

	console.log(alLis,allDoms);

	for (var i = 0; i < alLis.length; i++) {
		var li = alLis[i];
		li.index = i;
		li.onmouseover = function(){
			for (var j = 0; j < alLis.length; j++) {
				alLis[j].className = "";
				allDoms[j].style.display = "none";
			}
			this.className = "selected";

			
			allDoms[this.index].style.display = "block";
		}
	}


}