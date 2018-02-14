class Missile {
  constructor() {
    this.startrocketx = 0;
    this.startrockety = 0;
    this.shellRadius = 30;
    this.shellMax = 100;
    this.dr = 1;


  }

  render(ctx) {
    var x = 400;
    var y = 700;
    // have to set a loop here somehow, otherwise it draws one point.
    console.log('missile render');
    ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
    ctx.arc(x,y,this.shellRadius,0,Math.PI*2, false);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    if (this.shellRadius + this.dr < this.shellMax) {
    } else if (this.shellRadius + this.dr >= this.shellMax) {
      this.dr = -this.dr;
    }
    this.shellRadius += this.dr;
  }
}

export default (new Missile);
