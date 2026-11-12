(function () {
  "use strict";

  var toast = document.getElementById("toast");
  var toastTimer;
  var analysisModal = document.getElementById("analysisModal");

  function showToast(message) {
    if (!message) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2800);
  }

  document.querySelectorAll("[data-toast]").forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      showToast(element.getAttribute("data-toast"));
    });
  });

  var projectTrigger = document.getElementById("projectTrigger");
  var projectMenu = document.getElementById("projectMenu");
  projectTrigger.addEventListener("click", function () {
    var isOpen = projectMenu.classList.toggle("is-open");
    projectTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.querySelectorAll(".project-option").forEach(function (option) {
    option.addEventListener("click", function () {
      document.querySelectorAll(".project-option").forEach(function (item) { item.classList.remove("is-current"); });
      option.classList.add("is-current");
      projectTrigger.querySelector("span").textContent = option.getAttribute("data-project").toUpperCase();
      projectMenu.classList.remove("is-open");
      projectTrigger.setAttribute("aria-expanded", "false");
      showToast(option.getAttribute("data-project") === "Planning" ? "Planning es el proyecto activo" : "Censight es el proyecto activo");
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".project-switcher")) {
      projectMenu.classList.remove("is-open");
      projectTrigger.setAttribute("aria-expanded", "false");
    }
  });

  var settingsMenu = document.getElementById("settingsMenu");
  var mediaMenu = document.getElementById("mediaMenu");
  document.querySelectorAll(".panel-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".panel-tab").forEach(function (item) { item.classList.remove("is-active"); });
      tab.classList.add("is-active");
      var isMedia = tab.getAttribute("data-tab") === "media";
      settingsMenu.classList.toggle("is-hidden", isMedia);
      mediaMenu.classList.toggle("is-hidden", !isMedia);
    });
  });

  document.querySelectorAll(".side-item").forEach(function (item) {
    item.addEventListener("click", function () {
      document.querySelectorAll(".side-item").forEach(function (entry) { entry.classList.remove("is-current"); });
      item.classList.add("is-current");
      if (item.hasAttribute("data-toast")) showToast(item.getAttribute("data-toast"));
    });
  });

  function openModal() {
    analysisModal.classList.add("is-visible");
    analysisModal.setAttribute("aria-hidden", "false");
    document.getElementById("analysisName").focus();
  }

  function closeModal() {
    analysisModal.classList.remove("is-visible");
    analysisModal.setAttribute("aria-hidden", "true");
  }

  document.getElementById("newAnalysisButton").addEventListener("click", openModal);
  document.querySelectorAll('[data-action="new-analysis"]').forEach(function (button) { button.addEventListener("click", openModal); });
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalCancel").addEventListener("click", closeModal);
  analysisModal.addEventListener("click", function (event) { if (event.target === analysisModal) closeModal(); });
  document.getElementById("modalCreate").addEventListener("click", function () {
    var name = document.getElementById("analysisName").value.trim() || "Nuevo analisis";
    closeModal();
    showToast("Analisis " + name + " creado correctamente");
  });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeModal(); });

  document.getElementById("exportButton").addEventListener("click", function () {
    showToast("Preparando el reporte PPT de Planning");
  });

  var mobileMenu = document.getElementById("mobileMenu");
  var sidebar = document.getElementById("sidebar");
  mobileMenu.addEventListener("click", function () { sidebar.classList.toggle("is-open"); });
  document.querySelectorAll(".global-nav-link").forEach(function (link) {
    link.addEventListener("click", function () { sidebar.classList.remove("is-open"); });
  });
}());
