//PONG SIMULATOR - By Arnav Gupta
 
//Global Variables
const ballRadius = 10;
let x = 150
let y = cnv.height - 10;
let wallx = 2;
let wally = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = cnv.width / 2;
let rightIsPressed = false;
let leftIsPressed = false;
var score = 0;
let bricksBroken = 0;
let lives = 5;
let pause = true;
let brickRowCount = 8;
let brickColumnCount = 3;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickoffY = 30;
let brickoffX = 30;
let score2 = 0;
let levels = 1;
 
 
let brickNumber = document.getElementById("bricks2");
//Creating an array for the bricks
 
let bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
   bricks[i] = [];
   for (let r = 0; r < brickRowCount; r++) {
       bricks[i][r] = {
           x: 0,
           y: 0,
           status: 1
       };
   }
}
 
//Making the ball bounce off the bricks as well as removing them after being hit
 
function collisionDetection() {
   for (let i = 0; i < brickColumnCount; i++) {
       for (let r = 0; r < brickRowCount; r++) {
           var b = bricks[i][r];
           if (b.status == 1) { //Had to google status because with out it my code did not work
               if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                   wally = -wally;
                   b.status = 0;
                   score2++;
                  
                   bricksBroken++
                   if (score2 == 24) {
                       alert("you win with a normal score of " + score + "!");
                       // document.location.reload(); // Had to look up
                       // clearInterval(interval); // Had to look up
                      
                       levels++
                   
                   }
 
               }
           }
       }
   }
   brickNumber.innerHTML = bricksBroken
}
 
//Drawing the bricks
 
function drawBricks() {
   for (let i = 0; i < brickColumnCount; i++) {
       for (let r = 0; r < brickRowCount; r++) {
           if (bricks[i][r].status == 1) {
               let brickX = (i * (brickWidth + brickPadding)) + brickoffX;
               let brickY = (r * (brickHeight + brickPadding)) + brickoffY;
               bricks[i][r].x = brickX;
               bricks[i][r].y = brickY;
               ctx.beginPath();
               ctx.rect(brickX, brickY, brickWidth, brickHeight);
               ctx.fillStyle = "lightblue";
               ctx.fill();
               ctx.closePath();
 
           }
       }
   }
}
 
//Event listeners
 
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
 
let scoreNumber = document.getElementById("scoreTracker");
let livesNumber = document.getElementById("livesTracker");
 
//Draw ball
 
function drawBall() {
   ctx.beginPath();
   ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.closePath();
}
 
//Draw paddle
 
function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddleX, cnv.height - paddleHeight, paddleWidth, paddleHeight);
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath();
}
 
//When certain key is cliked do this
 
function keyDownHandler(event) {
   levels = 2 
   if (event.keyCode === 39) {
       rightIsPressed = true;
 
 
   } else if (event.keyCode === 37) {
       leftIsPressed = true;
 
 
 
   } else if (event.keyCode === 38) {
       lives++
 
   } else if (event.keyCode === 80 || event.keyCode === 27) {
       pause = !pause
 
   }
}
 
function keyUpHandler(event) {
   if (event.keyCode === 39) {
       rightIsPressed = false;
 
 
   } else if (event.keyCode === 37) {
       leftIsPressed = false;
 
   }
 
}
 
requestAnimationFrame(draw)
 
//Main draw function
 
function drawLevel1() {
   font('35px Arial')
   fill("black")
   text("Press Any Key To Start", 20, 150, "fill")
  
}
 
 
function drawLevel2() {
    //Clear the canvas every frame and run everything else
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    if (pause) {
        //If ball hits a X wall, bounce the other way
        if (x + wallx > cnv.width - ballRadius) {
            wallx = -wallx;
        } else if (x + wallx < 0) {
            wallx = -wallx;
        }
        //If ball hits the top, it bounces the other way, but if hits the bottom it goes straight through
        if (y + wally < ballRadius) {
            wally = -wally;
        } else if (y + wally > cnv.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                wally = -wally;
                score++
               
            } else {
                lives--; // Counting lives
                if (lives == 0) {
                    alert("Game Over, click reload to jump right back into the action, your score was " + score);
                    document.location.reload();
                    clearInterval(interval);
                } else { // If ball tries to hit the bottom, reset ball
                    x = 150
                    y = 10;
                    dx = 2;
                    dy = -2;
                    paddleX = cnv.width / 2;
                }
            }
            scoreNumber.innerHTML = score
            livesNumber.innerHTML = lives
        }
        // Move paddle right
        if (rightIsPressed) {
            paddleX += 5;
            if (paddleX + paddleWidth > cnv.width) {
                paddleX = cnv.width - paddleWidth;
            }
            // Move paddle left
        } else if (leftIsPressed) {
            paddleX -= 5;
            if (paddleX < 0) {
                paddleX = 0;
            }
        }
        x += wallx;
        y += wally;
        //Pause text
    } else if (pause == false) {
        font('45px Arial')
        fill("black")
        text("PAUSED", 125, 150, "fill")
       
    }
}
  
// function drawLevel3() {
    
//     drawLevel2();
    
    
// }
 
 
 
function drawLevel3() {
   font('40px Arial')
   fill("black")
   text("Congratz you win", 50, 150, "fill")
 
   font('16px Arial');
   fill("blue");
   text("Thanks for Playing", 0, 25, "fill");
 
   font('16px Arial');
   fill("red");
   text("Game Developed By Arnav", 195, 25, "fill");
 
   font('16px Arial');
   fill("green");
   text("For Mr.Veldkamp", 0, 290, "fill");
 
   font('16px Arial');
   fill("orange");
   text("Game tester Samuel Oke", 205 , 290, "fill");

   font('16px Arial')
   fill("black")
   text("Press any key to continue", 100, 250, "fill")
   
 
}
 
 
 
function draw() {
 
 
    if (levels == 1){
       drawLevel1()
   } else if(levels == 2) {
       drawLevel2()
//    } else if(levels == 3) {
//        drawLevel3()
   } else {
       drawLevel3()
   }
 
}
 
//Timer for elapsed time when paused
let timer = setInterval(countTimer, 1000);
let totalSeconds = 0;
 
function countTimer() { // Had to google most of this but had to do some problem solivng to make it work
   if (pause == false) {
       totalSeconds++;
       let hour = Math.floor(totalSeconds / 3600);
       let minute = Math.floor((totalSeconds - hour * 3600) / 60);
       let seconds = totalSeconds - (hour * 3600 + minute * 60);
       if (hour < 10)
           hour = "0" + hour;
       if (minute < 10)
           minute = "0" + minute;
       if (seconds < 10)
           seconds = "0" + seconds;
       document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
   }
 
}
 
let interval = setInterval(draw, 10);
 
//Timer for 30 seconds
function timedText() {
   let outputMessage = document.getElementById("Output")
   setInterval(function () {
       outputMessage.value = "15 seconds elapsed"
   }, 15000)
   setInterval(function () {
       outputMessage.value = "30 seconds elapsed", alert("Game over, 30 seconds timer, your score was " + score, document.location.reload(), clearInterval(interval))
   }, 30000)
 
}
 
//Easter Egg
document.getElementById("bug").addEventListener("click", bugtest);
 
triggerOnlyOnce = false
 
function bugtest() {
   score += 100
 
   if (!triggerOnlyOnce && score >= 420) {
 
       alert("YOU ARE A GOD YOU GOT A SCORE OF 420 AND YOU FOUND MY SECRET BUTTON!!")
       triggerOnlyOnce = true;
 
   }
}
 




