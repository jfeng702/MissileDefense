# MissileDefense

Missile Defense is a game modeled after missile command, an Atari game. Defend your city against incoming missiles, or perish. In addition to the normal defensive missile mechanics, players will have the option of unleashing a missile barrage, which will shoot up a barrage of missiles that will clear the incoming missiles.

[Missile Defense](https://jfeng702.github.io/MissileDefense/)
![Start Screen](images/start.png)

## Features

+ Incoming rockets that decrement lives upon contact with the ground.
![Gameplay](images/gameplay.gif)
+ Mouse feedback to shoot defensive missiles which will take out incoming missiles upon collision.
+ A missile barrage ability that will wipe out incoming missiles.
![Missile Barrage](images/special.gif)
+ Score counter based upon time spend in game.
+ Techno music soundtrack

## Challenges

One of the challenges I faced was determining how to determine a collision between an incoming missile and a defensive missile (an expanding circle). This was done by comparing the radius of the circle with the distance between the latest point of the incoming missile and the center of the circle. If the radius of the circle is greater than the distance between these two points, then there will be a collision.
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



## Technologies Used
+ Vanilla Javascript for overall structure
+ HTML Canvas for DOM manipulation

**Future Improvements**
+ Sound effects for missile launches and collisions
+ Additional weapons/abilities
