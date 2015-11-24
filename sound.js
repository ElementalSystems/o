


function makeAudio(address)
{
   var audioElement = document.createElement('audio'); 
   audioElement.setAttribute('src', address); 
   audioElement.setAttribute('preload', true);    
   return audioElement;
}

var jukeBox={
   tracks: [],
   current: -1,
   volume: .5,
   loadUp: function (list) {
	   for (var i=0;i<list.length;i+=1)
		   this.tracks.push(makeAudio(list[i]));
   },
   next: function() {
	   var last=null;
	   if (this.current>=0) last=this.tracks[this.current];
	   this.current=(this.current+1)%this.tracks.length;
	   var current=this.tracks[this.current];
	   var maxVol=this.volume;
	   current.volume=0;
	   current.play();	   		   	   
	   callEachFrame(3000,function(r) {
		   current.volume=r*maxVol;
		   if (last) last.volume=(1-r)*maxVol;
	   }, function() {
		   current.volume=maxVol;	   		   
		   if (last) {
	         last.pause();
		     last.currentTime=0;	   
	       }
	   });
	   
   }		
}

var soundFX={
	tracks: {},
	add: function(name,src) {
		this.tracks[name]=makeAudio(src);
	},
	play: function(name,timeend) {
		var track=this.tracks[name];
		track.play();
		setTimeout(function() {
			track.pause();
			track.currentTime=0;
		},timeend);		
	}
}


