"use client";

import { useEffect, useState, useMemo } from 'react';
import { AgentStatus, TelemetryEvent, AggregatedMetrics } from '@/types/telemetry';

// Status Lamp Component
const StatusLamp = ({ state }: { state: "ok" | "warn" | "err" | "idle" }) => {
  const colors = {
    ok: "bg-green-500 shadow-green-500/50",
    warn: "bg-yellow-500 shadow-yellow-500/50", 
    err: "bg-red-500 shadow-red-500/50",
    idle: "bg-gray-400 shadow-gray-400/50"
  };
  
  return (
    <span className={`inline-block h-2.5 w-2.5 rounded-full ${colors[state]} shadow-lg`} />
  );
};

// KPI Card Component
const KpiCard = ({ label, value }: { label: string; value: React.ReactNode }) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-white">
      <div className="text-xs uppercase text-gray-500 font-medium">{label}</div>
      <div className="text-2xl font-bold mt-1 tabular-nums text-gray-900">{value}</div>
    </div>
  );
};

// Control Button Component
const ControlButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  disabled = false 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  variant?: "primary" | "secondary" | "soft" | "danger";
  disabled?: boolean;
}) => {
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900",
    secondary: "bg-white text-gray-900 hover:bg-gray-50 border-gray-300",
    soft: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 border-red-600"
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-xl text-sm border font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

// Agent Card Component
const AgentCard = ({ agent, onPause, onResume, onPreset }: {
  agent: AgentStatus;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onPreset: (id: string, mode: string) => void;
}) => {
  const getStatusLamp = (state: string) => {
    switch (state) {
      case "running": return "ok";
      case "paused": return "idle";
      case "error": return "err";
      default: return "warn";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-gray-900">{agent.name}</div>
        <StatusLamp state={getStatusLamp(agent.state)} />
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        <span className="font-medium">Faza:</span> {agent.currentJob?.phase ?? "—"} • 
        <span className="font-medium"> Kolejka:</span> {agent.queue}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div><span className="text-gray-500">Tokens:</span> <span className="font-semibold">{agent.tokens.total.toLocaleString()}</span></div>
        <div><span className="text-gray-500">Saved:</span> <span className="font-semibold">{agent.tokens.saved_vs_baseline.toLocaleString()}</span></div>
        <div><span className="text-gray-500">p50/p95:</span> <span className="font-semibold">{agent.performance.latencyMsP50}/{agent.performance.latencyMsP95}</span></div>
        <div><span className="text-gray-500">Cache:</span> <span className="font-semibold">{Math.round(agent.performance.cacheHitRate * 100)}%</span></div>
        <div><span className="text-gray-500">Ctx:</span> <span className="font-semibold">{Math.round(agent.context.utilization * 100)}%</span></div>
        <div><span className="text-gray-500">Retries:</span> <span className="font-semibold">{agent.performance.retries}</span></div>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        Prompt: {agent.context.promptLength.toLocaleString()} • 
        Kompresja: {agent.context.compressionLevel} • 
        Narzędzia: {agent.context.toolsInConversation}
      </div>
      
      {agent.safety.flagged && (
        <div className="text-xs text-red-600 mb-3 font-medium">
          SAFETY: {agent.safety.lastLabel} • Blocks {agent.safety.blocks} • Reject {agent.safety.rejections}
        </div>
      )}
      
      {agent.state === "error" && (
        <div className="text-xs text-red-600 mb-3 font-medium">
          BŁĄD: Token limit exceeded
        </div>
      )}
      
      <div className="flex gap-2 flex-wrap">
        <ControlButton 
          onClick={() => onPause(agent.id)}
          variant="secondary"
          disabled={agent.state === "paused"}
        >
          Pauza
        </ControlButton>
        <ControlButton 
          onClick={() => onResume(agent.id)}
          variant="secondary"
          disabled={agent.state !== "paused"}
        >
          Wznów
        </ControlButton>
        <ControlButton 
          onClick={() => onPreset(agent.id, "eco")}
          variant="soft"
        >
          Tryb oszczędny
        </ControlButton>
      </div>
    </div>
  );
};

// Event Item Component
const EventItem = ({ event }: { event: TelemetryEvent }) => {
  const getEventLamp = (type: string) => {
    switch (type) {
      case "error":
      case "safety_block":
        return "err";
      case "cache_hit":
        return "ok";
      default:
        return "warn";
    }
  };

  return (
    <li className="flex items-center gap-3 py-1">
      <StatusLamp state={getEventLamp(event.type)} />
      <span className="tabular-nums text-gray-500 text-sm">
        {new Date(event.ts).toLocaleTimeString()}
      </span>
      <span className="text-gray-800 font-medium text-sm">{event.type}</span>
      <span className="text-gray-500 text-sm">• {event.agentId}</span>
    </li>
  );
};

// Main Telemetry Page
export default function TelemetryPage() {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [metrics, setMetrics] = useState<AggregatedMetrics | null>(null);
  const [connectionStatus, setConnectionStatus] = useState({
    sse_connected: false,
    api_responsive: false,
    last_update: new Date().toISOString()
  });

  // Fetch agents data
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/telemetry/agents');
        if (response.ok) {
          const data = await response.json();
          setAgents(data.agents);
          setMetrics(data.metrics);
          setConnectionStatus(prev => ({ 
            ...prev, 
            api_responsive: true, 
            last_update: new Date().toISOString() 
          }));
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error);
        setConnectionStatus(prev => ({ ...prev, api_responsive: false }));
      }
    };

    fetchAgents();
    const interval = setInterval(fetchAgents, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Setup SSE connection
  useEffect(() => {
    const eventSource = new EventSource('/api/telemetry/stream');
    
    eventSource.onopen = () => {
      setConnectionStatus(prev => ({ ...prev, sse_connected: true }));
    };
    
    eventSource.onmessage = (event) => {
      try {
        const telemetryEvent: TelemetryEvent = JSON.parse(event.data);
        setEvents(prev => [telemetryEvent, ...prev].slice(0, 100)); // Keep last 100 events
        setConnectionStatus(prev => ({ 
          ...prev, 
          last_update: new Date().toISOString() 
        }));
      } catch (error) {
        console.error('Failed to parse SSE event:', error);
      }
    };
    
    eventSource.onerror = () => {
      setConnectionStatus(prev => ({ ...prev, sse_connected: false }));
    };
    
    return () => {
      eventSource.close();
    };
  }, []);

  // Agent control functions
  const handlePauseAgent = async (agentId: string) => {
    try {
      await fetch(`/api/agents/${agentId}/pause`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to pause agent:', error);
    }
  };

  const handleResumeAgent = async (agentId: string) => {
    try {
      await fetch(`/api/agents/${agentId}/resume`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to resume agent:', error);
    }
  };

  const handleSetPreset = async (agentId: string, mode: string) => {
    try {
      await fetch(`/api/agents/${agentId}/preset?mode=${mode}`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to set preset:', error);
    }
  };

  const handleBulkAction = async (action: 'pause' | 'resume') => {
    try {
      const agentIds = agents.map(agent => agent.id);
      await fetch('/api/telemetry/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, agentIds })
      });
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">LIVE TELEMETRY</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* KPI Panel */}
        {metrics && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <KpiCard label="Tokens Total" value={metrics.tokens_total.toLocaleString()} />
            <KpiCard label="Saved vs Baseline" value={metrics.tokens_saved.toLocaleString()} />
            <KpiCard label="Latency p50/p95 (ms)" value={`${metrics.latency_p50} / ${metrics.latency_p95}`} />
            <KpiCard label="Cache-hit / Retries" value={`${Math.round(metrics.cache_hit_rate * 100)}% / ${metrics.retries}`} />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Agents Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Agenci</h2>
              <div className="flex gap-2">
                <ControlButton onClick={() => handleBulkAction('pause')} variant="secondary">
                  Pause All
                </ControlButton>
                <ControlButton onClick={() => handleBulkAction('resume')} variant="secondary">
                  Resume All
                </ControlButton>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-1 xl:grid-cols-2">
              {agents.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onPause={handlePauseAgent}
                  onResume={handleResumeAgent}
                  onPreset={handleSetPreset}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Events Stream */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Zdarzenia</h3>
              <div className="max-h-96 overflow-auto">
                <ul className="space-y-2">
                  {events.map((event, index) => (
                    <EventItem key={index} event={event} />
                  ))}
                  {events.length === 0 && (
                    <li className="text-gray-500 text-sm text-center py-4">
                      Oczekiwanie na zdarzenia...
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Global Controls */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontrole Globalne</h3>
              <div className="space-y-3">
                <ControlButton onClick={() => handleBulkAction('pause')} variant="secondary">
                  Pause All
                </ControlButton>
                <ControlButton onClick={() => handleBulkAction('resume')} variant="secondary">
                  Resume All
                </ControlButton>
                <ControlButton onClick={() => {}} variant="danger">
                  Emergency Stop
                </ControlButton>
                <ControlButton onClick={() => {}} variant="soft">
                  Export Logs
                </ControlButton>
              </div>
            </div>

            {/* Connection Status */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Połączenia</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <StatusLamp state={connectionStatus.sse_connected ? "ok" : "err"} />
                  <span>SSE {connectionStatus.sse_connected ? "Connected" : "Disconnected"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusLamp state={connectionStatus.api_responsive ? "ok" : "err"} />
                  <span>API {connectionStatus.api_responsive ? "Responsive" : "Error"}</span>
                </div>
                <div className="text-gray-500">
                  Last Update: {new Date(connectionStatus.last_update).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

