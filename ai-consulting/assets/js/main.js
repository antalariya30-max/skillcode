

document.querySelectorAll('.btn .text').forEach(text => {
  const letters = text.textContent.split('');
  text.innerHTML = letters.map((letter, index) =>
    `<span class="letter" style="animation-delay:${index * 0.06}s">
      ${letter === ' ' ? '&nbsp;' : letter}
    </span>`
  ).join('');
});



// =====================
// LETTER ANIMATION — reusable function
// =====================

const LETTER_DURATION = 55;
const RISE_DURATION = 220;

function initLetterAnimation(btnId, containerId, text) {
  const container = document.getElementById(containerId);

  // Build letter spans
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.classList.add("letter");
    span.textContent = char === " " ? "\u00A0" : char;
    container.appendChild(span);
  });

  const btn = document.getElementById(btnId);
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
        el.style.transition = `transform ${LETTER_DURATION}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${LETTER_DURATION}ms ease`;
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }, i * LETTER_DURATION);
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
          el.style.transition = `transform ${RISE_DURATION}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${RISE_DURATION}ms ease`;
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

// =====================
// INIT BOTH BUTTONS
// =====================
initLetterAnimation("primaryBtn", "primaryBtnText", "Get in touch");
initLetterAnimation("secondaryBtn", "btnText", "Explore the Project");




// =====================
// EXPLORE BUTTONS — sabhi ek saath
// =====================
function initAllExploreBtns() {
  const exploreBtns = document.querySelectorAll(".explore-btn");

  exploreBtns.forEach((btn) => {
    const container = btn.querySelector(".btn-text");
    if (!container) return;

    const text = container.dataset.text || "Explore more";
    container.innerHTML = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.textContent = char === " " ? "\u00A0" : char;
      container.appendChild(span);
    });

    const letters = Array.from(container.querySelectorAll(".letter"));
    const DURATION = 55;
    const RISE = 220;
    let timeouts = [];
    let isHovered = false;

    function clearAll() {
      timeouts.forEach(t => clearTimeout(t));
      timeouts = [];
    }

    function drop() {
      letters.forEach(el => {
        el.style.transition = "none";
        el.style.transform = "translateY(-110%)";
        el.style.opacity = "0";
      });
      letters.forEach((el, i) => {
        const t = setTimeout(() => {
          if (!isHovered) return;
          el.style.transition = `transform ${DURATION}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${DURATION}ms ease`;
          el.style.transform = "translateY(0)";
          el.style.opacity = "1";
        }, i * DURATION);
        timeouts.push(t);
      });
    }

    function rise() {
      letters.forEach(el => {
        el.style.transition = "none";
        el.style.transform = "translateY(110%)";
        el.style.opacity = "0";
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          letters.forEach(el => {
            el.style.transition = `transform ${RISE}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${RISE}ms ease`;
            el.style.transform = "translateY(0)";
            el.style.opacity = "1";
          });
        });
      });
    }

    btn.addEventListener("mouseenter", () => { isHovered = true; clearAll(); drop(); });
    btn.addEventListener("mouseleave", () => { isHovered = false; clearAll(); rise(); });
  });
}

// Call karo
initAllExploreBtns();


// document.querySelectorAll('.explore-btn .btn-text').forEach(text => {

//   const letters = text.textContent.trim().split('');

//   text.innerHTML = letters.map((letter, index) => {
//     return `<span class="letter" style="--delay:${index * 0.07}s">
//               ${letter === ' ' ? '&nbsp;' : letter}
//             </span>`;
//   }).join('');

// });
document.addEventListener("DOMContentLoaded", function () {
  // Header ko pehle se hidden rakho
  const headerEl = document.getElementById("header");
  headerEl.style.visibility = "hidden";

  fetch("../Header/Header.html")
    .then(response => response.text())
    .then(data => {
      headerEl.innerHTML = data;
      // Inject hone ke baad turant visible karo - koi animation nahi
      requestAnimationFrame(() => {
        headerEl.style.visibility = "visible";
      });
      initHeaderBtn("getStartBtn", "getStartText", "Get Started");
      document.dispatchEvent(new Event("headerLoaded"));
    })
    .catch(error => console.log("Header load error:", error));
});

function triggerButtonAnim() {
  const btns = document.getElementById('heroBtns');
  btns.classList.remove('do-anim');
  btns.classList.add('pre-anim');
  void btns.offsetWidth;
  setTimeout(() => { btns.classList.add('do-anim'); }, 30);
}

function wrapTitleWords() {
  document.querySelectorAll('.hero-title, .hero-highlight').forEach(el => {
    if (el.dataset.wrapped) return;
    el.dataset.wrapped = 'true';
    el.innerHTML = el.textContent.trim().split(' ')
      .map(w => `<span class="word-span">${w}</span>`).join(' ');
  });
}

