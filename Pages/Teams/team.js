

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
const team = [
  {
    name: "Jeel Dholariya",
    role: "Founder",
    img: "/ai-consulting/assets/images/imgi_2_JEEEEEEL.png",
    desc: "As the CEO, Jeel is dedicated to driving the vision of delivering innovative IT solutions that empower businesses and individuals through technology."
  },
  {
    name: "Prince Patodiya",
    role: "Co-Founder",
    img: "/ai-consulting/assets/images/imgi_3_pricesir.png",
    desc: "Prince leads the engineering team, building scalable systems and mentoring developers while focusing on reliability, performance, and modern web practices."
  },
  {
    name: "Jenil Khachariya",
    role: "CFO & CTO",
    img: "/ai-consulting/assets/images/imgi_4_JENILNEW.png",
    desc: "Jenil oversees product and technical strategy, ensuring systems are maintainable, high-performing, and aligned with the company's long-term innovation goals."
  }
];

const teamGrid = document.getElementById("teamGrid");

team.forEach(member => {
  const card = `
    <div class="teamCard">
      <div class="teamImg">
        <img src="${member.img}" alt="">
      </div>
      <h3>${member.name} <span>- ${member.role}</span></h3>
      <p>${member.desc}</p>
    </div>
  `;
  teamGrid.innerHTML += card;
});