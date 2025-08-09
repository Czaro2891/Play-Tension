# UI Mockup - Live Telemetry Dashboard

## 1. Layout Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           LIVE TELEMETRY                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  KPI PANEL                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Tokens      │ │ Saved vs    │ │ Latency     │ │ Cache/Retry │          │
│  │ Total       │ │ Baseline    │ │ p50/p95     │ │ Rate        │          │
│  │ 12,450      │ │ 3,240       │ │ 420/900 ms  │ │ 37% / 3     │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────────────────────┤
│  AGENTS GRID                                    │  EVENTS STREAM            │
│  ┌─────────────────────────────────────────────┐ │ ┌───────────────────────┐ │
│  │ PlayerAgent#1              🟢 RUNNING       │ │ │ 14:23:45 cache_hit    │ │
│  │ Faza: tool_call • Kolejka: 2               │ │ │ 14:23:42 job_started  │ │
│  │                                             │ │ │ 14:23:40 tool_call    │ │
│  │ Tokens: 1270    Saved: 360                 │ │ │ 14:23:38 cache_hit    │ │
│  │ p50/p95: 420/900  Cache: 37%               │ │ │ 14:23:35 job_finished │ │
│  │ Ctx: 62%        Retries: 1                 │ │ │ 14:23:33 error        │ │
│  │                                             │ │ │ 14:23:30 safety_block │ │
│  │ Prompt: 1400 • Kompresja: 2 • Narzędzia: 2 │ │ │ 14:23:28 tool_call    │ │
│  │                                             │ │ │ 14:23:25 cache_hit    │ │
│  │ [Pauza] [Wznów] [Tryb oszczędny]           │ │ │ 14:23:22 job_started  │ │
│  └─────────────────────────────────────────────┘ │ │ ...                   │ │
│  ┌─────────────────────────────────────────────┐ │ └───────────────────────┘ │
│  │ NPCAgent#2                 🟡 PAUSED        │ │                           │
│  │ Faza: — • Kolejka: 0                       │ │  GLOBAL CONTROLS          │
│  │                                             │ │ ┌───────────────────────┐ │
│  │ Tokens: 850     Saved: 120                 │ │ │ [Pause All]           │ │
│  │ p50/p95: 380/750  Cache: 45%               │ │ │ [Resume All]          │ │
│  │ Ctx: 45%        Retries: 0                 │ │ │ [Emergency Stop]      │ │
│  │                                             │ │ │ [Export Logs]         │ │
│  │ Prompt: 950 • Kompresja: 1 • Narzędzia: 1  │ │ └───────────────────────┘ │
│  │                                             │ │                           │
│  │ [Pauza] [Wznów] [Tryb oszczędny]           │ │  CONNECTION STATUS        │
│  └─────────────────────────────────────────────┘ │ ┌───────────────────────┐ │
│  ┌─────────────────────────────────────────────┐ │ │ 🟢 SSE Connected      │ │
│  │ GameMaster#3               🔴 ERROR         │ │ │ 🟢 API Responsive     │ │
│  │ Faza: — • Kolejka: 1                       │ │ │ Last Update: 14:23:45 │ │
│  │ BŁĄD: Token limit exceeded                  │ │ └───────────────────────┘ │
│  │                                             │ │                           │
│  │ Tokens: 2100    Saved: 0                   │ │                           │
│  │ p50/p95: 1200/2500  Cache: 15%             │ │                           │
│  │ Ctx: 95%        Retries: 5                 │ │                           │
│  │                                             │ │                           │
│  │ Prompt: 3200 • Kompresja: 0 • Narzędzia: 4 │ │                           │
│  │ SAFETY: inappropriate_content • Blocks 2    │ │                           │
│  │                                             │ │                           │
│  │ [Pauza] [Wznów] [Tryb oszczędny]           │ │                           │
│  └─────────────────────────────────────────────┘ │                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. Component Specifications

### 2.1. Header
- **Tytuł:** "LIVE TELEMETRY" - duża, pogrubiona czcionka
- **Tło:** Ciemny gradient (granatowy do czarnego)
- **Tekst:** Biały
- **Wysokość:** 60px

### 2.2. KPI Panel
- **Layout:** 4 karty w rzędzie (responsive: 2x2 na mobile)
- **Karty:** Białe tło, cień, zaokrąglone rogi (12px)
- **Tytuł metryki:** Małe, uppercase, szary
- **Wartość:** Duża, pogrubiona, czarna, monospace
- **Padding:** 16px
- **Gap:** 12px między kartami

