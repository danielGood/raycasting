
//this is the game scene
Crafty.scene('Game', function(){
	
	//this.player= Crafty.e('PlayerCharacter').at(5, 5);
	//start = Crafty.e('Start').at(8, 8);
	//finish = Crafty.e('Finish').at(16, 16);
    
	
	var occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      occupied[i][y] = false;
    }
  }
	//occupied[this.player.at().x][this.player.at().y] = true;
	//occupied[start.at().x][start.at().y] = true;
	//occupied[finish.at().x][finish.at().y] = true;
	
	//this.myBush=Crafty.e('Bush').at(19, 5);
	this.myTree =Crafty.e('Tree').at(4, 8);
	//this.myBush.move('e', 250);
	Crafty.e('Bush').at(25, 5);
	Crafty.e('Bush').at(19, 5);
	
	
	
	for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {
        var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
         console.log(x +''+ y);
        if (at_edge) {
          // Place a tree entity at the current tile
          //Crafty.e('Tree').at(x, y);
            
        } else if (Math.random() < 0.25 && occupied[x][y]==false) {
          // Place a bush entity at the current tile
          //Crafty.e('Bush').at(x, y);
		  occupied[x][y]=true;
           
        }
      }
    }
	
	//console.log(Crafty("Tree"));
	 var arr = Crafty("2D").get();
	var len = arr.length;
  for (var y = 0; y < len; y++) {
     // console.log(arr[y].name);
	  //console.log(arr[y]._x + " "+arr[y]._y);
    }
	
	
	
	
	//Raycasting Code
	//////////////////////////////////////////
	
	
	
	
	
	
	//myTree=Crafty.e('Tree').at(8, 8);
	Crafty.e("Segment").Line(16, 16, 16, Game.height()-16);
	Crafty.e("Segment").Line(16, 16, Game.width()-16, 16);
	Crafty.e("Segment").Line(16, Game.height()-16, Game.width()-16, Game.height()-16);
	Crafty.e("Segment").Line(Game.width()-16, 16, Game.width()-16, Game.height()-16);
	
	/////////////////////////////////////////
	///////////////////////////////////////
	
	var nameArray = [{
		name: "Bush",
		fun: shapes.squareShape,
		mult: 16},
		{
		  name: "Tree",
		  fun: shapes.squareShape,
		  mult: 16
		}];
		
		
		
		
	
	var componentArray= updateCompPos(nameArray);
	console.log(componentArray);
	componentArray.push(shapes.wall1(16, 16, Game.width()-32));
	componentArray.push(shapes.wall1(16, Game.height()-16, Game.width()-32));
	componentArray.push(shapes.wall2(16, 16, Game.height()-32));
	componentArray.push(shapes.wall2(Game.width()-16, 16, Game.height()-32));
	this.myLight=Crafty.e('Light').at(18, 16);
	//this.myLight=Crafty.e('Light').at(2, 4);
	var light=rayCast(componentArray, this.myLight.x, this.myLight.y);
	//console.log(light.polygon);
	//console.log(light.polygon[5])
	for(var i=0;i<light.polygon.length ;i++){
		//console.log(light.polygon[i]);
		this.myP=Crafty.e('Poly').makeBox(light.polygon[i], "rgba(255, 255, 209, 0.5)");
	}
	
	
	//Crafty.e('Poly').makeBox(light.polygon[0], "rgba(255, 255, 209, 0.5)");
	//Crafty.e('Poly').makeBox(light.polygon[1], "rgba(255, 255, 209, 0.5)");
	//Crafty.e('Poly').makeBox(light.polygon[2], "rgba(255, 255, 209, 0.5)");
	//Crafty.e('Poly').makeBox(light.polygon[3], "rgba(255, 255, 209, 0.5)");
	//Crafty.e('Poly').makeBox(light.polygon[4], "rgba(255, 255, 209, 0.5)");
	//Crafty.e('Poly').makeBox(light.polygon[5], "rgba(255, 255, 209, 0.5)");
	//Crafty.e('Poly').makeBox(light.polygon[6], "rgba(255, 255, 209, 0.5)");
	//Crafty.e('Poly').makeBox(light.polygon[7], "rgba(255, 255, 209, 0.5)");
	
	//console.log(lineArray[0].p1.x);
	
	
	
	
});
 //
 
 