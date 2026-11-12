(function () {
  "use strict";
  var toast = document.getElementById("toast"); var toastTimer;
  var tactics = [
    ["Capture contact data", "Capture contact data allowing consumer contact data (name, e-mail and address)", "contact"],
    ["Capture cookie data", "Capture data allowing to capture consumer cookie data online", "cookie"],
    ["Channels that can deliver high reach", "Media that achieve high maximum reach", "reach"],
    ["Control by day of week", "Media that allow control over the day of the week that the message is shown/delivered", "day"],
    ["Control by time of day", "Media that allow control over the time of day that the message is shown/delivered", "time"],
    ["Create/rotate message quickly", "Media that allow a copy or other controls to be placed on how the message is delivered", "message"],
    ["Heavy frequency within a week", "Media that allow a message to be delivered a lot of times within one week", "frequency"],
    ["Conversation with consumer", "Media that allow two-way conversation with the consumer", "conversation"],
    ["Share message", "Media that allow consumers to share the message (e.g. forward a link, brand)", "share"],
    ["Target by region", "Media that allow targeting of consumers by region", "region"],
    ["Target by small areas", "Media that allow targeting of consumers within small areas by ZIP code", "small"],
    ["Target using consumer lists", "Media that allow targeting consumers using a known list", "list"],
    ["Visualize product", "Media that deliver an impactful product visualization", "product"],
    ["Behaviorally target by purchase behavior", "Media that allow targeting of consumers by their behavior based on what they have browsed or bought", "behavior"],
    ["Reach people in home", "The ability to reach consumers when they are at home", "home"],
    ["Reach people on the go", "The ability to reach consumers when they are on the go, commuting or shopping", "go"],
    ["Reach people while in social situations", "The ability to reach consumers while they are with friends or in social situations", "social"],
    ["Physically close to purchase", "The ability to reach consumers when they are physically close to a point of purchase", "close"],
    ["Personalized message", "Media that allow a personalized message or creative to be delivered", "message"]
  ];
  var selected = [true].concat(tactics.slice(1).map(function () { return false; }));
  function showToast(message) { window.clearTimeout(toastTimer); toast.textContent = message; toast.classList.add("is-visible"); toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2600); }
  document.querySelectorAll("[data-toast]").forEach(function (element) { element.addEventListener("click", function (event) { event.preventDefault(); showToast(element.getAttribute("data-toast")); }); });
  var projectTrigger = document.getElementById("projectTrigger"); var projectMenu = document.getElementById("projectMenu"); projectTrigger.addEventListener("click", function () { var open = projectMenu.classList.toggle("is-open"); projectTrigger.setAttribute("aria-expanded", open ? "true" : "false"); }); document.querySelectorAll(".project-option").forEach(function (option) { option.addEventListener("click", function () { document.querySelectorAll(".project-option").forEach(function (entry) { entry.classList.remove("is-current"); }); option.classList.add("is-current"); projectTrigger.querySelector("span").textContent = option.getAttribute("data-project").toUpperCase(); projectMenu.classList.remove("is-open"); projectTrigger.setAttribute("aria-expanded","false"); showToast(option.getAttribute("data-project") + " es el proyecto activo"); }); }); document.addEventListener("click", function (event) { if (!event.target.closest(".project-switcher")) { projectMenu.classList.remove("is-open"); projectTrigger.setAttribute("aria-expanded","false"); } });
  function render() { var count = selected.filter(Boolean).length; document.getElementById("selectedCount").textContent = count; document.getElementById("selectionStatus").textContent = count === 1 ? "1 tactica seleccionada" : count + " tacticas seleccionadas"; document.querySelectorAll(".tactic-card").forEach(function (card, index) { card.classList.toggle("is-selected", selected[index]); }); document.querySelectorAll(".tactic-list-item").forEach(function (item, index) { item.classList.toggle("is-selected", selected[index]); }); document.getElementById("selectAll").textContent = count === tactics.length ? "DESELECT ALL" : "SELECT ALL"; }
  var grid = document.getElementById("tacticGrid"); var checklist = document.getElementById("tacticChecklist"); tactics.forEach(function (tactic, index) { var card = document.createElement("button"); card.type = "button"; card.className = "tactic-card"; card.innerHTML = '<span class="tactic-icon glyph-' + tactic[2] + '"></span><span class="tactic-copy"><strong>' + tactic[0] + '</strong><small>' + tactic[1] + '</small></span><span class="card-check"></span>'; card.addEventListener("click", function () { selected[index] = !selected[index]; render(); }); grid.appendChild(card); var item = document.createElement("button"); item.type = "button"; item.className = "tactic-list-item"; item.innerHTML = '<span class="tactic-check"></span><span>' + tactic[0] + '</span>'; item.addEventListener("click", function () { selected[index] = !selected[index]; render(); }); checklist.appendChild(item); });
  document.getElementById("selectAll").addEventListener("click", function () { var allSelected = selected.every(Boolean); selected = tactics.map(function () { return !allSelected; }); render(); }); document.getElementById("saveTactics").addEventListener("click", function () { showToast("Borrador de tacticas guardado"); }); document.getElementById("continueTactics").addEventListener("click", function () { showToast(selected.filter(Boolean).length + " tacticas listas para el plan"); }); render();
  var mobileMenu = document.getElementById("mobileMenu"); var sidebar = document.getElementById("sidebar"); mobileMenu.addEventListener("click", function () { sidebar.classList.toggle("is-open"); }); document.querySelectorAll(".global-nav-link").forEach(function (link) { link.addEventListener("click", function () { sidebar.classList.remove("is-open"); }); });
}());
