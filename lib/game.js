

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');

  const ctx = canvas.getContext('2d');
  let shellRadius = 1;
  let shellMax = 100;
  var x = canvas.width/2;
  var y = canvas.height-100;
  var dr = 2;

  function draw(){
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
  setInterval(draw, 1);
});
