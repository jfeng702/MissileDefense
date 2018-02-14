class Missile {
  constructor(position) {
    this.startrocketx = position['x'];
    this.startrockety = position['y'];
    this.shellRadius = 30;
    this.shellMax = 100;
    this.dr = 3;
    this.pos = {x: this.startrocketx, y: this.startrockety};
  }

  render(ctx) {
    // have to set a loop here somehow, otherwise it draws one point.
    ctx.beginPath();
    ctx.arc(this.startrocketx,this.startrockety,this.shellRadius,0,Math.PI*2, false);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    if (this.shellRadius + this.dr >= this.shellMax) {
      this.dr = -this.dr;
    }
    if (this.shellRadius + this.dr > 0) {
      this.shellRadius += this.dr;
    } else {
      this.shellRadius = 0;
    }
  }
}

export default Missile;
