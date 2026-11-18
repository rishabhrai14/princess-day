const PASSWORD = "Pukku";
const gate = document.getElementById("gate");
const letter = document.getElementById("letter");
const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");
const passwordInput = document.getElementById("password");

function unlock() {
  sessionStorage.setItem("princessUnlocked", "1");
  gate.classList.add("leaving");
  setTimeout(() => {
    gate.hidden = true;
    letter.hidden = false;
    document.body.style.overflow = "";
    observeChapters();
  }, 480);
}

function observeChapters() {
  const nodes = document.querySelectorAll(".chapter, .closing");
  nodes.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  nodes.forEach((el) => io.observe(el));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = passwordInput.value.trim();
  if (value === PASSWORD) {
    errorEl.hidden = true;
    unlock();
  } else {
    errorEl.hidden = false;
    passwordInput.value = "";
    passwordInput.focus();
    gate.querySelector(".gate-card").animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 320 }
    );
  }
});

if (sessionStorage.getItem("princessUnlocked") === "1") {
  gate.hidden = true;
  letter.hidden = false;
  observeChapters();
} else {
  document.body.style.overflow = "hidden";
  passwordInput.focus();
}
