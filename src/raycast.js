//Raycasting code
 ////////////////////////
  Crafty.c('Ray', {
  init: function() {
    this.requires('Actor')
      
	 

  },	 
  
   rayCast: function(t) {
		
   }
  
});



Crafty.c("Segment", {
    

    ready: true,

    init: function() {
        this.requires("Canvas, 2D");

        this.bind("Draw", function(obj) {
            this._draw(obj.ctx, obj.pos);
        });
		
    },

    Line: function(ax, ay, bx, by) {
        this.aX = ax;
        this.aY = ay;
        this.bX = bx;
        this.bY = by;

        this.attr({
			
           // x: ax < bx ? ax : bx,
            //y: ay < by ? ay : by,
            w: Math.abs(bx - ax) + 1,  //Need to add 1 or veritical lines won't draw
            h: Math.abs(by - ay) + 1   //Need to add 1 or horizontal lines won't draw
        });
    },

    _draw: function(ctx, pos) {
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.moveTo(this.aX, this.aY);
        ctx.lineTo(this.bX, this.bY);
        ctx.stroke();
    },
	
	
});


function getIntersection(ray, segment){
	var r_px = ray.aX;
	var r_py = ray.aY;
	var r_dx = ray.bX -ray.aX;
	var r_dy = ray.bY- ray.aY;
	
	var s_px = segment.aX;
	var s_py = segment.aY;
	var s_dx = segment.bX -segment.aX;
	var s_dy = segment.bY- segment.aY;
	
	var r_mag =Math.sqrt(r_dx*r_dx+r_dy*r_dy);
	var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
	if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){ // Directions are the same.
		return null;
	}
	var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
	var T1 = (s_px+s_dx*T2-r_px)/r_dx;
	// Must be within parametic whatevers for RAY/SEGMENT
	if(T1<0) return null;
	if(T2<0 || T2>1) return null;
	
	
	return {
		x: r_px+r_dx*T1,
		y: r_py+r_dy*T1,
		param: T1
	};
}


function creSeg(x, y, a, b){
	return {
		aX: x,
		aY : y,
		bX: a,
		bY: b
	};
	
}




var shapes={
	wall1: function(a, b, multip){
		var s1=1;
		var mp1 ={x: a, y: b};
		var mp2 ={x: a+s1*multip, y: b};
		return [{p1: mp1, p2: mp2}];
	},
	wall2: function(a, b, multip){
		var s1=1;
		var mp1 ={x: a, y: b};
		var mp2 ={x: a, y: b+s1*multip};
		return [{p1: mp1, p2: mp2}];
	},
	squareShape: function(a, b, multip){
	//different sizes for the shape
	var s1 =1;
	//points on the shape
	var mp1 ={x: a, y: b};
	var mp2 = {x: a+ s1*multip,y: b};
	var mp3 ={x: a,y: b+s1*multip};
	var mp4 ={x: a+s1*multip,y: b+s1*multip};
	
	var sq=[
		{p1: mp1, p2: mp2},
		{p1: mp1, p2: mp3},
		{p1: mp2, p2: mp4},
		{p1: mp3, p2: mp4}
	]
	return sq;
	}
	
};



function getAngleBetweenPoints(currX, currY, x, y){
	 
	      var moveX = x-currX;
	      var moveY = y-currY;
	      var quadrant;
	      if(moveX > 0 && moveY > 0){
		     quadrant=1;
	       }
	      if(moveX < 0 && moveY > 0){
		     quadrant=2;
	      }
	      if(moveX < 0 && moveY < 0){
		  quadrant=3;
	     }
	     if(moveX > 0 && moveY < 0){
		  quadrant=4;
	     }
	 
	   var theta = Math.atan(moveY/moveX);
	  
	   
	theta=Math.abs(theta);
	
	if(quadrant==2){
		
		theta=Math.PI-theta;
		
		
	} 
	  
	if(quadrant==3){
		
		//theta=theta-(Math.PI);
		theta=Math.PI+theta
	}
	if(quadrant==4){
		theta=(2*Math.PI)-theta;
	}
	
		  
		  
		  return theta;
		 ////////// 
}

