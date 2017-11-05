/**
 * Created by Lorin on 2017/9/4.
 */
;(function(window){
	var document = window.document;
	var map = document.querySelector("#map");
	var Direction = Object.create({},{
		UP : {
			value : 0
		},
		RIGHT : {
			value : 1
		},
		DOWN : {
			value : 2
		},
		LEFT : {
			value : 3
		}
	});
	window.Direction = Direction;
	function Snake(width,height,direction,position){
		this.width = width || 20;
		this.height = height || 20;
		this.direction = direction || Direction.RIGHT;
		this.position = position || "absolute";
		this.body = [
			{x: 3*this.width, y: 2*this.height, color: 'yellow'},
			{x: 2*this.width, y: 2*this.height, color: 'white'},
			{x: 1*this.width, y: 2*this.height, color: 'white'}
		];
		this.elements = [];
		this.render(map);
	}
	//渲染页面
	Snake.prototype.render = function(map){
		for(var i=0;i<this.body.length;i++){
			var obj = this.body[i];
			var div = document.createElement("div");
			div.style.left = obj.x + "px";
			div.style.top = obj.y + "px";
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.backgroundColor = obj.color;
			div.style.position = this.position;
			div.style.borderRadius = 5 + "px";
			map.appendChild(div);
			this.elements.push(div);
		}
	}
	//蛇的运动方式
	Snake.prototype.moveWay = function(){

		//for(var i=0;i<this.body.length-1;i++){
		//	this.body[i+1].x = this.body[i].x;
		//	this.body[i+1].y = this.body[i].y;
		//	this.elements[i].style.left = this.body[i].x + "px";
		//	this.elements[i].style.top = this.body[i].y + "px";
		//}

		//下一个身体等于上一个的位置
		var i = this.body.length -1;
		for(;i>0;i--){
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
			this.elements[i].style.left = this.body[i].x + "px";
			this.elements[i].style.top = this.body[i].y + "px";
		}
		var head = this.body[0];
		switch (this.direction){
			case Direction.RIGHT:
				head.x += this.width;
				break;
			case Direction.LEFT:
				head.x-= this.width;
				break;
			case Direction.UP:
				head.y-= this.height;
				break;
			case Direction.DOWN:
				head.y+= this.height;
				break;
		}
		//让头走
		var headElement = this.elements[0];
		headElement.style.left = head.x + "px";
		headElement.style.top = head.y + "px";
	}


	//蛇长身体
	Snake.prototype.grow = function(){
		var last = this.body[this.body.length - 1];
		//长出的身体属性与最后一个身体x y相同
		var obj = {
			x : last.x,
			y : last.y
		}
		this.body.push(obj);
		var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.top = obj.y + "px";
		div.style.left = obj.x + "px";
		//新的身体随机颜色
		div.style.backgroundColor = "rgb("+util.getRandom(0,255)+","+util.getRandom(0,255)+","+util.getRandom(0,255)+")";
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.borderRadius = 5 + "px";
		this.elements.push(div);
		map.appendChild(div);
	}

	window.Snake = Snake;
}(window))