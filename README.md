# Vivi-s-Advent-calendar-Website-2026

Un petit site romantique à ouvrir depuis un QR code : photos, lettre, compteur de jours, message audio.
Aucun compte, aucune installation, rien à payer.

---

## 1. Les fichiers

```
surprise/
├── index.html        → la structure (tu n'as presque jamais besoin d'y toucher)
├── style.css         → les couleurs et les animations
├── script.js         → ⭐ tous tes textes sont en haut de ce fichier
├── README.md         → ce fichier
└── assets/
    ├── photos/       → tes photos
    └── audio/        → ton enregistrement
```

---

## 2. Changer les textes

Ouvre `script.js` avec un éditeur de texte (Bloc-notes, TextEdit, VS Code...).
Tout en haut, la zone **« À PERSONNALISER »** contient tous les textes.
Modifie seulement ce qui est **entre les guillemets** `"..."`, et garde les guillemets et les virgules.

| Je veux changer...                | Dans `script.js`          |
|-----------------------------------|---------------------------|
| Le titre et le texte d'accueil    | `ouverture`               |
| Le ruban qui défile               | `bandeau`                 |
| Les légendes des photos           | `souvenirs` → `legende`   |
| La date du compteur de jours      | `temps` → `date`          |
| La lettre                         | `lettre` → `paragraphes`  |
| **Ton prénom** (signature)        | `lettre` → `signature`    |
| Les 3 messages des cœurs          | `question` → `coeurs`     |
| Les textes autour de l'audio      | `audio`                   |
| La phrase finale                  | `fin`                     |

> ⚠️ **Le compteur de jours** contient une date d'exemple (`2024-06-01`).
> Mets votre vraie date au format `AAAA-MM-JJ`. Si tu mets `""` (vide), le compteur disparaît.

> ⚠️ N'oublie pas de remplacer `— Ton prénom` dans la signature.

---

## 3. Ajouter tes photos

### Noms des fichiers
Mets tes photos dans `assets/photos/` avec **exactement** ces noms :

`photo1.jpg` · `photo2.jpg` · `photo3.jpg` · `photo4.jpg` · `photo5.jpg` · `photo-finale.jpg`

(`photo-finale.jpg` est celle qui apparaît à la toute fin.)

Attention : les minuscules/majuscules comptent (`Photo1.JPG` ne marchera pas) et `.jpeg` n'est pas `.jpg`.

### Format et poids
- **Format JPG** (ou `.png`/`.webp` si tu changes le nom dans `script.js`).
- **iPhone** : les photos sont souvent en **HEIC**, que les navigateurs n'affichent pas toujours.
  Convertis-les en JPG (par exemple en les exportant depuis Photos → *Exporter* → JPEG, ou avec un outil en ligne comme **squoosh.app**).
- **Taille conseillée** : environ **1200 pixels de haut** et **moins de 300 Ko** par photo.
  Une photo de téléphone fait souvent 3 à 6 Mo : c'est trop lourd, la page serait lente en 4G.
  Squoosh (gratuit, dans le navigateur) permet de redimensionner et compresser en quelques clics.
- **Cadrage** : les photos sont affichées en **portrait** et recadrées au centre.
  Choisis des photos où vos visages sont plutôt au milieu.

### Changer le nombre de photos (de 4 à 6)
Dans `script.js`, section `souvenirs` → `photos`, chaque photo est un bloc :

```js
{ src: "assets/photos/photo3.jpg", alt: "Nous deux, souvenir 3", legende: "Ta légende ici." },
```
- Pour **ajouter** une photo : copie une ligne, change le numéro du fichier et la légende.
- Pour **en enlever** : supprime la ligne.
- `alt` est la description lue par les lecteurs d'écran : décris la photo en quelques mots.

Si une photo est absente ou mal nommée, un cadre « Photo à ajouter » s'affiche à la place : le site ne plante pas.

---

## 4. Ajouter ton message audio

1. Enregistre-toi avec le **Dictaphone** (iPhone) ou l'enregistreur vocal (Android), dans un endroit calme.
   Parle près du micro, sans musique de fond. Fais un essai et réécoute-le.
2. Envoie le fichier sur ton ordinateur (mail, câble, cloud...).
3. Place-le dans `assets/audio/` sous le nom **`mon-message.mp3`**.

