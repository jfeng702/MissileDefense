# MissileDefense

Missile Defense is a game modeled after missile command, an Atari game. Defend your city against incoming missiles, or perish. In addition to the normal defensive missile mechanics, players will have the option of unleashing a missile barrage, which will shoot up a barrage of missiles that will clear the incoming missiles.

[Missile Defense](https://jfeng702.github.io/MissileDefense/)
![Start Screen](images/start.png)


## Technologies Used
+ Vanilla Javascript for overall structure
+ HTML Canvas for DOM manipulation
+ Web Audio API for sound effects

## Features
+ Incoming rockets that decrement lives upon contact with the ground.
![Gameplay](images/gameplay.gif)
+ Mouse feedback to shoot defensive missiles which will take out incoming missiles upon collision.
+ A missile barrage ability that will wipe out incoming missiles.
![Missile Barrage](images/special.gif)
+ Score counter based upon time spent in game.
+ Techno music soundtrack
+ Web Audio API sound effects. (Implemented 6/25/18)

## Challenges

One of the challenges I faced was determining how to determine collisions between an incoming missile and a defensive missile (an expanding circle). This was done by comparing the radius of the circle with the distance between the latest point of the incoming missile and the center of the circle. If the radius of the circle is greater than the distance between these two points, then there will be a collision.
```js
isCollidedWith(missiles) {
  missiles.forEach( missile => {
    if ((Math.pow(this.pos['x']-missile.pos['x'], 2)
    + Math.pow(this.pos['y'] - missile.pos['y'], 2) <= Math.pow(missile.shellRadius,2))) {
      this.collided = true;
    }
  });
}
```

Figuring out how to render a missile that starts out as a line and then "bursts" at a fixed point was done by keeping track of where the render line currently is at (currentX, currentY), versus the destination elevation (startrockety). Once the destination elevation is reached, this.exploded becomes true, which causes the render method to call renderCircle, which begins the rendering of the shell exploding.

```js
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
```
Another challenge was in drawing missiles that not only expand but also decrease in size after reaching a certain point, and then disappear from the canvas. This was done by setting a maximum radius value, shellMax, and comparing this value against the sum of dr (change in radius) and shellRadius. When dr and shellRadius is greater than shellMax, the value of dr is set to negative and the circle drawn begins to decrease until the sum of shellRadius and dr become negative, at which point the shellRadius is set to 0, thus disappearing from view.

```js
if (this.shellRadius + this.dr >= this.shellMax) {
  this.dr = -this.dr;
}
if (this.shellRadius + this.dr > 0) {
  this.shellRadius += this.dr;
} else {
  this.shellRadius = 0;
}
```

**Future Improvements**
+ S̶o̶u̶n̶d̶ ̶e̶f̶f̶e̶c̶t̶s̶ ̶f̶o̶r̶ ̶m̶i̶s̶s̶i̶l̶e̶ ̶l̶a̶u̶n̶c̶h̶e̶s̶ ̶a̶n̶d̶ ̶c̶o̶l̶l̶i̶s̶i̶o̶n̶s̶
+ A̶d̶d̶i̶t̶i̶o̶n̶a̶l̶ ̶w̶e̶a̶p̶o̶n̶s̶/̶a̶b̶i̶l̶i̶t̶i̶e̶s̶
