

var puzzle=null;

function createOSpace() {
    var renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000, 1);
	document.body.appendChild(renderer.domElement);
	var outscene = new THREE.Scene();
	
	//create box
	var box= new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material.box);
    outscene.add(box);
	
	
	
	
	var scene = new THREE.Scene(); //thisi s where all the action happens
	outscene.add(scene);
	puzzle=scene;
	scene.rotation.x=3.14/10;
	scene.rotation.y=3.14/1.8;
	
	var cam = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
	cam.position.z = 50;
	outscene.add(cam);
	
	
	
	var light = new THREE.PointLight(0xFFFFFF);
    light.position.set(40, 20, 50);
    outscene.add(light);
	
	outscene.add(new THREE.AmbientLight(0x222222));
	
	
	
	
	
	initMouse(scene,cam,clickedIt);	
	render();				
	
	function render() {
		requestAnimationFrame(render);
		renderer.render(outscene, cam);
	}
    
	function clickedIt(hitEl) 
	{
	   if (hitEl.obit.move>=hitEl.obit.moves.length) return; //we don't have a move left for this piece
	   
	   var m = hitEl.obit.moves[hitEl.obit.move];
	   
	   //check the depends lists
	   var finalPt=1;
	   for (var i=0;i<m.failtests.length;i+=1) 
	   {
	     var ft=m.failtests[i];
	     //look through the children for this one and check its not an issue
		 for (var j=0;j<scene.children.length;j+=1)
		    if (scene.children[j].name==ft.dname) //the right control
			  if (scene.children[j].obit.move==ft.match) //the right value
			    if (ft.failPt<finalPt) finalPt=ft.failPt;   		 			 
	   }
	   
	   
	   var dir = new THREE.Vector3().copy(m.trans);
	   dir.applyQuaternion( hitEl.quaternion ).multiplyScalar(finalPt);
	   var startp=new THREE.Vector3().copy(hitEl.position);
	   var startr=new THREE.Vector3().copy(hitEl.rotation);
	   var rotdir = new THREE.Vector3();
	   if (m.rot) rotdir.copy(m.rot).multiplyScalar(finalPt);
	   
	   callEachFrame(1000*finalPt,function(r) {
	     hitEl.position.x=inter(r,startp.x,startp.x+dir.x,siso);
	     hitEl.position.y=inter(r,startp.y,startp.y+dir.y,siso);
	     hitEl.position.z=inter(r,startp.z,startp.z+dir.z,siso);	
         hitEl.rotation.x=inter(r,startr.x,startr.x+rotdir.x,siso);
	     hitEl.rotation.y=inter(r,startr.y,startr.y+rotdir.y,siso);
	     hitEl.rotation.z=inter(r,startr.z,startr.z+rotdir.z,siso);			 
	   },function(){
	     if (finalPt<1) {//roll it back
		  callEachFrame(1000*2*finalPt,function(r) {
	        hitEl.position.x=inter(r,startp.x+dir.x,startp.x,siso);
	        hitEl.position.y=inter(r,startp.y+dir.y,startp.y,siso);
	        hitEl.position.z=inter(r,startp.z+dir.z,startp.z,siso);
			hitEl.rotation.x=inter(r,startr.x+rotdir.x,startr.x,siso);
	        hitEl.rotation.y=inter(r,startr.y+rotdir.y,startr.y,siso);
	        hitEl.rotation.z=inter(r,startr.z+rotdir.z,startr.z,siso);			 
	      });		   		 
		 } else { //all moved
	       hitEl.obit.move+=1;	   
	     }
	   });
	   
	}
	
}
	

	