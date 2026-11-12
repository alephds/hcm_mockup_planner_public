(function () {
  "use strict";

  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(message) { window.clearTimeout(toastTimer); toast.textContent = message; toast.classList.add("is-visible"); toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2800); }
  document.querySelectorAll("[data-toast]").forEach(function (element) { element.addEventListener("click", function (event) { event.preventDefault(); showToast(element.getAttribute("data-toast")); }); });

  var projectTrigger = document.getElementById("projectTrigger"); var projectMenu = document.getElementById("projectMenu");
  projectTrigger.addEventListener("click", function () { var open = projectMenu.classList.toggle("is-open"); projectTrigger.setAttribute("aria-expanded", open ? "true" : "false"); });
  document.querySelectorAll(".project-option").forEach(function (option) { option.addEventListener("click", function () { document.querySelectorAll(".project-option").forEach(function (entry) { entry.classList.remove("is-current"); }); option.classList.add("is-current"); projectTrigger.querySelector("span").textContent = option.getAttribute("data-project").toUpperCase(); projectMenu.classList.remove("is-open"); projectTrigger.setAttribute("aria-expanded", "false"); showToast(option.getAttribute("data-project") + " es el proyecto activo"); }); });
  document.addEventListener("click", function (event) { if (!event.target.closest(".project-switcher")) { projectMenu.classList.remove("is-open"); projectTrigger.setAttribute("aria-expanded", "false"); } });

  document.querySelectorAll(".explorer-tab").forEach(function (tab) { tab.addEventListener("click", function () { var target = tab.getAttribute("data-insight"); document.querySelectorAll(".explorer-tab").forEach(function (entry) { entry.classList.remove("is-active"); }); document.querySelectorAll(".insight-view").forEach(function (view) { view.classList.add("view-hidden"); }); tab.classList.add("is-active"); document.getElementById(target + "View").classList.remove("view-hidden"); }); });
  document.getElementById("exportInsights").addEventListener("click", function () { showToast("Exportando insights del segmento seleccionado"); });
  document.getElementById("refreshInsights").addEventListener("click", function () { showToast("Analisis actualizado"); });
  document.querySelectorAll(".more-states").forEach(function (button) { button.addEventListener("click", function () { showToast("Mostrando los estados adicionales del segmento"); }); });

  var mobileMenu = document.getElementById("mobileMenu"); var sidebar = document.getElementById("sidebar"); mobileMenu.addEventListener("click", function () { sidebar.classList.toggle("is-open"); }); document.querySelectorAll(".global-nav-link").forEach(function (link) { link.addEventListener("click", function () { sidebar.classList.remove("is-open"); }); });
}());
