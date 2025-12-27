const greeting = document.getElementById("greeting");
const nameBlock = document.getElementById("nameBlock");
const nameSpan = document.getElementById("name");
const finalText = document.getElementById("finalText");
const petalsContainer = document.getElementById("petals");

const sleep = ms => new Promise(res => setTimeout(res, ms));

/* ---------------- PETALS (CONTINUOUS) ---------------- */
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

/* ---------------- GREETINGS ---------------- */
async function showGreeting(text) {
  greeting.textContent = text;
  greeting.style.opacity = "1";
  await sleep(1800);
  greeting.style.opacity = "0";
  await sleep(1000);
}

async function greetingsSequence() {
  await showGreeting("Welcome to our website");
  await showGreeting("I know who you are");
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

  /* Slow, perfect, sequential rolling */
  const indices = [3, 4, 5, 6];

  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const oldLetter = nameSpan.children[idx];

    oldLetter.classList.add("roll-out");
    await sleep(950);

    const newLetter = document.createElement("span");
    newLetter.className = "letter roll-in";
    newLetter.textContent = target[idx];

    nameSpan.replaceChild(newLetter, oldLetter);
    await sleep(1000);
  }

  /* FINAL: handwritten "and Shahroz" (FIXED) */
  await sleep(800);

  const text = "Shahroz";
  finalText.innerHTML = "";

  for (const char of text) {
    const span = document.createElement("span");
    if (char === " ") {
        span.innerHTML = "&nbsp;";
        span.style.width = "0.5em";
    } else {
        span.textContent = char;
    }
    span.className = "handwrite";
    finalText.appendChild(span);
    await sleep(180);
  }
}

/* ---------------- MASTER SEQUENCE ---------------- */
async function startSequence() {
  await greetingsSequence();
  nameBlock.style.opacity = "1";
  await transformName();
}

startSequence();
