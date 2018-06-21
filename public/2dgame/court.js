// Connect To Socket
var socket = io(); // console.log('Socket - ' + socket);

// Main Controller Code
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// var b = new Bump(PIXI); // collider extension

var b;

// create a texture from an image path
var defaultballTexture = PIXI.Texture.fromImage('ball-orange.png');
var pinkballTexture = PIXI.Texture.fromImage('ball-pink.png');
var mintballTexture = PIXI.Texture.fromImage('ball-mint.png');
var basketballTexture = PIXI.Texture.fromImage('ball-orange.png');
basketballTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
var backgroundTexture= PIXI.Texture.fromImage('graffiti-wall.jpg');
var hoopTexture = PIXI.Texture.fromImage('hoop.png');

// create Layer Groups - used for zordering
var backgroundGroup = new PIXI.display.Group(0, true);
var behindBasketGroup = new PIXI.display.Group(1,true);
var foregroundGroup = new PIXI.display.Group(2, true);

// Create a Stage with Sorting Enabled
app.stage = new PIXI.display.Stage();
app.stage.group.enableSort = true;

// Add Groups to Stage
app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
app.stage.addChild(new PIXI.display.Layer(behindBasketGroup));
app.stage.addChild(new PIXI.display.Layer(foregroundGroup));

// set up background
var background = new PIXI.Sprite(backgroundTexture);
background.anchor.set(0.5);
background.x = app.screen.width/2;
background.y = app.screen.height/2;
background.width = app.screen.width;
background.height = app.screen.height;
console.log('about to add background image');
app.stage.addChild(background);
console.log('background added');
//set up the text display styles
var textStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: "white"
});
var message = new PIXI.Text("Score - ", textStyle);
var clock = new PIXI.Text("Time - ", textStyle);
// add background elements to background group
background.parentGroup = backgroundGroup;
message.parentGroup = backgroundGroup;
clock.parentGroup = backgroundGroup;

// create Containers for objects
var balls = new PIXI.Container();
balls.parentGroup = foregroundGroup;

// set up Hoop with rim colliders
var hoop = new PIXI.Sprite(hoopTexture);
var rimleft = new PIXI.Sprite(basketballTexture);
var rimright = new PIXI.Sprite(basketballTexture);
var hoopY = 200;
var hoopX = app.screen.width/2;
rimleft.alpha = 0;
rimright.alpha = 0;
// add hoop and rim to foreground
hoop.parentGroup = foregroundGroup;
rimleft.parentGroup = foregroundGroup;
rimright.parentGroup = foregroundGroup;

// variables
var count = 30;
var countdownStarted = false;
// var thrown = false;
// var nottouching = true;
// var ballthrown = false;
// var ballpasthoop = false;
var scorechecked = false;

var myX1;
var myY1;
var myXspeed;
var myYspeed;

var xv = 0;
var yv = 0;
var fac = .8;
var friction = .6;
var gravity = 0.39;

var score = 0;

var hoopBounds;

var floor = app.screen.height;
var leftWall = 0;
var rightWall = app.screen.width;

// Init Functions
function initializeObjects() {
  socket.emit('query request');

  setupHoop(hoop,hoopX,hoopY,rimleft,rimright);
  setupScore(100,100);
  setupClock(500,100);

  app.stage.addChild(balls);
}

function setupHoop(thishoop,thishoopX, thishoopY, rleft, rright) {
  thishoop.anchor.set(0.5, 0); //set center as x,y coordinate
  thishoop.zOrder = 15;
  thishoop.x = thishoopX;
  thishoop.y = thishoopY;

  thishoop.width = 180; //was 120
  thishoop.height = 140;

  setupRim(thishoop,rimleft,'left');
  setupRim(thishoop,rimright,'right')

  console.log('about to add hoop');
  app.stage.addChild(thishoop);
  console.log('hoop added');
}
function setupRim(somehoop,somerim,side) {
  hoopBounds = somehoop.getBounds();

  somerim.circular = true;
  somerim.width = 20;
  somerim.height = 20;
  somerim.anchor.set(.5, .5);
  somerim.alpha = 0;

  somerim.y = hoopBounds.top + somerim.height/2;

  if (side == 'left') {
    somerim.x = hoopBounds.left + somerim.width/2;
  } else if (side == 'right') {
    somerim.x = hoopBounds.right - somerim.width/2;
  }
  console.log('about to add rim');
  app.stage.addChild(somerim);
  console.log('rim added');
}
function setupScore(x,y) {
  message.anchor.set(.5);
  message.position.set(x,y);

  console.log('about to add message');
  app.stage.addChild(message);
  console.log('message added');
}
function setupClock(x,y) {
  clock.anchor.set(.5);
  clock.position.set(x,y);

  console.log('about to add clock');
  app.stage.addChild(clock);
  console.log('clock added');
}


