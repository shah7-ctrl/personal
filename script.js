const greeting = document.getElementById("greeting");
const nameBlock = document.getElementById("nameBlock");
const nameSpan = document.getElementById("name");
const finalText = document.getElementById("finalText");
const petalsContainer = document.getElementById("petals");
const nextBtn = document.getElementById("nextBtn");

const sleep = ms => new Promise(res => setTimeout(res, ms));

/* ---------------- PETALS ---------------- */
function startPetals() {
  for (let i = 0; i < 35; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 7 + Math.random() * 5 + "s";
    p.style.animationDelay = Math.random() * 5 + "s";
    petalsContainer.appendChild(p);
  }
}
startPetals();

/* ---------------- BUTTON CONTROL ---------------- */
function showButton() {
  nextBtn.classList.add("show");
}

function hideButtonFast() {
  nextBtn.classList.remove("show");
  nextBtn.classList.add("fade-fast");
  setTimeout(() => nextBtn.classList.remove("fade-fast"), 400);
}

function waitForNext() {
  return new Promise(resolve => {
    showButton();
    nextBtn.onclick = () => {
      hideButtonFast();
      resolve();
    };
  });
}

/* ---------------- GREETINGS ---------------- */
async function greetingsSequence() {
  greeting.textContent = "Welcome to our website";
  greeting.style.opacity = "1";
  await sleep(1200);

  await waitForNext();

  greeting.style.opacity = "0";
  await sleep(1000);

  greeting.textContent = "I know who you are";
  greeting.style.opacity = "1";
  await sleep(1200);

  await waitForNext();

  greeting.style.opacity = "0";
  await sleep(1000);
}

/* ---------------- NAME TRANSFORMATION ---------------- */
async function transformName() {
  const original = "Shahroz";
  const target = "Shaista";

  nameSpan.innerHTML = "";

  [...original].forEach(letter => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = letter;
    nameSpan.appendChild(span);
  });

  await sleep(2200);

  const indices = [3, 4, 5, 6];

  for (const idx of indices) {
    const oldLetter = nameSpan.children[idx];
    oldLetter.classList.add("roll-out");
    await sleep(950);

    const newLetter = document.createElement("span");
    newLetter.className = "letter roll-in";
    newLetter.textContent = target[idx];
    nameSpan.replaceChild(newLetter, oldLetter);
    await sleep(1000);
  }

  await sleep(700);
  await waitForNext();

  /* Fade out */
  nameBlock.style.opacity = "0";
  await sleep(900);

  /* Soft heading change */
  const youAre = document.querySelector(".you-are");
  youAre.textContent = "And you are";
  youAre.classList.remove("soft-text");
  void youAre.offsetWidth;
  youAre.classList.add("soft-text");

  nameSpan.innerHTML = "";
  finalText.innerHTML = "";

  /* Fade back in */
  nameBlock.style.opacity = "1";

  /* LONGER emotional pause (clear difference) */
  await sleep(1800);

  /* Handwritten full name */
  const fullName = "Shaista Shahroz";

  for (const char of fullName) {
    const span = document.createElement("span");

    if (char === " ") {
      span.innerHTML = "&nbsp;";
      span.style.width = "0.25em"; // guaranteed reduced space
    } else {
      span.textContent = char;
    }

    span.className = "handwrite";
    finalText.appendChild(span);

    // slower, smoother, calm pacing
    await sleep(char === " " ? 320 : 220 + Math.random() * 70);
  }
}

/* ---------------- MASTER ---------------- */
async function startSequence() {
  await greetingsSequence();
  nameBlock.style.opacity = "1";
  await transformName();
}

startSequence();
