class Missile {
  constructor(position, canvas, ctx, shellMax = 50) {
    this.startrocketx = position['x'];
    this.startrockety = position['y'];
    this.shellRadius = 30;
    this.shellMax = shellMax;
    this.dr = 2;
    this.pos = {x: this.startrocketx, y: this.startrockety};
    this.collided = false;
    this.canvas = canvas;
    this.currentX = this.canvas.width/2;
    this.currentY = this.canvas.height;
    this.startX = this.canvas.width / 2;
    this.startY = this.canvas.height;
    this.xdif = this.startrocketx - this.startX;
    this.ydif = this.startrockety - this.startY;
    this.exploded;
    this.ctx = ctx;
  }

  update() {
    if (this.currentY > this.startrockety) {
      this.currentX += this.xdif/40;
      this.currentY += this.ydif/40;
    } else {
      this.exploded = true;
    }
    this.pos = {x: this.currentX, y: this.currentY};
  }

  render() {
    // have to set a loop here somehow, otherwise it draws one point.
    if (!this.exploded) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width/2, this.canvas.height);
      this.ctx.lineTo(this.currentX, this.currentY);
      this.ctx.strokeStyle = 'yellow';
      this.ctx.stroke();
      this.ctx.closePath();
    } else {
      this.renderCircle(this.ctx);
    }
  }

  renderCircle() {

    this.ctx.beginPath();
    this.ctx.arc(this.startrocketx,this.startrockety,this.shellRadius,0,Math.PI*2, false);
    this.ctx.strokeStyle = 'orange';
    this.ctx.stroke();
    this.ctx.closePath();
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
