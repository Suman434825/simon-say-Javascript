
let gameSeq = [];        
let userIndex = 0;         
let acceptingInput = false;
let started = false;

const colors = ["red", "yellow", "green", "purple"];
const h2 = document.querySelector("h2");
const buttons = {
  red: document.getElementById("red"),
  yellow: document.getElementById("yellow"),
  green: document.getElementById("green"),
  purple: document.getElementById("purple"),
};


document.addEventListener("keydown", () => {
  if (started) return;
  started = true;
  gameSeq = [];
  userIndex = 0;
  nextLevel();
});


function flash(btnEl) {
  btnEl.classList.add("flash");
  setTimeout(() => btnEl.classList.remove("flash"), 250);
}

function userFlash(btnEl) {
  btnEl.classList.add("userflash");
  setTimeout(() => btnEl.classList.remove("userflash"), 180);
}

function playSequence() {
  acceptingInput = false;
  userIndex = 0;

  let i = 0;
  const timer = setInterval(() => {
    const c = gameSeq[i];
    flash(buttons[c]);
    i++;
    if (i >= gameSeq.length) {
      clearInterval(timer);
     
      setTimeout(() => (acceptingInput = true), 200);
    }
  }, 600);
}

function nextLevel() {
 
  const next = colors[Math.floor(Math.random() * colors.length)];
  gameSeq.push(next);

  h2.textContent = `Level ${gameSeq.length}`;

 
  setTimeout(playSequence, 400);
}

function gameOver() {
  acceptingInput = false;
  const score = Math.max(0, gameSeq.length - 1);
  h2.innerHTML = `Game Over! Your score was <b>${score}</b><br>Press any key to restart`;
  document.body.style.backgroundColor = "red";
  setTimeout(() => (document.body.style.backgroundColor = "white"), 200);
  started = false;
  gameSeq = [];
  userIndex = 0;
}


function onButtonClick() {
  if (!acceptingInput) return;            
  const color = this.id;

  userFlash(this);

 
  if (color !== gameSeq[userIndex]) {
    gameOver();
    return;
  }

  userIndex++;


  if (userIndex === gameSeq.length) {
    acceptingInput = false;
    setTimeout(nextLevel, 700);
  }
}

Object.values(buttons).forEach((btn) => btn.addEventListener("click", onButtonClick));
