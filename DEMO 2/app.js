(function () {
  "use strict";

  var toast = document.getElementById("toast");
  var toastTimer;
  var defaultValues = { conceptScale: 7, messageScale: 6, competitionScale: 8, categoryKnowledge: 5, productKnowledge: 4 };

  function showToast(message) {
    if (!message) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2800);
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
    if (!event.target.closest(".project-switcher")) {
      projectMenu.classList.remove("is-open");
      projectTrigger.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelectorAll(".side-item").forEach(function (item) {
    item.addEventListener("click", function () {
      document.querySelectorAll(".side-item").forEach(function (entry) { entry.classList.remove("is-current"); });
      item.classList.add("is-current");
      if (item.hasAttribute("data-toast")) showToast(item.getAttribute("data-toast"));
    });
  });

  function updateRange(input) {
    var value = input.value;
    var percent = ((value - input.min) / (input.max - input.min)) * 100;
    var output = document.querySelector('[data-value-for="' + input.id + '"]');
    input.style.setProperty("--range-progress", percent + "%");
    if (output) output.textContent = value;
  }
  document.querySelectorAll('input[type="range"]').forEach(function (input) {
    updateRange(input);
    input.addEventListener("input", function () { updateRange(input); input.closest(".question-card").setAttribute("data-complete", "true"); updateCompletion(); });
  });

  document.querySelectorAll("select").forEach(function (select) {
    select.addEventListener("change", function () { select.closest(".question-card").setAttribute("data-complete", "true"); updateCompletion(); });
  });

  document.querySelectorAll(".choice-buttons").forEach(function (group) {
    group.querySelectorAll(".choice-button").forEach(function (button) {
      button.addEventListener("click", function () {
        group.querySelectorAll(".choice-button").forEach(function (entry) { entry.classList.remove("is-selected"); });
        button.classList.add("is-selected");
        group.closest(".question-card").setAttribute("data-complete", "true");
        updateCompletion();
      });
    });
  });

  function updateCompletion() {
    var answered = 0;
    document.querySelectorAll(".question-card").forEach(function (card) {
      if (card.getAttribute("data-complete") === "true") answered += 1;
    });
    var total = document.querySelectorAll(".question-card").length;
    var percent = Math.round((answered / total) * 100);
    document.getElementById("completionValue").textContent = percent + "% completo";
    document.getElementById("progressBar").style.width = percent + "%";
    document.querySelectorAll(".question-section").forEach(function (section) {
      var sectionTotal = section.querySelectorAll(".question-card").length;
      var sectionAnswered = section.querySelectorAll('.question-card[data-complete="true"]').length;
      section.querySelector(".section-state").textContent = sectionAnswered + " de " + sectionTotal + " respondidas";
    });
  }

  function setSaveStatus(message, saved) {
    document.getElementById("saveStatus").textContent = message;
    document.querySelector(".autosave-dot").style.background = saved ? "#43b987" : "#f1ae4a";
  }
  document.getElementById("campaignName").addEventListener("input", function () { setSaveStatus("Cambios sin guardar", false); });
  document.getElementById("saveButton").addEventListener("click", function () {
    setSaveStatus("Guardado hace un momento", true);
    showToast("Borrador guardado correctamente");
  });
  document.getElementById("nextButton").addEventListener("click", function () { showToast("La siguiente seccion sera Audiences"); });
  document.getElementById("campaignForm").addEventListener("submit", function (event) {
    event.preventDefault();
    setSaveStatus("Guardado hace un momento", true);
    showToast("Campaign configurada. Lista para continuar");
  });
  document.getElementById("resetButton").addEventListener("click", function () {
    Object.keys(defaultValues).forEach(function (id) {
      var input = document.getElementById(id);
      input.value = defaultValues[id];
      updateRange(input);
    });
    document.querySelectorAll(".choice-buttons").forEach(function (group) {
      group.querySelectorAll(".choice-button").forEach(function (button) { button.classList.remove("is-selected"); });
      group.querySelector(".choice-button").classList.add("is-selected");
    });
    updateCompletion();
    setSaveStatus("Cambios sin guardar", false);
    showToast("Respuestas restablecidas");
  });
  updateCompletion();

  var mobileMenu = document.getElementById("mobileMenu");
  var sidebar = document.getElementById("sidebar");
  mobileMenu.addEventListener("click", function () { sidebar.classList.toggle("is-open"); });
  document.querySelectorAll(".global-nav-link").forEach(function (link) { link.addEventListener("click", function () { sidebar.classList.remove("is-open"); }); });
}());
