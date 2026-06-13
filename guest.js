// ============================================================
//  VUE INVITÉ
// ============================================================
(function () {
  const ok = requireConfig();

  document.getElementById("party-name-1").textContent = window.PARTY_NAME || "La Villa";

  // identité invité (persistée sur le téléphone)
  function uuid() {
    return (crypto.randomUUID && crypto.randomUUID()) ||
      "g-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
  let guestId = localStorage.getItem("bar_guest_id");
  if (!guestId) { guestId = uuid(); localStorage.setItem("bar_guest_id", guestId); }
  let guestName = localStorage.getItem("bar_guest_name") || "";

  // panier en cours { drinkId: qty }
  const cart = {};
  // alertes déjà acquittées (pour ne pas re-sonner au rechargement)
  const acked = new Set(JSON.parse(localStorage.getItem("bar_acked") || "[]"));
  const saveAcked = () => localStorage.setItem("bar_acked", JSON.stringify([...acked]));

  let myOrders = []; // lignes de commande de cet invité

  // ---------- navigation entre écrans ----------
  const screens = {
    welcome: document.getElementById("screen-welcome"),
    menu: document.getElementById("screen-menu"),
    order: document.getElementById("screen-order"),
  };
  function show(name) {
    Object.entries(screens).forEach(([k, el]) => el.classList.toggle("hidden", k !== name));
    document.getElementById("cartbar").classList.toggle("hidden", name !== "menu" || cartCount() === 0);
    window.scrollTo(0, 0);
  }

  // ---------- ÉCRAN ACCUEIL ----------
  const nameInput = document.getElementById("name");
  nameInput.value = guestName;
  function enter() {
    const v = nameInput.value.trim();
    if (!v) { nameInput.focus(); return; }
    guestName = v;
    localStorage.setItem("bar_guest_name", guestName);
    document.getElementById("hello").textContent = "Bonsoir " + guestName;
    document.getElementById("order-hello").textContent = guestName;
    show("menu");
  }
  document.getElementById("enter-btn").addEventListener("click", enter);
  nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") enter(); });

  // ---------- ÉCRAN MENU (univers + accordéon) ----------
  const universeTabsEl = document.getElementById("universe-tabs");
  const accordionEl = document.getElementById("accordion");

  // univers dans l'ordre d'apparition
  const universes = [];
  window.MENU.forEach((cat) => {
    const u = cat.universe || "Boissons";
    if (!universes.includes(u)) universes.push(u);
  });
  const UNIVERSE_ICON = { Boissons: "🍸", Desserts: "🍰" };
  let currentUniverse = universes[0];

  universes.forEach((u) => {
    const tab = document.createElement("button");
    tab.className = "utab";
    tab.dataset.universe = u;
    tab.setAttribute("role", "tab");
    tab.innerHTML = `<span class="ui">${UNIVERSE_ICON[u] || "•"}</span><span>${u}</span>`;
    tab.addEventListener("click", () => selectUniverse(u));
    universeTabsEl.appendChild(tab);
  });

  function selectUniverse(u) {
    currentUniverse = u;
    document.querySelectorAll(".utab").forEach((t) =>
      t.setAttribute("aria-selected", t.dataset.universe === u ? "true" : "false"));
    renderAccordion();
  }

  // construit une carte de boisson (réutilisable)
  function buildCard(d, cat) {
    const el = document.createElement("div");
    el.className = "drink";
    el.id = "card-" + d.id;
    el.style.setProperty("--accent", cat.accent);
    el.style.setProperty("--accent-soft", cat.accentSoft);
    renderCard(el, d, cat);
    return el;
  }

  function renderAccordion() {
    accordionEl.innerHTML = "";
    window.MENU.filter((cat) => (cat.universe || "Boissons") === currentUniverse)
      .forEach((cat) => {
        const item = document.createElement("div");
        item.className = "acc-item";
        item.style.setProperty("--accent", cat.accent);

        const head = document.createElement("button");
        head.className = "acc-head";
        head.setAttribute("aria-expanded", "false");
        head.innerHTML =
          `<span class="swatch" style="background:${cat.accent}"></span>
           <span class="acc-ic">${cat.icon}</span>
           <span class="acc-name">${cat.category}</span>
           <span class="acc-count">${cat.drinks.length}</span>
           <span class="chev">⌄</span>`;

        const panel = document.createElement("div");
        panel.className = "acc-panel";
        const grid = document.createElement("div");
        grid.className = "drink-grid";
        cat.drinks.forEach((d) => grid.appendChild(buildCard(d, cat)));
        panel.appendChild(grid);

        head.addEventListener("click", () => {
          const open = head.getAttribute("aria-expanded") === "true";
          head.setAttribute("aria-expanded", open ? "false" : "true");
          panel.classList.toggle("open", !open);
        });

        item.appendChild(head);
        item.appendChild(panel);
        accordionEl.appendChild(item);
      });
  }

  selectUniverse(currentUniverse); // affiche le 1er univers, tout replié

  function renderCard(el, d, cat) {
    const q = cart[d.id] || 0;
    el.classList.toggle("has-qty", q > 0);
    const thumbInner = d.img ? `<img src="${d.img}" alt="">` : d.emoji;
    el.innerHTML =
      `${q > 0 ? `<div class="badge">${q}</div>` : ""}
       <div class="thumb" style="background:${cat.accentSoft}">${thumbInner}</div>
       <div class="dname">${d.name}</div>
       ${
         q > 0
           ? `<div class="stepper">
                <button data-act="minus" aria-label="moins">–</button>
                <span class="count">${q}</span>
                <button data-act="plus" aria-label="plus">+</button>
              </div>`
           : ""
       }`;
    // clic sur la carte (hors stepper) = +1
    el.onclick = (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "minus") setQty(d, cat, q - 1);
      else if (act === "plus") setQty(d, cat, q + 1);
      else if (!q) setQty(d, cat, 1);
    };
  }

  function setQty(d, cat, n) {
    n = Math.max(0, Math.min(20, n));
    if (n === 0) delete cart[d.id]; else cart[d.id] = n;
    renderCard(document.getElementById("card-" + d.id), d, cat);
    refreshCart();
  }
  function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function refreshCart() {
    const n = cartCount();
    document.getElementById("cart-count").textContent = n;
    document.getElementById("cartbar").classList.toggle("hidden", n === 0);
  }

  // ---------- VALIDER ----------
  document.getElementById("validate-btn").addEventListener("click", async () => {
    if (!ok) { toast("Supabase non configuré"); return; }
    if (cartCount() === 0) return;
    const rows = Object.entries(cart).map(([id, qty]) => ({
      guest_id: guestId,
      guest_name: guestName,
      drink_id: id,
      drink_name: drinkInfo(id).name,
      category: drinkInfo(id).category,
      quantity: qty,
      status: STATUS.WAITING,
    }));
    const btn = document.getElementById("validate-btn");
    btn.disabled = true;
    const { error } = await sb.from("orders").insert(rows);
    btn.disabled = false;
    if (error) { toast("Erreur, réessaie"); console.error(error); return; }
    Object.keys(cart).forEach((k) => delete cart[k]);
    document.querySelectorAll(".drink").forEach((el) => {
      const id = el.id.replace("card-", "");
      const info = drinkInfo(id);
      const cat = window.MENU.find((c) => c.category === info.category);
      renderCard(el, { id, name: info.name, emoji: info.emoji, img: info.img }, cat);
    });
    refreshCart();
    toast("Commande envoyée 🥂");
    show("order");
  });

  document.getElementById("see-order-link").addEventListener("click", () => show("order"));
  document.getElementById("add-more-btn").addEventListener("click", () => show("menu"));

  // ---------- ÉCRAN MA COMMANDE ----------
  function renderOrders() {
    const list = document.getElementById("order-list");
    const active = myOrders
      .slice()
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    if (active.length === 0) {
      list.innerHTML = `<div class="empty"><div class="big">🍸</div>Aucune boisson commandée pour l'instant.</div>`;
      return;
    }
    list.innerHTML = active
      .map((o) => {
        const d = drinkInfo(o.drink_id);
        const cls = { waiting: "s-waiting", preparing: "s-preparing", ready: "s-ready", done: "s-done" }[o.status];
        return `<div class="order-line">
          ${thumbHTML(o.drink_id)}
          <div class="meta">
            <div class="n">${d.name}</div>
            <div class="q">Quantité : ${o.quantity}</div>
          </div>
          <div class="status-pill ${cls}">${STATUS_LABEL[o.status]}</div>
        </div>`;
      })
      .join("");
  }

  // ---------- ALERTE PRÊT ----------
  const alertEl = document.getElementById("alert");
  let alertQueue = [];
  function queueAlert(order) {
    if (acked.has(order.id)) return;
    alertQueue.push(order);
    if (!alertEl.classList.contains("show")) showNextAlert();
  }
  function showNextAlert() {
    const next = alertQueue.shift();
    if (!next) return;
    document.getElementById("alert-drink").textContent = drinkInfo(next.drink_id).name +
      (next.quantity > 1 ? ` ×${next.quantity}` : "");
    alertEl.classList.add("show");
    alertEl.dataset.orderId = next.id;
    playChime();
    buzz();
  }
  document.getElementById("alert-ok").addEventListener("click", () => {
    const id = alertEl.dataset.orderId;
    if (id) { acked.add(id); saveAcked(); }
    alertEl.classList.remove("show");
    if (navigator.vibrate) navigator.vibrate(0);
    if (alertQueue.length) setTimeout(showNextAlert, 350);
    else show("order");
  });

  // ---------- DONNÉES + REALTIME ----------
  async function loadMine() {
    if (!ok) return;
    const { data, error } = await sb
      .from("orders")
      .select("*")
      .eq("guest_id", guestId)
      .neq("status", STATUS.DONE)
      .order("created_at");
    if (error) { console.error(error); return; }
    myOrders = data || [];
    renderOrders();
    // au chargement : alerter pour les "prêtes" non encore acquittées
    myOrders.filter((o) => o.status === STATUS.READY).forEach(queueAlert);
  }

  function upsertLocal(row) {
    const i = myOrders.findIndex((o) => o.id === row.id);
    if (row.status === STATUS.DONE) {
      if (i >= 0) myOrders.splice(i, 1);
    } else if (i >= 0) myOrders[i] = row;
    else myOrders.push(row);
  }

  if (ok) {
    loadMine();
    sb.channel("orders-guest")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        const row = payload.new || payload.old;
        if (!row || row.guest_id !== guestId) return;
        if (payload.eventType === "DELETE") {
          myOrders = myOrders.filter((o) => o.id !== row.id);
        } else {
          const prev = myOrders.find((o) => o.id === row.id);
          upsertLocal(row);
          // transition vers PRÊTE -> alerte
          if (row.status === STATUS.READY && (!prev || prev.status !== STATUS.READY)) {
            queueAlert(row);
          }
        }
        renderOrders();
      })
      .subscribe();
  }

  // si déjà un prénom enregistré, on garde l'accueil mais pré-rempli (l'invité peut ré-entrer)
  if (guestName) {
    document.getElementById("hello").textContent = "Bonsoir " + guestName;
    document.getElementById("order-hello").textContent = guestName;
  }
})();
