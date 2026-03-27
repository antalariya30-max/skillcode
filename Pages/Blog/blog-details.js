

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
window.addEventListener("pageshow", () => {
  loadFooter();
});


const CATEGORIES = [
  "2D&3D Animation",
  "Game Development",
  "Web Development",
  "Software Development",
  "Digital Marketing",
  "MAD",
  "UI/UX Designing",
  "CRM",
  "AR/VR & Metaverse",
  "AI/ML"
];

// ── Get blog ID from URL ──
const params = new URLSearchParams(window.location.search);
const blogId = parseInt(params.get("id"));

// ── Get blog data ──
let blog = null;

try {
  const stored = sessionStorage.getItem("selectedBlog");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.id === blogId) blog = parsed;
  }
} catch (e) {}

if (!blog) {
  blog = blogData.find((b) => b.id === blogId);
}

// ── Elements ──
const dtlLeft = document.getElementById("dtlLeft");
const catList = document.getElementById("catList");
const recentEl = document.getElementById("recentPosts");

// ── If blog not found ──
if (!blog) {
  dtlLeft.innerHTML = `
    <div class="not-found">
      Blog not found. <a href="blog.html">← Back to Blog</a>
    </div>`;
} else {
  // Title update
  document.title = `${blog.title} – Skillcode.ai`;

  // ── Article ──
  dtlLeft.innerHTML = `
    <div class="article-card">
      <h1>${blog.title}</h1>

      <img
        src="${blog.img}"
        alt="${blog.title}"
        class="article-main-img"
        onerror="this.src='https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80'"
      />

      <p class="intro-desc">${blog.fulldesc}</p>
      ${blog.fulldesc2 ? `<p class="intro-desc">${blog.fulldesc2}</p>` : ""}

      <div class="blog-content">${blog.content}</div>

      <div class="tags-row">
        ${(blog.tags || [])
          .map((t) => `<span class="tag-badge">${t}</span>`)
          .join("")}
      </div>
    </div>
  `;

  // ── Categories ──
  catList.innerHTML = CATEGORIES.map(
    (cat) => `
    <div class="cat-item ${cat === blog.category ? "active" : ""}">
      ${cat}
    </div>
  `
  ).join("");

  // ── ✅ Recent Posts (ONLY 3) ──
  // ── Recent Posts (ONLY 3) ──
const recentPosts = blogData
  .filter(item => item.id !== blogId)
  .slice(0, 3);

recentEl.innerHTML = recentPosts.map(item => {

  const safeData = JSON.stringify(item)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");

  // return `
  //   <a 
  //     class="recent-item"
  //     href="blog-details.html?id=${item.id}"
  //     onclick="sessionStorage.setItem('selectedBlog', '${safeData}')"
  //   >
  //     <img src="${item.img}" alt="${item.title}" />

  //     <div class="recent-info">
  //       <small>${item.date} ${item.month}</small>
  //       <p>${item.title}</p>
  //     </div>
  //   </a>
  // `;
}).join("");
}