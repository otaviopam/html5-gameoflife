//requires class.js, djs.js

var conway = Class({
    init: function (cv) {
        console.debug("Init com cv = "+cv);
        this.steps = 50;
        this.djs = new djs(cv);
        this.F = new Array(this.steps);
        this.M = new Array(this.djs.worldY);
        this.setupValues();
        this.djs.createGrid();
        this.initArray();
        this.step();
        this.drawFrame(0);
        
    },
    
    setupValues: function () {
        this.djs.worldX = document.getElementById('txt_worldX').value;
        this.djs.worldY = document.getElementById('txt_worldY').value;
        this.steps = document.getElementById('txt_steps').value;
        document.getElementById('lblsteps').innerHTML = this.steps-1;
        document.getElementById('lblcurrentFrame').innerHTML = "0";
        this.currentFrame = 0;
        this.djs.intervalX = this.djs.cvX / this.djs.worldX;
        this.djs.intervalY = this.djs.cvY / this.djs.worldY;
     
    },
    
    drawFrame: function(fr) {
//      this.ct.clearRect(0,0,this.cvx,this.cvy); //Limpa o canvas
        this.djs.createGrid(); //Redraw the grid

        for(y=0;y<this.djs.worldY;y++) {
            for(x=0;x<this.djs.worldX;x++) {
              if(this.F[fr][y][x]==1) {
                this.djs.createCell(x,y);
              }
            }
        }
    },

    browseFrame: function(op) {
	switch(op) {
	  case 0: //Previous frame 
	    if(this.currentFrame>0) {
	      this.currentFrame-=1;
	      this.drawFrame(this.currentFrame);
	    }
	    break;
	  case 1: //Posterior frame
	    if(this.currentFrame<this.steps-1) {
	      this.currentFrame+=1;
	      this.drawFrame(this.currentFrame);
	    }
	    break;
	  case 2: //First frame
	    this.currentFrame = 0;
	    this.drawFrame(0);
	    break;
	    
	  case 3: //Last frame
	    this.currentFrame = this.steps-1;
	    this.currentFrame(this.steps-1);
	    break;
	}
    },

    initArray: function () {
      for(y=0;y<this.djs.worldY;y++) {
	this.M[y] = new Array(this.djs.worldX);
	for(x=0;x<this.djs.worldX;x++) {
	  this.M[y][x] = Math.round(Math.random());
	}
      }
      
      this.F[0] = this.M;
	
    },

    step: function () {
      for(_fr=1;_fr<this.steps;_fr++) {
	this.F[_fr] = this.transformArray(this.F[_fr-1]); //Send array to "transform"
      }
    },

    transformArray: function (arr) {
      _arr_ret = new Array(this.djs.worldY);
      for (y=0;y<this.djs.worldY;y++) {
	_arr_ret[y] = new Array(this.djs.worldX);
	for (x=0;x<this.djs.worldX;x++) {
	  _arr_ret[y][x] = this.iterate(arr,y,x);
	}
      }

      return _arr_ret;
    },

    iterate: function (arr,y,x) {
        _M = arr;
        
        if(x==0 || y==0 || (x+1)==this.djs.worldX || (y+1)==this.djs.worldY) {
            if(y==0 && x==0) {
                _factor = _M[y][x+1]+_M[y+1][x+1]+_M[y+1][x];
            }
            else if((y+1)==this.djs.worldY && (x+1)==this.djs.worldX) {
                _factor = _M[y][x-1]+_M[y-1][x-1]+_M[y-1][x];
            }
            else if(x==0) {
                if((y+1)==this.djs.worldY) {
                    _factor = _M[y-1][x]+_M[y-1][x+1]+_M[y][x+1];
                } else {
                    _factor = _M[y-1][x]+_M[y-1][x+1]+_M[y][x+1]+_M[y+1][x+1]+_M[y+1][x];
                }
            }
            else if(y==0) {
                if((x+1)==this.djs.worldX) {
                    _factor = _M[y][x-1]+_M[y+1][x-1]+_M[y+1][x];
                } else {
                    _factor = _M[y][x-1]+_M[y+1][x-1]+_M[y+1][x]+_M[y+1][x+1]+_M[y][x+1];
                }
            }
            else if((x+1)==this.djs.worldX) {
                _factor = _M[y-1][x]+_M[y-1][x-1]+_M[y][x-1]+_M[y+1][x-1]+_M[y+1][x];
            }
            else if((y+1)==this.djs.worldY) {
                _factor = _M[y][x-1]+_M[y-1][x-1]+_M[y-1][x]+_M[y-1][x+1]+_M[y][x+1];
            } else {
                _factor = 50;
            }

        } else {
            _factor = _M[y-1][x-1]+_M[y-1][x]+_M[y-1][x+1]+_M[y][x+1]+_M[y+1][x+1]+_M[y+1][x]+_M[y+1][x-1]+_M[y][x-1];
        }
      
        if(_M[y][x]==1) {
            if (_factor<2) {
                _destination = 0;
            }
            else if (_factor<=3) {
                _destination = 1;
            } else {
                _destination = 0;
            }
        }
      
        if (_M[y][x]==0) {
            if(_factor==3) {
                _destination = 1;
            } else {
                _destination = 0;
            }
        }
        return _destination;
    }

}); 