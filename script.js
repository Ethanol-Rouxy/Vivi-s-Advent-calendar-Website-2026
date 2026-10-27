/* =====================================================================
   ✏️  ZONE À PERSONNALISER — tout ce que tu peux changer est ICI
   Modifie uniquement le texte entre les guillemets "..."
   (Attention : garde bien les guillemets et les virgules en fin de ligne.)
   ===================================================================== */
const CONTENU = {

  titrePage: "Pour la plus belle ♡",

  // Le ruban qui défile en continu (toi & moi, un surnom, un mot à vous...)
  bandeau: "Vivi & Ethanou ✦",

  // ÉTAPE 1 — L'écran d'ouverture
  ouverture: {
    titre: "J'ai quelque chose pour toi...",
    texte: "J'avais envie de te préparer un petit quelque chose. Prends quelques minutes et installe-toi confortablement",
    bouton: "Découvrir"
  },

  // ÉTAPE 2 — Les photos (de 4 à 6). Pour ajouter une photo, copie un bloc { ... }.
  //   src     = chemin de la photo     alt = description (pour l'accessibilité)
  //   legende = petit texte sous la photo
  souvenirs: {
    titre: "Quelques petits morceaux de nous",
    indice: "Fais défiler doucement ↓",
    photos: [
      { src: "assets/photos/photo1.jpg", alt: "Nous deux, souvenir 1", legende: "Un de ces moments que j'aimerais revivre." },
      { src: "assets/photos/photo2.jpg", alt: "Nous deux, souvenir 2", legende: "Un de nos premier souvenir ensemble." },
      { src: "assets/photos/photo3.jpg", alt: "Nous deux, souvenir 3", legende: "Même les moments les plus simples deviennent spéciaux avec toi." },
      { src: "assets/photos/photo4.jpg", alt: "Nous deux, souvenir 4", legende: "Une photo parmi plein de souvenirs que j'aime." },
      { src: "assets/photos/photo5.jpg", alt: "Nous deux, souvenir 5", legende: "Pendant ces moments j'ai l'impression que le temps s'arrête." }
    ]
  },

  // INTERLUDE — Compteur de jours ensemble
  //   ⚠️ METS TA VRAIE DATE (format AAAA-MM-JJ). Si tu mets "" (vide), cette partie disparaît.
  temps: {
    date: "2026-07-04",
    avant: "Depuis le jour où on s'est rencontrés, il s'est passé",
    unite: "jours",
    apres: "et j'ai encore envie d'en compter plein avec toi."
  },

  // ÉTAPE 3 — La lettre (un texte = un paragraphe)
  lettre: {
    titre: "Ce que je voulais te dire",
    paragraphes: [
      "Je ne suis pas très doué pour faire des trucs à la main, alors j'ai eu envie de te faire quelque chose que je sais bien faire. Je voulais te rappeler que tu comptes énormément pour moi, beaucoup plus que puisses le penser. J'aime absolument tous les moments qu'on partage, les petites choses qu'on fait ensemble et tous ces petits souvenirs qu'on construit sans même s'en rendre compte.",
      "Je suis vraiment heureux de t'avoir dans ma vie, et j'espère qu'on aura encore plein de magnifiques moments à vivre ensemble (des moments aussi magnigiques que toi)."
    ],
    signature: "— Ton petit roux"   // ← remplace par ton prénom
  },

  // ÉTAPE 4 — Les trois cœurs
  question: {
    titre: "J'ai une petite question pour toi...",
    intro: "Choisis un cœur, un seul, pour découvrir ce qu'il cache.",
    coeurs: [
      { message: "Une chose que j'adore chez toi : ta façon de me faire sourire." },
      { message: "Un petit souhait : qu'on continue à créer plein de souvenirs ensemble jusqu'à notre mort." },
      { message: "Une promesse : je resterai toujours à tes côtés." }
    ],
    continuer: "Continuer"
  },

  // ÉTAPE 5 — Le message audio
  audio: {
    intro1: "Et pour finir, j'avais envie que tu puisses entendre quelque chose directement de moi.",
    intro2: "J'ai enregistré un petit message spécialement pour toi. \nAlors active le son.",
    bouton: "Écouter mon message ♡",
    fichier: "assets/audio/mon-message.mp3",   // ← chemin de ton enregistrement
    erreur: "Oups, je n'arrive pas à lire l'enregistrement pour le moment. Vérifie ta connexion et réessaie. Si ça ne marche toujours pas, tu peux passer à la suite : je te le ferai écouter de vive voix. ♡",
    passer: "Passer à la suite"
  },

  // ÉTAPE 6 — La fin
  fin: {
    photo: { src: "assets/photos/photo-finale.jpg", alt: "Nous deux, la dernière photo", legende: "" },
    phrase: "Si j'oubliais absolument tout, je retomberais à coup sur amoureux de toi. ♡",
    merci: "Merci d'être toi. JE T'AIIIIIIIIIIME."
  }
};
/* =====================================================================
   FIN DE LA ZONE À PERSONNALISER — en dessous, c'est le moteur du site.
   ===================================================================== */

