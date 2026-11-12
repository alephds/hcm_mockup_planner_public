(function () {
  "use strict";
  var toast = document.getElementById("toast"); var toastTimer; var selectedTactics = [true]; var tactics = ["Capture contact data","Capture cookie data","Channels that can deliver high reach","Control by day of week","Control by time of day","Create/rotate message quickly","Heavy frequency within a week","Conversation with consumer","Share message","Target by region","Target by small areas","Target using consumer lists","Visualize product","Behaviorally target by purchase behavior","Reach people in home","Reach people on the go","Reach people while in social situations","Physically close to purchase","Personalized message"];
  while (selectedTactics.length < tactics.length) selectedTactics.push(false);
  function showToast(message) { window.clearTimeout(toastTimer); toast.textContent = message; toast.classList.add("is-visible"); toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2700); }
  var budgetNav = Array.prototype.find.call(document.querySelectorAll(".side-item"), function (item) { return item.textContent.indexOf("Budget Setting") !== -1; }); if (budgetNav) { budgetNav.classList.add("view-trigger"); budgetNav.setAttribute("data-view", "budget"); budgetNav.removeAttribute("data-toast"); }
  document.querySelectorAll("[data-toast]").forEach(function (element) { element.addEventListener("click", function (event) { event.preventDefault(); showToast(element.getAttribute("data-toast")); }); });
  var projectTrigger = document.getElementById("projectTrigger"); var projectMenu = document.getElementById("projectMenu"); projectTrigger.addEventListener("click", function () { var open = projectMenu.classList.toggle("is-open"); projectTrigger.setAttribute("aria-expanded", open ? "true" : "false"); }); document.querySelectorAll(".project-option").forEach(function (option) { option.addEventListener("click", function () { projectMenu.classList.remove("is-open"); showToast(option.getAttribute("data-project") + " es el proyecto activo"); }); });
  function switchView(view) { ["campaign","audience","explorer","tactics","budget"].forEach(function (name) { document.getElementById(name + "View").classList.toggle("view-hidden", name !== view); var heading = document.getElementById("heading" + name.charAt(0).toUpperCase() + name.slice(1)); if (heading) heading.classList.toggle("view-hidden", name !== view); }); document.querySelectorAll(".view-trigger").forEach(function (item) { item.classList.toggle("is-current", item.getAttribute("data-view") === view); }); document.body.classList.toggle("audience-active", view === "audience"); }
  document.querySelectorAll(".view-trigger").forEach(function (item) { item.addEventListener("click", function () { switchView(item.getAttribute("data-view")); }); });
  var budgetHeading = document.createElement("section"); budgetHeading.className = "page-heading view-hidden"; budgetHeading.id = "headingBudget"; budgetHeading.innerHTML = '<div><div class="eyebrow"><span class="eyebrow-square"></span> CONFIGURACI&Oacute;N DE PLANNER</div><h1>Channel Inputs <span class="heading-divider">&amp;</span> Budget Setting</h1><p class="page-subtitle">Define el mix de medios, la inversi&oacute;n y los objetivos de la campa&ntilde;a.</p></div><div class="heading-actions"><button class="button button-secondary" id="resetButton" type="button">&#8635; Restablecer</button><button class="button button-primary" id="saveButton" type="button"><span class="save-icon"></span> Guardar plan</button></div>'; document.querySelector(".main-content").insertBefore(budgetHeading, document.querySelector(".content-layout"));
  var channels = [{ name:"Peri&oacute;dicos", active:true, pen:25, affinity:55, objective:"Awareness", cpm:150, investment:0, weeks:4 },{ name:"Revistas", active:true, pen:25, affinity:55, objective:"Awareness", cpm:0, investment:0, weeks:4 },{ name:"Canales de TV abierta", active:true, pen:25, affinity:55, objective:"Consideration", cpm:0, investment:0, weeks:4 },{ name:"Canales de TV paga", active:true, pen:25, affinity:55, objective:"Consideration", cpm:0, investment:0, weeks:4 },{ name:"TV / servicios de video streaming", active:true, pen:25, affinity:55, objective:"Awareness", cpm:0, investment:0, weeks:4 },{ name:"Cine", active:false, pen:0, affinity:100, objective:"-", cpm:0, investment:0, weeks:0 },{ name:"Publicidad Exterior / Out of Home", active:false, pen:0, affinity:100, objective:"-", cpm:0, investment:0, weeks:0 },{ name:"Radio", active:false, pen:0, affinity:100, objective:"-", cpm:0, investment:0, weeks:0 },{ name:"Internet", active:false, pen:0, affinity:100, objective:"-", cpm:0, investment:0, weeks:0 },{ name:"Proveedores de voz / video", active:false, pen:0, affinity:100, objective:"-", cpm:0, investment:0, weeks:0 }];
  function initBudget() { if (!document.getElementById("channelRows")) return; function money(value) { return value >= 1000000 ? "$" + (value / 1000000).toFixed(1) + " M" : "$" + Math.round(value).toLocaleString("en-US"); } function num(value) { return value >= 1000000 ? (value / 1000000).toFixed(1) + " M" : value >= 1000 ? (value / 1000).toFixed(1) + " k" : Math.round(value).toLocaleString("en-US"); } function renderRows() { var body = document.getElementById("channelRows"); body.innerHTML = ""; channels.forEach(function (row, index) { var tr = document.createElement("tr"); if (!row.active) tr.className = "row-disabled"; tr.innerHTML = '<td title="' + row.name + '">' + row.name + '</td><td><input class="channel-check" data-field="active" data-index="' + index + '" type="checkbox" ' + (row.active ? "checked" : "") + '></td><td><input data-field="pen" data-index="' + index + '" type="number" min="0" max="100" value="' + row.pen + '"></td><td><input data-field="affinity" data-index="' + index + '" type="number" min="0" max="2000" value="' + row.affinity + '"></td><td><select data-field="objective" data-index="' + index + '"><option ' + (row.objective === "-" ? "selected" : "") + '>-</option><option ' + (row.objective === "Awareness" ? "selected" : "") + '>Awareness</option><option ' + (row.objective === "Consideration" ? "selected" : "") + '>Consideration</option><option ' + (row.objective === "Conversion" ? "selected" : "") + '>Conversion</option></select></td><td><input data-field="cpm" data-index="' + index + '" type="number" min="0" value="' + row.cpm + '"></td><td><input data-field="investment" data-index="' + index + '" type="number" min="0" value="' + row.investment + '"></td><td><input data-field="weeks" data-index="' + index + '" type="number" min="0" max="104" value="' + row.weeks + '"></td><td class="contacts">' + num(row.contacts || 0) + '</td><td class="impressions">' + num(row.impressions || 0) + '</td>'; body.appendChild(tr); }); body.querySelectorAll("[data-field]").forEach(function (input) { input.addEventListener("input", updateRow); input.addEventListener("change", updateRow); }); }
    function renderWaterfall(items, total) { var waterfall = document.getElementById("waterfall"); waterfall.innerHTML = ""; var max = Math.max(total, 1); items.slice(0, 6).forEach(function (item) { var wrap = document.createElement("div"); wrap.className = "water-bar-wrap"; wrap.innerHTML = '<span class="water-value">+' + num(item.incremental) + '</span><span class="water-bar" style="height:' + Math.max(8, item.incremental / max * 145) + 'px"></span><span class="water-label">' + item.name + '</span>'; waterfall.appendChild(wrap); }); var totalWrap = document.createElement("div"); totalWrap.className = "water-bar-wrap"; totalWrap.innerHTML = '<span class="water-value">' + num(total) + '</span><span class="water-bar water-total" style="height:145px"></span><span class="water-label">Total</span>'; waterfall.appendChild(totalWrap); }
    function renderEfficiency(selected) { var chart = document.getElementById("efficiencyChart"); chart.innerHTML = ""; selected.slice(0, 6).forEach(function (row, index) { var point = document.createElement("span"); point.className = "efficiency-point"; point.style.left = (18 + index * 14) + "%"; point.style.top = (27 + (index % 3) * 18) + "%"; point.title = row.name; chart.appendChild(point); }); }
    function renderDonut(selected) { var legend = document.getElementById("donutLegend"); legend.innerHTML = ""; selected.slice(0, 5).forEach(function (row) { var item = document.createElement("span"); item.textContent = row.name; legend.appendChild(item); }); }
    function calculate() { var universe = Number(document.getElementById("universe").value) || 0; var selected = channels.filter(function (row) { return row.active; }); var totalReach = 0; var totalInvestment = 0; var totalImpressions = 0; var increments = []; selected.forEach(function (row) { var contacts = universe * (Number(row.pen) || 0) / 100; var impressions = row.cpm > 0 && row.investment > 0 ? row.investment / row.cpm * 1000 : contacts * 3.2; row.contacts = contacts; row.impressions = impressions; var overlap = totalReach * ((Number(row.affinity) || 100) / 100) * .32; var incremental = Math.max(0, contacts - overlap); increments.push({ name: row.name, incremental: incremental }); totalReach += incremental; totalInvestment += Number(row.investment) || 0; totalImpressions += impressions; }); renderRows(); renderWaterfall(increments, totalReach); renderEfficiency(selected); renderDonut(selected); var frequency = totalReach ? totalImpressions / totalReach : 0; document.getElementById("reachKpi").textContent = num(totalReach); document.getElementById("reachKpiSub").textContent = universe ? (totalReach / universe * 100).toFixed(1) + "% del universo" : "0% del universo"; document.getElementById("investmentKpi").textContent = money(totalInvestment); document.getElementById("frequencyKpi").textContent = frequency.toFixed(1) + "x"; document.getElementById("impressionsKpi").textContent = num(totalImpressions) + " impresiones"; document.getElementById("rowSummary").textContent = selected.length + " medios seleccionados"; }
    function updateRow(event) { var input = event.target; var row = channels[Number(input.getAttribute("data-index"))]; var field = input.getAttribute("data-field"); row[field] = input.type === "checkbox" ? input.checked : (input.type === "number" ? Number(input.value) : input.value); calculate(); }
    document.querySelectorAll(".mode-tab").forEach(function (tab) { tab.addEventListener("click", function () { document.querySelectorAll(".mode-tab").forEach(function (item) { item.classList.remove("is-active"); }); tab.classList.add("is-active"); showToast(tab.getAttribute("data-mode") === "investment" ? "Modo con inversion activado" : "Modo alcance de campana activado"); }); }); document.querySelectorAll("#universe,#coverage,#weeks,#sensitivity").forEach(function (input) { input.addEventListener("input", calculate); }); document.getElementById("resetButton").addEventListener("click", function () { location.reload(); }); document.getElementById("saveButton").addEventListener("click", function () { showToast("Plan de canales guardado"); }); document.getElementById("addChannel").addEventListener("click", function () { showToast("Puedes incorporar un medio desde la siguiente version"); }); calculate(); }
  function renderAudience() { document.getElementById("summaryGender").textContent = document.querySelector(".gender-option.is-selected").getAttribute("data-gender"); document.getElementById("summaryAge").textContent = document.getElementById("ageStart").value + " - " + document.getElementById("ageEnd").value; var nse = document.querySelectorAll(".nse-option.is-selected"); document.getElementById("summaryNse").textContent = nse.length ? Array.prototype.map.call(nse, function (item) { return item.getAttribute("data-nse"); }).join(", ") : "-"; document.getElementById("summaryZone").textContent = document.querySelector(".zone-option.is-selected").getAttribute("data-zone"); }
  document.querySelectorAll(".gender-option,.zone-option").forEach(function (button) { button.addEventListener("click", function () { var group = button.classList.contains("gender-option") ? ".gender-option" : ".zone-option"; document.querySelectorAll(group).forEach(function (item) { item.classList.remove("is-selected"); }); button.classList.add("is-selected"); renderAudience(); }); }); document.querySelectorAll(".nse-option").forEach(function (button) { button.addEventListener("click", function () { button.classList.toggle("is-selected"); renderAudience(); }); }); document.getElementById("applyAge").addEventListener("click", function () { renderAudience(); showToast("Rango de edad aplicado"); }); document.getElementById("clearFilters").addEventListener("click", function () { showToast("Filtros limpiados"); }); document.getElementById("cancelAudience").addEventListener("click", function () { showToast("Cambios cancelados"); }); document.getElementById("generateAudience").addEventListener("click", function () { showToast("Analisis de audiencia generado"); });
  document.querySelectorAll(".explorer-tab").forEach(function (tab) { tab.addEventListener("click", function () { var target = tab.getAttribute("data-insight"); document.querySelectorAll(".explorer-tab").forEach(function (item) { item.classList.remove("is-active"); }); document.querySelectorAll(".insight-view").forEach(function (view) { view.classList.add("view-hidden"); }); tab.classList.add("is-active"); document.getElementById(target + "View").classList.remove("view-hidden"); }); });
  var grid = document.getElementById("tacticGrid"); var list = document.getElementById("tacticChecklist"); tactics.forEach(function (name, index) { var card = document.createElement("button"); card.className = "tactic-card"; card.type = "button"; card.innerHTML = '<span class="tactic-icon glyph-message"></span><span class="tactic-copy"><strong>' + name + '</strong><small>Media que permite orientar el resultado de la campa&ntilde;a.</small></span><span class="card-check"></span>'; card.addEventListener("click", function () { selectedTactics[index] = !selectedTactics[index]; renderTactics(); }); grid.appendChild(card); var item = document.createElement("button"); item.className = "tactic-list-item"; item.type = "button"; item.innerHTML = '<span class="tactic-check"></span><span>' + name + '</span>'; item.addEventListener("click", function () { selectedTactics[index] = !selectedTactics[index]; renderTactics(); }); list.appendChild(item); });
  function renderTactics() { var count = selectedTactics.filter(Boolean).length; document.getElementById("selectedCount").textContent = count; document.getElementById("selectionStatus").textContent = count + (count === 1 ? " tactica seleccionada" : " tacticas seleccionadas"); document.querySelectorAll(".tactic-card").forEach(function (item, index) { item.classList.toggle("is-selected", selectedTactics[index]); }); document.querySelectorAll(".tactic-list-item").forEach(function (item, index) { item.classList.toggle("is-selected", selectedTactics[index]); }); document.getElementById("selectAll").textContent = count === tactics.length ? "DESELECT ALL" : "SELECT ALL"; }
  document.getElementById("selectAll").addEventListener("click", function () { var all = selectedTactics.every(Boolean); selectedTactics = tactics.map(function () { return !all; }); renderTactics(); }); document.getElementById("saveTactics").addEventListener("click", function () { showToast("Borrador de tacticas guardado"); }); document.getElementById("continueTactics").addEventListener("click", function () { showToast(selectedTactics.filter(Boolean).length + " tacticas listas para el plan"); }); var saveCampaign = document.getElementById("saveCampaign"); if (saveCampaign) saveCampaign.addEventListener("click", function () { showToast("Campaign guardada"); }); document.getElementById("nextCampaign");
  var mobileMenu = document.getElementById("mobileMenu"); var sidebar = document.getElementById("sidebar"); mobileMenu.addEventListener("click", function () { sidebar.classList.toggle("is-open"); }); document.querySelectorAll(".global-nav-link").forEach(function (link) { link.addEventListener("click", function () { sidebar.classList.remove("is-open"); }); }); renderAudience(); renderTactics(); initBudget(); switchView("campaign");
}());

