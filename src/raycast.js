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


function rayCast(rayArray, ox, oy){
	var lineArray =[];
	for (var y = 0; y < rayArray.length; y++) {
      temp=rayArray[y];
	  lineArray =lineArray.concat(temp);
    }
	
	var rayList=[];
	var origin={x: ox, y:  oy};
	for (var y = 0; y < lineArray.length; y++) {
         point1=lineArray[y].p1;
		  point2=lineArray[y].p2;
		  rayList.push(creSeg(origin.x, origin.y, point1.x, point1.y));
		  rayList.push(creSeg(origin.x, origin.y, point2.x, point2.y));
    }
	
	for (var i=0; i<rayList.length; i++){
		var T1=100;
		var lx;
		var ly;
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
		//console.log(lx + " " + ly);
		Crafty.e("Segment").Line(origin.x, origin.y, lx, ly);
	}
	
}