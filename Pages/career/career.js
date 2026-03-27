




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


const jobsData = [
  { id: 1, title: "UI Designer", category: "Design", location: "Work from Office", type: "Full Time", desc: "Create user friendly UI for modern web applications and dashboards." },
  { id: 2, title: "UI/UX Designer – Wireframe", category: "Design", location: "Work from Office", type: "Full Time", desc: "Design user flows, wireframes and prototypes." },
  { id: 3, title: "SEO Executive", category: "Marketing", location: "Work from Office", type: "Full Time", desc: "Improve website rankings and organic traffic using SEO strategies." },
  { id: 4, title: "React Developer", category: "Development", location: "Work from Office", type: "Full Time", desc: "Build modern responsive web apps using React." },
];

let activeFilter = "All";
let selectedWork = "";
let cvFile = null;

/* ===========================
   RENDER JOBS
=========================== */
function renderJobs() {
  const list = document.getElementById("jobsList");
  list.innerHTML = "";
  jobsData.forEach(job => {
    const visible = activeFilter === "All" || job.category === activeFilter;
    const div = document.createElement("div");
    div.className = "jobItem " + (visible ? "showJob" : "hideJob");
    div.innerHTML = `
      <div class="jobContent">
        <h3>${job.title}</h3>
        <p>${job.desc}</p>
        <div class="jobMeta">
          <span class="metaTag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            ${job.type}
          </span>
          <span class="metaTag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            ${job.location}
          </span>
        </div>
      </div>
      <button class="applyBtn" onclick="openModal()">
        Apply
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6.35156 2.84522C2.83113 3.02855 0 5.95057 0 9.51562V12L0.888867 9.9307C1.94013 7.82855 4.02591 6.48443 6.35156 6.36084V9.20423L11.9917 4.59375L6.35156 0V2.84522Z" fill="white"/>
        </svg>
      </button>`;
    list.appendChild(div);
  });
}

/* ===========================
   FILTER BUTTONS
=========================== */
document.getElementById("careerFilters").addEventListener("click", function (e) {
  if (!e.target.classList.contains("filterBtn")) return;
  document.querySelectorAll(".filterBtn").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  activeFilter = e.target.dataset.filter;
  document.querySelectorAll(".jobItem").forEach(item => item.classList.add("zoomOut"));
  setTimeout(() => { renderJobs(); }, 300);
});

/* ===========================
   MODAL OPEN / CLOSE
=========================== */
function openModal() {
  document.getElementById("modalOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
  document.body.style.overflow = "";
  resetForm();
}

document.getElementById("closeBtn").onclick = closeModal;

document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

/* ===========================
   WORK TYPE SELECTION
=========================== */
function selectWork(val) {
  selectedWork = val;
  document.querySelectorAll(".radioCard").forEach(c => c.classList.remove("radioCardSel"));
  document.getElementById("radio-" + val).classList.add("radioCardSel");
  document.getElementById("err-workType").textContent = "";
  updateProgress();
}

/* ===========================
   FILE UPLOAD
=========================== */
function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!allowed.includes(file.type)) {
    document.getElementById("err-cv").textContent = "Only PDF, DOC, DOCX, JPG, PNG allowed";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    document.getElementById("err-cv").textContent = "Max file size is 5MB";
    return;
  }

  cvFile = file;
  document.getElementById("err-cv").textContent = "";
  document.getElementById("fileName").textContent = file.name;
  document.getElementById("fileConfirm").style.display = "flex";
  updateProgress();
}

/* ===========================
   PROGRESS BAR
=========================== */
function updateProgress() {
  const fieldIds = ["f-name", "f-position", "f-education", "f-experience", "f-currentSalary", "f-expectedSalary"];
  let filled = fieldIds.filter(id => document.getElementById(id).value.trim() !== "").length;
  if (selectedWork) filled++;
  if (cvFile) filled++;
  const total = 8;
  const pct = Math.round((filled / total) * 100);
  document.getElementById("progFill").style.width = pct + "%";
  document.getElementById("progText").textContent = filled + " of " + total + " filled";
}

