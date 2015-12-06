

var puzzle={
	scene: null,
	camera: null,
	renderer: null
};

function createOSpace() {
    var renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000, 1);
	renderer.shadowMapEnabled = true;
	puzzle.renderer=renderer;

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
	   if (hitEl.obit.isMoving) return; //already in motion ignore touch
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
	   m.execute(hitEl,finalPt);
	   
	   	  
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


function onResize()
{
    puzzle.camera.aspect = window.innerWidth / window.innerHeight;
    puzzle.camera.updateProjectionMatrix();

    puzzle.renderer.setSize( window.innerWidth, window.innerHeight );
}	