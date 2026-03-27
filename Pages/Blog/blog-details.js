// SAME blogData yaha bhi hona chahiye (ya separate file bana sakte ho)

const blogData = [ /* SAME DATA COPY HERE */ ];

const params = new URLSearchParams(window.location.search);
const blogId = parseInt(params.get("id"));

const blog = blogData.find(item => item.id === blogId);

if (blog) {
  document.getElementById("blogTitle").innerText = blog.title;
  document.getElementById("blogImage").src = blog.img;
  document.getElementById("blogDesc").innerText = blog.desc;
  document.getElementById("blogContent").innerText = blog.content;
} else {
  document.querySelector(".blogDtlContainer").innerHTML = "<h2>Blog not found</h2>";
}