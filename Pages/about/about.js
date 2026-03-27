

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

// ================= TESTIMONIAL =================
const testimonials = [
  {
    name: "Piyush Shaliya",
    role: "Founder of food meach",
    text: "“Working with Skill Code.AI Solution has been an outstanding experience.From website development to digital marketing, SEO, and creative design — their team delivered everything with precision and dedication.Their approach is transparent, result-oriented, and highly professional.Every step of the process was smooth, well-managed, and aligned with our business goals.”."
  },
  {
    name: "John Smith",
    role: "Manager",
    text: "Working with this team was an exceptional experience. Their professionalism, attention to detail, and innovative approach helped us achieve results beyond our expectations. The project was delivered on time with outstanding quality. We truly value their dedication and would gladly collaborate again in the future."
  },
  {
    name: "Sarah Johnson",
    role: "Marketing Lead",
    text: "From the very beginning, their team understood our vision and transformed it into a powerful digital solution. Their technical expertise and clear communication made the entire process smooth and efficient. The final result exceeded our expectations and greatly improved our business performance."
  }
];

function changeTestimonial(index) {
  document.getElementById("name").innerText = testimonials[index].name;
  document.getElementById("role").innerText = testimonials[index].role;
  document.getElementById("text").innerText = testimonials[index].text;

  document.querySelectorAll(".dots span").forEach(dot => dot.classList.remove("active"));
  document.querySelectorAll(".dots span")[index].classList.add("active");
}

// ================= SCROLL ANIMATION =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("zoom-in");
    }
  });
});

document.querySelectorAll(".zoom-start").forEach(el => observer.observe(el));