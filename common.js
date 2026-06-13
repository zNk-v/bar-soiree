// ============================================================
//  Connexion Supabase + helpers partagés (invité & hôte)
// ============================================================

const SB_READY =
  window.SUPABASE_URL &&
  window.SUPABASE_ANON_KEY &&
  !window.SUPABASE_URL.includes("TON-PROJET") &&
  !window.SUPABASE_ANON_KEY.includes("TA_CLE");

let sb = null;
if (SB_READY) {
  sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
    realtime: { params: { eventsPerSecond: 10 } },
  });
}

// Statuts
const STATUS = { WAITING: "waiting", PREPARING: "preparing", READY: "ready", DONE: "done" };
const STATUS_LABEL = {
  waiting: "En attente",
  preparing: "En préparation",
  ready: "PRÊTE",
  done: "Servie",
};

// id de boisson -> infos d'affichage
function drinkInfo(id) {
  return (
    window.MENU_INDEX[id] || { name: id, emoji: "🍹", img: null, accent: "#B08543", accentSoft: "#EBD9C6" }
  );
}

// Vignette (photo si dispo, sinon emoji)
function thumbHTML(id) {
  const d = drinkInfo(id);
  const inner = d.img ? `<img src="${d.img}" alt="">` : d.emoji;
  return `<div class="thumb" style="--accent-soft:${d.accentSoft}">${inner}</div>`;
}

// Affiche un petit message en bas de l'écran
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

// Bannière d'erreur si la config Supabase manque
function requireConfig() {
  if (SB_READY) return true;
  const b = document.createElement("div");
  b.className = "banner-warn";
  b.innerHTML =
    "⚠️ Supabase pas encore configuré. Ouvre <b>config.js</b> et colle ton " +
    "<b>Project URL</b> et ta clé <b>anon public</b>. (Voir README-SETUP.md)";
  document.querySelector(".app")?.prepend(b);
  return false;
}

// Son de notification (bip synthétique, aucun fichier requis)
let _audioCtx = null;
function playChime() {
  try {
    _audioCtx = _audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _audioCtx;
    if (ctx.state === "suspended") ctx.resume();
    const notes = [880, 1108, 1320]; // la — do# — mi
    notes.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      const t = ctx.currentTime + i * 0.16;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.35, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.45);
    });
  } catch (e) {
    /* silencieux */
  }
}
function buzz() {
  if (navigator.vibrate) navigator.vibrate([220, 90, 220, 90, 320]);
}
