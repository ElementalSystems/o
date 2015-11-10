
function createNailGeometry()
{
	var needle=new THREE.CylinderGeometry(1,1,20,8,10,true);
	var bluntend=new THREE.CylinderGeometry(1,3,3,8);
	bluntend.translate(0,-11,0);
	var sharpend=new THREE.CylinderGeometry(.1,1,5,8);
	sharpend.translate(0,12,0);
	needle.merge(bluntend);
	needle.merge(sharpend);
	return needle;
}

function createBoardGeometry()
{
	var boxGeometry = new THREE.BoxGeometry(1, 16, 16);
	var boxGeometry2 = new THREE.BoxGeometry(3, 3, 16);
	boxGeometry2.translate(0,-8,0);
	boxGeometry.merge(boxGeometry2);
	return boxGeometry;	
}

var models={
	torus: new THREE.TorusGeometry(3, 1.5,10,32),
	nail: createNailGeometry()	,
	board: createBoardGeometry(),
	box: new THREE.BoxGeometry(20, 20, 20)
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
	boxgrid: createTexture("textures/boxgrid.jpg",5)
}

var material={
	gold: new THREE.MeshPhongMaterial({color: 0x999900, specular: 0xFFFF99, shininess: 10}),
	iron: new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x999999, shininess: 10, bumpMap: textures.rough, bumpScale: .25}), 
    white: new THREE.MeshPhongMaterial({color: 0x999999, specular: 0xFFFFFF, shininess: 10}),
	blue: new THREE.MeshPhongMaterial({color: 0x333399, specular: 0x6666FF, shininess: 10}),
	box: new THREE.MeshPhongMaterial({color: 0x000033, specular: 0x0000FF, side: THREE.DoubleSide, specularMap: textures.boxgrid, bumpMap: textures.boxgrid, bumpScale: .5,shininess: 10})
	
}
	
function addOBit(name,parent,model,material,x,y,z,rx,ry,rz) {
   var n = new THREE.Mesh(model, material);
   n.name=name;
   n.position.x=x;
   n.position.y=y;
   n.position.z=z;	   
   if (rx) n.rotation.x=rx;
   if (ry) n.rotation.y=ry;
   if (rz) n.rotation.z=rz;

   //set up custom bits
   n.obit={
	 move: 0,
	 failsOn: obit_failOn,
	 addMove: obit_addMove,	 
	 moves: []
   }
   parent.add(n);	   
   return n;
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

function addTorus(name,x,y,z,rx,ry,rz) 
{	
  var n=addOBit(name,puzzle,models.torus,material.gold,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,0,0),new THREE.Vector3(0,3.14*2.5,0));
  return n;
}

function addNail(name,x,y,z,rx,ry,rz) {
  var n=addOBit(name,puzzle,models.nail,material.iron,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,-30,0));
  return n;
}


function addBoard(name,x,y,z,rx,ry,rz) {
  var n=addOBit(name,puzzle,models.board,material.blue,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,-30,0));
  return n;  
}


function addLevelIndicator(name,num,x,y,z,rx,ry,rz) 
{	
  var geo=new THREE.TorusGeometry(5, 1,10,32);
  if ((num==2)||(num==3)||(num==4)||(num==5)||(num==6)||(num==8)||(num==9))
     geo.merge(new THREE.BoxGeometry(2.5,1,1));
  if ((num==3)||(num==2)||(num==5)||(num==6)||(num==8)||(num==9)||(num==0))
     geo.merge(new THREE.BoxGeometry(2.5,1,1).translate(0,-3,0));  
  if ((num==2)||(num==3)||(num==5)||(num==6)||(num==7)||(num==8)||(num==9)||(num==0))
     geo.merge(new THREE.BoxGeometry(2.5,1,1).translate(0,+3,0));
  if ((num==2)||(num==6)||(num==8)||(num==0))
     geo.merge(new THREE.BoxGeometry(2.5,1,1).rotateZ(3.14/2).translate(-2,-1.5,0));
  if ((num==4)||(num==5)||(num==6)||(num==8)||(num==9)||(num==0))
     geo.merge(new THREE.BoxGeometry(2.5,1,1).rotateZ(3.14/2).translate(-2,+1.5,0));
  if ((num==1)||(num==3)||(num==4)||(num==5)||(num==6)||(num==7)||(num==8)||(num==9)||(num==0))
     geo.merge(new THREE.BoxGeometry(2.5,1,1).rotateZ(3.14/2).translate(+2,-1.5,0));
  if ((num==1)||(num==2)||(num==3)||(num==4)||(num==7)||(num==8)||(num==9)||(num==0))
     geo.merge(new THREE.BoxGeometry(2.5,1,1).rotateZ(3.14/2).translate(+2,+1.5,0));
  
  var n=addOBit(name,puzzle,geo,(num<3)?material.gold:material.iron,x,y,z,rx,ry,rz);
  n.obit.addMove(new THREE.Vector3(0,0,0),new THREE.Vector3(3.14,3.14*4,0));
  return n;

}

function addBox(name,x,y,z,rx,ry,rz) 
{
	return addOBit(name,puzzle,models.box,material.box,x,y,z,rx,ry,rz);
}

	