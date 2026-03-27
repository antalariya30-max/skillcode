

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


const CARDS_PER_PAGE = 9;
let visibleCount = CARDS_PER_PAGE;

const container = document.getElementById('blogContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreWrap = document.getElementById('loadMoreWrap');

function renderCards() {
  container.innerHTML = '';
  const visible = blogData.slice(0, visibleCount);

  visible.forEach((blog, index) => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.style.animationDelay = `${(index % CARDS_PER_PAGE) * 0.08}s`;

    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${blog.img}" alt="${blog.title}" loading="lazy" />
        <div class="card-date-badge">
          <span class="day">${blog.date}</span>
          ${blog.month}
        </div>
      </div>
      <div class="card-body">
        <span class="card-category">${blog.category}</span>
        <h3 class="card-title">${blog.title}</h3>
        <p class="card-desc">${blog.desc}</p>
        <button class="card-btn">
          Explore more
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M0.75 12.4167L12.4167 0.75M12.4167 0.75H0.75M12.4167 0.75V12.4167"
              stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;

    // On click: save to sessionStorage & navigate to blog-details.html
    card.addEventListener('click', () => {
      sessionStorage.setItem('selectedBlog', JSON.stringify(blog));
      window.location.href = `blog-details.html?id=${blog.id}`;
    });

    container.appendChild(card);
  });

  // Show / hide Load More button
  if (visibleCount >= blogData.length) {
    loadMoreWrap.style.display = 'none';
  } else {
    loadMoreWrap.style.display = 'flex';
  }
}

loadMoreBtn.addEventListener('click', () => {
  visibleCount += CARDS_PER_PAGE;
  renderCards();
});

// Initial render
renderCards();