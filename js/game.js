/**
 * Created by Lorin on 2017/9/4.
 */
(function(window){
	var document = window.document;
	var map = document.querySelector("#map");
	var goal = document.querySelector("#goal");
	var btns = document.getElementsByClassName("btn");
	var img = map.getElementsByTagName("img")[0];


	//选择难度函数
	Game.prototype.chooseDifficulty = function(){
		for(var i=0;i<btns.length;i++){
			btns[i].index = i;
			btns[i].onclick = btnClickHandle;
		}
		//代指Game构造函数实例化的对象
		var that = this;
		function btnClickHandle(){
			img.style.display = "none";
			//点击第一个按钮的时候
			if(this.index == 0){
				//调用游戏开始函数
				that.start(150);
			}else{
				that.start(70);
			}
			for(var i=0;i<btns.length;i++){
				btns[i].style.opacity= 0;
			}
		}

	}
	function Game(food,snake,map){
		this.food = food;
		this.snake =snake;
		this.map = map;
		this.goal = 0;
	}

	//游戏开始
	Game.prototype.start = function(speed){
		var timer = setInterval(function(){
			//调用监听按钮事件
			this.bindKey();
			//蛇
			this.snake.moveWay();
			var maxX = map.offsetWidth - this.snake.width;
			var maxY = map.offsetHeight - this.snake.height;
			var head = this.snake.body[0];


			for(var i=1;i<this.snake.body.length-1;i++){
				//var dire = this.snake.direction;
				//直线掉头逻辑
				//if(head.x==this.snake.body[1].x && head.y==this.snake.body[1].y){
					//this.snake.direction = dire;
				//	alert("1");
				//	return;
				//}
				//撞到身体就结束
				if(head.x==this.snake.body[i].x && head.y==this.snake.body[i].y){
					alert("over");
					clearInterval(timer);
				}
			}
			//超出边界判断
			if(head.x<0 || head.x>maxX){
				alert("over");
				clearInterval(timer);
			}
			if(head.y<0 || head.y>maxY){
				alert("over");
				clearInterval(timer);
			}
			//吃到食物的时候
			if(head.x == this.food.x && head.y == this.food.y){
				//加十分
				this.goal+=10;
				//食物删除
				this.food.remove();
				//新建食物
				this.food = new Food();
				//蛇生长
				this.snake.grow();
				//修改界面分数
				goal.innerHTML= "goal:"+this.goal;
			}
		}.bind(this),speed);
	}

	//监听上右下左按钮
	Game.prototype.bindKey = function(){
		document.addEventListener("keydown",function(e){
			switch (e.keyCode){
				case 38:
					if(this.snake.direction == Direction.DOWN){
						break;
					}
					this.snake.direction = Direction.UP;
					break;
				case 39:
					if(this.snake.direction == Direction.LEFT){
						break;
					}
					this.snake.direction = Direction.RIGHT;
					break;
				case 40:
					if(this.snake.direction == Direction.UP){
						break;
					}
					this.snake.direction = Direction.DOWN;
					break;
				case 37:
					if(this.snake.direction == Direction.RIGHT){
						break;
					}
					this.snake.direction = Direction.LEFT;
					break;
			}
		}.bind(this),false);
	}
	window.Game = Game;
}(window));