const $ = s => document.querySelector(s);
// true si le téléphone demande de réduire les animations
const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasard = (a, b) => a + Math.random() * (b - a);
const lire = chemin => chemin.split('.').reduce((o, k) => o && o[k], CONTENU);
function el(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt) e.textContent = txt;
  return e;
}
function defiler(cible) {
  cible.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' });
}

// Remplit tous les éléments marqués data-t="..." avec les textes ci-dessus
document.querySelectorAll('[data-t]').forEach(e => { e.textContent = lire(e.dataset.t); });
document.title = CONTENU.titrePage;

// ---------- Apparition au défilement ----------
const observateur = ('IntersectionObserver' in window && !reduit)
  ? new IntersectionObserver(entrees => {
      entrees.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('vu'); observateur.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' })
  : null;
function reveler(e) { observateur ? observateur.observe(e) : e.classList.add('vu'); }

// Découpe un texte en mots pour les faire apparaître un par un
function decouper(e) {
  const mots = e.textContent.trim().split(/\s+/);
  e.textContent = '';
  e.classList.add('mots');
  mots.forEach((m, i) => {
    const s = el('span', 'mot', m);
    s.style.setProperty('--i', i);
    e.append(s, ' ');
  });
}

// Petits cœurs qui jaillissent à un endroit de l'écran
function eclat(x, y) {
  if (reduit) return;
  for (let i = 0; i < 12; i++) {
    const s = el('span', 'eclat', '♥');
    const a = i / 12 * Math.PI * 2, d = hasard(50, 110);
    s.style.left = x + 'px'; s.style.top = y + 'px';
    s.style.setProperty('--dx', Math.cos(a) * d + 'px');
    s.style.setProperty('--dy', Math.sin(a) * d + 'px');
    document.body.append(s);
    setTimeout(() => s.remove(), 1000);
  }
}

// ---------- Photos : cadre élégant, légende, cadre de remplacement si l'image manque ----------
function creerPhoto(p) {
  const fig = el('figure', 'photo');
  const img = new Image();
  img.alt = p.alt; img.loading = 'lazy'; img.decoding = 'async';
  img.onload = () => fig.classList.add('charge');
  img.onerror = () => {
    const m = el('div', 'manque');
    m.setAttribute('role', 'img'); m.setAttribute('aria-label', 'Photo à ajouter');
    m.append(el('span', '', '♡'), el('small', '', 'Photo à ajouter'));
    img.replaceWith(m); fig.classList.add('charge');
  };
  img.src = p.src;
  fig.append(img);
  if (p.legende) fig.append(el('figcaption', '', p.legende));
  fig.addEventListener('click', e => eclat(e.clientX, e.clientY));   // petit bonus : toucher une photo fait jaillir des cœurs
  return fig;
}

// ---------- Construction de la page ----------
CONTENU.souvenirs.photos.forEach(p => $('#album').append(creerPhoto(p)));
CONTENU.lettre.paragraphes.forEach(t => $('#lettre-texte').append(el('p', '', t)));
$('#fin-photo').append(creerPhoto(CONTENU.fin.photo));
// Rubans qui défilent
document.querySelectorAll('.bandeau').forEach(b => {
  const piste = el('div', 'piste');
  for (let g = 0; g < 2; g++) {
    const grp = el('div', 'groupe');
    for (let i = 0; i < 6; i++) grp.append(el('span', '', CONTENU.bandeau));
    piste.append(grp);
  }
  b.append(piste);
});
// Compteur de jours : les chiffres défilent quand elle arrive dessus
const jours = Math.floor((Date.now() - new Date(CONTENU.temps.date + 'T00:00:00')) / 864e5);
if (!CONTENU.temps.date || isNaN(jours) || jours < 0) {
  $('#temps').remove();
} else {
  const n = $('#nombre');
  if (reduit || !('IntersectionObserver' in window)) { n.textContent = jours; }
  else {
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      (function pas(t) {
        const k = Math.min(1, (t - t0) / 2200);
        n.textContent = Math.round(jours * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(pas);
      })(t0);
    }, { threshold: 0.6 });
    io.observe(n);
  }
}
document.querySelectorAll('h1, h2, .grand, .phrase, .merci, .lettre p, #temps p').forEach(decouper);
document.querySelectorAll('.reveal, .photo, .mots').forEach(reveler);
const photos = [...document.querySelectorAll('.photo')];
const pile = [...document.querySelectorAll('#album .photo')];

// Étoiles de l'écran d'ouverture et petits cœurs qui flottent doucement dans toute la page
if (!reduit) {
  const etoiles = $('.etoiles');
  for (let i = 0; i < 36; i++) {
    const s = el('span', 'etoile');
    s.style.left = hasard(0, 100) + '%'; s.style.top = hasard(0, 100) + '%';
    s.style.animationDelay = hasard(0, 3) + 's'; s.style.animationDuration = hasard(2.5, 5) + 's';
    etoiles.append(s);
  }
  const amb = el('div', 'ambiance');
  amb.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 14; i++) {
    const s = el('span', '', i % 3 ? '♥' : '✦');
    s.style.left = hasard(0, 100) + '%'; s.style.fontSize = hasard(0.6, 1.4) + 'rem';
    s.style.animationDuration = hasard(16, 30) + 's'; s.style.animationDelay = -hasard(0, 24) + 's';
    amb.append(s);
  }
  document.body.append(amb);
}

