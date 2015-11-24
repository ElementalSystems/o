

var puzzle={
	scene: null,
	camera: null
};

function createOSpace() {
    var renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000, 1);
	renderer.shadowMapEnabled = true;

	document.body.appendChild(renderer.domElement);
	var outscene = new THREE.Scene();
	
	//create box
	var box= new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material.box);
	box.receiveShadow=true;
    outscene.add(box);
	
	
	
	
	var scene = new THREE.Scene(); //thisi s where all the action happens
	outscene.add(scene);
	puzzle.scene=scene;
	scene.rotation.x=3.14/10;
	scene.rotation.y=3.14/1.8;
	
	var cam = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
	cam.position.z=40;
	outscene.add(cam);
	puzzle.camera=cam;
	
	
	
	var light = new THREE.SpotLight(0xFFFFFF);
    light.position.set(20, 20, 45);
	light.angle=Math.PI/2;
	light.exponent=1;
	light.castShadow=true;
    light.shadowDarkness=.5;
    light.shadowCameraNear=1;	
	light.shadowCameraFar=300;	
	light.shadowCameraFov=100;
    light.shadowMapWidth = 1024;
	light.shadowMapHeight = 1024;
						
	
	outscene.add(light);
	
	outscene.add(new THREE.AmbientLight(0x222222));
		
    if (localStorage.getItem('levelNext')==null) localStorage.setItem('levelNext',0);
	if (localStorage.getItem('levelOpen')==null) localStorage.setItem('levelOpen',0);
	   
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
	   
	   //m.execute(hitEl,finalPt);
	   
	   var dir = new THREE.Vector3().copy(m.trans).multiplyScalar(finalPt);
	   var inner=hitEl.obit.inner;
	   var startp=new THREE.Vector3().copy(inner.position);
	   var startr=new THREE.Vector3().copy(inner.rotation);
	   var rotdir = new THREE.Vector3();
	   if (m.rot) rotdir.copy(m.rot).multiplyScalar(finalPt);

	   var moveAttempt=hitEl.obit.move;
       if (finalPt>=1) hitEl.obit.move=(hitEl.obit.move+1)%hitEl.obit.moves.length; //move complete
	   if (hitEl.obit.moveSound) soundFX.play(hitEl.obit.moveSound,1000*finalPt);
	   callEachFrame(1000*finalPt,function(r) {
	     inner.position.x=inter(r,startp.x,startp.x+dir.x,siso);
	     inner.position.y=inter(r,startp.y,startp.y+dir.y,siso);
	     inner.position.z=inter(r,startp.z,startp.z+dir.z,siso);	
         inner.rotation.x=inter(r,startr.x,startr.x+rotdir.x,siso);
	     inner.rotation.y=inter(r,startr.y,startr.y+rotdir.y,siso);
	     inner.rotation.z=inter(r,startr.z,startr.z+rotdir.z,siso);			 
	   },function(){
	     if (finalPt<1) {//roll it back
		  soundFX.play('fail',1000);

		  callEachFrame(1000*2*finalPt,function(r) {
	        inner.position.x=inter(r,startp.x+dir.x,startp.x,siso);
	        inner.position.y=inter(r,startp.y+dir.y,startp.y,siso);
	        inner.position.z=inter(r,startp.z+dir.z,startp.z,siso);
			inner.rotation.x=inter(r,startr.x+rotdir.x,startr.x,siso);
	        inner.rotation.y=inter(r,startr.y+rotdir.y,startr.y,siso);
	        inner.rotation.z=inter(r,startr.z+rotdir.z,startr.z,siso);			 
	      });		   		 
		 } else { //all moved
		   if (hitEl.obit.onMoveComplete) hitEl.obit.onMoveComplete(moveAttempt); //call the handler
	       //hitEl.obit.move=(hitEl.obit.move+1)%hitEl.obit.moves.length;	   
	     }
	   });	  
	}	
}
	
function openLevel(factory)
{
  puzzle.scene.rotation.x=3.14/10;
  puzzle.scene.rotation.y=3.14/1.8;
	
  factory();
  
  jukeBox.next();

  callEachFrame(2000,function(r)  {
	puzzle.camera.position.z = inter(r,40,50,siso);	  
	puzzle.camera.rotation.y = inter(r,3.14,0,so);
  });
}	

function closeLevel(newFactory)
{
  callEachFrame(2000,function(r)  {
	puzzle.camera.position.z = inter(r,50,40,siso);	  
	puzzle.camera.rotation.y = inter(r,0,-3.14,si);
  }, function() {
	  //destroy the old stuff
	  for (var i = puzzle.scene.children.length - 1; i >= 0 ; i -- ) 
        puzzle.scene.remove(puzzle.scene.children[i]);
	  //create new 
	  openLevel(newFactory);
  });
  
}