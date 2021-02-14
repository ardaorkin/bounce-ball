document.addEventListener("DOMContentLoaded", () => {
  const area = document.querySelector(".area");

  const ball = document.createElement("div");
  ball.classList.add("ball");
  area.appendChild(ball);

  const racket = document.createElement("div");
  racket.classList.add("racket");
  area.appendChild(racket);

  let areaWidth = 600;
  let areaHeight = 600;
  let ballHeight = 20;
  let racketHeight = 20;
  let racketWidth = 200;
  let ballTop = 0;
  let fallInterval;
  let riseInterval;
  let start = true;
  let racketLeft = 280;
  let ballLeft = 250;
  let turnLeft = false;

  let blockOrder = document.createElement("div");
  let blockOrderHeight = 10;
  blockOrderTop = 10;
  blockOrder.style.display = "flex";
  blockOrder.style.flexDirection = "row";
  blockOrder.style.width = areaWidth + "px";
  blockOrder.style.height = blockOrderHeight + "px";
  blockOrder.style.position = "fixed";
  blockOrder.style.top = blockOrderTop + "px";
  area.appendChild(blockOrder);

  let blocks = [];

  racket.style.left = racketLeft + "px";
  racket.style.width = racketWidth + "px";
  racket.style.height = racketHeight + "px";

  ball.style.left = ballLeft + "px";
  area.style.width = areaWidth + "px";
  area.style.height = areaHeight + "px";

  class BlockOrder {
    constructor() {
      this.height = 30;
      this.width = 30;
      this.top = 0;
      this.border = "1px solid black";
      this.borderRadius = 5;
      this.backgroundColor = "white";
      this.position = "relative";

      let blockCount = areaWidth / this.height;

      for (let index = 0; index < blockCount; index++) {
        const block = document.createElement("div");
        block.style.width = this.width + "px";
        block.style.height = this.height + "px";
        block.style.top = this.top + "px";
        block.style.backgroundColor = this.backgroundColor;
        block.style.position = this.position;
        block.style.left = index * this.width;
        block.style.border = this.border;
        block.style.borderRadius = this.borderRadius + "px";
        blockOrder.appendChild(block);
      }
    }
  }

  function createBlock() {
    let newOrder = new BlockOrder();
    blocks.push(newOrder);
    console.log(blocks);
  }

  function fall() {
    clearInterval(riseInterval);
    fallInterval = setInterval(function () {
      ballTop += 5;
      ball.style.top = ballTop + "px";
      turn();
      if (
        ballTop === areaHeight - (ballHeight + racketHeight) &&
        (ballLeft === racketLeft ||
          (ballLeft < racketLeft + racketWidth &&
            ballLeft > racketLeft - racketWidth))
      ) {
        rise();
      } else if (ballTop > areaHeight - ballHeight / 2) {
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

      if (ballTop === blockOrderHeight + blockOrderTop + blockOrderHeight / 2) {
        alert("Bing");
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
    if (racketLeft <= areaWidth - racketWidth && racketLeft > 0) {
      racketLeft -= 5;
      racket.style.left = racketLeft + "px";
    }
  }

  function moveRight() {
    if (racketLeft >= 0 && racketLeft < areaWidth - racketWidth) {
      racketLeft += 5;
      racket.style.left = racketLeft + "px";
    }
  }

  if (start) {
    createBlock();
    fall();
    document.addEventListener("keydown", controls);
  }
});
