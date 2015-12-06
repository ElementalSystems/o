	
var r45d=3.14/4;
var r90d=3.14/2;
var r180d=3.14;


//create levels
var levelFactory={
 menu: function() {       
       addLevelIndicator('t0',0,-20,10,0,0,-r90d);
	   addLevelIndicator('t1',1,-15,8.5,15,0,-r45d);
	   addLevelIndicator('t2',2,0,7,20);
	   addLevelIndicator('t3',3,15,5.5,15,0,r45d);
	   addLevelIndicator('t4',4,20,4,0,0,r90d);
	   addLevelIndicator('t5',5,15,2.5,-15,0,r90d+r45d);
	   addLevelIndicator('t6',6,0,1,-20,0,r180d);
	   addLevelIndicator('t7',7,-15,-.5,-15,0,r180d+r45d);
	   addLevelIndicator('t8',8,-20,-2,0,0,-r90d);
	   addLevelIndicator('t9',9,-15,-3.5,15,0,-r45d);
	   addLevelIndicator('t10',10,0,-4,20);
	   addLevelIndicator('t11',11,15,-5.5,15,0,r45d);
	   addLevelIndicator('t12',12,20,-7,0,0,r90d);
	   addLevelIndicator('t13',13,15,-8.5,-15,0,r90d+r45d);
	   addLevelIndicator('t14',14,0,-10,-20,0,r180d);
	   addLevelIndicator('t15',15,-15,-11.5,-15,0,r180d+r45d);
	   addLevelIndicator('t16',16,-20,-13,0,0,-r90d);
	   addLevelIndicator('t17',17,-15,-14.5,15,0,-r45d);
	   addLevelIndicator('t18',18,0,-16,20);
	   addLevelIndicator('t19',19,15,-17.5,15,0,r45d);
	   addBox('b1',0,0,0);
	   //Animate scene to correct twist
	   var target=localStorage.getItem('levelNext');
	   callEachFrame(3500,function(r) {	   
	      puzzle.scene.rotation.x=inter(r,0,.4-r90d/32*target,siso);
          puzzle.scene.rotation.y=inter(r,r180d,r90d-r90d/2*(target%8),siso);
	   });

	    },
 0: function() {
       addTorus('t1',1,0,0,0)
	      .obit.failsOn(0,'n1',0,.1);
       addNail('n1',0,0,0,r90d);	  	
	    },
 1: function() {
       addTorus('t1',2,0,0,0)
	      .obit.failsOn(0,'b1',0,.15).failsOn(0,'b2',0,.15);
       addBoard('b1',0,-2,-4,r180d,r90d,0);
	   addBoard('b2',0,-2,+4,0,r90d,0);
	   
      }	 ,
 2: function() {
       addTorus('t1',3,0,0,0)
	      .obit.failsOn(0,'n1',0,.05);
       addNail('n1',0,0,0,r90d)
	      .obit.failsOn(0,'b1',0,.05)
		  .failsOn(0,'b2',0,.15)
		  .failsOn(0,'b3',0,.25)
		  .failsOn(1,'b1',0,.1)	  	
		  .failsOn(1,'b2',0,.1);		  
	   addBoard('b1',0,-2,-12,r180d,r90d,0);
	   addBoard('b2',0,-2,-16,0,r90d,0);
	   addBoard('b3',0,-2,-20,-r90d,0,r90d).obit
	      .failsOn(1,'n1',1,.8);
	   
      }	 ,
 3: function() {
       addTorus('t1',4,0,0,0)
	      .obit.failsOn(0,'n1',0,.05);
       addNail('n1',0,0,0,r90d)
	      .obit.failsOn(0,'b1',0,.1)
		  .failsOn(1,'b1',0,.1);	  	
	   addBoard('b1',0,-2,-15,r180d,r90d,0).obit
	      .failsOn(0,'n2',0,.03)
		  .failsOn(1,'n2',0,.3);
	   addNail('n2',0,10,-3,-r90d).obit
	      .failsOn(0,'b2',0,.28);
	   addBoard('b2',0,4,17,0,r90d,0).obit
	      .failsOn(1,'n2',1,.9);
		
      }	  ,
 4:function () {
	    addTorus('t1',5,0,0,0,r90d).obit
		   .failsOn(0,'nt',0,.1);
		addNail('nt',0,0,0).obit
		   .failsOn(0,'n1b',0,.1)
		   .failsOn(1,'n1b',0,.1)
		   .failsOn(0,'n2b',0,.1)
		   .failsOn(1,'n2b',0,.1)
		   .failsOn(0,'n3b',0,.1)
		   .failsOn(1,'n3b',0,.1)
		   .failsOn(0,'n4b',0,.1)
		   .failsOn(1,'n5b',0,.1);
		   
	    addNail('n1b',0,-7,9.5,r180d+r90d/2).obit
		   .failsOn(0,'n1t',0,.05)
		   .failsOn(1,'n1t',0,.05);
		addNail('n1t',0,10,9.5,r180d-r90d/2).obit; 
		
        addNail('n2b',0,-7,-9.5,r180d-r90d/2).obit
		   .failsOn(0,'n2t',0,.05)
		   .failsOn(1,'n2t',0,.05);
		addNail('n2t',0,10,-9.5,r180d+r90d/2).obit; 
		
        addNail('n3b',-9.5,-7,0,0,0,r180d+r90d/2).obit
		   .failsOn(0,'n3t',0,.05)
		   .failsOn(1,'n3t',0,.05);
		addNail('n3t',-9.5,10,0,0,0,r180d-r90d/2).obit; 
		
        addNail('n4b',9.5,-7,0,0,0,r180d-r90d/2).obit
		   .failsOn(0,'n4t',0,.05)
		   .failsOn(1,'n4t',0,.05);
		addNail('n4t',9.5,10,0,0,0,r180d+r90d/2).obit; 
		
        		
	   },

 5: function() {
       addTorus('t1',6,0,0,0)
	      .obit.failsOn(0,'n1',0,.05);
       addNail('n1',0,0,0,r90d).obit
	      .failsOn(0,'s1',0,0.025)	   
		  .failsOn(1,'s1',0,0.025);
       addSpanner('s1',0,-5,-15).obit
	      .failsOn(0,'n2',0,0.2);	  		   
	   addNail('n2',0,-10,-10,-r90d).obit
	      .failsOn(1,'s1',1,.65);	          
      },
 6: function() {
       addTorus('t1',7,0,0,0)
	      .obit.failsOn(0,'n1',0,.05);
       addNail('n1',0,0,8,r90d).obit
	      .failsOn(0,'s1',0,0.025)	   
		  .failsOn(0,'s2',0,0.3);		  
       addSpanner('s1',0,-5,-8).obit
	      .failsOn(0,'n2',0,0.2)
		  .failsOn(1,'n1',1,0.2);	  		   
	   addNail('n2',0,-10,-10,-r90d).obit
	      .failsOn(1,'s1',1,.35);	          
       addSpanner('s2',5,0,-15,0,0,3.14/2,0).obit
	      .failsOn(0,'n3',0,0.2)
		  .failsOn(1,'n1',1,0.2);	
	   addNail('n3',10,0,-8,r90d).obit
	      .failsOn(1,'s2',1,.35);	          
      },
 7: function() {
	   addTorus('t1',8,0,0,0)
	      .obit.failsOn(0,'b1',0,.15).failsOn(0,'b2',0,.15);
       addBoard('b1',0,0,-4,r180d,r90d,0).obit
	      .failsOn(0,'b3',0,0.05)
		  .failsOn(1,'b3',0,0.2);
	   addBoard('b2',0,0,+4,0,r90d,0).obit
	      .failsOn(0,'b4',0,0.05)
		  .failsOn(1,'b4',0,0.2);;
	   addBoard('b3',0,11,0,0,0,-r90d).obit
	     .failsOn(0,'b5',0,0.05)
		 .failsOn(1,'b5',0,0.1);
	   addBoard('b4',0,-11,0,0,0,r90d).obit
	     .failsOn(0,'b6',0,0.05)
		 .failsOn(1,'b6',0,0.1);
	   addBoard('b5',-11,3,0,r90d,0,0);
	   addBoard('b6',11,-3,0,r90d,0,0);	   
	
	},
	
   8: function () {
	   addTorus('t1',9,0,8,0,r90d)
	      .obit.failsOn(0,'n1',0,.05);
       addNail('nt',0,12,0).obit
	      .failsOn(0,'s1',0,.05)
		  .failsOn(0,'s2',0,.25)
		  .failsOn(0,'s3',0,.45)
		  .failsOn(0,'s4',0,.65)
		  .failsOn(1,'s1',0,.05);
		  
	   addSpanner('s1',0,-3,-5,r90d).obit
	           .failsOn(0,'n1',0,.2);
	   addNail('n1',0,-8,-10).obit
	      .failsOn(0,'n5',0,.1)
		  .failsOn(1,'n5',0,.1)
		  .failsOn(1,'s1',1,.5);
	   addSpanner('s2',0,-10,5,-r90d).obit
	      .failsOn(0,'n2',0,.2)
		  .failsOn(1,'nt',1,.2);
	   addNail('n2',0,-8,10).obit
	      .failsOn(0,'n5',0,.1)
		  .failsOn(1,'n5',0,.1)
		  .failsOn(1,'s2',1,.5);
	   addSpanner('s3',-5,-17,0,0,0,r90d).obit
	      .failsOn(0,'n3',0,.2)
		  .failsOn(1,'nt',1,.2);
	   addNail('n3',-10,-18,0,r180d).obit
	      .failsOn(0,'n6',0,.1)
		  .failsOn(1,'n6',0,.1)
		  .failsOn(1,'s3',1,.4);
	   addSpanner('s4',5,-23,0,0,0,-r90d).obit
	      .failsOn(0,'n4',0,.2)
		  .failsOn(1,'nt',1,.2);
	   addNail('n4',10,-18,0,r180d).obit
	      .failsOn(0,'n6',0,.1)
		  .failsOn(1,'n6',0,.1)
		  .failsOn(1,'s4',1,.5);
	   addNail('n5',0,-23,0,r90d).obit
	      .failsOn(0,'s4',1,.3);
	   addNail('n6',0,-3,0,0,0,r90d).obit
	      .failsOn(1,'s1',1,.3);
	   
	},
	9: function() {
       addTorus('t1',10,0,5,0,r90d)
	      .obit.failsOn(0,'n1',0,.05);
       addNail('n1',0,8,0).obit
	      .failsOn(0,'b1',0,0.025)	   		  	  
		  .failsOn(1,'b1',0,0.3);		  
       addBoard('b1',0,-5,0,0,3.14/2,3.14/2).obit
	      .failsOn(0,'n2',0,.05)
		  .failsOn(0,'n3',0,.05);
	   addNail('n2',6.5,0,-12).obit
	        .failsOn(0,'b3',0,.1)
			.failsOn(0,'b2',1,.1)
	        .failsOn(1,'b3',0,.1)
			.failsOn(1,'b2',1,.1);
	   addNail('n3',-6.5,0,-12).obit
	      .failsOn(0,'b2',0,.1)
		  .failsOn(1,'b2',0,.1);
	   addBoard('b2',-16,-14,-10,0,0,3.14/2).obit
	      .failsOn(0,'b3',0,.1);
	   addBoard('b3',6,-14,-10,0,0,3.14/2).obit
	      .failsOn(1,'b2',1,.1);
	   
      },
	
	10: function () {
	   addTorus('t1',11,0,0,0).obit
	     .failsOn(0,'nc',0,0.1)
		 .failsOn(0,'nt1',0,0.1)
		 .failsOn(0,'nt2',0,0.1)
		 .failsOn(0,'nb1',0,0.1)
		 .failsOn(0,'nb2',0,0.1);
	   addNail('nc',0,0,0,r90d).obit
	     .failsOn(0,'b1',0,0.2)
		 .failsOn(1,'b1',0,0.05);
	   addNail('nt1',0,3.5,3.5,0,0,r90d).obit
	     .failsOn(0,'s1',1,.05)
		 .failsOn(1,'s1',1,.05);
	   addNail('nt2',0,3.5,-3.5,0,0,-r90d).obit
	     .failsOn(0,'s2',1,.05)
		 .failsOn(1,'s2',1,.05);
	   addNail('nb1',0,-3.5,3.5,0,0,-r90d).obit
	     .failsOn(0,'s2',0,.05)
		 .failsOn(1,'s2',0,.05);;	   
	   addNail('nb2',0,-3.5,-3.5,0,0,r90d).obit
	     .failsOn(0,'s1',0,.05)
		 .failsOn(1,'s1',0,.05);
	   addSpanner('s1',15,0,0,r90d/2,0,0).obit;
	   addSpanner('s2',-15,0,0,-r90d/2,0,0).obit
	     .failsOn(0,'nl1',0,.2);;
	   addNail('nl1',-15,-7,0,r90d/2).obit
	     .failsOn(1,'s2',0,.8)
		 .failsOn(1,'s3',0,.4);	
	   addNail('nl2',-15,-16,-23,-r180d+r90d/2).obit
	     .failsOn(0,'s2',0,.4)
		 .failsOn(0,'s3',0,.05);
	   	   
	   addSpanner('s3',-15,-8,-8,-r90d/2,0,0).obit
	     .failsOn(0,'nl1',0,.2);
	   
	   addBoard('b1',0,-2,-17,r90d,0,-r90d).obit
	     .failsOn(0,'nl2',0,.1)
		 .failsOn(1,'nl2',0,.1);
		 
	},
	11: function () {
	   addTorus('t1',12,0,8,0,r90d)
	      .obit.failsOn(0,'nt',0,.05);
       addNail('nt',0,16,0).obit
	      .failsOn(0,'s1',0,.1)
		  .failsOn(0,'s2',0,.2);  
	   addSpanner('s1',0,0,-5,r90d).obit
	      .failsOn(0,'n1',0,.2)
		  .failsOn(1,'nt',1,.2);
	   addNail('n1',0,0,-10,r180d).obit
	      .failsOn(0,'n3',0,.05)
		  .failsOn(1,'n3',0,.05);  
	   addSpanner('s2',4.33,-7,-2.5,r90d,0,r180d/3).obit
	      .failsOn(0,'n2',0,.2)
		  .failsOn(1,'nt',1,.2);
	   addNail('n2',8.66,-7,-5,r180d).obit
	     .failsOn(0,'s3',0,.1)
	     .failsOn(0,'n3',1,.25);
	   addSpanner('s3',4.33,9,-7.5,r90d,0,-r180d/3).obit
	     .failsOn(0,'n1',0,.2);
	   addNail('n3',-8.66,14,-15,r90d,0,r180d*2/3).obit
	     .failsOn(0,'n2',1,.2);  
	   
    },
	12: function() {
	   addTorus('t1',13,0,0,0).obit
	      .failsOn(0,'l1',0,.1)
		  .failsOn(0,'l2',0,.1);		
	   addLock('l1',0,-8.250,0).obit	      
	   addLock('l2',0,8.25,0,0,0,3.14).obit
	      .failsOn(0,'b1',0,.2);	   
	   addBoard('b1',8,5,0).obit
		  .failsOn(1,'l2',1,.7);
	},
    13: function() {
	   addTorus('t1',14,0,0,0).obit
	      .failsOn(0,'l1',0,.1)
		  .failsOn(0,'l2',0,.1);		
	   addLock('l1',0,-8.250,0).obit
	      .failsOn(0,'s1',0,.1)
		  .failsOn(1,'s1',0,.1);
       addSpanner('s1',-13,-3,0,0,0,0).obit
	      .failsOn(0,'l3',0,.3);
	   addLock('l2',0,8.25,0,0,0,r180d).obit
	       .failsOn(0,'l4',0,.3);
	   addLock('l3',-13,2,8,0,r90d,-r90d).obit	      
       addLock('l4',5,15,0,0,0,r180d).obit
	      .failsOn(0,'l5',0,.3)
		  .failsOn(1,'l2',1,.5);;
	   addLock('l5',10,22,0,r180d).obit
	      .failsOn(1,'l4',1,.5);		 
	},

	
	14: function() {
	   addTorus('t1',15,0,13,0,r90d).obit
	      .failsOn(0,'nx1',0,.1)
		  .failsOn(0,'ny1',0,.1);
	   addBoard('b1',-25,5,0,0,0,r90d).obit
	      .failsOn(0,'b2',1,.1)
		  .failsOn(0,'b3',1,.1)
		  .failsOn(0,'b4',1,.1);
	   addBoard('b2',25,5,0,0,0,-r90d).obit
	      .failsOn(0,'b1',1,.1)
		  .failsOn(0,'b3',1,.1)
		  .failsOn(0,'b4',1,.1);
	   addBoard('b3',0,5,25,0,r90d,r90d).obit	   
	      .failsOn(0,'b2',1,.1)
		  .failsOn(0,'b1',1,.1)
		  .failsOn(0,'b4',1,.1);
	   addBoard('b4',0,5,-25,0,r90d,-r90d).obit
	      .failsOn(0,'b2',1,.1)
		  .failsOn(0,'b3',1,.1)
		  .failsOn(0,'b1',1,.1);
	   
	   addNail('nx1',0,10,0,0,0,-r90d).obit
	      .failsOn(0,'nv1',0,.4);
	   addNail('nv1',-25,20,0,0).obit
	      .failsOn(1,'nx1',1,.2)
		  .failsOn(0,'b1',0,.1)
		  .failsOn(1,'b1',0,.1)
		  .failsOn(0,'nx2',0,.4);
	   addNail('nx2',-15,-5,0,0,0,r90d).obit
	      .failsOn(1,'nv1',1,.8)
		  .failsOn(0,'nv2',0,.8);
	   addNail('nv2',25,-10,0,r180d).obit
	      .failsOn(1,'nx2',1,.4)
		  .failsOn(0,'b2',0,.1)
		  .failsOn(1,'b2',0,.1);
	   
	   addNail('ny1',0,16,0,r90d,0,0).obit
	      .failsOn(0,'nv3',0,.4);
	   addNail('nv3',0,20,-25,0).obit
	      .failsOn(1,'ny1',1,.4)
		  .failsOn(0,'b4',0,.1)
		  .failsOn(1,'b4',0,.1)
		  .failsOn(0,'ny2',0,.2);
	   
	   addNail('ny2',0,0,-20,-r90d,0,0).obit
	      .failsOn(1,'nv3',1,.8)
		  .failsOn(0,'nv4',0,.8);
	   
	   addNail('nv4',0,-10,20,r180d).obit
	      .failsOn(1,'ny2',1,.4)
		  .failsOn(0,'b3',0,.1)
		  .failsOn(1,'b3',0,.1);
	   
	   
	},
    15: function() {
	   addTorus('t1',16,18,18,18,0,r90d/2,0).obit
	     .failsOn(0,'n2',0,.1);
	   addLock('l1',0,-.5,0).obit
  	     .failsOn(0,'b1',0,.2);
	   addSpanner('s1',0,13,0,0,r90d/2).obit
	     .failsOn(0,'s2',1,.2)
		 .failsOn(0,'l1',0,.1)
	     .failsOn(0,'l1',0,.1); 
	   addBoard('b1',-8,-8,0,r180d).obit
	     .failsOn(0,'n2',1,.6)
		 .failsOn(1,'l1',1,.4);
	   addNail('n1',-18,18,-18,r90d,0,-r90d/2).obit
	     .failsOn(1,'n2',1,.4);
	   addNail('n2',15,18,15,r90d,0,-r90d/2).obit
	     .failsOn(0,'s1',0,.2)
	     .failsOn(0,'b1',1,.6)
	     .failsOn(0,'n1',0,.75);
	   
	},
   16: function() {
	   addTorus('t1',17,-4,5,4,r90d).obit
	      .failsOn(0,'b1',0,.05)
	      .failsOn(0,'l3',0,.1);	   
  	   addBoard('b1',-7,8,4,0,0,r90d).obit
	      .failsOn(0,'n1',0,.1)
		  .failsOn(1,'n1',0,.4);	   	   
	   addNail('n1',4,8,10,0,0,0).obit
	      .failsOn(0,'l2',0,.2);	   
	   
	   addLock('l2',4,-13,4,r90d).obit
	      .failsOn(0,'l1',1,.3)
	      .failsOn(0,'l3',1,.3)
		  .failsOn(1,'n1',1,.2);	   
	   
	   addBoard('b2',-7,-6,8,0,r90d,r90d).obit
	      .failsOn(0,'l1',0,.05)
		  .failsOn(1,'l1',0,.3);	   
	   
	   addLock('l1',-4,-13,-4,0,r90d,0).obit
	      .failsOn(0,'l2',1,.3)
	      .failsOn(0,'l3',1,.3);
		  
	   addLock('l3',-4,-20,4,0,r180d,-r90d).obit
	      .failsOn(0,'l1',1,.3)
	      .failsOn(0,'l2',1,.3)		  
	      .failsOn(0,'b2',0,.1);	   
  	   
	 
	},

	17: function () {
	   addTorus('t1',18,0,15,0).obit
	      .failsOn(0,'s1',0,.2)
		  .failsOn(0,'s2',0,.2);
	   addSpanner('s1',0,10,6).obit
	      .failsOn(0,'n1',0,.2)
		  .failsOn(0,'n3',0,.2)
		  .failsOn(0,'n7',1,.2);
	   addNail('n1',0,15,6,0,0,-r90d).obit
	      .failsOn(1,'s1',1,.5)
		  .failsOn(0,'b2',0,.15)
		  .failsOn(1,'b2',0,.05);
	   addSpanner('s2',0,10,-6).obit
	      .failsOn(0,'n2',0,.2)
		  .failsOn(0,'n3',0,.2);
		  
	   addNail('n2',0,15,-6,0,0,r90d).obit
	      .failsOn(1,'s2',1,.5)
		  .failsOn(0,'b1',0,.1)
		  .failsOn(1,'b1',0,.05);
	   addSpanner('s3',0,0,0,0,r90d,0).obit
	      .failsOn(0,'n3',0,.2)
		  .failsOn(0,'n4',0,.2)
		  .failsOn(0,'n7',1,.2);
	   addNail('n3',0,5,0,-r90d,0,0).obit
	      .failsOn(1,'s1',1,.3)
		  .failsOn(1,'s2',1,.7)
		  .failsOn(1,'s3',1,.5)
		  .failsOn(1,'n7',1,.5);
       addNail('n4',-5,-5,0,0,0,r90d).obit
	      .failsOn(1,'s3',1,.35)
		  .failsOn(0,'b3',0,.2)
		  .failsOn(0,'b1',1,.2)
		  .failsOn(1,'b2',1,.95);
	   addBoard('b1',15,17,0,0,0,0).obit
	      .failsOn(0,'b3',0,.1)
		  .failsOn(0,'n4',1,.35);
	   addBoard('b2',-17,17,0,0,0,0).obit
	      .failsOn(0,'n7',0,.05)
		  .failsOn(1,'n7',0,.4)
		  .failsOn(0,'n4',0,.4);
	   addBoard('b3',15,-2,0,0,0,0).obit
	      .failsOn(1,'b1',1,.1)
		  .failsOn(1,'n4',1,.65);
	   addNail('n5',0,-5,15,r90d,0,0).obit
	      .failsOn(0,'s3',0,.05)
		  .failsOn(1,'s3',0,.05)
		  .failsOn(1,'s4',1,.2)
		  .failsOn(1,'n7',1,.5);
       addSpanner('s4',2.5,-0.5,12,0,0,-r90d/3).obit
	      .failsOn(0,'n5',0,.2);
	   addNail('n6',5,4,-3,-r90d,0,0).obit
	      .failsOn(0,'s4',0,.05)
		  .failsOn(1,'s4',0,0.05);
       addNail('n7',-28,5,3,0,0,r90d).obit
	      .failsOn(0,'n3',0,.5)
		  .failsOn(0,'n5',0,.7)
		  .failsOn(0,'s3',1,.6)
		  .failsOn(0,'s1',1,.6);		 	          
	},
	18: function() {
	   addTorus('t1',19,12,23,7).obit
	     .failsOn(0,'lt',0,.1);
	   addLock('lt',12,14,7,0,0).obit
	     .failsOn(0,'st1',0,.3)
		 .failsOn(0,'nf',0,.1)
		 .failsOn(1,'nf',0,.1);
	   	   
	   addSpanner('st1',4,13,12,r90d).obit
	     .failsOn(1,'lt',1,.3)
		 .failsOn(0,'l4',0,.3);
	   
	   addSpanner('st2',-6,13,-4,0,0,-r90d).obit
	     .failsOn(0,'l3',0,.3)
	     .failsOn(1,'nf',1,.2);
	   addNail('nf',-1,13,17,r90d).obit
	      .failsOn(0,'st2',0,.25);
	   

	   addLock('l3',-11,5,-4,0,r180d).obit
	     .failsOn(0,'s1',0,.35)	 
		 .failsOn(0,'l1',0,.15)	 		 
	     .failsOn(1,'st2',1,.3);
	   
  	   addLock('l4',4,5,17,0,-r90d).obit
	     .failsOn(0,'s2',0,.1)
		 .failsOn(1,'s2',0,.1)
	     .failsOn(1,'st1',1,.2);
	   addLock('l1',-4,-13,-4,0,r90d).obit
	     .failsOn(0,'l2',1,.4)
	     .failsOn(1,'s1',1,.2);
	   addSpanner('s1',-4,0,-4,0,r90d).obit
	     .failsOn(1,'l3',1,.2)
		 .failsOn(0,'l1',0,.2);
	   addLock('l2',4,-13,4,0).obit
	     .failsOn(0,'l1',1,.4)
		 .failsOn(1,'s2',1,.1);
		 
  	   addSpanner('s2',4,0,4,0,0).obit
	     .failsOn(0,'l2',0,.3);
	   
	   
	   
	},
	19: function() {
	   addTorus('t1',0,0,-15,0,r90d).obit
	      .failsOn(0,'l1',0,.05)
	      .failsOn(0,'l2',0,.05)
		  .failsOn(0,'l3',0,.05);	   
  	  //forward facing locks 
	   addLock('l1',0,-15,-9,r90d).obit
	      .failsOn(0,'s1',0,.3);		    	   
	   addLock('l2',0,-15,9,-r90d).obit
	      .failsOn(0,'b3',1,.1)
	      .failsOn(1,'b3',1,.1)
	      .failsOn(0,'s2',0,.3);
		  
	   //the back lock
	   addLock('l3',9,-15,0,r90d,0,r90d).obit
	      .failsOn(0,'s3',0,.3);
		  
	    //pins in the front
		addNail('nf1',-11,-15,-5,-r90d).obit
		  .failsOn(0,'s2',0,.05)
		  .failsOn(1,'s2',0,.1);
	    addNail('nf2',-8,-15,5,-r90d).obit
		  .failsOn(0,'nf3',0,.05)
		  .failsOn(1,'nf3',0,.1)
		  .failsOn(1,'s2',1,.2);
	    addNail('nf3',3,-15,18,0,0,-r90d).obit
		  .failsOn(0,'b3',1,.2)		  
		  .failsOn(1,'nf1',1,.4);
	   //the four upright spanners -se is the offset one 
	   addSpanner('s1',-11,-10,-9).obit
	      .failsOn(0,'nf1',0,.2)
	      .failsOn(0,'n2',0,.2);		  
	   addSpanner('s2',-8,-10,9).obit
	      .failsOn(0,'nf2',0,.2)
	      .failsOn(0,'n1',0,.2);		  	   
	   addSpanner('s3',9,-10,-9,0,r90d).obit
	      .failsOn(0,'n3',0,.2);		  	   
	   addSpanner('se',9,-10,9).obit
	      .failsOn(0,'n1',0,.2);		  
	   
	   addNail('n1',0,-5,9,0,0,r90d).obit
	      .failsOn(0,'b2',0,.1)
	      .failsOn(1,'b2',0,.1)
	      .failsOn(1,'s2',1,.7)
          .failsOn(1,'se',1,.1);		  		  
	   addNail('n2',-6,-5,-9,0,0,r90d).obit
	      .failsOn(0,'s3',0,0.05)
	      .failsOn(1,'s3',0,0.05)
	      .failsOn(1,'s1',1,.5);
		 	   
		 
	   addNail('n3',9,-5,-9,-r90d).obit
	      .failsOn(0,'b1',0,.05)
	      .failsOn(1,'b1',0,.05)
	      .failsOn(0,'se',0,.1)		  
	      .failsOn(1,'s3',1,.5);		  
	   
	   //the board cube 
	   addBoard('b1',9,0,4,0,r90d,r180d).obit
	      .failsOn(0,'lt2',0,.3)
	      .failsOn(0,'bt',0,0.05)
		  .failsOn(1,'bt',0,0.3);
	   addBoard('b2',15,0,14,r180d).obit
	      .failsOn(0,'lt1',0,.1)
	      .failsOn(1,'lt1',0,.4)	      
	      .failsOn(0,'bt',0,0.05)
		  .failsOn(1,'bt',0,0.3);
	   addBoard('bt',10,12,10,0,0,-r90d).obit
	      .failsOn(0,'b3',0,0.5);
	   addBoard('b3',-15,12,15,0).obit
	     .failsOn(0,'nf3',1,.5)		  
	     .failsOn(1,'bt',1,0.7);
		 
	   addLock('lt1',8,15,10,0,0,-r90d).obit
	     .failsOn(0,'lt2',1,.5);
	      
	   addLock('lt2',3,21,10,-r90d,r180d,0).obit
	     .failsOn(0,'lt1',1,.5)
	     .failsOn(1,'b1',1,.8);
	      
	   
	   
	}

}


jukeBox.loadUp(['audio/t1.mp3','audio/t2.mp3','audio/t3.mp3','audio/t4.mp3','audio/t5.mp3','audio/t6.mp3','audio/t7.mp3','audio/t8.mp3','audio/t9.mp3','audio/t10.mp3','audio/t11.mp3','audio/t12.mp3','audio/t13.mp3']);
soundFX.add('fail','audio/fail.wav');
soundFX.add('slide','audio/slide.wav');
soundFX.add('nslide','audio/nslide.wav');
soundFX.add('ticks','audio/ticks.wav');
soundFX.add('win','audio/win.wav');
soundFX.add('lock','audio/lock.wav');