// Barre de progression + léger effet de profondeur (parallaxe) sur les photos
let attente = false;
function maj() {
  attente = false;
  const h = window.innerHeight;
  const total = Math.max(1, document.documentElement.scrollHeight - h);
  $('#progres').style.transform = 'scaleX(' + Math.min(1, window.scrollY / total) + ')';
  if (reduit) return;
  photos.forEach(f => {
    const r = f.getBoundingClientRect();
    if (r.bottom < -100 || r.top > h + 100) return;
    f.style.setProperty('--py', ((r.top + r.height / 2 - h / 2) * -0.05).toFixed(1) + 'px');
  });
  // Pile de photos : quand la suivante arrive, celle du dessous recule et s'assombrit
  pile.forEach((f, i) => {
    const suiv = pile[i + 1];
    if (!suiv) return;
    const a = f.getBoundingClientRect(), b = suiv.getBoundingClientRect();
    f.style.setProperty('--k', Math.max(0, Math.min(1, (a.bottom - b.top) / a.height)).toFixed(3));
  });
}
window.addEventListener('scroll', () => { if (!attente) { attente = true; requestAnimationFrame(maj); } }, { passive: true });
window.addEventListener('resize', maj);
maj();

// ÉTAPE 1 → bouton d'ouverture : l'écran se dissout puis le site apparaît
$('#btn-start').addEventListener('click', () => {
  const o = $('#ouverture');
  $('#experience').hidden = false;
  if (reduit) { o.hidden = true; window.scrollTo(0, 0); return; }
  o.classList.add('sortie');
  setTimeout(() => { o.hidden = true; window.scrollTo(0, 0); maj(); }, 800);
});

// ÉTAPE 4 — Les trois cœurs : un seul choix, son message reste affiché
let choisi = false;
const zoneCoeurs = $('#coeurs');
CONTENU.question.coeurs.forEach((c, i) => {
  const b = el('button', 'coeur', '♥');
  b.type = 'button';
  b.setAttribute('aria-label', 'Cœur numéro ' + (i + 1) + ' : touche pour découvrir son message');
  b.addEventListener('click', () => {
    if (choisi) return;
    choisi = true;
    zoneCoeurs.querySelectorAll('.coeur').forEach(x => { if (x !== b) x.disabled = true; });
    b.classList.add('choisi'); b.setAttribute('aria-pressed', 'true');
    const r = b.getBoundingClientRect();
    eclat(r.left + r.width / 2, r.top + r.height / 2);
    $('#reponse').append(el('p', 'message', c.message));
    $('#btn-continuer').hidden = false;
  });
  zoneCoeurs.append(b);
});
$('#btn-continuer').addEventListener('click', () => defiler($('#avant-audio')));

