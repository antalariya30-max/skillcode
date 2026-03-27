// IMAGE AUTO SWAP
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

document.querySelectorAll(".autoSwap").forEach((container) => {
  const images = [
    "/ai-consulting/assets/images/Food.png",
    "/ai-consulting/assets/images/F-1.png",
    "/ai-consulting/assets/images/imgi_9_28.png"
  ];

  let index = 0;
  const img = container.querySelector("img");

  setInterval(() => {
    img.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
      img.style.opacity = 1;
    }, 300);

  }, 3000);
});


// NAVIGATION FUNCTION
function openProject(url) {
  window.open(url, "_blank");
}