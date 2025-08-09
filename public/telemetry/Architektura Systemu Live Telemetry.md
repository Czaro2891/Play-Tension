# Architektura Systemu Live Telemetry

## 1. Architektura Ogólna

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Agents     │
│   (React)       │◄──►│   (Next.js)     │◄──►│   Simulator     │
│                 │    │                 │    │                 │
│ - Live UI       │    │ - REST API      │    │ - Agent Pool    │
│ - Real-time     │    │ - SSE Stream    │    │ - Job Queue     │
│ - Controls      │    │ - Metrics       │    │ - Metrics       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 2. Komponenty Systemu

### 2.1. Frontend (React + TypeScript + Tailwind CSS)
- **Strona główna:** `/telemetry`
- **Komponenty:**
  - `TelemetryDashboard` - główny komponent strony
  - `KpiPanel` - panel z kluczowymi wskaźnikami
  - `AgentGrid` - siatka agentów
  - `AgentCard` - karta pojedynczego agenta
  - `EventStream` - strumień zdarzeń live
  - `ControlPanel` - panel sterowania
  - `StatusLamp` - lampka stanu
  - `MetricDisplay` - wyświetlanie metryki

### 2.2. Backend API (Next.js App Router)
- **REST Endpoints:**
  - `GET /api/telemetry/agents` - lista agentów i ich statusów
  - `GET /api/telemetry/metrics` - agregowane metryki
  - `POST /api/agents/{id}/pause` - wstrzymanie agenta
  - `POST /api/agents/{id}/resume` - wznowienie agenta
  - `POST /api/agents/{id}/preset` - ustawienie predefiniowanej konfiguracji
- **SSE Endpoint:**
  - `GET /api/telemetry/stream` - strumień zdarzeń w czasie rzeczywistym

### 2.3. AI Agents Simulator
- **AgentManager** - zarządzanie pulą agentów
- **JobQueue** - kolejka zadań
- **MetricsCollector** - zbieranie metryk
- **EventEmitter** - emitowanie zdarzeń
- **SafetyGuard** - kontrola bezpieczeństwa

## 3. Przepływ Danych

### 3.1. Inicjalizacja
1. Frontend ładuje stronę `/telemetry`
2. Pobiera początkowe dane z `/api/telemetry/agents`
3. Nawiązuje połączenie SSE z `/api/telemetry/stream`
4. Rozpoczyna cykliczne odświeżanie metryk

### 3.2. Real-time Updates
1. AI Agents generują zdarzenia
2. Backend emituje zdarzenia przez SSE
3. Frontend odbiera i aktualizuje UI
4. Metryki są przeliczane w czasie rzeczywistym

### 3.3. Kontrola Agentów
1. Użytkownik klika przycisk kontrolny
2. Frontend wysyła POST request do API
3. Backend przekazuje komendę do AgentManager
4. Agent zmienia stan i emituje zdarzenie
5. Frontend odbiera aktualizację przez SSE

## 4. Struktura Danych

### 4.1. Agent Status
```typescript
interface AgentStatus {
  id: string;
  name: string;
  role: string;
  state: "idle" | "running" | "paused" | "error";
  currentJob?: {
    id: string;
    sceneId: string;
    phase: "planning" | "generation" | "tool_call" | "critique" | "waiting";
    startedAt: string;
  };
  queue: number;
  tokens: {
    input: number;
    output: number;
    total: number;
    saved_vs_baseline: number;
    cost_usd: number;
  };
  performance: {
    latencyMsP50: number;
    latencyMsP95: number;
    cacheHitRate: number;
    retries: number;
    errors5xx: number;
    toolCalls: number;
  };
  context: {
    utilization: number; // 0..1
    promptLength: number;
    compressionLevel: number;
    toolsInConversation: number;
  };
  safety: {
    flagged: boolean;
    lastLabel?: string;
    blocks: number;
    rejections: number;
  };
}
```

### 4.2. Telemetry Event
```typescript
interface TelemetryEvent {
  ts: string;
  type: "job_started" | "job_finished" | "tool_call" | "cache_hit" | "error" | "safety_block";
  agentId: string;
  jobId?: string;
  payload?: Record<string, unknown>;
}
```

## 5. UI/UX Design Principles

### 5.1. Layout
- **Header:** Tytuł i globalne KPI
- **Main Grid:** Siatka agentów (responsive: 1-3 kolumny)
- **Sidebar:** Strumień zdarzeń i kontrole globalne
- **Footer:** Status połączenia i informacje systemowe

### 5.2. Color Coding
- **Zielony:** Stan OK, sukces
- **Żółty:** Ostrzeżenie, uwaga
- **Czerwony:** Błąd, problem
- **Szary:** Nieaktywny, idle
- **Niebieski:** Informacja, neutralny

### 5.3. Interaktywność
- **Hover Effects:** Podświetlenie kart agentów
- **Smooth Transitions:** Animacje zmiany stanu
- **Real-time Updates:** Płynne aktualizacje bez migotania
- **Responsive Design:** Adaptacja do różnych rozmiarów ekranu

## 6. Performance Considerations

### 6.1. Frontend Optimization
- **React.memo** dla komponentów agentów
- **useMemo** dla agregacji metryk
- **Virtualizacja** dla długiej listy zdarzeń
- **Debouncing** dla częstych aktualizacji

### 6.2. Backend Optimization
- **Connection Pooling** dla SSE
- **Rate Limiting** dla API endpoints
- **Caching** dla statycznych danych
- **Compression** dla dużych payloadów

## 7. Security & Privacy

### 7.1. Data Protection
- **Anonimizacja** wrażliwych danych w zdarzeniach
- **Rate Limiting** dla API calls
- **Input Validation** dla wszystkich endpoints
- **CORS Configuration** dla bezpiecznego dostępu

### 7.2. Access Control
- **Authentication** (do zaimplementowania w przyszłości)
- **Authorization** dla operacji kontrolnych
- **Audit Logging** dla akcji użytkownika