// ÉTAPE 5 — Lecteur audio (la lecture démarre UNIQUEMENT au toucher du bouton)
const audio = $('#audio'), bAudio = $('#btn-audio'), lecteur = $('#lecteur'), onde = $('#onde'),
      pp = $('#btn-pp'), barre = $('#barre'), msg = $('#audio-msg'),
      passer = $('#btn-passer'), zone = $('#zone-audio');
audio.src = CONTENU.audio.fichier;
let demarre = false;
for (let i = 0; i < 30; i++) {   // petites barres décoratives, discrètes, qui bougent pendant l'écoute
  const s = el('span');
  s.style.setProperty('--h', hasard(0.3, 1).toFixed(2));
  s.style.setProperty('--d', hasard(0.5, 1.1).toFixed(2) + 's');
  onde.append(s);
}

function fmt(s) {
  if (!isFinite(s)) return '0:00';
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}
function montrer(v) { lecteur.hidden = !v; onde.hidden = !v; }
function etat(joue) {   // pendant l'écoute, le décor s'efface pour laisser place à ta voix
  zone.classList.toggle('joue', joue);
  document.body.classList.toggle('ecoute', joue);
}
function afficherErreur() {
  montrer(false); etat(false);
  bAudio.hidden = false;                 // elle peut réessayer
  msg.textContent = CONTENU.audio.erreur; msg.hidden = false;
  passer.hidden = false;                 // et ne reste jamais bloquée
}
function lecture() {
  const p = audio.play();
  if (p && p.catch) p.catch(e => { if (e.name !== 'AbortError') afficherErreur(); });
}
bAudio.addEventListener('click', () => {
  demarre = true;
  msg.hidden = true; passer.hidden = true;
  bAudio.hidden = true; montrer(true);
  lecture();
});
pp.addEventListener('click', () => { audio.paused ? lecture() : audio.pause(); });
barre.addEventListener('input', () => {
  barre.style.setProperty('--p', barre.value / 10 + '%');
  if (isFinite(audio.duration)) audio.currentTime = barre.value / 1000 * audio.duration;
});
audio.addEventListener('play', () => {
  pp.textContent = '❚❚'; pp.setAttribute('aria-label', 'Mettre en pause'); etat(true);
});
audio.addEventListener('pause', () => {
  pp.textContent = '\u25B6\uFE0E'; pp.setAttribute('aria-label', 'Reprendre l\u2019écoute'); etat(false);
});
audio.addEventListener('timeupdate', () => {
  const p = audio.duration ? audio.currentTime / audio.duration * 1000 : 0;
  barre.value = p; barre.style.setProperty('--p', p / 10 + '%');
  $('#t-cour').textContent = fmt(audio.currentTime);
});
['loadedmetadata', 'durationchange'].forEach(ev =>
  audio.addEventListener(ev, () => { $('#t-total').textContent = fmt(audio.duration); }));
audio.addEventListener('error', () => { if (demarre) afficherErreur(); });
audio.addEventListener('ended', () => { etat(false); revelerFin(); });
passer.addEventListener('click', revelerFin);

// ÉTAPE 6 — La fin : petits cœurs qui montent, puis la dernière photo
let finVue = false;
function revelerFin() {
  const fin = $('#fin');
  fin.hidden = false;
  if (!finVue) { finVue = true; if (!reduit) pluieCoeurs(fin); }
  setTimeout(() => defiler(fin), reduit ? 0 : 900);
}
function pluieCoeurs(parent) {
  const c = el('div', 'pluie');
  c.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 14; i++) {
    const s = el('span', '', '♥');
    s.style.left = hasard(5, 95) + '%';
    s.style.animationDelay = hasard(0, 2.5) + 's';
    s.style.fontSize = hasard(0.8, 2) + 'rem';
    c.append(s);
  }
  parent.append(c);
  setTimeout(() => c.remove(), 8000);
}
