# 🤖 AI-Træningsprogram Generator

Dette projekt er en fuldstack-applikation, som genererer personlige træningsprogrammer ved hjælp af OpenAI's GPT-4-model. 
Brugeren indtaster brugerinput, vælger sine favoritøvelser, og systemet returnerer et personligt tilpasset program baseret på brugerdata og øvelsesvalg.

## 🌐 Teknologier

### Backend
- Java 21
- Spring Boot
- WebClient (til OpenAI API)
- REST API

### Frontend
- HTML / CSS / JavaScript
- Fetch API (til at sende POST-requests til backend)

### AI
- OpenAI GPT-4 API (chat/completions endpoint)

---

## 🚀 Kom i gang

### 🔧 Krav
- Java 21+
- Maven
- Node.js og npm (valgfrit, hvis du har en frontend med React eller lign.)

---

### 📦 Backend Setup

1. **Klon projekterne**:
2. Sørg for at klone backend projektet 'traanings_program' og frontend projektet 'traaning_program_frontend', da det er to seperate repos
3. Tilføj din openAI api nøgle i application.properties
4. Tilføj din database konfigurationer i application.properties
5. Start serveren
6. Kør dette endpoint for at hente øvelser og gif-url, så du kan se billeder og vælge øvelser: http://localhost:8080/exercises
7. Du kan du bruge hjemmesiden
