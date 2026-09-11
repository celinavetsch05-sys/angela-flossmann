# Website — Haus & Ferienwohnungsverwaltung Angela Flossmann

Einfache statische Website (One-Page). **Kein Build-Schritt** — die Dateien
funktionieren direkt im Browser.

## Ansehen

- **Schnell:** `index.html` doppelklicken.
- **Besser:** im Ordner einen kleinen Server starten (Pfade/Schriften laden sauberer):

  ```
  npx serve .
  ```

  Dann `http://localhost:3000` öffnen.

## Dateien

| Datei / Ordner | Inhalt |
|----------------|--------|
| `index.html` | die komplette Seite (aktuelle Fassung = Version 1) |
| `css/style.css` | gesamtes Design — Farben & Schriften als Variablen ganz oben |
| `js/main.js` | mobiles Menü, Header-Linie, Formular-Bestätigung |
| `assets/logo.svg` | Logo (Giebelsonne-Siegel + Schlüsselblume), Header/Footer |
| `assets/favicon.svg` | vereinfachte Logo-Fassung für den Browser-Tab |
| `KONZEPT.md` | vollständiges Konzept: Struktur, alle Texte, Domain-/Logo-/Farb-Vorschläge |
| `flossmann-wireframe.html` | der Wireframe (Design-Canvas), an dem Version 2 ausgerichtet war |
| `version-1/` | Snapshot: aktuelle Fassung (identisch mit dem Hauptordner) |
| `version-2/` | Snapshot: vorherige Fassung, an den Wireframe angeglichen |

## Die zwei Versionen

- **Version 1 (aktuell)** — Petrol-Navy/Creme mit Messing-Akzent, gefüllte
  Pill-Buttons, 9 Abschnitte inkl. eigenem Region-Abschnitt (mit
  Sonnenblumenfeld) und navyfarbenem CTA-Band, sichtbare
  Prototyp-Hinweisleiste. Mit echten Fotos: Hero (Dorfstraße), Region
  (Sonnenblumenfeld mit Burgruine), Immobilienbetreuung-Karte
  (Bauernhaus-Detail), Über mich (Porträt + Garmisch-Aufnahme).
- **Version 2** — an den Wireframe angeglichen: 7 Abschnitte in Wireframe-Reihenfolge,
  Hero mit linker Textkarte, „Warum ich?"-Block statt Region, warm-neutraler
  Stil mit Haarlinien und Umriss-Buttons, ohne sichtbare Platzhalter. Ebenfalls
  mit echten Fotos (Hero + Porträt) — Stand vor dem Versionswechsel.

Am 2026-09-10 wurde auf Version 1 als aktuelle Fassung umgestellt (Wunsch
der Kundenseite) und um weitere echte Fotos ergänzt. Jede Version hat ein
eigenes `README.md` mit Details.

## Noch offen vor der Veröffentlichung (siehe `KONZEPT.md`, Abschnitt 13)

- Domain `angela-flossmann.com` registrieren, E-Mail-Postfach
  `info@angela-flossmann.com` einrichten (Domain-Entscheidung steht bereits)
- Instagram-/Facebook-Profil-URLs eintragen (aktuell `#`)
- Impressum & Datenschutzerklärung: Entwurf steht (`impressum.html`,
  `datenschutz.html`) — noch mit Platzhaltern für Anschrift, Adószám und
  Handelskammer-/Registernummer zu füllen (Telefon und E-Mail-Domain stehen
  bereits)
- Kontaktformular scharf schalten (echter Versand, z. B. Formspree oder
  eine Vercel-Function)

## Bilder

Fünf echte Fotos sind bereits eingebunden (in `assets/`):

| Bild | Verwendet für |
|------|---------------|
| `hero-ungarn.jpg` (Dorfstraße) | Hero-Hintergrund |
| `region-sonnenblumen.jpg` (Sonnenblumenfeld + Burgruine) | Region-Abschnitt |
| `haus-detail.jpg` (Bauernhaus, grüne Tür) | Karte „Immobilienbetreuung" |
| `angela-portraet.jpg` | Über mich (Hauptbild) |
| `angela-garmisch.jpg` | Über mich (kleines Zweitbild, Garmisch-Partenkirchen) |

Für die Karten „Ferienwohnungsverwaltung" und „Immobilienverkauf" gibt es
noch kein passendes eigenes Foto — dort läuft weiterhin ein Unsplash-Bild.
Zwei weitere mitgelieferte Fotos (Storchennest ×2) liegen unverändert in
`images/` und können bei Bedarf noch verwendet werden.

## Veröffentlichen (später, nach Freigabe durch Angela)

Ordner unverändert bei einem Static-Host hochladen (z. B. Vercel):

```
npx vercel
```
