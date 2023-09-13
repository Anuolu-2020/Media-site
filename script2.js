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

function profileToggle() {
  let profilebar = document.getElementById("settings-container");
  if (profilebar.style.display === "none") {
    profilebar.style.display = "inline-flex";
  } else {
    profilebar.style.display = "none";
  }
}
