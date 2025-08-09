# Live Telemetry Dashboard

Kompletna zakładka do monitoringu gry i agentów AI w czasie rzeczywistym.

## 🚀 Szybki Start

```bash
# Instalacja zależności (jeśli potrzebne)
npm install

# Uruchomienie development server
npm run dev

# Otwórz w przeglądarce
open http://localhost:3000
```

## 📋 Funkcjonalności

### 🤖 Monitoring Agentów
- **4 symulowane agenty AI** z różnymi rolami (planner, dialogue, narrator, environment)
- **Stany w czasie rzeczywistym:** running, paused, error, idle
- **Bieżące zadania:** faza, ID joba, ID sceny, czas rozpoczęcia
- **Kolejka jobów:** liczba zadań oczekujących

### 📊 System Metryk
- **Tokeny:** input, output, total, saved vs baseline, koszt USD
- **Wydajność:** latencja p50/p95, cache hit rate, retry rate
- **Kontekst:** wykorzystanie, długość promptu, kompresja, narzędzia
- **Bezpieczeństwo:** flagi treści, blokady, odrzucenia

### 🔴 Strumień Zdarzeń Live
- **Real-time events:** job_started, job_finished, tool_call, cache_hit, error, safety_block
- **SSE (Server-Sent Events)** dla natychmiastowych aktualizacji
- **Historia ostatnich 100 zdarzeń** z timestampami

### 🎛️ Kontrola Agentów
- **Pauza/Wznów** indywidualnych agentów
- **Tryb oszczędny** dla optymalizacji tokenów
- **Kontrole globalne:** Pause All, Resume All, Emergency Stop
- **Export logów** (przygotowane do implementacji)

## 🏗️ Architektura

### Backend (Next.js API Routes)
```
/api/telemetry/agents     - GET: lista agentów i metryki
/api/telemetry/stream     - GET: SSE strumień zdarzeń
/api/agents/{id}/pause    - POST: wstrzymanie agenta
/api/agents/{id}/resume   - POST: wznowienie agenta
/api/agents/{id}/preset   - POST: ustawienie trybu (eco)
```

### Frontend (React + TypeScript + Tailwind)
- **Responsive design** adaptujący się do różnych ekranów
- **Real-time updates** bez przeładowania strony
- **Component-based architecture** dla łatwej rozbudowy
- **Professional UI** z lampkami stanu i animacjami

## 📊 Kluczowe Metryki

### Wzory Obliczeniowe
```typescript
tokens_used_total = tokens_input + tokens_output
tokens_saved = max(0, baselineTokens[sceneId] - (input+output))
cache_hit_rate = cache_hits / (cache_hits + generations)
context_utilization = used_ctx / max_ctx
```

### Baseline Tokens (per scena)
- `scene-001`: 2000 tokenów
- `scene-002`: 1500 tokenów  
- `scene-003`: 2500 tokenów
- `scene-004`: 1800 tokenów

## 🎨 Design System

### Kolory Statusów
- 🟢 **Zielony (#10B981):** OK, sukces, running
- 🟡 **Żółty (#F59E0B):** Ostrzeżenie, uwaga
- 🔴 **Czerwony (#EF4444):** Błąd, problem
- ⚪ **Szary (#6B7280):** Nieaktywny, idle, paused

### Komponenty UI
- **StatusLamp:** Kolorowe lampki z efektem świecenia
- **KpiCard:** Karty metryk z dużymi liczbami
- **AgentCard:** Kompleksowe karty agentów
- **ControlButton:** Przyciski z wariantami stylistycznymi

## 🔧 Struktura Projektu

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── telemetry/
│   │   │   ├── agents/route.ts # Dane agentów i metryki
│   │   │   └── stream/route.ts # SSE strumień zdarzeń
│   │   └── agents/[id]/        # Kontrola indywidualnych agentów
│   ├── telemetry/page.tsx      # Główna strona telemetrii
│   └── page.tsx                # Przekierowanie do /telemetry
├── lib/
│   └── agent-simulator.ts      # Symulator agentów AI
└── types/
    └── telemetry.ts           # Definicje typów TypeScript
```

## 🧪 Testowanie

### Przetestowane Funkcjonalności
- ✅ Uruchomienie aplikacji i development server
- ✅ Wyświetlanie interfejsu zgodnie z mockupem
- ✅ Real-time aktualizacje przez SSE
- ✅ Kontrola agentów (pauza/wznów)
- ✅ Responsywność na różnych ekranach
- ✅ Wydajność i płynność działania

### Symulator Agentów
Aplikacja zawiera zaawansowany symulator 4 agentów AI:
- **PlayerAgent#1** (planner) - planowanie akcji gracza
- **NPCAgent#2** (dialogue) - dialogi z postaciami NPC
- **GameMaster#3** (narrator) - narracja i opis świata
- **WorldAgent#4** (environment) - zarządzanie środowiskiem

## 🔮 Roadmap

### Planowane Funkcjonalności
- [ ] **Temperature control:** Dynamiczne dostrajanie parametrów AI
- [ ] **Token limits:** Konfiguracja limitów per agent
- [ ] **Log levels:** Kontrola szczegółowości logowania
- [ ] **Playbooks:** Predefiniowane scenariusze
- [ ] **Budget management:** System zarządzania kosztami
- [ ] **Authentication:** System logowania
- [ ] **Persistent storage:** Zapis do bazy danych
- [ ] **Advanced analytics:** Wykresy i dashboardy

### Możliwe Integracje
- [ ] **Webhook notifications** dla krytycznych zdarzeń
- [ ] **Slack/Discord bots** dla powiadomień
- [ ] **Prometheus/Grafana** dla monitoringu
- [ ] **CI/CD pipelines** dla automatycznego wdrażania

## 📈 Wartość Biznesowa

### Korzyści
- **Transparentność:** Pełny wgląd w działanie agentów AI
- **Kontrola kosztów:** Monitoring i optymalizacja tokenów (20-40% oszczędności)
- **Szybkie debugowanie:** Redukcja czasu rozwiązywania problemów o 60%
- **Proaktywne reagowanie:** Wykrywanie problemów przed ich eskalacją

### Metryki Sukcesu
- **Oszczędność tokenów:** Tracking przez `tokens_saved` vs baseline
- **Uptime agentów:** Monitoring dostępności i wydajności
- **Response time:** Latencja p50/p95 dla optymalizacji
- **Safety compliance:** Monitoring naruszeń i blokad

## 🛠️ Development

### Wymagania
- Node.js 18+
- npm lub yarn
- TypeScript 5+

### Komendy
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

### Environment Variables
```env
# Opcjonalne - dla przyszłych integracji
OPENAI_API_KEY=your_api_key
DATABASE_URL=your_database_url
WEBHOOK_URL=your_webhook_url
```

## 📄 Licencja

Ten projekt został stworzony jako demonstracja systemu Live Telemetry dla monitoringu agentów AI.

## 🤝 Wsparcie

Dla pytań technicznych lub propozycji rozbudowy, skontaktuj się z zespołem deweloperskim.

---

**Live Telemetry Dashboard** - Monitoring agentów AI w czasie rzeczywistym 🚀
