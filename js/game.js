/**
 * Created by Lorin on 2017/9/4.
 */
(function(window){
	var document = window.document;
	var map = document.querySelector("#map");
	var goal = document.querySelector("#goal");
	var btns = document.getElementsByClassName("btn");
	var img = map.getElementsByTagName("img")[0];


	//ѡ���ѶȺ���
	Game.prototype.chooseDifficulty = function(){
		for(var i=0;i<btns.length;i++){
			btns[i].index = i;
			btns[i].onclick = btnClickHandle;
		}
		//��ָGame���캯��ʵ�����Ķ���
		var that = this;
		function btnClickHandle(){
			img.style.display = "none";
			//�����һ����ť��ʱ��
			if(this.index == 0){
				//������Ϸ��ʼ����
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

	//��Ϸ��ʼ
	Game.prototype.start = function(speed){
		var timer = setInterval(function(){
			//���ü�����ť�¼�
			this.bindKey();
			//��
			this.snake.moveWay();
			var maxX = map.offsetWidth - this.snake.width;
			var maxY = map.offsetHeight - this.snake.height;
			var head = this.snake.body[0];


			for(var i=1;i<this.snake.body.length-1;i++){
				//var dire = this.snake.direction;
				//ֱ�ߵ�ͷ�߼�
				//if(head.x==this.snake.body[1].x && head.y==this.snake.body[1].y){
					//this.snake.direction = dire;
				//	alert("1");
				//	return;
				//}
				//ײ������ͽ���
				if(head.x==this.snake.body[i].x && head.y==this.snake.body[i].y){
					alert("over");
					clearInterval(timer);
				}
			}
			//�����߽��ж�
			if(head.x<0 || head.x>maxX){
				alert("over");
				clearInterval(timer);
			}
			if(head.y<0 || head.y>maxY){
				alert("over");
				clearInterval(timer);
			}
			//�Ե�ʳ���ʱ��
			if(head.x == this.food.x && head.y == this.food.y){
				//��ʮ��
				this.goal+=10;
				//ʳ��ɾ��
				this.food.remove();
				//�½�ʳ��
				this.food = new Food();
				//������
				this.snake.grow();
				//�޸Ľ������
				goal.innerHTML= "goal:"+this.goal;
			}
		}.bind(this),speed);
	}

	//������������ť
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