
function createNailGeometry()
{
	var needle=new THREE.CylinderGeometry(1,1,20,8,10,true);
	var bluntend=new THREE.CylinderGeometry(1,1.5,2,8);
	bluntend.translate(0,-10,0);
	var sharpend=new THREE.CylinderGeometry(.3,1,2,8);
	sharpend.translate(0,11,0);
	needle.merge(bluntend);
	needle.merge(sharpend);
	return needle;
}

function createSpannerGeometry()
{
	var needle=new THREE.CylinderGeometry(1,1,5,8,2,false);
	var ring1=new THREE.TorusGeometry(2.5,1,8,8);
	var ring2=new THREE.TorusGeometry(2.5,1,8,8);
	ring1.translate(0,-5,0);
	ring2.translate(0,5,0);
	ring2.rotateY(3.14/2);
	needle.merge(ring1);
	needle.merge(ring2);
	return needle;
}


function createBoardGeometry()
{
	var boxGeometry = new THREE.BoxGeometry(1, 16, 16,5,5,5);
	var boxGeometry2 = new THREE.BoxGeometry(3, 3, 16,5,5,5);
	boxGeometry2.translate(0,-8,0);
	boxGeometry.merge(boxGeometry2);
	return boxGeometry;	
}

function createLockGeometry()
{
	var mainPart = new THREE.BoxGeometry(3, 6, 6);
	setMaterialIndex(mainPart,0);
	var keyhole = new THREE.TorusGeometry(1.5,1,3,3).rotateY(3.14/2).rotateX(3.14/2).translate(-2.1,0,0);
	setMaterialIndex(keyhole,1);	
	mainPart.merge(keyhole);
	return mainPart;
}

function createKeyGeometry()
{
	var key = new THREE.CylinderGeometry(1,1,10,3,3).rotateY(3.14/2).rotateZ(3.14/2).translate(-20,0,0);
	return key;			
}


var models={
	torus: new THREE.TorusGeometry(3, 1.5,10,32),
	nail: createNailGeometry()	,
	board: createBoardGeometry(),
	spanner: createSpannerGeometry(),
	box: new THREE.CylinderGeometry(16,16,100,20,10,false),
	lock: createLockGeometry(),
	key:  createKeyGeometry(),
}

function createTexture(href,repeat) {
	var tex=THREE.ImageUtils.loadTexture(href );
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	if (repeat) tex.repeat.set(repeat,repeat);
	tex.anisotropy = 16;
	return tex;
}

var textures = {
	rough: createTexture("textures/rough.jpg"),
	boxgrid: createTexture("textures/boxgrid.jpg",5),
	dimple: createTexture("textures/dimple.jpg",5),
	dimple2: createTexture("textures/dimplerough.jpg",20)
}

var material={
	gold: new THREE.MeshPhongMaterial({color: 0x999900, specular: 0xFFFF99, shininess: 10}),
	iron: new THREE.MeshPhongMaterial({color: 0x222222, specular: 0x999999, shininess: 10, bumpMap: textures.rough, bumpScale: .25}), 
    steel: new THREE.MeshPhongMaterial({color: 0x888888, specular: 0xDDDDDD, metal: true, shading: THREE.FlatShading}), 
    white: new THREE.MeshPhongMaterial({color: 0x888888, specular: 0x444444, shininess: 10, metal: true, bumpMap: textures.dimple2, bumpScale: .5}),
	board: new THREE.MeshPhongMaterial({color: 0x888888, specular: 0x888888, shininess: 10, bumpMap: textures.dimple, bumpScale: .25}),
	blue: new THREE.MeshPhongMaterial({color: 0x333399, specular: 0x6666FF, shininess: 10}),
	box: new THREE.MeshPhongMaterial({color: 0x000033, specular: 0x0000FF, side: THREE.DoubleSide, specularMap: textures.boxgrid, bumpMap: textures.boxgrid, bumpScale: .5,shininess: 10}),
	onglassx: new THREE.MeshFaceMaterial([
	  new THREE.MeshPhongMaterial({color: 0x663300, specular: 0x996600, shininess: 10, metal: true, specularMap: textures.boxgrid}),	  
	  new THREE.MeshPhongMaterial({color: 0x999900, specular: 0xFFFF00, shininess: 10}),	  
	]),
    onglass: new THREE.MeshFaceMaterial([
	  new THREE.MeshPhongMaterial({color: 0x666600, specular: 0x999900, shininess: 10, metal: true, specularMap: textures.boxgrid}),	  
	  new THREE.MeshPhongMaterial({color: 0x999900, specular: 0xFFFF00, shininess: 10}),	  
	]),
    offglass: new THREE.MeshPhongMaterial({color: 0x222222, specular: 0x999999, shininess: 100, transparent: true, opacity: 0.5, bumpMap: textures.boxgrid, bumpScale: .1}), 
        
	
}
	
function addOBit(name,parent,model,material,x,y,z,rx,ry,rz) {
   var n = new THREE.Scene();
   var main = new THREE.Mesh(model, material);
   n.name=name;
   n.position.x=x;
   n.position.y=y;
   n.position.z=z;	   
   main.castShadow=true;
   main.receiveShadow=true;
   n.add(main);
   if (rx) n.rotation.x=rx;
   if (ry) n.rotation.y=ry;
   if (rz) n.rotation.z=rz;

   //set up custom bits
   n.obit={
	 move: 0,
	 failsOn: obit_failOn,
	 addMove: obit_addMove,	
	 inner: main,
	 moves: []
   }   
   parent.add(n);	   
   return n;
}


