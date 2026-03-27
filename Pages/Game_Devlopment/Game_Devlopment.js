// ================= TABS =================
document.addEventListener("DOMContentLoaded", () => {
  fetch("../../Header/Header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      initHeaderBtn("getStartBtn", "getStartText", "Get Started");
    })
    .catch(err => console.error("Header load error:", err));
  initHeaderBtn("getStartBtn", "getStartText", "Get Started");
});


function loadFooter() {
  fetch("../../footer/footer.html")
    .then(res => res.text())
    .then(data => {
      const footerEl = document.getElementById("footer");
      if (footerEl) {
        footerEl.innerHTML = data;
      }
    })
    .catch(err => console.error("Footer load error:", err));
}

// ✅ first load
loadFooter();

// ✅ jab page dubara show ho (back / navigation)
window.addEventListener("pageshow", () => {
  loadFooter();
});
// ================= TABS =================

const techData = {
  platforms: [
    { name: "iOS", logo: "https://cdn-icons-png.flaticon.com/512/731/731985.png" },
    { name: "Android", logo: "https://cdn-icons-png.flaticon.com/512/888/888839.png" },
    { name: "Windows", logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png" },
    { name: "macOS", logo: "https://cdn-icons-png.flaticon.com/512/2/2235.png" },
    { name: "PlayStation", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968874.png" },
    { name: "Xbox", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968922.png" },
  ],
  network: [
    { name: "Photon", logo: "https://cdn-icons-png.flaticon.com/512/906/906175.png" },
    { name: "Firebase", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png" },
    { name: "AWS GameLift", logo: "https://cdn-icons-png.flaticon.com/512/873/873120.png" },
    { name: "Socket.io", logo: "https://cdn-icons-png.flaticon.com/512/919/919825.png" },
    { name: "WebSockets", logo: "https://cdn-icons-png.flaticon.com/512/919/919851.png" },
  ],
  engines: [
    { name: "Unity", logo: "https://cdn-icons-png.flaticon.com/512/5969/5969346.png" },
    { name: "Unreal Engine", logo: "https://cdn-icons-png.flaticon.com/512/5969/5969303.png" },
  ],
};

const container = document.getElementById("techContainer");
const buttons = document.querySelectorAll(".gameTechTabs button");

function loadTech(tab) {
  container.innerHTML = "";

  techData[tab].forEach(item => {
    container.innerHTML += `
      <div class="gameTechCard">
         <img src="${item.logo}" alt="${item.name}" class="techLogo"/>
        <p>${item.name}</p>
      </div>
    `;
  });
}

// default
loadTech("platforms");

// click
buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    loadTech(btn.dataset.tab);
  });
});


// ================= SCROLL ANIMATION =================

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("zoomShow");
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".zoomHeading").forEach(el => {
  observer.observe(el);
});