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
  }

  isCollidedWith(missiles) {
    missiles.forEach( missile => {
      // debugger;
      if ((Math.pow(this.pos['x']-missile.pos['x'], 2)
      + Math.pow(this.pos['y'] - missile.pos['y'], 2) <= Math.pow(missile.shellRadius,2))) {
        console.log('collision');
        this.collided = true;
        // debugger;
      }
    });
  }

  update() {
    this.currentX += this.xdif/100;
    this.currentY += this.ydif/100;
    this.pos = {x: this.currentX, y: this.currentY};
  }

  render(ctx) {
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);
    // Set endpoint to 1/100th of the distance to canvas height, to animate drawing of line.
    // ctx.lineTo(this.startrocketx+xdif/100, this.startrockety+ydif/100);
    ctx.stroke();
    // // if canvas height not reached, then increment both x and y
    // if (this.startrockety + ydif/100 < this.canvas.height) {
    //   this.startrockety += ydif/100;
    //   this.startrocketx += xdif/100;
    // }
  }
}


export default Cannon;
