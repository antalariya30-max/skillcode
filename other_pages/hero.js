function setHeroData(data) {
  document.getElementById("hero-title").innerText = data.title;
  document.getElementById("hero-description").innerText = data.description;
  document.getElementById("hero-breadcrumb").innerText = data.breadcrumb;
}