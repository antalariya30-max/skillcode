document.addEventListener("DOMContentLoaded", function () {

  // ✅ HEADER LOAD
  fetch("../../Header/Header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      // agar function header.js me hai
      if (typeof initHeaderBtn === "function") {
        initHeaderBtn("getStartBtn", "getStartText", "Get Started");
      }
    })
    .catch(err => console.error("Header load error:", err));


  // ✅ FOOTER LOAD (FIXED)
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


  // ✅ FORM VALIDATION
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const type = document.getElementById("inquiryType").value;

    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    if (name.length < 2) {
      document.getElementById("nameError").innerText = "Enter valid name";
      valid = false;
    }

    if (email && !email.includes("@")) {
      document.getElementById("emailError").innerText = "Invalid email";
      valid = false;
    }

    if (!/^[0-9]{10}$/.test(number)) {
      document.getElementById("numberError").innerText = "Enter 10 digit number";
      valid = false;
    }

    if (!type) {
      document.getElementById("typeError").innerText = "Select inquiry type";
      valid = false;
    }

    if (valid) {
      alert("Form Submitted ✅");
      document.getElementById("contactForm").reset();
    }
  });

});