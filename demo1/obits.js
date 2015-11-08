

function addItem(parent,model,x,y,z,rx,ry,rz) {
	   var n = new THREE.Mesh(model, mat1);
	   n.position.x=x;
	   n.position.y=y;
	   n.position.z=z;	   
	   if (rx) n.rotation.x=rx;
       if (ry) n.rotation.y=ry;
       if (rz) n.rotation.z=rz;
	   parent.add(n);
       return n;
}

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
	var boxGeometry = new THREE.BoxGeometry(1, 10, 10);
	var boxGeometry2 = new THREE.BoxGeometry(3, 3, 10);
	boxGeometry2.translate(0,-5,0);
	boxGeometry.merge(boxGeometry2);
	return boxGeometry;	
}

var models={
	torus: new THREE.TorusGeometry(3, 1.5,10,32),
	nail: createNailGeometry()	,
	board: createBoardGeometry()
}

var material={
	white: new THREE.MeshPhongMaterial({color: 0xFFFFFF})
	
}
	
function addOBit(parent,model,material,x,y,z,rx,ry,rz) {
   var n = new THREE.Mesh(model, material);
   n.position.x=x;
   n.position.y=y;
   n.position.z=z;	   
   if (rx) n.rotation.x=rx;
   if (ry) n.rotation.y=ry;
   if (rz) n.rotation.z=rz;
   parent.add(n);
   return n;
}

function addTorus(parent,x,y,z,rx,ry,rz) 
{
	
  return addOBit(parent,models.torus,material.white,x,y,z,rx,ry,rz);
}

function addNail(parent,x,y,z,rx,ry,rz) {
  return addOBit(parent,models.nail,material.white,x,y,z,rx,ry,rz);
}


function addBoard(parent,x,y,z,rx,ry,rz) {
  return addOBit(parent,models.board,material.white,x,y,z,rx,ry,rz);
}

	