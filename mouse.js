	//mousy stuff
function initMouse(scene,camera,clickFunction) {
	  var dragStartX,dragStartY,dragStartT,dragNow=false;
	  var dragStartRX,dragStartRY;
	  
	  raycaster = new THREE.Raycaster();
	
	  function mouseDown(evt)
	  {
	     evt.preventDefault();
	     if (dragNow) return;
		 dragNow=true;
		 dragStartX=evt.clientX;
		 dragStartY=evt.clientY;		 
		 dragStartT=tickCount();
		 dragStartRX=scene.rotation.x;
		 dragStartRY=scene.rotation.y;
	  }
	  
	  
	  
	  function mouseUp(evt)
	  {
	     evt.preventDefault();
		 //was it a click?
		 if ((Math.abs(evt.clientX-dragStartX)<5)&&
		     (Math.abs(evt.clientY-dragStartY)<5)&&
			 (Math.abs(tickCount()-dragStartT)<400)) { //I think that was a click!			 
			 dragNow=false;
			 clickSelect(evt.clientX,evt.clientY);			 
			 return;
		 }		 
	     mouseMove(evt);
	     dragNow=false;
	  }
	  
	  function mouseMove(evt)
	  {
	     evt.preventDefault();
	     if (!dragNow) return;
		 var xd=evt.clientX-dragStartX;
		 var yd=evt.clientY-dragStartY;
		 scene.rotation.x=dragStartRX+(yd/window.innerHeight)*3.14;		 
		 scene.rotation.y=dragStartRY+(xd/window.innerWidth)*3.14;		 
	  }
	
      function clickSelect(sx,sy)
	  {
	   
	    raycaster.setFromCamera( {x: sx/window.innerWidth*2-1, y: -sy/window.innerHeight*2+1 }, camera );
	    var results = raycaster.intersectObject( scene,true );
        if ( results.length > 0 ) { //seems we hit comeone
	      var hitEl=results[0].object.parent;
          clickFunction(hitEl);		 
        }		
	  }
		
	  document.addEventListener( 'mousemove', mouseMove, false );
      document.addEventListener( 'mousedown', mouseDown, false );
      document.addEventListener( 'mouseup', mouseUp, false );
}
