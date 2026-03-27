document.addEventListener("DOMContentLoaded", () => {

  fetch("../Header/Header.html")
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.text();
    })
    .then(data => {
      document.getElementById("header").innerHTML = data;
      
      // ✅ Yahan call karo — header load hone ke BAAD
      initHeaderBtn("getStartBtn", "getStartText", "Get Started");

      // Mobile menu events bhi yahan
      const openBtn = document.getElementById("openMenu");
      const closeBtn = document.getElementById("closeMenu");
      const mobileMenu = document.getElementById("mobileMenu");
      const overlay = document.getElementById("overlay");

      if (!openBtn) return;

      openBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
      });

      closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
      });

      overlay.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
      });

      window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });
    });

});

// =====================
// LETTER ANIMATION FUNCTION
// =====================
const LETTER_DURATION_H = 55;
const RISE_DURATION_H = 220;

function initHeaderBtn(btnId, containerId, text) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const btn = document.getElementById(btnId);
  if (!btn) return;

  container.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.classList.add("letter");
    span.textContent = char === " " ? "\u00A0" : char;
    container.appendChild(span);
  });

  const letters = Array.from(container.querySelectorAll(".letter"));
  let timeouts = [];
  let isHovered = false;

  function clearAllTimeouts() {
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];
  }

  function dropLetters() {
    letters.forEach(el => {
      el.style.transition = "none";
      el.style.transform = "translateY(-110%)";
      el.style.opacity = "0";
    });
    letters.forEach((el, i) => {
      const t = setTimeout(() => {
        if (!isHovered) return;
        el.style.transition = `transform ${LETTER_DURATION_H}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${LETTER_DURATION_H}ms ease`;
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }, i * LETTER_DURATION_H);
      timeouts.push(t);
    });
  }

  function riseLetters() {
    letters.forEach(el => {
      el.style.transition = "none";
      el.style.transform = "translateY(110%)";
      el.style.opacity = "0";
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        letters.forEach(el => {
          el.style.transition = `transform ${RISE_DURATION_H}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${RISE_DURATION_H}ms ease`;
          el.style.transform = "translateY(0)";
          el.style.opacity = "1";
        });
      });
    });
  }

  btn.addEventListener("mouseenter", () => {
    isHovered = true;
    clearAllTimeouts();
    dropLetters();
  });

  btn.addEventListener("mouseleave", () => {
    isHovered = false;
    clearAllTimeouts();
    riseLetters();
  });
}
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});