/* Demo 12 removes menu sections that are outside the current planner scope. */
(function () {
  "use strict";
  document.querySelectorAll(".side-group").forEach(function (group) {
    var title = group.querySelector(".side-group-title");
    if (title && /Channel Reach|Planning Insights/.test(title.textContent)) group.remove();
  });
}());

/* Demo 12 keeps the four brief tabs and exposes the Demo 10 calculator as one budget step. */
(function () {
  "use strict";
  var channelNav = Array.prototype.find.call(document.querySelectorAll(".side-item"), function (item) {
    return item.textContent.indexOf("Channel Inputs") !== -1;
  });
  if (channelNav) channelNav.remove();

  var budgetNav = Array.prototype.find.call(document.querySelectorAll(".side-item"), function (item) {
    return item.textContent.indexOf("Budget Setting") !== -1;
  });
  if (budgetNav) {
    budgetNav.innerHTML = '<span class="item-icon budget-icon"></span>Budget Settings';
    budgetNav.classList.add("view-trigger");
    budgetNav.setAttribute("data-view", "budget");
  }

  var budgetHeading = document.getElementById("headingBudget");
  if (budgetHeading) {
    var heading = budgetHeading.querySelector("h1");
    if (heading) heading.innerHTML = 'Channel Inputs <span class="heading-divider">&amp;</span> Budget Settings';
  }
}());

