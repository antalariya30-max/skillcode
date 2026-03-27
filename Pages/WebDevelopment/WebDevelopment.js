// ================= SOLUTIONS DATA =================
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


const webSolutions = [
  {
    icon: "fa-globe",
    title: "Static Websites",
    desc: "Fast-loading websites for business presence.",
    list: ["Responsive design", "SEO optimization", "Fast loading"]
  },
  {
    icon: "fa-code",
    title: "Dynamic Web Applications",
    desc: "Interactive apps with database & real-time features.",
    list: ["Authentication", "Database", "API"]
  },
  {
    icon: "fa-briefcase",
    title: "Enterprise Portals",
    desc: "Secure scalable enterprise solutions.",
    list: ["Access control", "Integration", "Workflows"]
  },
  {
    icon: "fa-file-alt",
    title: "CMS Solutions",
    desc: "WordPress & CMS based solutions.",
    list: ["Themes", "Plugins", "Easy content"]
  },
  {
    icon: "fa-shopping-cart",
    title: "E-commerce",
    desc: "Online stores with payments & orders.",
    list: ["Payments", "Products", "Orders"]
  },
  {
    icon: "fa-server",
    title: "API Development",
    desc: "Secure and scalable APIs.",
    list: ["REST", "GraphQL", "Microservices"]
  }
];

// Render Solutions
const solutionsGrid = document.getElementById("solutionsGrid");

webSolutions.forEach(item => {
  const div = document.createElement("div");
  div.className = "webSolutionsCard";

  div.innerHTML = `
    <div class="webSolutionsIcon">
      <i class="fas ${item.icon}"></i>
    </div>
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
    <ul>
      ${item.list.map(li => `<li>${li}</li>`).join("")}
    </ul>
  `;

  solutionsGrid.appendChild(div);
});

// ================= TECH DATA =================

const webTabs = ["Frontend", "Backend", "CMS", "ECommerce"];

const webTechData = {
  Frontend: [
    { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Angular", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "Vue", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "HTML5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
  ],
  Backend: [
    { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PHP", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
  ],
  CMS: [
    { name: "WordPress", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" },
    { name: "Drupal", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/drupal/drupal-original.svg" },
    { name: "Joomla", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/joomla/joomla-original.svg" }
  ],
  ECommerce: [
    { name: "WooCommerce", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg" },
    { name: "Shopify", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg" },
    { name: "Magento", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/magento/magento-original.svg" }
  ]
};

let activeTab = "Frontend";

const tabsContainer = document.getElementById("tabs");
const techGrid = document.getElementById("techGrid");

// Render Tabs
webTabs.forEach(tab => {
  const btn = document.createElement("button");
  btn.className = "webTechTab";
  btn.innerText = tab;

  btn.onclick = () => {
    activeTab = tab;
    renderTech();
    setActiveTab();
  };

  tabsContainer.appendChild(btn);
});

function setActiveTab() {
  document.querySelectorAll(".webTechTab").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText === activeTab) {
      btn.classList.add("active");
    }
  });
}

// Render Tech
function renderTech() {
  techGrid.innerHTML = "";

  webTechData[activeTab].forEach(tech => {
    const div = document.createElement("div");
    div.className = "webTechCard";

    div.innerHTML = `
      <img src="${tech.image}" alt="${tech.name}" />
      <p>${tech.name}</p>
    `;

    techGrid.appendChild(div);
  });
}

renderTech();
setActiveTab();