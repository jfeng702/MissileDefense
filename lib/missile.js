class Missile {
  constructor() {
    this.startrocketx = 0;
    this.startrockety = 0;


  }

  render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x,y,shellRadius,0,Math.PI*2, false);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    if (shellRadius + dr < shellMax) {
    } else if (shellRadius + dr >= shellMax) {
      dr = -dr;
    }

    shellRadius += dr;
  }
}

export default Missile;