function addExtraGeo(parent,model,material) {
   var main = new THREE.Mesh(model, material);
   main.castShadow=true;
   main.receiveShadow=true;
   parent.add(main);
   return main;
}


function obit_failOn(move,dependant,dstate,failAt)
{
	this.moves[move].failtests.push({
		dname: dependant,
		match: dstate,
		failPt: failAt		
	});
	return this;
}

function obit_addMove(translateVector,rotVector)
{
	this.moves.push({ failtests: [], trans: translateVector, rot: rotVector  });	
}

function addTorus(name,target,x,y,z,rx,ry,rz) 
{	
  var n=addOBit(name,puzzle.scene,models.torus,material.gold,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,0,0),new THREE.Vector3(0,3.14*2.5,0));
  n.obit.onMoveComplete=function(moveID) {
	  localStorage.setItem('levelNext',target);
	  if (target>localStorage.getItem('levelOpen')) localStorage.setItem('levelOpen',target);
	  closeLevel(levelFactory.menu);
  }
  
  n.obit.moveSound='win';
  
  return n;
}

function addNail(name,x,y,z,rx,ry,rz) {
  var n=addOBit(name,puzzle.scene,models.nail,material.iron,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,-30,0));
  n.obit.addMove(new THREE.Vector3(0,30,0));
  n.obit.moveSound='nslide';  
  return n;
}

function addSpanner(name,x,y,z,rx,ry,rz) {
  var n=addOBit(name,puzzle.scene,models.spanner,material.steel,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,0,0),new THREE.Vector3(0,3.14/2,0));
  n.obit.addMove(new THREE.Vector3(0,0,0),new THREE.Vector3(0,3.14/2,0));
  n.obit.moveSound='ticks';  
  return n;
}


function addBoard(name,x,y,z,rx,ry,rz) {
  var n=addOBit(name,puzzle.scene,models.board,material.board,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,-30,0));
  n.obit.addMove(new THREE.Vector3(0,30,0));
  n.obit.moveSound='slide';
  return n;  
}

function addLock(name,x,y,z,rx,ry,rz) {
  var n=addOBit(name,puzzle.scene,models.lock,material.board,x,y,z,rx,ry,rz);
  //add the key
  n.key=addExtraGeo(n,models.key,material.gold);
  //n.obit.addMove(new THREE.Vector3(0,-30,0));
  //n.obit.addMove(new THREE.Vector3(0,30,0));
  //n.obit.moveSound='slide';
  return n;  
}

function addLevelIndicator(name,num,x,y,z,rx,ry,rz) 
{
  var segments;
  switch (num%10) {
    case 0: segments=[0,0,0,
	                  0,0,0,
					  0,0,0]; break;
    case 1: segments=[0,0,0,
	                  0,1,0,
					  0,0,0]; break;
    case 2: segments=[1,0,0,
	                  0,0,0,
					  0,0,1]; break;
    case 3: segments=[1,0,0,
	                  0,1,0,
					  0,0,1]; break;
    case 4: segments=[1,0,1,
	                  0,0,0,
					  1,0,1]; break;
    case 5: segments=[1,0,1,
	                  0,1,0,
					  1,0,1]; break;
    case 6: segments=[1,0,1,
	                  1,0,1,
					  1,0,1]; break;
    case 7: segments=[1,1,1,
	                  0,1,0,
					  1,1,1]; break;
    case 8: segments=[1,1,1,
	                  1,0,1,
					  1,1,1]; break;
    case 9: segments=[1,1,1,
	                  1,1,1,
					  1,1,1]; break;    
  }  
  //var geo=new THREE.TorusGeometry(5, 1,10,32);
  
  var geo=new THREE.CylinderGeometry(5, 5,1,(num<10)?6:10,1).rotateX(3.14/2);
  setMaterialIndex(geo,0);
  for (var i=0;i<9;i+=1) {
	  if (!segments[i]) continue; 
	  var ngeo=new THREE.BoxGeometry(1,1,1).translate((i%3)*2-2,Math.round(i/3-.5)*2-2,1.5);
	  setMaterialIndex(ngeo,1);
	  geo.merge(ngeo);  	  
  }
  var allow=localStorage.getItem('levelOpen');
  var mat=(num<10)?material.onglass:material.onglassx;  
  if (num>allow) mat=material.offglass;
  
  var n=addOBit(name,puzzle.scene,geo,mat,x,y,z,rx,ry,rz);
  if (num<=allow) n.obit.addMove(new THREE.Vector3(0,0,0),new THREE.Vector3(3.14,3.14*4,0));
  n.obit.onMoveComplete=function() {	  
	  closeLevel(levelFactory[num]);
  }
  n.obit.moveSound='win';  
  return n;

}

function addBox(name,x,y,z,rx,ry,rz) 
{
	return addOBit(name,puzzle.scene,models.box,material.white,x,y,z,rx,ry,rz);
}

	