Formats :
- **MP3** : le plus simple, fonctionne partout.
- **M4A** (format du Dictaphone iPhone) : fonctionne aussi sur iPhone et Android. Dans ce cas, garde le fichier tel quel et change la ligne dans `script.js` :
  `fichier: "assets/audio/mon-message.m4a"`

Le message démarre **uniquement quand elle appuie sur le bouton** (les téléphones bloquent la lecture automatique).
Quand l'audio se termine, la fin du site apparaît.

---

## 5. Changer les couleurs

Dans `style.css`, tout en haut, le bloc `:root` :

```css
--nuit:#0F1E3D;   /* bleu très foncé */
--bleu:#2F5DA8;   /* bleu principal */
--ciel:#9CC3F0;   /* bleu clair */
```
Change les codes couleur pour modifier l'ambiance de tout le site.

---

## 6. Tester

**Sur ordinateur** : double-clique sur `index.html`. Tout fonctionne, y compris l'audio
(les polices élégantes demandent une connexion internet ; sinon des polices de secours s'affichent).

**Sur téléphone** : le plus fiable est de mettre le site en ligne (partie 7), puis d'ouvrir l'adresse sur ton téléphone.
Teste tout le parcours, **avec le son**, en 4G et pas seulement en Wi-Fi.

Autre option, en local : ordinateur et téléphone sur le même Wi-Fi, dans le dossier du projet lance
`python3 -m http.server 8000`, puis ouvre `http://ADRESSE-IP-DE-TON-ORDI:8000` sur le téléphone.

---

## 7. Mettre le site en ligne (gratuit)

Choisis **un** de ces services, tous gratuits : **Netlify**, **Cloudflare Pages** ou **GitHub Pages**.

Exemple avec Netlify :
1. Crée un compte gratuit sur netlify.com.
2. Dans « Sites », glisse-dépose le **dossier `surprise`** (le dossier lui-même, pas le zip).
3. Tu obtiens une adresse du type `https://xxxx.netlify.app`.
4. Dans les paramètres du site, **renomme l'adresse** en quelque chose de discret et impossible à deviner
   (évite son prénom). Le site n'a pas de mot de passe : seule l'adresse le protège.
   (Une balise `noindex` empêche Google de le référencer.)

**Modifier le site plus tard** : redépose le dossier mis à jour sur le même site. L'adresse, donc le QR code, ne change pas.

---

## 8. Créer le QR code

1. Copie l'adresse finale de ton site.
2. Colle-la dans un générateur de QR code **statique** (par exemple QRCode Monkey).
   Évite les QR « dynamiques » : ils passent par un lien intermédiaire qui peut expirer ou devenir payant.
3. Télécharge l'image (idéalement en haute résolution) et imprime-la sur un joli papier, une carte ou un petit mot.
4. **Scanne-le toi-même** avant de le lui donner.

En local : `pip install "qrcode[pil]"` puis `qr "https://ton-adresse" > qr.png`.

---

## 9. Checklist avant de lui offrir

- [ ] Ton prénom est dans la signature
- [ ] La date du compteur est la bonne (ou `""` pour le retirer)
- [ ] Les 6 photos sont en place, légères, en JPG
- [ ] Les légendes et la lettre sont à ton image
- [ ] `mon-message.mp3` est en place et s'écoute bien
- [ ] Tout le parcours est testé sur ton téléphone, son activé
- [ ] Le QR code est scanné et ouvre la bonne page
- [ ] L'adresse du site est discrète

---

## 10. Si quelque chose ne marche pas

| Problème                            | À vérifier                                                                 |
|-------------------------------------|----------------------------------------------------------------------------|
| « Photo à ajouter » s'affiche       | Nom exact du fichier (minuscules, `.jpg`), bon dossier, format pas HEIC    |
| Les photos mettent du temps         | Elles sont trop lourdes : compresse-les (< 300 Ko)                         |
| L'audio ne démarre pas              | Nom/chemin du fichier, volume du téléphone, réessaie le bouton             |
| Message d'erreur sous le bouton     | Le fichier audio est absent ou illisible ; le bouton « Passer à la suite » permet de continuer |
| Le compteur affiche un chiffre bizarre | La date n'est pas au format `AAAA-MM-JJ`                                |
| Mes modifications n'apparaissent pas| Redépose le dossier sur l'hébergeur, puis recharge la page (ou ouvre-la en navigation privée) |
| Les animations sont absentes        | Le téléphone a l'option « Réduire les animations » activée : c'est voulu, tout reste utilisable |

Bonne surprise 💙
