//封装$函数
function $1(obj){
	var firstChild=obj.charAt(0);
	if(firstChild=="#"){
		return document.getElementById(obj.substring(1));
	}else if(firstChild=="."){
		var arr=[];
		var aEls=document.getElementsByTagName("*");
		for(var i=0;i<aEls.length;i++){
			var aClassName=aEls[i].className.split(" ");
			for(var j=0;j<aClassName.length;j++){
				if(aClassName[j]==obj.slice(1)){
					arr.push(aEls[i]);
					break;
				}
			}		
		}
		return arr;
	}
	else{
		return document.getElementsByTagName(obj);
	}
}   

//获取的是第一个元素节点的函数
function first(ele){
	var firstchild=ele.firstElementChild||ele.firstChild;
	if(!firstchild||firstchild.nodeType!==1){
		return null;
	}else{
		return firstchild;
	}
}

//获取最后一个元素节点的函数
function last(ele){
	var lastchild=ele.lastElementChild||ele.lastChild;
	if(!lastchild||lastchild.nodeType!==1){
		return null;
	}else{
		return lastchild;
	}
}
		
//获取下一个兄弟元素节点的函数
function next(ele){
	var nextnode=ele.nextElementSibling||ele.nextSibling;
	if(!nextnode||nextnode.nodeType!==1){
		return null;
	}else{
		return nextnode;
	}
}

//获取上一个兄弟元素节点
function prev(ele){
	var prevnode=ele.previousElementSibling||ele.previousSibling;
	if(!prevnode||prevnode.nodeType!==1){
		return null;
	}else{
		return prevnode;
	}
}
//一个得到位置的函数
function getPos(obj){
		var pos={left:0,top:0};
		
		while(obj){
			pos.left +=obj.offsetLeft;
			pos.top +=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return pos;
	}	


//封装一个得到样式的兼容性函数
function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,null)[attr];
		}
	}
 
 //添加class函数
function addClass(obj,className){              //为了添加classname的时候不覆盖之前的class名
			if(obj.className==""){
				obj.className=className;				
			}else{
				var arrClassName=obj.className.split(" ");
				var _index=arrIndex(arrClassName,className);//下面函数的函数名
				if(_index==-1){
					obj.className+=" "+className;					
				}
			}			
		}

//循环遍历原来class里的每一项，与要添加的类作比较
function arrIndex(arr,k){            //arrIndex函数，通过传参，arr即arrClassName（oBox的class名由字符串转成数组），k是要删除的class名字
	for(var i=0;i<arr.length;i++){   //遍历每一个arr即arrClassName（oBox的class名由字符串转成数组）
		if(arr[i]==k){                //若有要找的class名
			return i;                //返回下标i
		}			    
	}
	return -1;		                //若arr即arrClassName（oBox的class名由字符串转成数组）中没有要找的，返回值-1（这个-1也可以是其他值）！
}

//移除class函数
function removeClass(obj,className){            //removeClass函数，传参
	if(obj.className!==""){                     //若oBox的className不等于空
		var arrClassName=obj.className.split(" ");  //声明 arrClassName 是 oBox的class名由字符串转成数组
		var _index=arrIndex(arrClassName,className);//声明 _index 是函数arrIndex
		if(_index!=-1){
			arrClassName.splice(_index,1);//1是代表删一个class名
			obj.className=arrClassName.join(" ");					
		}                        //注意：   splice是删除；split是字符串--->数组！
	}
}

//封装一个得到class名的函数 为了兼容性
function getElementByClassName(parent,tagName,className){
	var aEls=parent.getElementsByTagName(tagName);
	var arr=[];
	for(var i=0;i<aEls.length;i++){
		var aClassName=aEls[i].className.split(" ");  //后面的className是属性名
		for(var j=0;j<aClassName.length;j++){
			if(aClassName[j]==className){
				arr.push(aEls[i]);
				break;
			}
		}
	}
	return arr;
}


