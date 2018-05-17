// 图的邻接矩阵
//   a b c d e f
// a 0 3 2 I 1 I
// b 3 0 I 3 8 I
// c 2 I 0 7 I I
// d I 3 7 0 I I
// e 1 8 I I 0 I
// f I I I I I 0    I=Infinity 无向网

//   a b c d e f
// a 0 2 1 I I I
// b I 0 I I I I
// c 1 I 0 7 I I
// d I 2 I 0 I 6
// e I 3 I 4 0 5
// f I I I I I 0    I=Infinity 有向网

function Vertex(value){
	this.value = value;
	this.next = null;
}
function PosPoint(pos,weight){
	this.pos = pos;
	this.weight = weight;
	this.next = null;
}
function Graph(){
	this.vertexNum = 0;
	this.edgeNum = 0;
	this.graph = [];//主链表
	this.visited = {};//访问标志
	this.graphPos = {};//节点名称与节点位置的对应关系
	this.route = [];
}
// 初始化一些必要数据成员
Graph.prototype.init = function(){
	this.graph.forEach((item,index)=>{
		this.graphPos[item.value] = index;
		this.visited[item.value] = false;
	});
}
// 将图的邻接矩阵转化成邻接表
Graph.prototype.buildMap = function(vertexArr,edgeArr){
	this.vertexNum = vertexArr.length;
	vertexArr.forEach((item,index)=>{
		this.graph.push(new Vertex(item));
	});
	edgeArr.forEach((oItem,oIndex)=>{
		let head = this.graph[oIndex];
		edgeArr[oIndex].forEach((iItem,iIndex)=>{
			if(iItem===Infinity || iItem===0){
				return ;
			}
			head.next = new PosPoint(iIndex,iItem);
			head = head.next;
		});
	});
}
// 深度遍历
Graph.prototype.Deep = function deep(start){
	let _order = {};
	if(arguments.length === 0){
		start = 0;
		this.graph.forEach((item,index)=>{
			_order[item.value] = index;
			this.visited[item.value] = false;
		});
	}
	let point = this.graph[start];
	this.visited[point.value] = true;
	console.log(point.value);
	while(point.next){
		point = point.next;
		if(!this.visited[this.graph[point.pos]['value']]){
			deep.call(this,point.pos);
		}
	}

	// 非连通图 遍历剩下的节点
	if(JSON.stringify(_order)!=='{}'){
		for(let item in this.visited){
			if(!this.visited[item]){
				deep.call(this,_order[item]);
			}
		}
	}
}
// 广度遍历
Graph.prototype.Broad = function broad(start){
	let _order = {};
	if(arguments.length === 0){
		start = 0;
		this.graph.forEach((item,index)=>{
			_order[item.value] = index;
			this.visited[item.value] = false;
		});
	}
	let queue = [];
	this.visited[this.graph[start]['value']] = true;
	queue.push(start);
	while(queue.length>0){
		start = queue.shift();
		console.log(this.graph[start].value);
		start = this.graph[start];
		while(start.next){
			start = start.next;
			if(!this.visited[this.graph[start.pos]['value']]){
				this.visited[this.graph[start.pos]['value']] = true;
				queue.push(start.pos);
			}
		}
		debugger
		if(queue.length===0){
			for(let item in this.visited){
				if(!this.visited[item]){
					this.visited[item] = true;
					queue.push(_order[item]);
				}
			}
		}
	}
}
// 连通图 两个顶点之间路径长度为length的路径
Graph.prototype.Road = function road(start,end){
	let point = this.graph[this.graphPos[start]];
	this.visited[start] = true;
	this.route.push(start);
	console.log(start);
	let record = [];
	while(point.next){
		point = point.next;
		if(!this.visited[this.graph[point.pos]['value']]){
			record.push(this.graph[point.pos]['value']);
			deep.call(this,this.graph[point.pos]['value'],end);
		}
	}
	record.forEach((item)=>{
		this.visited[item] = false;
	});
}

function main(){
	let vertex = ['a','b','c','d','e','f'];
	let graphMatrix = [
	[0,3,2,Infinity,1,Infinity],
	[3,0,Infinity,3,8,Infinity],
	[2,Infinity,0,7,Infinity,Infinity],
	[Infinity,3,7,0,Infinity,Infinity],
	[1,8,Infinity,Infinity,0,Infinity],
	[Infinity,Infinity,Infinity,Infinity,Infinity,0]
	]
	let graph = new Graph();
	graph.buildMap(vertex,graphMatrix);
	console.log(graph);
	graph.Deep();
	graph.Broad();

	graph.init();
}