function triggerWordZoom() {
  const spans = document.querySelectorAll('.hero-title .word-span, .hero-highlight .word-span');

  // Pehle sabko reset karo
  spans.forEach(s => {
    s.classList.remove('word-zoom');
    s.style.opacity = '0';
    s.style.transform = 'scale(0.55)';
  });

  // Phir ek frame baad animate karo
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      spans.forEach((s, i) => {
        setTimeout(() => {
          s.style.opacity = '';
          s.style.transform = '';
          s.classList.add('word-zoom');
        }, i * 55);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // Wrap karo but opacity touch mat karo
  wrapTitleWords();

  // Sirf button animation page load par
  window.addEventListener('load', () => setTimeout(triggerButtonAnim, 300));

  const heroSection = document.querySelector('.hero');
  let heroVisible = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !heroVisible) triggerWordZoom();
      heroVisible = entry.isIntersecting;
    });
  }, { threshold: 0.3 });

  observer.observe(heroSection);
});




document.addEventListener("DOMContentLoaded", () => {
  fetch('../other_pages/ch-hero.html')
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById('ch-hero-section');
      container.innerHTML = data;

      // 🔥 scripts manually run karna padega
      const scripts = container.querySelectorAll("script");

      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }

        document.body.appendChild(newScript); // 🔥 THIS LINE IS KEY
      });

    })
    .catch(err => console.error("Error loading ch-hero:", err));
});


document.addEventListener("DOMContentLoaded", function () {

  fetch("../other_pages/count.html")   // ✅ correct path
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(data => {

      document.getElementById("count").innerHTML = data;
      startCounter();


    })
    .catch(error => console.log("Count load error:", error));

});

// simple fade animation on scroll
const whyCards = document.querySelectorAll(".why-card");

window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.85;

  whyCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// initial state
whyCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.6s ease";
});

/* ===============================
   SCROLL ZOOM EFFECT
=================================*/

const zoomElements = document.querySelectorAll(".zoom-element");

const zoomObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.3
});

zoomElements.forEach(el => {
  zoomObserver.observe(el);
});
/* ===============================
   WHY CHOOSE US ZOOM SCROLL
=================================*/

const whySection = document.querySelector(".why-choose-wrapper");

const whyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      whySection.classList.add("zoom-active");
    } else {
      whySection.classList.remove("zoom-active"); // scroll up par zoom-out
    }
  });
}, {
  threshold: 0.2
});

whyObserver.observe(whySection);




const cards = document.querySelectorAll(".service-card");

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {

    cards.forEach(c => {
      c.classList.remove("active");
    });

    card.classList.add("active");

  });

  card.addEventListener("mouseleave", () => {

    card.classList.remove("active");

  });
});

const section = document.querySelector(".tools-section");
const glow = document.querySelector(".cursor-glow");
section.addEventListener("mousemove", (e) => {
  const rect = section.getBoundingClientRect();
  glow.style.left = e.clientX - rect.left + "px";
  glow.style.top = e.clientY - rect.top + "px";
});



const steps = document.querySelectorAll('.step-btn');
const pill = document.getElementById('activePill');
const container = document.getElementById('stepsContainer');

function movePill(btn) {
  const containerRect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  pill.style.left = (btnRect.left - containerRect.left) + 'px';
  pill.style.width = btnRect.width + 'px';
  pill.style.top = (btnRect.top - containerRect.top) + 'px';
  pill.style.height = btnRect.height + 'px';
}

// Page load pe pehle active button pe pill set karo
window.addEventListener('load', () => {
  const activeBtn = document.querySelector('.step-btn.active');
  if (activeBtn) movePill(activeBtn);
});

// Click pe slide karo
steps.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.step-btn.active').classList.remove('active');
    btn.classList.add('active');
    movePill(btn);

    // Cards active karo
    const step = btn.dataset.step;
    document.querySelectorAll('.ai-card').forEach(card => {
      card.classList.toggle('active', card.dataset.step === step);
    });
  });
});

