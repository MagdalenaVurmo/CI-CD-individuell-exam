🟢 Strajk Bowling – Individuell Examination (CI/CD & Test)

Detta projekt är en del av den individuella examinationen på Folkuniversitetet.
Syftet med uppgiften är att säkerställa kvalitet och stabilitet i en React-applikation genom automatiserade tester och CI med GitHub Actions.

📌 Projektbeskrivning

Strajk Bowling är en webbapplikation där användare kan:

Boka datum och tid för bowling

Ange antal spelare och banor

Välja skostorlek för varje spelare

Skicka bokningen och få bokningsnummer samt totalsumma

Navigera mellan bokningsvy och bekräftelsevy

I denna examination har fokus legat på att testa befintlig funktionalitet, inte att bygga ny.

🧪 Tester

Projektet innehåller tester skrivna med:

Vitest

React Testing Library

Mock Service Worker (MSW) för mockade API-anrop

Typer av tester som finns:

Integrationstester för bokningsflödet

Tester för navigation mellan vyer

Tester som verifierar korrekt rendering baserat på session storage

Testfilerna finns i:

strajk-bowling/src/__tests__/


Varje test innehåller kommentarer som förklarar vilka acceptanskriterier som uppfylls.

🔁 CI – GitHub Actions

Projektet använder GitHub Actions för Continuous Integration.

Vad som händer:

Vid varje push till main körs alla tester automatiskt

Om alla tester passerar visas en grön bock ✅

Workflow-filen finns här:

.github/workflows/tests.yml

▶️ Köra projektet lokalt
1. Klona repot
git clone https://github.com/MagdalenaVurmo/CI-CD-individuell-exam.git

2. Gå in i projektet
cd CI-CD-individuell-exam/strajk-bowling

3. Installera beroenden
npm install

4. Starta utvecklingsserver
npm run dev

▶️ Köra tester lokalt
cd strajk-bowling
npm run test:run

✅ Uppfyllda krav (Godkänt)

✔ Tester skrivna med React Testing Library

✔ Mockade API-anrop med MSW

✔ GitHub Actions kör tester vid push till main

✔ Alla tester går igenom (grön bock)

✔ Kommentarer i tester som kopplar till acceptanskriterier

✔ Ingen modifiering av applikationslogik (endast tester)

👩‍🎓 Student

Namn: Magdalena
Kurs: CI/CD / Test
Skola: Folkuniversitetet

📎 Repo & CI-status

🔗 GitHub-repo:
https://github.com/MagdalenaVurmo/CI-CD-individuell-exam

💬 Kommentar

Detta projekt fokuserar på testning och CI snarare än vidareutveckling av funktionalitet. Målet har varit att skapa en stabil testmiljö som automatiskt verifierar att applikationen fortsätter fungera korrekt vid framtida ändringar.