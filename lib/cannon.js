class Cannon {
  constructor(canvas) {
    // Cannon comes from random x value at start and finishes at random x value.
    this.startX = canvas.width * Math.random();
    this.startY = 0;
    let endX = canvas.width * Math.random();
    let endY = canvas.height;
    this.xdif = endX - this.startX;
    this.ydif = endY - this.startY;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.canvas = canvas;
    this.pos = {x: this.currentX, y: this.currentY};
    this.collided = false;
    this.hit = false;
  }

  isCollidedWith(missiles) {
    missiles.forEach( missile => {
      // debugger;
      if ((Math.pow(this.pos['x']-missile.pos['x'], 2)
      + Math.pow(this.pos['y'] - missile.pos['y'], 2) <= Math.pow(missile.shellRadius,2))) {
        this.collided = true;
        // debugger;
      }
    });
  }

  isHit() {
    if (this.pos['y'] >= this.canvas.height) {
      this.hit = true;
    }
  }

  update() {
    // debugger;
    this.currentX += this.xdif/450;
    this.currentY += this.ydif/450;
    this.pos = {x: this.currentX, y: this.currentY};
    this.isHit();
  }

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

  }
}


export default Cannon;
