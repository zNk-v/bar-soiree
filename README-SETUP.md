# 🍹 Bar de soirée — mode d'emploi

Appli de commande de boissons avec QR code et synchro temps réel.
Deux écrans : **invité** (tes potes) et **hôte** (toi).

Il y a **3 étapes** pour la mettre en ligne. ~10 minutes, zéro code à écrire.

---

## Étape 1 — Créer le backend Supabase (gratuit)

1. Va sur **https://supabase.com** → *Start your project* → connecte-toi (Google/GitHub).
2. **New project**. Donne un nom (ex: `soiree`), choisis une région **Europe (Frankfurt)**,
   note le mot de passe de la base (tu n'en auras pas besoin ici), puis **Create**.
3. Attends ~1 min que le projet soit prêt.

### Créer la table
4. Menu de gauche → **SQL Editor** → **New query**.
5. Ouvre le fichier **`supabase-schema.sql`** (dans ce dossier), **copie tout** son contenu,
   colle-le dans la fenêtre, puis clique **Run** (en bas à droite).
   → Tu dois voir « Success ». La table `orders` est créée et le temps réel activé.

### Récupérer tes 2 clés
6. Menu de gauche → **Project Settings** (la roue crantée) → **Data API**.
7. Copie deux choses :
   - **Project URL** (ex: `https://abcd1234.supabase.co`)
   - **Project API keys → `anon` `public`** (une longue clé qui commence par `eyJ...`)

---

## Étape 2 — Coller tes clés dans l'appli

1. Ouvre le fichier **`config.js`** (clic droit → ouvrir avec TextEdit, ou dans ton éditeur).
2. Remplace les deux valeurs entre guillemets :
   ```js
   window.SUPABASE_URL = "https://abcd1234.supabase.co";   // ← ton Project URL
   window.SUPABASE_ANON_KEY = "eyJ...la longue clé...";    // ← ta clé anon public
   ```
3. (Optionnel) change `window.PARTY_NAME` pour le nom de ta soirée.
4. Enregistre le fichier.

> ✅ Pas de risque de sécurité : la clé `anon` est faite pour être publique côté navigateur.

---

## Étape 3 — Mettre en ligne (GitHub Pages, gratuit)

Tu utilises déjà GitHub Pages pour vidalozzi.fr, donc c'est le plus simple.

**Option A — un nouveau repo dédié :**
1. Crée un repo GitHub (ex: `bar-soiree`), **Public**.
2. Glisse **tous les fichiers de ce dossier** dedans (bouton *Add file → Upload files*).
3. Repo → **Settings → Pages** → *Build and deployment → Source : Deploy from a branch*,
   branche `main`, dossier `/ (root)` → **Save**.
4. Attends 1-2 min. Ton appli est à :
   - **Invité :** `https://TON-PSEUDO.github.io/bar-soiree/`
   - **Hôte :**   `https://TON-PSEUDO.github.io/bar-soiree/admin.html`

**Option B — dans ton site existant :** mets ce dossier dans le repo `vidalozzi.fr`
(ex: sous `/bar/`), et tu y accèdes via `https://vidalozzi.fr/bar/` et `.../bar/admin.html`.

---

## Le soir de la soirée

1. Sur ton téléphone, ouvre l'écran **hôte** (`…/admin.html`).
2. Clique **▣ QR code** → montre-le en grand → fais-en une capture ou imprime-le, pose-le sur la table.
3. Les invités scannent → entrent leur prénom → commandent.
4. Toi tu vois tout arriver. Sur chaque ligne :
   - **Préparer** → la boisson passe « en préparation »
   - **Prêt 🔔** → l'invité reçoit une alerte plein écran + son + vibration
   - **Servi ✓** → la ligne disparaît de ta file
5. Tu peux trier **Chronologique / Par invité / Par boisson** en haut.

---

## Mettre tes propres photos de bouteilles (plus tard)

1. Mets tes photos dans le dossier **`img/`** (ex: `img/ricard.jpg`).
2. Ouvre **`menu.js`**, et sur la boisson concernée remplace `img: null` par le chemin :
   ```js
   { id: "ricard", name: "Ricard", emoji: "🥃", img: "img/ricard.jpg" },
   ```
   Tant qu'une boisson n'a pas de photo, son emoji s'affiche. Rien d'autre à toucher.

---

## Repartir à zéro entre deux soirées

Supabase → **SQL Editor** → tape `truncate table public.orders;` → **Run**.
Toutes les commandes sont effacées.

---

### Fichiers du projet
| Fichier | Rôle |
|---|---|
| `index.html` + `guest.js` | écran **invité** (QR) |
| `admin.html` + `admin.js` | écran **hôte** |
| `config.js` | **tes clés Supabase** (à remplir) |
| `menu.js` | la carte des boissons (+ tes photos) |
| `common.js` / `style.css` | logique + design partagés |
| `supabase-schema.sql` | à coller une fois dans Supabase |
