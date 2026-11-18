const PASSWORD = "pukku";
const gate = document.getElementById("gate");
const letter = document.getElementById("letter");
const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");
const passwordInput = document.getElementById("password");

function unlock() {
  try {
    sessionStorage.setItem("princessUnlocked", "1");
  } catch (_) {}
  gate.classList.add("leaving");
  window.setTimeout(() => {
    gate.hidden = true;
    gate.style.display = "none";
    letter.hidden = false;
    letter.removeAttribute("hidden");
    letter.style.display = "block";
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    observeChapters();
  }, 420);
}

function observeChapters() {
  const nodes = document.querySelectorAll(".chapter, .closing");
  nodes.forEach((el) => el.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  nodes.forEach((el) => io.observe(el));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = passwordInput.value.trim().toLowerCase();
  if (value === PASSWORD) {
    errorEl.hidden = true;
    unlock();
  } else {
    errorEl.hidden = false;
    passwordInput.value = "";
    passwordInput.focus();
    const card = gate.querySelector(".gate-card");
    if (card && card.animate) {
      card.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-8px)" },
          { transform: "translateX(8px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 320 }
      );
    }
  }
});

try {
  if (sessionStorage.getItem("princessUnlocked") === "1") {
    gate.hidden = true;
    gate.style.display = "none";
    letter.hidden = false;
    letter.removeAttribute("hidden");
    letter.style.display = "block";
    observeChapters();
  } else {
    document.body.style.overflow = "hidden";
    passwordInput.focus();
  }
} catch (_) {
  document.body.style.overflow = "hidden";
  passwordInput.focus();
}
