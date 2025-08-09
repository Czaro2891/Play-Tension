import React, { useEffect, useMemo, useState } from 'react';
import { AgentStatus, TelemetryEvent } from '../telemetry/types';
import { getAgentSimulator } from '../telemetry/agentSimulator';

const Lamp: React.FC<{ color: string }> = ({ color }) => (
  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 6, background: color, boxShadow: `0 0 8px ${color}` }} />
);

const stateToColor: Record<string, string> = {
  running: '#10B981',
  idle: '#6B7280',
  paused: '#9CA3AF',
  error: '#EF4444',
};

const Telemetry: React.FC = () => {
  const simulator = useMemo(() => getAgentSimulator(), []);
  const [agents, setAgents] = useState<AgentStatus[]>(simulator.getAgents());
  const [events, setEvents] = useState<TelemetryEvent[]>([]);

  useEffect(() => {
    const onEvent = (ev: TelemetryEvent) => setEvents((e) => [ev, ...e].slice(0, 100));
    simulator.addEventListener(onEvent);
    const tick = setInterval(() => setAgents(simulator.getAgents()), 1000);
    return () => {
      simulator.removeEventListener(onEvent);
      clearInterval(tick);
    };
  }, [simulator]);

  const handlePause = (id: string) => {
    simulator.pauseAgent(id);
    setAgents(simulator.getAgents());
  };
  const handleResume = (id: string) => {
    simulator.resumeAgent(id);
    setAgents(simulator.getAgents());
  };
  const handlePreset = (id: string, mode: string) => {
    simulator.setAgentPreset(id, mode);
    setAgents(simulator.getAgents());
  };

  return (
    <div style={{ padding: 16, color: '#E5E7EB', background: '#0B0B0B', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Live Telemetry</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {agents.map((a) => (
          <div key={a.id} style={{ border: '1px solid #1F2937', borderRadius: 12, padding: 12, background: '#111827' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Lamp color={stateToColor[a.state]} />
                <div>
                  <div style={{ fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{a.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handlePause(a.id)} disabled={a.state === 'paused'} style={{ padding: '4px 8px', background: '#374151', borderRadius: 6, border: 'none', color: '#E5E7EB' }}>Pause</button>
                <button onClick={() => handleResume(a.id)} disabled={a.state !== 'paused'} style={{ padding: '4px 8px', background: '#1F2937', borderRadius: 6, border: 'none', color: '#E5E7EB' }}>Resume</button>
                <button onClick={() => handlePreset(a.id, 'eco')} style={{ padding: '4px 8px', background: '#0B4', borderRadius: 6, border: 'none', color: '#E5E7EB' }}>Eco</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10, fontSize: 13 }}>
              <div>Tokens: {a.tokens.total}</div>
              <div>Saved: {a.tokens.saved_vs_baseline}</div>
              <div>Cost: ${a.tokens.cost_usd.toFixed(4)}</div>
              <div>Latency p50/p95: {a.performance.latencyMsP50}/{a.performance.latencyMsP95} ms</div>
              <div>Cache hit: {(a.performance.cacheHitRate * 100).toFixed(0)}%</div>
              <div>Queue: {a.queue}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 20, fontSize: 18, fontWeight: 600 }}>Events</h2>
      <div style={{ marginTop: 8, border: '1px solid #1F2937', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ maxHeight: 280, overflow: 'auto' }}>
          {events.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: 8, borderBottom: '1px solid #111827', background: '#0F172A' }}>
              <div style={{ width: 120, color: '#9CA3AF' }}>{new Date(e.ts).toLocaleTimeString()}</div>
              <div style={{ width: 120 }}>{e.type}</div>
              <div style={{ flex: 1, color: '#9CA3AF' }}>{e.agentId}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Telemetry;