//运动函数
function Move(obj,attr,dir,target,callBack){
				dir=parseInt(getStyle(obj,attr))>target?-dir:dir;
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					var speed=parseInt(getStyle(obj,attr))+dir;
					if(speed>=target&&dir>0||speed<=target&&dir<0){
						speed=target;
					}
					obj.style[attr]=speed+"px";
					if(speed==target){
						clearInterval(obj.timer);
						callBack&&callBack();
					}
				},20)
			
			}
//事件绑定多个函数
function bind(obj,evname,evFn,isCapture){
		if(obj.	addEventListener){
			obj.addEventListener(evname,evFn,isCapture)
		}else if(obj.attachEvent){
			obj.attachEvent("on"+evname,function(){
				evFn.call(obj);
			});
		}
	}
//解绑函数
function unbind(obj,evname,evFn,isCapture){
	if(obj.removeEventListener){
		obj.removeEventListener(evname,evFn,isCapture);
	}else if(obj.detachEvent){
		obj.detachEvent("on"+evname,evFn);//ie 7下有问题
	}else{
		obj["on"+evname]=null;
		
	}
}

//拖拽函数
function drag(obj){
		//声明两个用于存储固定距离的变量
		var disX;//水平固定
		var disY;//垂直固定
		var newObj=null;
		//在div上按下触发 
		//drag函数的封装
		obj.onmousedown=function(ev){
			for(var i=0;i<aImg.length;i++){
				aImg[i].style.transition="";
				aImg[i].style.zIndex="1"
			};
			
			obj.style.zIndex="999";
			var e=ev||event;//做一个事件对象的兼容
			disX=e.clientX-this.offsetLeft;//获取水平固定距离
			disY=e.clientY-this.offsetTop;//获取垂直固定距离
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
			//设置全局捕获
			obj.setCapture&&obj.setCapture();
			
			//保存最初的obj 的位置
			var firstL=obj.offsetLeft;
			var firstT=obj.offsetTop;

			//在document上移动鼠标触发
			document.onmousemove=function(ev){
			var e=ev||event;
			
			var valueX=e.clientX-disX;
			var valueY=e.clientY-disY;
			
			var maxL=document.documentElement.clientWidth-obj.offsetWidth;
			var maxT=document.documentElement.clientHeight-obj.offsetHeight;
			//三目运算符  简化判断的代码
			valueX= valueX<0?0:valueX;
			valueX= valueX>maxL?maxL:valueX;
			
			valueY= valueY<0?0:valueY;
			valueY= valueY>maxT?maxT:valueY;
			
			//让一个实时变化的鼠标坐标减去一个固定距离，就可以得到实时刷新的div的坐标
			obj.style.left=valueX+"px";
			obj.style.top=valueY+"px";
				//碰撞检测
				newObj=null;
				var arr=[];//建立数组用于存储碰撞上的图片
				for(var i=0;i<aImg.length;i++){
					if(aImg[i]!=obj){
						if(hitTest(aImg[i],obj)){
							arr.push(aImg[i]);
						}
					}
				};
				var min=Infinity;
				//遍历数组
				for(var i=0;i<arr.length;i++){
					var a=arr[i].offsetLeft-obj.offsetLeft;
					var b=arr[i].offsetTop-obj.offsetTop;
					
					var value=a*a+b*b;//平方和
					if(min>value){
						min=value;
						newObj  = arr[i];
					}
				};
				
				//console.log(newObj);
			}
			//鼠标弹起的时候
			document.onmouseup=function(){
				//取消鼠标移动和鼠标弹起的事件绑定
				document.onmouseup=document.onmousemove=null;
				//释放全局捕获
				obj.releaseCapture&&obj.releaseCapture();
				
				if(newObj){
					obj.style.transition="0.5s";
					newObj.style.transition="0.5s";
					obj.style.left=newObj.offsetLeft+"px";
					obj.style.top=newObj.offsetTop+"px";
					newObj.style.left=firstL+"px";
					newObj.style.top=firstT+"px";
					
				}else{
					obj.style.transition="0.5s"
					obj.style.left=firstL+"px";
					obj.style.top=firstT+"px";
				}
				obj.style.zIndex="1";
			}
		}
}	
	
