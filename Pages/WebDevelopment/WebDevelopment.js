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
  Frontend: ["React", "Angular", "Vue", "HTML5", "CSS3", "JavaScript"],
  Backend: ["Node.js", "PHP", "Python", "Java"],
  CMS: ["WordPress", "Drupal", "Joomla"],
  ECommerce: ["WooCommerce", "Shopify", "Magento"]
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

  webTechData[activeTab].forEach(name => {
    const div = document.createElement("div");
    div.className = "webTechCard";

    div.innerHTML = `
      <p>${name}</p>
    `;

    techGrid.appendChild(div);
  });
}

renderTech();
setActiveTab();