function rayCast(rayArray, ox, oy){
	var lineArray =[];
	//this loop turns array of array of objects to array of objects
	for (var y = 0; y < rayArray.length; y++) {
      temp=rayArray[y];
	  lineArray =lineArray.concat(temp);
    }
	var myRays =[];//return array
	var rayList=[];
	var origin={x: ox, y:  oy};
	//create a list of rays based on line endpoints
	for (var y = 0; y < lineArray.length; y++) {
         point1=lineArray[y].p1;
		  point2=lineArray[y].p2;
		  //each loop deals with 2 points 
		  ////
		  ////
		  
		  
		  var angle1 = getAngleBetweenPoints(origin.x, origin.y, point1.x, point1.y);
		  var angle2 =getAngleBetweenPoints(origin.x, origin.y, point2.x, point2.y);
		
		  //console.log(origin.x + "  "+origin.y+ "  "+ point1.x+ "  "+ point1.y);
		  //console.log(origin.x + "  "+origin.y+ "  "+ point2.x+ "  "+ point2.y);
		  
		  var minLength =1000;
		  
		 
		 
		  rayList.push(creSeg(origin.x, origin.y, origin.x+Math.cos(angle1+.001)*minLength, origin.y+Math.sin(angle1+.001)*minLength));
		  rayList.push(creSeg(origin.x, origin.y, origin.x+Math.cos(angle1-.001)*minLength, origin.y+Math.sin(angle1-.001)*minLength));
          rayList.push(creSeg(origin.x, origin.y, origin.x+Math.cos(angle2+.001)*minLength, origin.y+Math.sin(angle2+.001)*minLength));
		  rayList.push(creSeg(origin.x, origin.y, origin.x+Math.cos(angle2-.001)*minLength, origin.y+Math.sin(angle2-.001)*minLength));
		  
		
		 rayList.push(creSeg(origin.x, origin.y, point1.x, point1.y));
		 rayList.push(creSeg(origin.x, origin.y, point2.x, point2.y));
    }
	console.log("and now rays");
	for (var i=0; i<rayList.length; i++){
		var T1=100;
		var lx;
		var ly;
		//console.log(rayList[i].aX+" "+rayList[i].aY+" "+rayList[i].bX+" "+rayList[i].bY);
		for(var j=0; j<lineArray.length; j++){
			
			
			var myLine = creSeg(lineArray[j].p1.x, lineArray[j].p1.y, lineArray[j].p2.x, lineArray[j].p2.y)
			var inter = getIntersection(rayList[i], myLine);
			if (inter != null){
				if(T1>inter.param){
					lx=inter.x;
					ly=inter.y;
				//	console.log(lx + " " + ly);
					T1=inter.param;
				}
				//console.log(inter.param);
				
			}
				
		}
		
		var ray =creSeg(origin.x, origin.y, lx, ly);
		ray.theta=getAngleBetweenPoints(ray.aX, ray.aY, ray.bX, ray.bY);
		
		//console.log(lx + " " + ly);
		//Crafty.e("Segment").Line(origin.x, origin.y, lx, ly);
		myRays.push(ray);
		
	}
	////sort rays by theta
	
	
	myRays.sort(function compare(a,b){
		return a.theta-b.theta;
		
	});
	
	////
	
	
	var myTriangles=[];
	////////
	for(var i=0; i<myRays.length-1; i++){
		    console.log(i);
			console.log(myRays[i]);
			
			myTriangles.push([[origin.x, origin.y], [myRays[i].bX, myRays[i].bY],[myRays[i+1].bX, myRays[i+1].bY] ]);
			
		
	}
	
	
	return {polygon: myTriangles,
		rays: myRays};
}

function updateCompPos(nameArray){
	var componentArray =[];
	for (var i=0; i<nameArray.length;i++){
		var temp= Crafty(nameArray[i].name).get();
		
		
		for(var j=0; j<temp.length; j++){
			//componentArray.push(temp[j]);
			
			componentArray.push(nameArray[i].fun(temp[j].x, temp[j].y, nameArray[i].mult));
			console.log(temp[j]._x+"  "+temp[j]._y);
			
		}
	}
	return componentArray;
}
Crafty.c('Poly',{
	ready: true,
	init: function() {
            this.addComponent("2D, Canvas");

           

            this.bind("Draw", function(obj) {
                // Pass the Canvas context and the drawing region.
                this._draw(obj.ctx, obj.pos);
            });
	},
	 _draw: function(ctx, po) {
		
		 ctx.fillStyle = this._color;
		 //ctx.fillRect(50, 60, 200, 200);
		 ctx.strokeStyle=this._color;
		 
		 
		 var firstA ;  //to close the polygon
		 var firstB;
		 for(var i=0; i<this.p.length; i++){
			 ctx.lineTo(this.p[i][0], this.p[i][1]);
			 
			 if(i==0){
				 firstA=this.p[i][0];
				 firstB=this.p[i][1];
			 }
		 }
		 
		 ctx.lineTo(firstA, firstB);
		 
		 ctx.stroke();
		 ctx.fillStyle=this._color;
		 ctx.fill();
	 },
	 makeBox: function(p, color) {
		// console.log(x);
            this.attr({x: p[0][0], y: p[0][1], p: p});
            this._color = color;
        }
	
});