// Yeh naya code add karo existing JS ke neeche
document.querySelectorAll('.ai-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const step = card.dataset.step;
    const matchingBtn = document.querySelector(`.step-btn[data-step="${step}"]`);

    // Purana active hatao
    document.querySelector('.step-btn.active').classList.remove('active');
    // Naya active karo
    matchingBtn.classList.add('active');
    // Pill slide karo
    movePill(matchingBtn);

    // Card bhi active karo
    document.querySelectorAll('.ai-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});


// /* CARD HOVER */

// aiCards.forEach((card, index) => {
//   card.addEventListener("mouseenter", () => {
//     activateStep(index);
//   });
// });
// /* BUTTON CLICK */

// stepButtons.forEach((btn, index) => {

//   btn.addEventListener("click", () => {
//     activateStep(index);
//   });
// });



const pjButtons = document.querySelectorAll(".pj-filter-btn");
const pjCards = document.querySelectorAll(".pj-card");

pjButtons.forEach(function (btn) {

  btn.addEventListener("click", function () {

    document.querySelector(".pj-filter-btn.active").classList.remove("active");

    btn.classList.add("active");

    let filterValue = btn.getAttribute("data-filter");

    pjCards.forEach(function (card) {

      let categories = card.getAttribute("data-category").split(" ");

      if (filterValue === "all" || categories.includes(filterValue)) {

        card.style.display = "block";
      }
      else {
        card.style.display = "none";
      }
    });
  });
});
// water rippel

// $(document).ready(function(){

// $('.ripple').ripples({
// resolution:256,
// dropRadius:20,
// perturbance:0.04
// });

// });


$(document).ready(function () {

  $(".blog-image").each(function () {

    let img = $(this).find("img").attr("src");
    $(this).css("background-image", "url(" + img + ")");

  });

  $(".ripple").ripples({
    resolution: 256,
    dropRadius: 5,     // ripple size kam
    perturbance: 0.01   // water movement kam
  });

});



const testimonialContainer = document.querySelector(".testi-wrapper");
const testimonialItems = document.querySelectorAll(".testi-card");

testimonialItems.forEach(item => {

  let startX = 0;
  let moveX = 0;
  let dragging = false;

  item.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
    item.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {

    if (!dragging) return;

    moveX = e.clientX - startX;

    item.style.transform =
      `translateX(${moveX}px) rotate(${moveX / 25}deg)`;

  });

  window.addEventListener("mouseup", () => {

    if (!dragging) return;

    dragging = false;

    item.style.transition = "transform .45s cubic-bezier(.22,.61,.36,1)";
    if (moveX < -120) {
      item.style.transform = "translateX(-120px) rotate(-8deg) scale(.96)";
      sendToBack(item);

    }

    else if (moveX > 120) {
      item.style.transform = "translateX(120px) rotate(8deg) scale(.96)";
      sendToBack(item);

    }

    else {

      item.style.transform = "translateX(0) rotate(0)";

    }

    moveX = 0;

  });

});
function updateStack() {
  const cards = document.querySelectorAll(".testi-card");

  cards.forEach((card, index) => {
    card.classList.remove("active", "middle", "last");

    if (index === 0) card.classList.add("active");
    else if (index === 1) card.classList.add("middle");
    else card.classList.add("last");
  });
}
function sendToBack(item) {

  item.addEventListener("transitionend", function handler() {

    item.removeEventListener("transitionend", handler);

    // 👇 temporarily invisible for smooth swap
    item.style.opacity = "0";

    setTimeout(() => {

      testimonialContainer.appendChild(item);

      // reset before animation
      item.style.transition = "none";
      item.style.transform = "translateX(40px) rotate(6deg) scale(.94)";

      updateStack();

      requestAnimationFrame(() => {
        item.style.transition = "all .45s cubic-bezier(.22,.61,.36,1)";
        item.style.opacity = "1";
      });

    }, 120);

  });

}




document.addEventListener("DOMContentLoaded", () => {

  const iconGroups = document.querySelectorAll(".icon-group");

  iconGroups.forEach(group => {

    const pathId = group.dataset.path;
    const duration = parseInt(group.dataset.duration);

    const path = document.getElementById(pathId);

    if (!path) return;

    const length = path.getTotalLength();

    let start = null;

    function animate(time) {

      if (!start) start = time;

      const progress = ((time - start) % duration) / duration;

      const point = path.getPointAtLength(progress * length);

      group.setAttribute(
        "transform",
        `translate(${point.x}, ${point.y})`
      );

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

  });

});



/* zoom animation */

const blogLeft = document.getElementById("blogLeft");

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) blogLeft.classList.add("zoom-in");
}, { threshold: 0.3 });

observer.observe(blogLeft);




const buttons = document.querySelectorAll(".cta-btn");

buttons.forEach(btn => {

  const text = btn.querySelector(".cta-text");
  const letters = btn.querySelectorAll(".cta-letter");

  btn.addEventListener("mouseenter", () => {

    const tl = gsap.timeline();

    // STEP 1: letters drop from top
    tl.fromTo(letters,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.03,
        ease: "power2.out"
      }
    )

  });

  btn.addEventListener("mouseleave", () => {

    gsap.fromTo(text,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
    );

  });

});



// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity = '1';
});

// Hover elements par glow
const hoverTargets = document.querySelectorAll('a, button, .btn, .service-card, .pj-card, .ai-card, .testi-card, input, textarea');

hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovered'));
});