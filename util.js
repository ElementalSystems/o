//general utility code

  function setElementClass(e,cls)
  {
	  if (!e.classList.contains(cls))
		  e.classList.add(cls);
  }
  
  function unsetElementClass(e,cls)
  {
	  if (e.classList.contains(cls))
		  e.classList.remove(cls);
  }
  
//a general animation or slow effect utility
function callEachFrame(time,each,end)
{
	var startTime=0;
	var endTime=0;
	function func(t) {
		if (!startTime) {
			startTime=t;
			endTime=t+time;			
		}
		var r=(t-startTime)/(time);
		if (r<0) r=0;
		if (r>1) r=1;
		each(r);
		if (r<1)
			window.requestAnimationFrame(func);
		else {
			if (end) end();			
		}
	};	
	//call it the first time
	window.requestAnimationFrame(func);		
}

function siso(r) { return 3*r*r-2*r*r*r;}
function so(r) { return 2*r-r*r;}
function si(r) { return r*r;}

function inter(r,st,end,func)
{
	if (r<0) r=0;
	if (r>1) r=1;	
	if (func) r=func(r);
	return (r*end)+((1-r)*st);
}

function tickCount()
{
	  return new Date().getTime();
}

function setMaterialIndex(geo,index)
{
	for (var i=0;i<geo.faces.length;i+=1)
		geo.faces[i].materialIndex=index;
}