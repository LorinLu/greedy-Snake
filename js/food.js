/**
 * Created by Lorin on 2017/9/4.
 */
;(function (window) {
	var document = window.document;
	var map = document.querySelector("#map");
	util = {
		getRandom: function(min,max){
			return Math.floor(Math.random()*(max-min)+min);
		}
	}
	function Food(x, y, color,width, height, position) {
		this.x = x || 0;
		this.y = y || 0;
		this.color = color || "#0094ff";
		this.width = width || 20;
		this.height = height || 20;
		this.position = position || "absolute";
		this.render(map);
	}
	Food.prototype.render = function(map){
		this.x = util.getRandom(0,map.offsetWidth/this.width) * this.width;
		this.y = util.getRandom(0,map.offsetHeight/this.height) * this.height;
		//创建Food
		var div = document.createElement("div");
		map.appendChild(div);
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor = this.color;
		div.style.position = this.position;
		this.element = div;
	}
	//删除食物
	Food.prototype.remove = function(){
		this.element.parentNode.removeChild(this.element);
	}

	window.Food = Food;
}(window))