//碰撞检测函数
function hitTest(obj,obj2){
	//先把obj那一堆获取
	var objL=  obj.offsetLeft;
	var objT=  obj.offsetTop;
	var objW=obj.offsetWidth;
	var objH=obj.offsetHeight;
	//获取obj2那一堆
	var obj2L=obj2.offsetLeft;
	var obj2T=obj2.offsetTop;
	var obj2W=obj2.offsetWidth;
	var obj2H=obj2.offsetHeight;
	if(objL+objW<obj2L||objT+objH<obj2T||obj2L+obj2W<objL||obj2T+obj2H<objT){
		return false;
	}else{
		return true;
	}
	
}
//封装得到时间的函数
		function getTime(){
			var mydate=new Date();
			var iYear=mydate.getFullYear();
			var iMonth=mydate.getMonth()+1;
			var iDay=mydate.getDate();
			var iWeek=mydate.getDay();
			var iHours=mydate.getHours();
			var iMinute=mydate.getMinutes();
			var iSec=mydate.getSeconds();
			
			switch(iWeek){
				case 0 : iWeek="星期日";break;
				case 1 : iWeek="星期一";break;
				case 2 : iWeek="星期二";break;
				case 3 : iWeek="星期三";break;
				case 4 : iWeek="星期四";break;
				case 5 : iWeek="星期五";break;
				case 6 : iWeek="星期六";break;
				
			}
			function zero(n){
				return n<10 ? "0"+n : ""+n;
			}
			var str=zero(iHours)+":"+zero(iMinute)+":"+zero(iSec);
			return str;
		}
//封装一个设置cookie过期时间的函数
function setCookie(key,value,time){ // setCookie("name","小明",3);  decodeURI("%E5%B0%8F%E6%98%8E")
	var mydate=new Date();
	mydate.setDate(mydate.getDate()+time);
	document.cookie=key+"="+encodeURI(value)+";expires="+mydate.toGMTString();
		
}

//封装一个得到想要名称的cookie的函数
function getCookie(key){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i=0;i<arr.length;i++){
		var newArr=arr[i].split("=");
		if(newArr[0]==key){
			return decodeURI(newArr[1]);
		}
	}
}
//封装一个删除cookie的函数
function removeCookie(key){
	setCookie(key,"",-1);
}


//封装一个json正则表达式
var objRegExp={
	"Email":/^[\w][\w-]*@[1-9a-zA-Z]{2,5}(\.[a-z]{2,3}){1,3}$/,
	"IDcard":/^[1-9]\d{16}(\d|X)$/,
	"QQ":/^[1-9]\d{4,11}$/,
	"removespace":/^\s+|\s+|\s+$/g
}

//封装ajax函数
function ajax(options){
	var defaults={
		method:options.method||"get",
		url:options.url,
		data:options.data||"",
		successFn:options.successFn||null,
		dataType: options.dataType || ""
	}
	defaults.method=options.method.toLowerCase();
	
	 if( defaults.url === "" ){
            alert( "url不能为空" );
            return;
          }
	 
	var xhr=null;
	try{
		xhr=new XMLHttpRequest();
	}catch(e){
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(defaults.method=='get'&&defaults.data){
		defaults.url +='?'+defaults.data;
	}
	xhr.open(defaults.method,defaults.url,true);
	if(defaults.method=='get'){
		xhr.send();
	}else{
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhr.send(defaults.data);
	}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				var data=xhr.responseText;
				 if( defaults.dataType.toLowerCase() === "json" ){
                    data = JSON.parse( data );
                }

                if( defaults.dataType.toLowerCase() === "xml" ){
                   data = xhr.responseXML;
                }
                
				 if( typeof defaults.successFn === "function" ){
                  defaults.successFn(data);
                }
			}else{
				alert('出错了,Err:'+xhr.status);
			}
		}
	}
}

//手机端自适应宽高
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	
	window.onload=window.onresize=function(){
		bodyScale();
	}


