const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var bird, birdAnimation
var canvas, angle, ground, cannon
var backgroundImg
var birds = []
var balls = []
var score = 0

function preload() {
  backgroundImg = loadImage("./assets/background.jpg");


}

function setup() {
  canvas = createCanvas(600,300);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  cannon = new Cannon(180, 110, 100, 50, angle);
  
}


function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();
  
}

showBirds();

   for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithBird(i);
  }

  cannon.display();
function collisionWithBirds(index) {
  for (var i = 0; i < birds.length; i++) {
    if (balls[index] !== undefined && birds[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, birds[i].body);

      if (collision.collided) {
        score+=5
          birds[i].remove(i);
        

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      waterSound.play()
      ball.remove(index);
      

    }
  }
}
function showBirds() {
  if (birds.length > 0) {
    if (
      birds.length < 4 &&
      birds[birds.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var bird = new Bird(
        width,
        height - 100,
        170,
        170,
        position,
        birdAnimation
      );

      birds.push(bird);
    }

    for (var i = 0; i < birds.length; i++) {
      Matter.Body.setVelocity(birds[i].body, {
        x: -0.9,
        y: 0
      });

      birds[i].display();
      birds[i].animate();
      var collision = Matter.SAT.collides(this.tower, birds[i].body);
      if (collision.collided && !birds[i].isHit) {
        var bird = new Bird(width, height - 60, 170, 170, -60, birdAnimation);
        birds.push(bird);
      }
    }
  } else {
    var bird = new Bird(width, height - 60, 170, 170, -60, birdAnimation);
    birds.push(bird);
  }
}

function keyReleased() {
  balls[balls.length - 1].shoot();
  }




