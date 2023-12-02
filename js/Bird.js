class Bird {
    constructor(x, y, width, height, birdPos, birdAnimation) {
     
      this.animation = birdAnimation;
      this.speed = 0.05;
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
      this.birdPosition = birdPos;
      this.isHit = false;
  
      World.add(world, this.body);
    }
    animate() {
      this.speed += 0.05;
    }
  
    remove(index) {
      this.animation = brokenBirdAnimation;
      this.speed = 0.05;
      this.width = 300;
      this.height = 300;
      this.isHit = true;
      setTimeout(() => {
        Matter.World.remove(world, birds[index].body);
        birds.splice(index, 1);
      }, 2000);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor(this.speed % this.animation.length);
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, this.birdPosition, this.width, this.height);
      noTint();
      pop();
    }
  }
  