// Live progress update on text inputs
["f-name", "f-position", "f-education", "f-experience", "f-currentSalary", "f-expectedSalary"].forEach(id => {
  document.getElementById(id).addEventListener("input", updateProgress);
});

/* ===========================
   FORM VALIDATION
=========================== */
function validate() {
  let valid = true;
  const checks = [
    { id: "f-name", err: "err-name", msg: "Full Name is required" },
    { id: "f-position", err: "err-position", msg: "Position is required" },
    { id: "f-education", err: "err-education", msg: "Education is required" },
    { id: "f-experience", err: "err-experience", msg: "Experience is required" },
    { id: "f-currentSalary", err: "err-currentSalary", msg: "Current Salary is required" },
    { id: "f-expectedSalary", err: "err-expectedSalary", msg: "Expected Salary is required" },
  ];

  checks.forEach(c => {
    const val = document.getElementById(c.id).value.trim();
    if (!val) {
      document.getElementById(c.err).textContent = c.msg;
      document.getElementById(c.id).classList.add("fieldError");
      valid = false;
    } else {
      document.getElementById(c.err).textContent = "";
      document.getElementById(c.id).classList.remove("fieldError");
    }
  });

  if (!selectedWork) {
    document.getElementById("err-workType").textContent = "Select work type";
    valid = false;
  }
  if (!cvFile) {
    document.getElementById("err-cv").textContent = "CV is required";
    valid = false;
  }

  return valid;
}

/* ===========================
   FORM SUBMIT
=========================== */
document.getElementById("applyForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  if (!validate()) return;

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Submitting…";

  try {
    const API_URL = `http://${window.location.hostname}:5000`;
    const formData = new FormData();
    formData.append("name", document.getElementById("f-name").value);
    formData.append("position", document.getElementById("f-position").value);
    formData.append("education", document.getElementById("f-education").value);
    formData.append("experience", document.getElementById("f-experience").value);
    formData.append("currentSalary", document.getElementById("f-currentSalary").value);
    formData.append("expectedSalary", document.getElementById("f-expectedSalary").value);
    formData.append("workType", selectedWork);
    formData.append("cv", cvFile);

    const res = await fetch(`${API_URL}/api/career`, { method: "POST", body: formData });
    const data = await res.json();

    if (data.success) {
      btn.classList.add("submitSuccess");
      btn.textContent = "✓ Application Submitted!";
      showToast("Application submitted successfully!", "success");
      setTimeout(() => { closeModal(); }, 2000);
    } else {
      showToast(data.error || "Submission failed. Please try again.", "error");
      btn.disabled = false;
      btn.textContent = "Submit Application →";
    }
  } catch (err) {
    showToast("Server error. Please try again later.", "error");
    btn.disabled = false;
    btn.textContent = "Submit Application →";
  }
});

/* ===========================
   RESET FORM
=========================== */
function resetForm() {
  document.getElementById("applyForm").reset();
  selectedWork = "";
  cvFile = null;
  document.querySelectorAll(".radioCard").forEach(c => c.classList.remove("radioCardSel"));
  document.getElementById("fileConfirm").style.display = "none";
  document.querySelectorAll(".errorMsg").forEach(e => e.textContent = "");
  document.querySelectorAll(".fieldInput").forEach(i => i.classList.remove("fieldError"));
  const btn = document.getElementById("submitBtn");
  btn.disabled = false;
  btn.classList.remove("submitSuccess");
  btn.textContent = "Submit Application →";
  updateProgress();
}

/* ===========================
   TOAST NOTIFICATION
=========================== */
function showToast(msg, type) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ===========================
   SCROLL REVEAL
=========================== */
function setupReveal() {
  const elements = document.querySelectorAll(".reveal-section, .reveal-values, .benefit-title");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("active"); });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add("active");
    else observer.observe(el);
  });
}

/* ===========================
   INIT
=========================== */
renderJobs();
setupReveal();