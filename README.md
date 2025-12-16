🎳 Strajk Bowling – Individuell Examination (CI/CD & Test)

Detta repository innehåller min lösning på den individuella examinationen i CI/CD och testning vid Folkuniversitetet.

Fokus för uppgiften:

automatiserade tester med React Testing Library

mockade API-anrop med MSW

Continuous Integration via GitHub Actions

✅ Uppfyllda krav (översikt)

✔ Tester skrivna i React Testing Library + Vitest

✔ MSW används för att mocka POST-anrop

✔ Tester för samtliga user stories

✔ Tester för alla VG-acceptanskriterier

✔ Separata tester för varje felmeddelande

✔ GitHub Actions kör tester automatiskt vid push till main

✔ Grön CI-status på main

🧪 Tester & struktur

Testfiler finns i:

strajk-bowling/src/__tests__/


Tester är strukturerade per user story

Varje test innehåller kommentarer som kopplar till acceptanskriterier

Hjälpfunktioner används för att undvika duplicerad testkod

🔁 Continuous Integration

GitHub Actions kör alla tester automatiskt

Workflow-fil:

.github/workflows/tests.yml


Grön bock visar att samtliga tester passerar

▶️ Köra lokalt
cd strajk-bowling
npm install
npm run dev

npm run test:run

👩‍🎓 Student

Namn: Magdalena 
Kurs: CI/CD & Test – Individuell Examination
Skola: Folkuniversitetet

🔗 Repository

👉 https://github.com/MagdalenaVurmo/CI-CD-individuell-exam

💡 Notering

GitHub Actions visar endast tiden från det att workflowet skapades och representerar inte den totala arbetstiden.



---------------------------------------------------------------------------------------------------------------------------------------------



🎳 Strajk Bowling – Individuell Examination (CI/CD & Test)

Detta repository innehåller min lösning på den individuella examinationen i CI/CD och testning vid Folkuniversitetet.

Fokus för uppgiften har varit att:

skriva automatiserade tester för befintlig funktionalitet

mocka backend-anrop

sätta upp Continuous Integration med GitHub Actions

📦 Projektöversikt

Strajk Bowling är en React-applikation där användaren kan:

boka datum och tid

ange antal spelare och banor

välja skostorlek för varje spelare

ta bort skoval om det behövs

slutföra bokningen och få bokningsnummer + totalsumma

navigera mellan bokningsvy och bekräftelsevy

⚠️ Ingen applikationslogik har modifierats.
Allt arbete i denna examination är gjort i test- och CI-kod.

🧪 Tester
Testverktyg

Vitest

React Testing Library

Mock Service Worker (MSW)

Teststruktur
strajk-bowling/src/__tests__/
├── integration/
│   ├── BookingFlow.test.jsx
│   ├── Booking.test.jsx
│   ├── Navigation.test.jsx
│   └── Confirmation.test.jsx
├── helpers/
│   ├── testHelpers.js
│   └── mocks/
│       ├── handlers.js
│       └── server.js

Teststrategi

Tester är uppdelade per User Story

Varje test innehåller kommentarer som tydligt kopplar till acceptanskriterier

Felmeddelanden (VG-krav) testas i separata tester

Hjälpfunktioner används för att undvika duplicerad testkod

✅ Täckning av User Stories
US1 – Boka datum, tid, spelare och banor

Val av datum och tid

Minst en spelare krävs

Banor anpassas efter antal spelare

Felmeddelanden för saknade fält

Felmeddelande vid för många spelare per bana

US2 – Skostorlek per spelare

Ange skostorlek för varje spelare

Ändra skostorlek

Fel om skostorlek saknas

Fel om antal skor inte matchar antal spelare

US3 – Ta bort skostorlek

Ta bort skofält via --knapp

Uppdaterar bokningen korrekt

US4 – Slutföra bokning

Bokning skickas via POST-anrop

API-anrop är mockat med MSW

Bokningsnummer och totalsumma visas

Pris beräknas enligt:

120 kr / spelare

100 kr / bana

US5 – Navigation & bekräftelsevy

Navigation mellan bokning och bekräftelse

Visar text om ingen bokning finns

Visar bokning om den finns i sessionStorage

🔁 Continuous Integration – GitHub Actions

Projektet använder GitHub Actions för automatiserad testkörning.

CI-flöde

Alla tester körs automatiskt vid push till main

Misslyckade tester stoppar bygget

Lyckade tester visas med grön bock ✅

Workflow-fil:

.github/workflows/tests.yml


GitHub Actions visar endast tiden från att workflowet skapades –
det representerar inte den totala arbetstiden för uppgiften.

▶️ Köra projektet lokalt
Installera och starta applikationen
cd strajk-bowling
npm install
npm run dev

Köra tester lokalt
cd strajk-bowling
npm run test:run

👩‍🎓 Student

Namn: Magdalena 
Kurs: CI/CD & Test
Skola: Folkuniversitetet

🔗 Repository

GitHub-repo:
👉 https://github.com/MagdalenaVurmo/CI-CD-individuell-exam

📝 Kommentar

Denna examination fokuserar på testning, kvalitetssäkring och CI snarare än vidareutveckling av funktionalitet.
Målet har varit att skapa en stabil testmiljö som säkerställer att applikationen fortsätter fungera korrekt vid framtida ändringar.