// Initialize Stage (drawing)
initializeObjects();
// Ticker (runs ever 1000ms)
app.ticker.add(function(delta) {

  // updateTimer();

  if(countdownStarted) {
    count -= app.ticker.elapsedMS / 1000;
    // update the text with a new string
    clock.text = "Time - " + Math.floor(count);
    if(count <= 0) {
      stopShooting();
    }
  }

  for (i in balls.children) {
    ball = balls.children[i];

    ball.yv += gravity;
    move(ball, ball.xv, ball.yv);

    ballbottom = getBounds(ball).bottom;
    hooptop = hoop.getBounds().top;

    if ( (ballbottom < hooptop) && (ball.thrown == true) ) {
      ball.pasthoop = true;
      ball.zOrder = 10;
      ball.parentGroup = behindBasketGroup;
      // collision detection on
    }
    if ( (ball.pasthoop == true) ) { //}&& (scorechecked = false) && (basketball.y > hoopY) ) {
      //is collision on?

      //fortesting
      // checkCollision(ball, rimleft);
      // checkCollision(ball, rimright);

      //
      // if (b.circleCollision(ball, rimleft, true, true)) {
      //   if (ball.x > (rimleft.x + rimleft.width/2)) {
      //     ball.xv += -(ball.xv*8);
      //   } else {
      //     ball.xv += (ball.xv*8);
      //   }
      //   ball.yv = -(ball.yv)*fac;
      // }
      // if (b.circleCollision(ball, rimright, true, true)) {
      //   if (ball.x < (rimright.x - rimright.width/2)) {
      //     ball.xv += -(ball.xv*8);
      //   } else {
      //     ball.xv += (ball.xv*8);
      //   }
      //   ball.yv = -(ball.yv)*fac;
      // }
      //When ball falls below hoop again after "past hoop" check score
      if ( (ball.y >= hoopY+20) && ball.scorechecked == false) {
        checkScore(ball);
      }
    }
    if ( (getBounds(ball).bottom >= floor) && (ball.yv > 0)) {
      // console.log('basketball floor');
      ball.yv = -(ball.yv)*fac;
      ball.y = floor - ball.radius;
      ball.xv = (ball.xv*friction);

      if ((ball.shouldremove) && (ball.nobounceyet)) {
        bounceOut(ball);
        ball.nobounceyet = false;
      } else {
        ball.shouldremove = true;
      }
    }
    if ( (getBounds(ball).left <= leftWall)) {
      // console.log('basketball lwall');
      ball.x = leftWall + ball.radius;
      ball.xv = -(ball.xv);
    } else if (getBounds(ball).right >= rightWall) {
      // console.log('basketball rwall');
      ball.x = rightWall - ball.radius;
      ball.xv = -(ball.xv);
    }
  }

});

// Basketball Methods
function createBasketball(x, y, userinfo) {
  var ballTexture;
  if (userinfo.color == 'pink') {
    ballTexture = pinkballTexture;
  } else if (userinfo.color == 'mint') {
    ballTexture = mintballTexture;
  } else {
    ballTexture = defaultballTexture;
  }
  var basketball = new PIXI.Sprite(ballTexture);
  console.log('--- New Ball ---' + basketball);

  basketball.owner = userinfo.username;
  basketball.color = userinfo.color;
  basketball.circular = true;

  basketball.parentGroup = foregroundGroup;
  basketball.anchor.set(0.5);
  basketball.scale.set(0.225);
  basketball.x = x;
  basketball.y = y;
  basketball.zOrder = 20;

  basketball.xv = 0;
  basketball.yv = 0;

  basketball.thrown = true;
  basketball.pasthoop = false;
  basketball.scorechecked = false;
  basketball.nottouching = true;

  basketball.shouldremove = false;
  basketball.nobounceyet = true;

  balls.addChild(basketball);

  return basketball;
}
function move(object,dx,dy) {
  object.x += dx;
  object.y += dy;
}
function throwBall(x1, y1, xSpeed, ySpeed, userinfo) {

  // create individual balls
  var newball = createBasketball(x1,y1, userinfo);
  console.log('-- Throw Ball --');
  console.dir(newball);

  newball.thrown = true;
  newball.pasthoop = false;
  newball.scorechecked = false;
  newball.nottouching = true;
  countdownStarted = true;

  console.log('x, y, xspd, yspd = ' + x1 +','+ y1 +',' + xSpeed + ',' + ySpeed);

  newball.x = x1;
  newball.y = 600;

  newball.xv = xSpeed/100;
  newball.yv = -(20);

}
function shotAttempt() {
  // console.log('Shot Thrown');
  /* data = {
  xval: basketball.x
}
*/
//socket.emit('shot attempt', data);

// resetBall();
}
function bounceOut(someball) {
  // console.log('bouncing out');
  TweenMax.to(someball, 5, {alpha:0, onComplete:removeBall, onCompleteParams:[ball, someball]});
}
function removeBall(balltoremove) {
  // console.log('remove ball - ' + balltoremove);
  balls.removeChild(balltoremove);
}

