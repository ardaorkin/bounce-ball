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
  let ballTop = 35;
  let fallInterval;
  let riseInterval;
  let start = true;
  let firstFall = true;
  let racketLeft = 200;
  let ballLeft = 250;
  let turnLeft = false;

  racket.style.left = racketLeft + "px";
  racket.style.width = racketWidth + "px";
  racket.style.height = racketHeight + "px";

  ball.style.left = ballLeft + "px";
  ball.style.top = 35 + "px";
  area.style.width = areaWidth + "px";
  area.style.height = areaHeight + "px";

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

  const counts = document.createElement("div");
  counts.style.marginTop = "30%";
  counts.style.marginLeft = "45%";
  counts.style.fontSize = 100 + "px";
  counts.style.fontWeight = "bolder";
  area.appendChild(counts);

  let blocks = [];

  let score = 0;

  class BlockOrder {
    constructor() {
      this.height = 30;
      this.width = 30;
      this.top = 0;
      this.border = "1px solid black";
      this.borderRadius = 5;

      this.position = "relative";

      let blockCount = areaWidth / this.height;

      for (let index = 0; index < blockCount; index++) {
        const block = document.createElement("div");
        block.style.width = this.width + "px";
        block.style.height = this.height + "px";
        block.style.top = this.top + "px";
        block.style.backgroundColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        block.style.position = this.position;
        block.style.border = this.border;
        block.style.borderRadius = this.borderRadius + "px";
        blocks.push(block);
        blockOrder.appendChild(block);
      }
    }
  }

  function createBlock() {
    let newOrder = new BlockOrder();
  }
  createBlock();

  function fall() {
    clearInterval(riseInterval);
    fallInterval = setInterval(function () {
      ballTop += 5;
      ball.style.top = ballTop + "px";
      turn();

      if (
        ballTop === areaHeight - (ballHeight + racketHeight) &&
        (ball.offsetLeft === racket.offsetLeft ||
          (ball.offsetLeft < racket.offsetLeft + racket.offsetWidth &&
            ball.offsetLeft > racket.offsetLeft))
      ) {
        rise();
      } else if (ballTop > areaHeight - ballHeight / 2) {
        gameOver();
      }
    }, 30);
  }

  function rise() {
    firstFall = false;
    clearInterval(fallInterval);
    riseInterval = setInterval(function () {
      ballTop -= 5;
      ball.style.top = ballTop + "px";

      turn();

      if (ballTop === 35) {
        fall();
      }
    }, 30);
  }

  function hit() {
    const blockArray = Array.from(blocks);

    setInterval(() => {
      blockArray.map((block) => {
        if (
          ballTop === 35 &&
          (ball.offsetLeft === block.offsetLeft ||
            (ball.offsetLeft < block.offsetLeft + block.offsetWidth &&
              ball.offsetLeft > block.offsetLeft))
        ) {
          block.style.visibility = "hidden";
          score += 10;
        }
      });
    }, 30);
  }

  function turn() {
    if (ballLeft === 580) {
      turnLeft = true;
    } else if (ballLeft === 0) {
      turnLeft = false;
    }
    if (!firstFall) {
      if (turnLeft) {
        ballLeft -= 5;
      } else {
        ballLeft += 5;
      }
    }
    ball.style.left = ballLeft + "px";
  }

  function gameOver() {
    clearInterval(fallInterval);
    ball.remove();
    racket.remove();
    blockOrder.remove();
    blocks.map((block) => block.remove());
    const result = document.createElement("div");
    area.appendChild(result);
    result.classList.add("result");
    result.style.paddingTop = "30%";
    result.style.fontSize = "25px";
    result.style.fontWeight = "bolder";
    result.style.textAlign = "center";
    result.innerHTML = "Score: " + score;
    result.style.display = "flex";
    result.style.flexDirection = "column";
    result.style.alignItems = "center";

    const retry = document.createElement("button");
    retry.classList.add("retry");
    retry.innerText = "Retry";

    retry.addEventListener("click", () => window.location.reload());
    result.appendChild(retry);
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

  function countDown() {
    counts.innerText = 1;
    for (let index = 2; index < 5; index++) {
      setTimeout(() => {
        if (index === 4) {
          counts.innerText = "GO!";
        } else {
          counts.innerHTML = index;
        }
      }, (index - 1) * (counts.innerText === "GO!" ? 1 : 1000));
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(counts.remove());
      }, 4000);
    });
  }

  async function startGame() {
    const gameWillStart = await countDown();

    fall();
    hit();

    document.addEventListener("keydown", controls);
  }

  if (start) {
    startGame();
  }
});
