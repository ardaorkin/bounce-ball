document.addEventListener("DOMContentLoaded", () => {
  const area = document.querySelector(".area");

  const ball = document.createElement("div");
  ball.classList.add("ball");
  area.appendChild(ball);

  const racket = document.createElement("div");
  racket.classList.add("racket");
  area.appendChild(racket);

  let ballTop = 0;
  let fallInterval;
  let riseInterval;
  let start = true;
  let racketLeft = 280;
  let ballLeft = 250;
  let turnLeft = false;
  racket.style.left = racketLeft + "px";
  ball.style.left = ballLeft + "px";

  function fall() {
    clearInterval(riseInterval);
    fallInterval = setInterval(function () {
      ballTop += 5;
      ball.style.top = ballTop + "px";
      turn();
      if (
        ballTop === 560 &&
        (ballLeft === racketLeft ||
          (ballLeft < racketLeft + 100 && ballLeft > racketLeft - 100))
      ) {
        rise();
      } else if (ballTop > 575) {
        gameOver();
      }
    }, 30);
  }

  function rise() {
    clearInterval(fallInterval);
    riseInterval = setInterval(function () {
      ballTop -= 5;
      ball.style.top = ballTop + "px";

      turn();

      if (ballTop === 0) {
        fall();
      }
    }, 30);
  }

  function turn() {
    if (ballLeft === 580) {
      turnLeft = true;
    } else if (ballLeft === 0) {
      turnLeft = false;
    }

    if (turnLeft) {
      ballLeft -= 5;
    } else {
      ballLeft += 5;
    }
    ball.style.left = ballLeft + "px";
  }

  function gameOver() {
    clearInterval(fallInterval);
    ball.remove();
    racket.remove();
    const result = document.createElement("div");
    area.appendChild(result);
    result.classList.add("result");
    result.innerHTML = "Game Over";
  }

  function controls(event) {
    if (event.key === "ArrowLeft") {
      moveLeft();
    } else if (event.key === "ArrowRight") {
      moveRight();
    }
  }

  function moveLeft() {
    if (racketLeft <= 500 && racketLeft > 0) {
      racketLeft -= 5;
      racket.style.left = racketLeft + "px";
    }
  }

  function moveRight() {
    if (racketLeft >= 0 && racketLeft < 500) {
      racketLeft += 5;
      racket.style.left = racketLeft + "px";
    }
  }

  if (start) {
    fall();
    document.addEventListener("keydown", controls);
  }
});
