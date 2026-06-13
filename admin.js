// ============================================================
//  VUE HÔTE  (/admin.html)
// ============================================================
(function () {
  const ok = requireConfig();
  document.getElementById("party-name").textContent = window.PARTY_NAME || "La Villa";

  let orders = [];           // toutes les commandes actives (non servies)
  let mode = "time";         // time | guest | drink

  // ---------- regroupement / tri ----------
  document.getElementById("seg").addEventListener("click", (e) => {
    const b = e.target.closest("[data-mode]");
    if (!b) return;
    mode = b.dataset.mode;
    document.querySelectorAll("#seg button").forEach((x) =>
      x.setAttribute("aria-selected", x === b ? "true" : "false"));
    render();
  });

  function advance(o) {
    const next = { waiting: STATUS.PREPARING, preparing: STATUS.READY, ready: STATUS.DONE }[o.status];
    if (next) updateStatus(o, next);
  }
  async function updateStatus(o, status) {
    if (!ok) return;
    // maj optimiste
    const local = orders.find((x) => x.id === o.id);
    const prev = local ? local.status : o.status;
    if (local) local.status = status;
    render();
    const { error } = await sb.from("orders").update({ status }).eq("id", o.id);
    if (error) { if (local) local.status = prev; render(); toast("Erreur réseau"); }
    else if (status === STATUS.READY) toast("🔔 " + o.guest_name + " est prévenu·e");
  }
  async function removeOrder(o) {
    if (!ok) return;
    orders = orders.filter((x) => x.id !== o.id);
    render();
    await sb.from("orders").delete().eq("id", o.id);
  }

  // ---------- rendu d'une ligne ----------
  function lineHTML(o) {
    const d = drinkInfo(o.drink_id);
    const stateCls = { waiting: "s-waiting", preparing: "s-preparing", ready: "s-ready" }[o.status];
    let actionBtn = "";
    if (o.status === STATUS.WAITING)
      actionBtn = `<button class="mini go" data-act="advance">Préparer</button>`;
    else if (o.status === STATUS.PREPARING)
      actionBtn = `<button class="mini ready" data-act="advance">Prêt 🔔</button>`;
    else if (o.status === STATUS.READY)
      actionBtn = `<button class="mini" data-act="advance">Servi ✓</button>`;

    return `<div class="host-line" data-id="${o.id}">
      <span class="dot" style="background:${d.accent}"></span>
      <div class="info">
        <div class="top"><span class="qty">${o.quantity}×</span> ${d.name}</div>
        <div class="sub">${o.guest_name} · <span class="status-pill ${stateCls}" style="padding:2px 8px">${STATUS_LABEL[o.status]}</span></div>
      </div>
      <div class="act">
        ${actionBtn}
        <button class="mini x" data-act="remove" aria-label="supprimer">✕</button>
      </div>
    </div>`;
  }

  function groupBlock(title, icon, list) {
    const rows = list.map(lineHTML).join("");
    return `<div class="group-h">${icon ? icon + " " : ""}${title}<span class="pill-n">${list.length}</span></div>
            <div class="card">${rows}</div>`;
  }

  function render() {
    // compteur "en attente" = statut waiting
    document.getElementById("pending-count").textContent =
      orders.filter((o) => o.status === STATUS.WAITING).length;

    const queue = document.getElementById("queue");
    if (orders.length === 0) {
      queue.innerHTML = `<div class="empty"><div class="big">🛎️</div>Aucune commande pour l'instant.<br>Affiche le QR code sur la table.</div>`;
      return;
    }

    // ordre de priorité d'affichage des statuts
    const rank = { preparing: 0, waiting: 1, ready: 2 };
    let html = "";

    if (mode === "time") {
      const sorted = orders.slice().sort((a, b) => {
        if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
        return new Date(a.created_at) - new Date(b.created_at);
      });
      html = `<div class="card" style="margin-top:8px">${sorted.map(lineHTML).join("")}</div>`;
    } else if (mode === "guest") {
      const groups = {};
      orders.forEach((o) => (groups[o.guest_name] = groups[o.guest_name] || []).push(o));
      html = Object.keys(groups).sort((a, b) => a.localeCompare(b))
        .map((g) => groupBlock(g, "🧑", sortByTime(groups[g]))).join("");
    } else {
      const groups = {};
      orders.forEach((o) => (groups[o.drink_id] = groups[o.drink_id] || []).push(o));
      html = Object.keys(groups)
        .sort((a, b) => drinkInfo(a).name.localeCompare(drinkInfo(b).name))
        .map((id) => groupBlock(drinkInfo(id).name, drinkInfo(id).catIcon, sortByTime(groups[id])))
        .join("");
    }
    queue.innerHTML = html;
  }
  function sortByTime(list) {
    return list.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  // délégation des clics sur les boutons de ligne
  document.getElementById("queue").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const id = btn.closest(".host-line").dataset.id;
    const o = orders.find((x) => x.id === id);
    if (!o) return;
    if (btn.dataset.act === "advance") advance(o);
    else if (btn.dataset.act === "remove") removeOrder(o);
  });

  // ---------- données + realtime ----------
  async function loadAll() {
    if (!ok) return;
    const { data, error } = await sb
      .from("orders").select("*").neq("status", STATUS.DONE).order("created_at");
    if (error) { console.error(error); toast("Erreur de chargement"); return; }
    orders = data || [];
    render();
  }
  render(); // affiche l'état vide tout de suite
  if (ok) {
    loadAll();
    sb.channel("orders-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        const row = payload.new || payload.old;
        if (payload.eventType === "INSERT") {
          if (!orders.some((o) => o.id === row.id)) { orders.push(row); toast("Nouvelle commande · " + row.guest_name); }
        } else if (payload.eventType === "UPDATE") {
          const i = orders.findIndex((o) => o.id === row.id);
          if (row.status === STATUS.DONE) { if (i >= 0) orders.splice(i, 1); }
          else if (i >= 0) orders[i] = row; else orders.push(row);
        } else if (payload.eventType === "DELETE") {
          orders = orders.filter((o) => o.id !== row.id);
        }
        render();
      })
      .subscribe();
  }

  // ---------- QR code ----------
  const qrScreen = document.getElementById("qr");
  function guestUrl() {
    // URL de la vue invité = même dossier, fichier index.html
    let p = location.pathname.replace(/admin\.html?$/i, "").replace(/admin\/?$/i, "");
    if (!p.endsWith("/")) p += "/";
    return location.origin + p + "index.html";
  }
  document.getElementById("qr-btn").addEventListener("click", () => {
    const url = guestUrl();
    const box = document.getElementById("qr-box");
    box.innerHTML = "";
    new QRCode(box, { text: url, width: 260, height: 260, colorDark: "#2B2620", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
    document.getElementById("qr-url").textContent = url;
    qrScreen.classList.add("show");
  });
  document.getElementById("qr-close").addEventListener("click", () => qrScreen.classList.remove("show"));
})();
