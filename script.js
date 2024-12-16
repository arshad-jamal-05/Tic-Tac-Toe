let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// players
let turn0 = true; //playerX, playerO

// win patterns
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// reset game
const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// player and turn to display text
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("button was clicked");
    if (turn0) {
      //playerO
      box.innerText = "O";
      box.style.color = "aqua";
      turn0 = false;
    } else {
      //playerX
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

// disable box 
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// enable box
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// show winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// game draw
const checkDraw = () => {
  msg.innerText = `Game is draw ! `;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  // check winner
  for (const pattern of winPattern) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
    // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      } 
      // else {
      //   checkDraw();
      // }
    }
  }

  // Check for a draw
  if (Array.from(boxes).every(box => box.innerText !== "")) {
    checkDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
