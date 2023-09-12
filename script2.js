function sidebarCollapse() {
  let sidebarTexts = document.querySelectorAll(".sidebar-text");
  sidebarTexts.forEach(function (sidebarText) {
    if (sidebarText.style.display === "none") {
      sidebarText.style.display = "block";
    } else {
      sidebarText.style.display = "none";
    }
  });
}