### 2.3. Agent Cards
- **Layout:** Siatka 3 kolumny (desktop), 2 kolumny (tablet), 1 kolumna (mobile)
- **Karta:** Białe tło, cień, zaokrąglone rogi (16px)
- **Header:** Nazwa agenta + lampka stanu (prawy górny róg)
- **Sekcje:**
  - Status i kolejka (mały tekst, szary)
  - Metryki główne (2x2 grid)
  - Szczegóły kontekstu (mały tekst, szary)
  - Safety alerts (czerwony tekst, jeśli flagged)
  - Przyciski kontrolne (dolny rząd)

### 2.4. Status Lamps
- **Rozmiar:** 10px średnica
- **Kształt:** Koło
- **Kolory:**
  - 🟢 Zielony (#10B981) - Running/OK
  - 🟡 Żółty (#F59E0B) - Paused/Warning
  - 🔴 Czerwony (#EF4444) - Error
  - ⚪ Szary (#6B7280) - Idle
- **Efekt:** Subtelne świecenie (box-shadow)

### 2.5. Control Buttons
- **Styl:** Zaokrąglone (8px), padding 8px 16px
- **Warianty:**
  - Primary: Czarne tło, biały tekst
  - Secondary: Białe tło, czarna ramka
  - Soft: Szare tło (#F3F4F6)
- **Hover:** Subtelne przyciemnienie
- **Font:** 14px, medium weight

### 2.6. Events Stream
- **Container:** Białe tło, zaokrąglone rogi (16px)
- **Wysokość:** Stała (400px), scroll
- **Elementy:**
  - Lampka stanu + timestamp + typ zdarzenia + agent ID
  - Timestamp: Monospace, szary
  - Typ: Pogrubiony, czarny
  - Agent ID: Szary, mniejszy
- **Auto-scroll:** Do najnowszych zdarzeń

### 2.7. Global Controls
- **Layout:** Pionowy stack przycisków
- **Przyciski:** Pełna szerokość, 12px gap
- **Emergency Stop:** Czerwone tło (#EF4444)

### 2.8. Connection Status
- **Wskaźniki:** Lampka + tekst statusu
- **Last Update:** Timestamp ostatniej aktualizacji
- **Tło:** Bardzo jasny szary (#F9FAFB)

## 3. Responsive Breakpoints

### 3.1. Desktop (≥1024px)
- KPI: 4 karty w rzędzie
- Agents: 3 kolumny
- Sidebar: Stała szerokość (320px)

### 3.2. Tablet (768px - 1023px)
- KPI: 4 karty w rzędzie (mniejsze)
- Agents: 2 kolumny
- Sidebar: Pełna szerokość pod agentami

### 3.3. Mobile (≤767px)
- KPI: 2x2 grid
- Agents: 1 kolumna
- Sidebar: Pełna szerokość pod agentami
- Events: Mniejsza wysokość (250px)

## 4. Animations & Interactions

### 4.1. State Changes
- **Lampki:** Płynna zmiana koloru (0.3s ease)
- **Metryki:** CountUp animation dla liczb
- **Karty:** Subtelne pulsowanie przy aktualizacji

### 4.2. Hover Effects
- **Karty agentów:** Lekkie podniesienie (transform: translateY(-2px))
- **Przyciski:** Zmiana koloru tła (0.2s ease)
- **Lampki:** Zwiększenie świecenia

### 4.3. Loading States
- **Skeleton screens** dla kart agentów
- **Spinner** dla przycisków podczas akcji
- **Pulse animation** dla elementów ładujących się

## 5. Color Palette

### 5.1. Primary Colors
- **Background:** #FFFFFF (białe karty)
- **Surface:** #F9FAFB (tło strony)
- **Border:** #E5E7EB (ramki)
- **Text Primary:** #111827 (główny tekst)
- **Text Secondary:** #6B7280 (pomocniczy tekst)

### 5.2. Status Colors
- **Success:** #10B981 (zielony)
- **Warning:** #F59E0B (żółty)
- **Error:** #EF4444 (czerwony)
- **Neutral:** #6B7280 (szary)
- **Info:** #3B82F6 (niebieski)

### 5.3. Accent Colors
- **Primary Button:** #111827 (czarny)
- **Secondary Button:** #F3F4F6 (jasny szary)
- **Emergency:** #DC2626 (ciemny czerwony)

