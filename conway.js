//requires class.js, djs.js

var conway = Class({
    djs: new djs(),
    
    init: function () {
        this.steps = 50;
        
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

        for(y=0;y<this.worldY;y++) {
            for(x=0;x<this.worldX;x++) {
              if(this.F[fr][y][x]==1) {
                this.createCell(x,y);
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

    iniArr: function () {
      for(y=0;y<this.worldY;y++) {
	this.M[y] = new Array(this.worldX);
	for(x=0;x<this.worldX;x++) {
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
      _arr_ret = new Array(this.worldY);
      for (y=0;y<this.worldY;y++) {
	_arr_ret[y] = new Array(this.worldX);
	for (x=0;x<this.worldX;x++) {
	  _arr_ret[y][x] = this.iterate(arr,y,x);
	}
      }

      return _arr_ret;
    },

    iterate: function (arr,y,x) {
        _M = arr;
        
        if(x==0 || y==0 || (x+1)==this.worldX || (y+1)==this.worldY) {
            if(y==0 && x==0) {
                _factor = _M[y][x+1]+_M[y+1][x+1]+_M[y+1][x];
            }
            else if((y+1)==this.worldY && (x+1)==this.worldX) {
                _factor = _M[y][x-1]+_M[y-1][x-1]+_M[y-1][x];
            }
            else if(x==0) {
                if((y+1)==this.worldY) {
                    _factor = _M[y-1][x]+_M[y-1][x+1]+_M[y][x+1];
                } else {
                    _factor = _M[y-1][x]+_M[y-1][x+1]+_M[y][x+1]+_M[y+1][x+1]+_M[y+1][x];
                }
            }
            else if(y==0) {
                if((x+1)==this.worldX) {
                    _factor = _M[y][x-1]+_M[y+1][x-1]+_M[y+1][x];
                } else {
                    _factor = _M[y][x-1]+_M[y+1][x-1]+_M[y+1][x]+_M[y+1][x+1]+_M[y][x+1];
                }
            }
            else if((x+1)==this.worldX) {
                _factor = _M[y-1][x]+_M[y-1][x-1]+_M[y][x-1]+_M[y+1][x-1]+_M[y+1][x];
            }
            else if((y+1)==this.worldY) {
                _fator = _M[y][x-1]+_M[y-1][x-1]+_M[y-1][x]+_M[y-1][x+1]+_M[y][x+1];
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
            else if (fator<=3) {
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