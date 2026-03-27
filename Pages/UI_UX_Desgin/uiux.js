
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

// SCROLL ANIMATION
const section = document.getElementById("graphicContainer");

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("showAnimation");
    }
  });
},{threshold:0.3});

observer.observe(section);


// HEADING ZOOM
const zoomElements = document.querySelectorAll(".zoomHeading");

const zoomObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("zoomShow");
    }
  });
});

zoomElements.forEach(el => zoomObserver.observe(el));