// Bounds and collider Info
function getBounds(someobject) {
  //only works for anchor .5 can be changed by pulling in anchor
  //should work for any anchor?
  var bottom = someobject.y + someobject.height*someobject.anchor.y;
  var top = someobject.y - someobject.height*someobject.anchor.y;
  var left = someobject.x - someobject.width*someobject.anchor.x;
  var right = someobject.x + someobject.width*someobject.anchor.x;

  // console.log('  Bounds ' + bottom);
  return {
    bottom: bottom,
    top: top,
    left: left,
    right: right
  };
}
function checkCollision(firstBall, secondBall) { //check if ball and rim are touching
  if (b.hitTestCircle(firstBall, secondBall)) {
    // console.log(' - Ball and rim are touching');
    touching(firstBall,secondBall);
    // nottouching = false;
  } else {
    firstBall.notouching = true;
  }
}
function touching(firstBall,secondBall) { // if touching
  // console.log('  Doing stuff while touching');

  //check for first collision
  if (b.circleCollision(firstBall, secondBall, false ) && (firstBall.nottouching)) {
    // console.log('  First touch');
    collisionPointX = ((firstBall.x * secondBall.radius) + (secondBall.x * firstBall.radius)) / (firstBall.radius + secondBall.radius);
    collisionPointY = ((firstBall.y * secondBall.radius) + (secondBall.y * firstBall.radius)) / (firstBall.radius + secondBall.radius);

    // console.log('  - Collision at: ' + collisionPointX + ',' + collisionPointY);
    // console.log('   -- Ball at: ' + firstBall.x + ',' + firstBall.y + " - radius: " + firstBall.radius );
    // console.log('   -- Rim  at: ' + secondBall.x + ',' + secondBall.y + " - radius: " + secondBall.radius);
    var newColX = collisionPointX - secondBall.x;
    var newColY = collisionPointY - secondBall.y;

    // console.log('  -NewCol point for calculation: ' + newColX + ',' + newColY);

    var dx = firstBall.xv;
    var dy = firstBall.yv;

    var ang = Math.atan(newColY / newColX );
    var vector1 = Math.sqrt( (dx*dx) + (dy*dy) );

    var newxv = Math.abs(vector1) * Math.cos(ang + 90);
    var newyv = Math.abs(vector1) * Math.sin(90 + ang);

    // console.log('newxv, newyv= ' + newxv + ',' + newyv);

    var newyv = (-1)*(Math.abs(newyv));

    firstBall.xv = newxv;
    firstBall.yv = newyv;

    if (collisionPointX > secondBall.x) {
      //always positive
      firstBall.xv = Math.abs(firstBall.xv);
    } else {
      //always negative
      firstBall.xv = Math.abs(firstBall.xv) * (-1);
    }

  } else {
    firstBall.nottouching = true;
  }
}

// Score and Timing
function checkScore(ball) {
  ball.thrown = false;
  ball.scorechecked = true;

  if ((ball.x > hoopBounds.left) && (ball.x < hoopBounds.right) && (countdownStarted)) {
    console.log('YOU SCOReD! - ' + score);
    updateScore();
  } else {
    console.log('Nope!');
  }
}
function updateScore() {
  score += 1;

  message.text = "Score - " + score;
}
function stopShooting() {
  clock.text = "DONE";
  countdownStarted = false;
  socket.emit('shooting finished', score);
}
function updateTimer() {
  time += 1;

  // clock.text = "Time - " + time;
}
function startShooting() {
  countdownStarted = true;
}

// Socket Listeners
socket.on('shooting started', function() {
  if (countdownStarted = false) {
    startShooting();
  }
});

socket.on('take shot', function(shotInfo) {
  myX1 = shotInfo.fromX;
  myY1 = 600;
  myXspeed = shotInfo.xSpeed;
  myYspeed = shotInfo.ySpeed;
  shotDeviceWidth = shotInfo.deviceWidth;
  shotDeviceHeight = shotInfo.deviceHeight;
  userinfo = {
    username: shotInfo.username,
    color: shotInfo.ballcolor
  };

  var centerx = app.screen.width/2;
  var shooterleftbounds = centerx - shotDeviceWidth/2;
  var shooterrightbounds = centerx + shotDeviceWidth/2;

  myX1 = (myX1 * shotDeviceWidth) + shooterleftbounds;
  myXspeed = myXspeed * shotDeviceWidth;
  myYspeed = myYspeed * app.screen.height;

  throwBall(myX1, myY1, myXspeed, myYspeed, userinfo);
});
socket.on('query', function(query) {
  socket.emit('join room', query);
});
