

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

const CARDS_PER_PAGE = 10;

const blogData = [
  {
   id: 1,
    category: "Web Development",
    title: "Best Website Development Company",
    desc: "Professional website is your digital identity.",
    content: "A professional website helps build trust and attract customers. It is your online identity and branding tool...",
    img: "/ai-consulting/assets/images/web development.jpg",
    date: "07",
    month: "Nov"
  },
  {
    id: 2,
    category: "Web Development",
    title: "Website Development Services",
    desc: "Grow your business with strong website.",
    img: "/ai-consulting/assets/images/weRedesgin.jpg",
    date: "07",
    month: "Nov"
  },
  {
    id: 3,
    category: "Digital Marketing",
    title: "Digital Marketing Guide",
    desc: "Complete digital marketing strategies.",
    img: "/ai-consulting/assets/images/digital_marketing_04.jpeg",
    date: "07",
    month: "Nov"
  },
  {
    id: 4,
    category: "Digital Marketing",
    title: "Best Marketing Agency",
    desc: "Top marketing services in Surat.",
    img: "/ai-consulting/assets/images/digital-environment-scene.jpeg",
    date: "07",
    month: "Nov"
  },
  {
    id: 5,
    category: "AI/ML",
    title: "AI ML Company Guide",
    desc: "Choose best AI company.",
    img: "/ai-consulting/assets/images/AIML.jpg",
    date: "07",
    month: "Nov"
  },
  {
    id: 6,
    category: "AI/ML",
    title: "AI in 2026",
    desc: "Future of AI technology.",
    img: "/ai-consulting/assets/images/AIML4.jpg",
    date: "07",
    month: "Nov"
  },
  {
    id: 7,
    category: "Web",
    title: "Frontend Trends",
    desc: "Modern UI trends.",
    img: "/ai-consulting/assets/images/blogweb.jpg",
    date: "07",
    month: "Nov"
  },
  {
    id: 8,
    category: "Web",
    title: "Backend Guide",
    desc: "Server-side development.",
    img: "/ai-consulting/assets/images/blogweb2.jpg",
    date: "07",
    month: "Nov"
  },
  {
    id: 9,
    category: "SEO",
    title: "SEO Tips",
    desc: "Rank higher on Google.",
    img: "/ai-consulting/assets/images/Digital2.jpg",
    date: "07",
    month: "Nov"
  },
  {
    id: 10,
    category: "Marketing",
    title: "Social Media Growth",
    desc: "Grow your audience.",
    img: "/ai-consulting/assets/images/Digital4.jpg",
    date: "07",
    month: "Nov"
  }
];

let visibleCount = CARDS_PER_PAGE;

const container = document.getElementById("blogContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");

function renderBlogs() {
  container.innerHTML = "";

  const visibleBlogs = blogData.slice(0, visibleCount);

  visibleBlogs.forEach(blog => {
    const card = `
      <div class="blogCard" onclick="openBlog(${blog.id})">
        <div class="blogImage">
          <img src="${blog.img}" />
          <div class="blogDate">
            <div>${blog.date}</div>
            <div>${blog.month}</div>
          </div>
        </div>

        <div class="blogContent">
          <small>${blog.category}</small>
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <button class="blogBtn">Explore More</button>
        </div>
      </div>
    `;

    container.innerHTML += card;
  });

  if (visibleCount >= blogData.length) {
    loadMoreBtn.style.display = "none";
  }
}

loadMoreBtn.addEventListener("click", () => {
  visibleCount += CARDS_PER_PAGE;
  renderBlogs();
});

renderBlogs();