/* Restore the complete Demo 3 Campaign questionnaire inside the integrated planner. */
(function () {
  "use strict";
  var campaignView = document.getElementById("campaignView");
  if (!campaignView) return;

  campaignView.innerHTML = `
    <div class="brief-toolbar card rounded shadow">
      <div class="campaign-name-field"><label for="campaignName">Nombre de la campa&ntilde;a</label><input id="campaignName" type="text" value="Prueba Aleph"></div>
      <div class="completion"><div class="completion-copy"><span>Configuraci&oacute;n del brief</span><strong id="completionValue">40% completo</strong></div><div class="progress-track"><span id="progressBar"></span></div></div>
      <div class="autosave"><span class="autosave-dot"></span><span id="saveStatus">Cambios sin guardar</span></div>
    </div>
    <form id="campaignForm">
      <section class="question-section card rounded shadow">
        <div class="section-heading"><div><span class="section-number">01</span><div><h2>Campaign</h2><p>Contexto general y objetivo de la campa&ntilde;a.</p></div></div><span class="section-state" id="campaignState">2 de 4 respondidas</span></div>
        <div class="question-grid">
          <div class="question-card text-question" data-complete="true"><label for="campaignObjective">&iquest;Cu&aacute;l es el objetivo principal de la campa&ntilde;a?</label><div class="select-wrap"><select id="campaignObjective"><option>Construir conocimiento de marca</option><option>Generar consideraci&oacute;n</option><option>Impulsar conversi&oacute;n</option></select></div><span class="field-hint">Selecciona una opci&oacute;n</span></div>
          <div class="question-card text-question" data-complete="true"><label for="campaignDuration">&iquest;Cu&aacute;l es la duraci&oacute;n aproximada?</label><div class="select-wrap"><select id="campaignDuration"><option>1 - 3 meses</option><option>4 - 6 meses</option><option>7 - 12 meses</option><option>M&aacute;s de 12 meses</option></select></div><span class="field-hint">Selecciona una opci&oacute;n</span></div>
          <div class="question-card range-question"><div class="question-label"><label for="conceptScale">&iquest;El concepto de la campa&ntilde;a es nuevo o conocido?</label><span class="info-mark">i</span></div><div class="range-value"><strong data-value-for="conceptScale">7</strong><span>/ 10</span></div><input id="conceptScale" type="range" min="1" max="10" value="7"><div class="scale-labels"><span>Conocido / viejo</span><span>Nuevo</span></div></div>
          <div class="question-card range-question"><div class="question-label"><label for="messageScale">&iquest;Qu&eacute; tan simple es el mensaje de campa&ntilde;a?</label><span class="info-mark">i</span></div><div class="range-value"><strong data-value-for="messageScale">6</strong><span>/ 10</span></div><input id="messageScale" type="range" min="1" max="10" value="6"><div class="scale-labels"><span>Complejo</span><span>Simple</span></div></div>
        </div>
      </section>
      <section class="question-section card rounded shadow">
        <div class="section-heading"><div><span class="section-number">02</span><div><h2>Category</h2><p>Competencia y comportamiento de la categor&iacute;a.</p></div></div><span class="section-state" id="categoryState">1 de 3 respondidas</span></div>
        <div class="question-grid">
          <div class="question-card range-question"><div class="question-label"><label for="competitionScale">&iquest;Cu&aacute;l es el nivel de competencia publicitaria?</label><span class="info-mark">i</span></div><div class="range-value"><strong data-value-for="competitionScale">8</strong><span>/ 10</span></div><input id="competitionScale" type="range" min="1" max="10" value="8"><div class="scale-labels"><span>Muy bajo</span><span>Muy alto</span></div></div>
          <div class="question-card range-question"><div class="question-label"><label for="categoryKnowledge">&iquest;Qu&eacute; tan madura es la categor&iacute;a?</label><span class="info-mark">i</span></div><div class="range-value"><strong data-value-for="categoryKnowledge">5</strong><span>/ 10</span></div><input id="categoryKnowledge" type="range" min="1" max="10" value="5"><div class="scale-labels"><span>Emergente</span><span>Madurez alta</span></div></div>
          <div class="question-card choice-question" data-complete="true"><div class="question-label"><label>&iquest;La categor&iacute;a tiene estacionalidad?</label><span class="info-mark">i</span></div><div class="choice-buttons"><button class="choice-button" type="button">S&iacute;</button><button class="choice-button is-selected" type="button">No</button></div><span class="field-hint">Respuesta cerrada</span></div>
        </div>
      </section>
      <section class="question-section card rounded shadow">
        <div class="section-heading"><div><span class="section-number">03</span><div><h2>Product</h2><p>Ciclo de vida y nivel de conocimiento del producto.</p></div></div><span class="section-state" id="productState">1 de 3 respondidas</span></div>
        <div class="question-grid">
          <div class="question-card choice-question" data-complete="true"><div class="question-label"><label>&iquest;El producto tiene un ciclo de vida definido?</label><span class="info-mark">i</span></div><div class="choice-buttons"><button class="choice-button is-selected" type="button">S&iacute;</button><button class="choice-button" type="button">No</button></div><span class="field-hint">Respuesta cerrada</span></div>
          <div class="question-card range-question"><div class="question-label"><label for="productKnowledge">&iquest;Cu&aacute;l es el nivel de conocimiento del producto?</label><span class="info-mark">i</span></div><div class="range-value"><strong data-value-for="productKnowledge">4</strong><span>/ 10</span></div><input id="productKnowledge" type="range" min="1" max="10" value="4"><div class="scale-labels"><span>Desconocido</span><span>Muy conocido</span></div></div>
          <div class="question-card text-question"><label for="productStage">&iquest;En qu&eacute; etapa se encuentra el producto?</label><div class="select-wrap"><select id="productStage"><option>Lanzamiento</option><option>Crecimiento</option><option>Madurez</option><option>Declive</option></select></div><span class="field-hint">Selecciona una opci&oacute;n</span></div>
        </div>
      </section>
      <div class="form-footer"><span><span class="required-dot"></span> Las respuestas alimentan las recomendaciones de Planning.</span><div><button class="button button-secondary" id="campaignResetButton" type="button">Restablecer</button><button class="button button-primary" type="submit">Guardar y continuar <span class="arrow-right">&#8594;</span></button></div></div>
    </form>`;

  var defaultValues = { conceptScale: 7, messageScale: 6, competitionScale: 8, categoryKnowledge: 5, productKnowledge: 4 };
  var toast = document.getElementById("toast");
  var toastTimer;

  function showCampaignToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2700);
  }

  function updateRange(input) {
    var percent = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
    input.style.setProperty("--range-progress", percent + "%");
    var output = campaignView.querySelector('[data-value-for="' + input.id + '"]');
    if (output) output.textContent = input.value;
  }

  function updateCompletion() {
    var cards = campaignView.querySelectorAll(".question-card");
    var answered = campaignView.querySelectorAll('.question-card[data-complete="true"]').length;
    var percent = Math.round((answered / cards.length) * 100);
    document.getElementById("completionValue").textContent = percent + "% completo";
    document.getElementById("progressBar").style.width = percent + "%";
    campaignView.querySelectorAll(".question-section").forEach(function (section) {
      var total = section.querySelectorAll(".question-card").length;
      var completed = section.querySelectorAll('.question-card[data-complete="true"]').length;
      section.querySelector(".section-state").textContent = completed + " de " + total + " respondidas";
    });
  }

  function setSaveStatus(message, saved) {
    document.getElementById("saveStatus").textContent = message;
    document.querySelector(".autosave-dot").style.background = saved ? "#43b987" : "#f1ae4a";
  }

  campaignView.querySelectorAll('input[type="range"]').forEach(function (input) {
    updateRange(input);
    input.addEventListener("input", function () {
      updateRange(input);
      input.closest(".question-card").setAttribute("data-complete", "true");
      updateCompletion();
      setSaveStatus("Cambios sin guardar", false);
    });
  });
  campaignView.querySelectorAll("select").forEach(function (select) {
    select.addEventListener("change", function () {
      select.closest(".question-card").setAttribute("data-complete", "true");
      updateCompletion();
      setSaveStatus("Cambios sin guardar", false);
    });
  });
  campaignView.querySelectorAll(".choice-buttons").forEach(function (group) {
    group.querySelectorAll(".choice-button").forEach(function (button) {
      button.addEventListener("click", function () {
        group.querySelectorAll(".choice-button").forEach(function (entry) { entry.classList.remove("is-selected"); });
        button.classList.add("is-selected");
        group.closest(".question-card").setAttribute("data-complete", "true");
        updateCompletion();
        setSaveStatus("Cambios sin guardar", false);
      });
    });
  });
  document.getElementById("campaignName").addEventListener("input", function () { setSaveStatus("Cambios sin guardar", false); });
  document.getElementById("campaignForm").addEventListener("submit", function (event) {
    event.preventDefault();
    setSaveStatus("Guardado hace un momento", true);
    showCampaignToast("Campaign configurada. Lista para continuar");
  });
  document.getElementById("campaignResetButton").addEventListener("click", function () {
    Object.keys(defaultValues).forEach(function (id) {
      var input = document.getElementById(id);
      input.value = defaultValues[id];
      input.closest(".question-card").setAttribute("data-complete", "false");
      updateRange(input);
    });
    campaignView.querySelectorAll("select").forEach(function (select) { select.selectedIndex = 0; });
    campaignView.querySelectorAll(".choice-buttons").forEach(function (group, index) {
      group.querySelectorAll(".choice-button").forEach(function (button) { button.classList.remove("is-selected"); });
      group.querySelectorAll(".choice-button")[index === 0 ? 1 : 0].classList.add("is-selected");
      group.closest(".question-card").setAttribute("data-complete", "true");
    });
    updateCompletion();
    setSaveStatus("Cambios sin guardar", false);
    showCampaignToast("Respuestas restablecidas");
  });
  updateCompletion();
}());
