const checkSearch = document.getElementById("check-search");
const checkSearchIcon = document.getElementById("check-search-icon");
const checkSearchPopup = document.querySelector(".check-search-panel");
const checkResetBtn = document.getElementById("check-reset-btn");
const checkFindBtn = document.getElementById("check-find-btn");

if (checkSearch) {
  checkSearch.addEventListener("focus", (event) => {
    increaseCheckSearch();
  });
  checkSearch.addEventListener("blur", (event) => {
    reduceCheckSearch();
  });
}
if (checkSearchIcon) {
  checkSearchIcon.addEventListener("click", (event) => {
    if (!checkSearch.classList.contains("check-search-input-active")) {
      increaseCheckSearch();
    }
  });
}

if (checkResetBtn) {
  checkResetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.querySelector(".check-search-form");
    form.reset();
    hideCheckPopup();
    reduceCheckSearch();
  });
}

if (checkFindBtn) {
  checkFindBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.querySelector(".check-search-form");
    const formData = new FormData(form);
    //TODO: send to server
    let data = {};
    formData.forEach((value, name) => (data[name] = value));
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  });
}

function increaseCheckSearch() {
  checkSearchIcon.classList.add("check-search-input-icon-active");
  checkSearch.classList.add("check-search-input-active");
  checkSearch.focus();
  showCheckPopup();
}
function reduceCheckSearch() {
  if (checkSearchPopup.classList.contains("check-search-panel-active")) {
    return;
  }
  checkSearchIcon.classList.remove("check-search-input-icon-active");
  checkSearch.classList.remove("check-search-input-active");
  hideCheckPopup();
}
function showCheckPopup() {
  checkSearchPopup.classList.add("check-search-panel-active");
}
function hideCheckPopup() {
  checkSearchPopup.classList.remove("check-search-panel-active");
}
