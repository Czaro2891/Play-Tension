// Types for Live Telemetry System

export type AgentState = "idle" | "running" | "paused" | "error";
export type JobPhase = "planning" | "generation" | "tool_call" | "critique" | "waiting";

export interface TokenStats {
  input: number;
  output: number;
  total: number;
  saved_vs_baseline: number;
  cost_usd: number;
}

export interface PerformanceStats {
  latencyMsP50: number;
  latencyMsP95: number;
  cacheHitRate: number;
  retries: number;
  errors5xx: number;
  toolCalls: number;
}

export interface ContextStats {
  utilization: number; // 0..1
  promptLength: number;
  compressionLevel: number;
  toolsInConversation: number;
}

export interface SafetyStats {
  flagged: boolean;
  lastLabel?: string;
  blocks: number;
  rejections: number;
}

export interface CurrentJob {
  id: string;
  sceneId: string;
  phase: JobPhase;
  startedAt: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  state: AgentState;
  currentJob?: CurrentJob;
  queue: number;
  tokens: TokenStats;
  performance: PerformanceStats;
  context: ContextStats;
  safety: SafetyStats;
}

export interface TelemetryEvent {
  ts: string;
  type: "job_started" | "job_finished" | "tool_call" | "cache_hit" | "error" | "safety_block";
  agentId: string;
  jobId?: string;
  payload?: Record<string, unknown>;
}

export interface AggregatedMetrics {
  tokens_total: number;
  tokens_input: number;
  tokens_output: number;
  tokens_saved: number;
  cost_usd: number;
  latency_p50: number;
  latency_p95: number;
  cache_hit_rate: number;
  retries: number;
  active_agents: number;
  total_agents: number;
}

export interface SystemStatus {
  sse_connected: boolean;
  api_responsive: boolean;
  last_update: string;
  uptime_seconds: number;
}

