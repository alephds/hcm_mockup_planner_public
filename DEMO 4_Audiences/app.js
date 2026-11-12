(function () {
  "use strict";

  var toast = document.getElementById("toast");
  var toastTimer;
  var state = { gender: "Personas", ageStart: 25, ageEnd: 35, nse: [], zone: "Nielsen" };

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2800);
  }

  document.querySelectorAll("[data-toast]").forEach(function (element) {
    element.addEventListener("click", function (event) { event.preventDefault(); showToast(element.getAttribute("data-toast")); });
  });

  var projectTrigger = document.getElementById("projectTrigger");
  var projectMenu = document.getElementById("projectMenu");
  projectTrigger.addEventListener("click", function () {
    var open = projectMenu.classList.toggle("is-open");
    projectTrigger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.querySelectorAll(".project-option").forEach(function (option) {
    option.addEventListener("click", function () {
      document.querySelectorAll(".project-option").forEach(function (entry) { entry.classList.remove("is-current"); });
      option.classList.add("is-current");
      projectTrigger.querySelector("span").textContent = option.getAttribute("data-project").toUpperCase();
      projectMenu.classList.remove("is-open");
      projectTrigger.setAttribute("aria-expanded", "false");
      showToast(option.getAttribute("data-project") + " es el proyecto activo");
    });
  });
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".project-switcher")) { projectMenu.classList.remove("is-open"); projectTrigger.setAttribute("aria-expanded", "false"); }
  });

  function renderSummary() {
    document.getElementById("summaryGender").textContent = state.gender;
    document.getElementById("summaryAge").textContent = state.ageStart + " - " + state.ageEnd;
    document.getElementById("summaryNse").textContent = state.nse.length ? state.nse.join(", ") : "-";
    document.getElementById("summaryZone").textContent = state.zone;
  }

  function setAge(start, end) {
    start = Math.max(13, Math.min(90, Number(start) || 13));
    end = Math.max(13, Math.min(90, Number(end) || 13));
    if (start > end) { var swap = start; start = end; end = swap; }
    state.ageStart = start;
    state.ageEnd = end;
    document.getElementById("ageStart").value = start;
    document.getElementById("ageEnd").value = end;
    document.getElementById("ageStartRange").value = start;
    document.getElementById("ageEndRange").value = end;
    document.getElementById("ageStartValue").textContent = start;
    document.getElementById("ageEndValue").textContent = end;
    renderSummary();
  }

  document.querySelectorAll(".gender-option").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".gender-option").forEach(function (entry) { entry.classList.remove("is-selected"); });
      button.classList.add("is-selected");
      state.gender = button.getAttribute("data-gender");
      renderSummary();
    });
  });
  document.getElementById("ageStartRange").addEventListener("input", function () { setAge(this.value, state.ageEnd); });
  document.getElementById("ageEndRange").addEventListener("input", function () { setAge(state.ageStart, this.value); });
  document.getElementById("applyAge").addEventListener("click", function () { setAge(document.getElementById("ageStart").value, document.getElementById("ageEnd").value); showToast("Rango de edad aplicado"); });
  document.getElementById("ageStart").addEventListener("change", function () { setAge(this.value, document.getElementById("ageEnd").value); });
  document.getElementById("ageEnd").addEventListener("change", function () { setAge(document.getElementById("ageStart").value, this.value); });

  document.querySelectorAll(".nse-option").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-nse");
      button.classList.toggle("is-selected");
      state.nse = Array.prototype.map.call(document.querySelectorAll(".nse-option.is-selected"), function (entry) { return entry.getAttribute("data-nse"); });
      renderSummary();
      showToast(state.nse.length ? "Nivel " + value + " agregado" : "Nivel " + value + " retirado");
    });
  });
  document.querySelectorAll(".zone-option").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".zone-option").forEach(function (entry) { entry.classList.remove("is-selected"); });
      button.classList.add("is-selected");
      state.zone = button.getAttribute("data-zone");
      renderSummary();
    });
  });

  document.getElementById("clearFilters").addEventListener("click", function () {
    document.querySelectorAll(".gender-option").forEach(function (button) { button.classList.toggle("is-selected", button.getAttribute("data-gender") === "Personas"); });
    document.querySelectorAll(".nse-option").forEach(function (button) { button.classList.remove("is-selected"); });
    document.querySelectorAll(".zone-option").forEach(function (button) { button.classList.toggle("is-selected", button.getAttribute("data-zone") === "Nielsen"); });
    state.gender = "Personas"; state.nse = []; state.zone = "Nielsen"; setAge(25, 35); showToast("Filtros limpiados");
  });
  document.getElementById("cancelAudience").addEventListener("click", function () { showToast("Cambios cancelados"); });
  document.getElementById("saveAudience").addEventListener("click", function () { showToast("Borrador de audiencia guardado"); });
  document.getElementById("generateAudience").addEventListener("click", function () { showToast("Generando analisis para el segmento seleccionado"); });

  var mobileMenu = document.getElementById("mobileMenu");
  var sidebar = document.getElementById("sidebar");
  mobileMenu.addEventListener("click", function () { sidebar.classList.toggle("is-open"); });
  document.querySelectorAll(".global-nav-link").forEach(function (link) { link.addEventListener("click", function () { sidebar.classList.remove("is-open"); }); });
  renderSummary();
}());
