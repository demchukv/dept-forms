const sidebar = document.getElementById("check-sidebar");
const openSidebarBtn = document.getElementById("open-sidebar-btn");
const closeSidebarBtn = document.getElementById("check-sidebar-close-btn");
const sidebarOverlay = document.querySelector(".check-sidebar-overlay");

if (openSidebarBtn) {
  openSidebarBtn.addEventListener("click", (event) => {
    sidebarOverlay.classList.add("check-sidebar-overlay-active");
    sidebar.classList.add("check-sidebar-block-active");
  });
}

if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener("click", (event) => {
    sidebarOverlay.classList.remove("check-sidebar-overlay-active");
    sidebar.classList.remove("check-sidebar-block-active");
  });
}

sidebarOverlay.addEventListener("click", (event) => {
  sidebarOverlay.classList.remove("check-sidebar-overlay-active");
  sidebar.classList.remove("check-sidebar-block-active");
});

// Get data from server about check
