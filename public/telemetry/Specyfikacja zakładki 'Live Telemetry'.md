# Specyfikacja zakładki 'Live Telemetry'

## 1. Cel
Stworzenie kompleksowej zakładki 'Live Telemetry' umożliwiającej monitorowanie i sterowanie grą oraz agentami AI w czasie rzeczywistym. Zakładka ma dostarczać kluczowe metryki, statusy i strumień zdarzeń, a także podstawowe funkcje kontrolne.

## 2. Wyświetlane Informacje

### 2.1. Agenci
- **Stan:** Aktywny, wstrzymany, błąd, idle.
- **Bieżące zadanie:** ID joba, ID sceny, faza (planning, generation, tool_call, critique, waiting), czas rozpoczęcia.
- **Kolejka jobów:** Liczba jobów w kolejce.
- **Ostatni błąd:** Szczegóły ostatniego błędu.

### 2.2. Tokeny
- **Użyte:** `tokens_used_total` (suma `tokens_input` i `tokens_output`).
- **Prognoza do końca rundy:** (Do zaimplementowania, wymaga dodatkowej logiki).
- **'Zaoszczędzone' vs baseline:** `tokens_saved` (baselineTokens[sceneId] - (input+output)).

### 2.3. Wydajność
- **Latency:** `latency_ms_p50`, `latency_ms_p95`.
- **Koszt/1k tokenów:** `cost_usd` (per agent, agregowany dla KPI).
- **Cache-hit:** `cache_hit_rate` (cache_hits / (cache_hits + generations)).
- **Retry rate:** `retries` (liczba ponownych prób).

### 2.4. Kontekst
- **Długość promptu:** `promptLength`.
- **Poziom kompresji:** `compressionLevel`.
- **Liczba narzędzi w konwersacji:** `toolsInConversation`.
- **Wykorzystanie kontekstu:** `context_utilization` (used_ctx / max_ctx).

### 2.5. Bezpieczeństwo/Etyka
- **Flagi treści:** `flagged`.
- **Ostatnie odrzucenia:** `rejections`.
- **Decyzje guardrails:** `blocks`, `lastLabel`.

### 2.6. Zdarzenia
- **Strumień live:** `TelemetryEvent` (job_started, job_finished, tool_call, cache_hit, error, safety_block).
  - Czas (`ts`), typ (`type`), ID agenta (`agentId`), opcjonalnie ID joba (`jobId`) i payload (`payload`).

## 3. Sterowanie
- **Pauza/Wznów agenta:** Przyciski dla każdego agenta.
- **Zmiana 'temperature':** (Do zaimplementowania, wymaga dodatkowej logiki).
- **Limit tokenów:** (Do zaimplementowania, wymaga dodatkowej logiki).
- **Poziom logów:** (Do zaimplementowania, wymaga dodatkowej logiki).
- **Tryb oszczędny:** Przycisk dla każdego agenta (`/api/agents/{id}/preset?mode=eco`).

## 4. Kluczowe Metryki (KPI)
- `tokens_total`
- `tokens_input`
- `tokens_output`
- `tokens_saved`
- `cost_usd`
- `p50` (latency)
- `p95` (latency)
- `cache_hit_rate`
- `retries`

## 5. Architektura Systemu

### 5.1. Backend (Next.js API Routes)
- **REST API:** `/api/telemetry/agents` (GET) - zwraca listę `AgentStatus`.
- **SSE API:** `/api/telemetry/stream` (GET) - strumień `TelemetryEvent`.
- **Kontrola Agentów:** `/api/agents/{id}/pause`, `/api/agents/{id}/resume`, `/api/agents/{id}/preset` (POST).

### 5.2. Frontend (React + Tailwind CSS)
- **Strona główna:** `/telemetry`.
- **Komponenty:**
    - `Kpi`: Wyświetlanie kluczowych wskaźników.
    - `Lamp`: Wizualizacja stanu (zielony=OK, żółty=uwaga, czerwony=problem, szary=idle).
    - `Btn`: Standardowy przycisk.
- **Logika:**
    - Pobieranie danych agentów z `/api/telemetry/agents`.
    - Subskrypcja zdarzeń z `/api/telemetry/stream` (EventSource).
    - Agregacja KPI na podstawie danych agentów.

### 5.3. Typy Danych (TypeScript)
- `AgentState`: 

"idle"|"running"|"paused"|"error"
- `JobPhase`: "planning"|"generation"|"tool_call"|"critique"|"waiting"
- `TokenStats`: `input`, `output`, `total`, `saved_vs_baseline`, `cost_usd`
- `AgentStatus`: `id`, `name`, `role`, `state`, `currentJob`, `queue`, `tokens`, `latencyMsP50`, `latencyMsP95`, `cacheHitRate`, `retries`, `errors5xx`, `toolCalls`, `contextUtilization`, `safety`, `promptLength`, `compressionLevel`, `toolsInConversation`
- `TelemetryEvent`: `ts`, `type`, `agentId`, `jobId`, `payload`

## 6. Logika Metryk
- `tokens_used_total` = `tokens_input` + `tokens_output`
- `tokens_saved` = `max(0, baselineTokens[sceneId] - (input+output))`
  - `baselineTokens[sceneId]` - konfiguracja bazowa tokenów per scena (pełna generacja bez cache/kompresji).
- `cache_hit_rate` = `cache_hits / (cache_hits + generations)`
- `context_utilization` = `used_ctx / max_ctx`

## 7. Ryzyka i Uwagi
- **SSE:** Ustawienie `Connection: keep-alive` i wyłączenie `gzip` dla strumienia, aby zapobiec zrywaniu połączeń przez proxy.
- **Agregacje KPI:** Delikatne liczenie, zbijanie outlierów medianą lub winsoryzacją.
- **PII w zdarzeniach:** Ustalenie limitów PII, anonimizacja payloadów do audytu.

## 8. Podsumowanie UI
- Jedna strona `/telemetry`.
- KPI u góry strony.
- Siatka agentów z wizualizacją stanu (lampki).
- Strumień zdarzeń live.
- Możliwość sterowania agentami (pauza/wznów, tryb oszczędny).

## 9. Dalsze Rozbudowy (poza zakresem bieżącego zadania)
- Implementacja zmiany `temperature`, limitu tokenów, poziomu logów.
- Rozbudowa o playbooki i budżet.

