import * as NiceSelect from "./nice-select2.js";

const checkStatusDropdown = NiceSelect.bind(
  document.getElementById("check-status")
);
const checkDirectionDropdown = NiceSelect.bind(
  document.getElementById("check-direction")
);

const checkSearch = document.getElementById("check-search");
const checkSearchIcon = document.getElementById("check-search-icon");
const checkSearchPopup = document.querySelector(".check-search-panel");
const checkResetBtn = document.getElementById("check-reset-btn");
const checkFindBtn = document.getElementById("check-find-btn");
const filterArea = document.getElementById("check-filter-area");

const filterFieldsList = [
  { name: "check-search", type: "text", label: "Пошук" },
  { name: "check-number", type: "number", label: "Номер" },
  { name: "check-contragent", type: "text", label: "Контрагент" },
  { name: "check-edrpou", type: "number", label: "ЄДРПОУ" },
  { name: "check-direction", type: "number", label: "Напрямок" },
  { name: "check-status", type: "number", label: "Статус" },
];

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
    filterArea.innerHTML = "";
    checkSearch.placeholder = "Фільтр + Пошук";
    form.reset();
    checkStatusDropdown.destroy();
    checkDirectionDropdown.destroy();
    NiceSelect.bind(document.getElementById("check-status"));
    NiceSelect.bind(document.getElementById("check-direction"));
    hideCheckPopup();
    reduceCheckSearch();
  });
}

if (checkFindBtn) {
  checkFindBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.querySelector(".check-search-form");

    const formData = new FormData(form);

    const elements = Array.from(form.elements);

    let data = {};
    filterArea.innerHTML = "";
    formData.forEach((value, name) => {
      data[name] = value;
      if (value.trim() !== "" && value !== "0" && name !== "check-search") {
        let fField = filterFieldsList.find((f) => f.name === name);
        let element = elements.find((e) => e.name === name);
        for (let j = 0; j < element.length; j++) {
          if (value === element[j].value) {
            value = element[j].label;
            break;
          }
        }

        let fLabel = `<div class="check-filter-label" id="filter-${name}">
                  <div class="check-filter-label-text" title="${value.trim()}">${
          fField.label
        }: ${value.trim()}</div>
                  <button type="button" class="check-filter-label-close">&times;</button>
                </div>`;
        filterArea.insertAdjacentHTML("beforeend", fLabel);
      }
    });
    if (filterArea.innerHTML !== "") {
      checkSearch.placeholder = "+ Пошук";
    } else {
      checkSearch.placeholder = "Фільтр + Пошук";
    }
    updateFiltersLabel();
    hideCheckPopup();
    //TODO: send to server
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  });
}

function trackBodyClick(event) {
  console.log(event);
}

function updateFiltersLabel() {
  const checkFilterLabels = document.querySelectorAll(".check-filter-label");
  if (checkFilterLabels) {
    checkFilterLabels.forEach((label) => {
      label.addEventListener("click", (event) => {
        event.preventDefault();
        const id = label.getAttribute("id");
        const name = id.replace("filter-", "");
        const field = document.getElementById(name);
        field.value = "";
        if (name === "check-status") {
          checkStatusDropdown.destroy();
          NiceSelect.bind(document.getElementById("check-status"));
        }
        if (name === "check-direction") {
          checkDirectionDropdown.destroy();
          NiceSelect.bind(document.getElementById("check-direction"));
        }

        label.remove();
      });
    });
  }
}

function increaseCheckSearch() {
  checkSearchIcon.classList.add("check-search-input-icon-active");
  checkSearch.classList.add("check-search-input-active");
  checkSearch.focus();
  showCheckPopup();
  document.addEventListener("click", trackBodyClick);
}
function reduceCheckSearch() {
  if (checkSearchPopup.classList.contains("check-search-panel-active")) {
    return;
  }
  checkSearchIcon.classList.remove("check-search-input-icon-active");
  checkSearch.classList.remove("check-search-input-active");
  hideCheckPopup();
  document.removeEventListener("click", trackBodyClick);
}
function showCheckPopup() {
  checkSearchPopup.classList.add("check-search-panel-active");
}
function hideCheckPopup() {
  checkSearchPopup.classList.remove("check-search-panel-active");
}
