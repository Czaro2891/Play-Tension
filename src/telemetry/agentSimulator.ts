import { AgentStatus, AgentState, JobPhase, TelemetryEvent } from './types';

export class AgentSimulator {
  private agents: Map<string, AgentStatus> = new Map();
  private eventListeners: ((event: TelemetryEvent) => void)[] = [];
  private intervalIds: Array<ReturnType<typeof setInterval>> = [];
  private baselineTokens: Record<string, number> = {
    'scene-001': 2000,
    'scene-002': 1500,
    'scene-003': 2500,
    'scene-004': 1800,
  };

  constructor() {
    this.initializeAgents();
    this.startSimulation();
  }

  private initializeAgents() {
    const agentConfigs = [
      { id: 'agent-001', name: 'PlayerAgent#1', role: 'planner' },
      { id: 'agent-002', name: 'NPCAgent#2', role: 'dialogue' },
      { id: 'agent-003', name: 'GameMaster#3', role: 'narrator' },
      { id: 'agent-004', name: 'WorldAgent#4', role: 'environment' },
    ];

    agentConfigs.forEach((config) => {
      const agent: AgentStatus = {
        id: config.id,
        name: config.name,
        role: config.role,
        state: this.randomState(),
        currentJob: this.randomJob(),
        queue: Math.floor(Math.random() * 5),
        tokens: this.generateTokenStats(),
        performance: this.generatePerformanceStats(),
        context: this.generateContextStats(),
        safety: this.generateSafetyStats(),
      };
      this.agents.set(config.id, agent);
    });
  }

  private randomState(): AgentState {
    const states: AgentState[] = ['idle', 'running', 'paused', 'error'];
    const weights = [0.2, 0.5, 0.2, 0.1];
    return this.weightedRandom(states, weights);
  }

  private randomJob() {
    if (Math.random() < 0.3) return undefined;
    const phases: JobPhase[] = ['planning', 'generation', 'tool_call', 'critique', 'waiting'];
    const sceneIds = ['scene-001', 'scene-002', 'scene-003', 'scene-004'];
    return {
      id: `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sceneId: sceneIds[Math.floor(Math.random() * sceneIds.length)],
      phase: phases[Math.floor(Math.random() * phases.length)],
      startedAt: new Date(Date.now() - Math.random() * 300000).toISOString(),
    };
  }

  private generateTokenStats() {
    const input = Math.floor(Math.random() * 2000) + 200;
    const output = Math.floor(Math.random() * 1000) + 100;
    const total = input + output;
    const baseline = Math.floor(Math.random() * 1000) + total;
    const saved = Math.max(0, baseline - total);
    const cost = total * 0.000002;
    return { input, output, total, saved_vs_baseline: saved, cost_usd: parseFloat(cost.toFixed(6)) };
  }

  private generatePerformanceStats() {
    const p50 = Math.floor(Math.random() * 500) + 200;
    const p95 = p50 + Math.floor(Math.random() * 1000) + 200;
    return { latencyMsP50: p50, latencyMsP95: p95, cacheHitRate: parseFloat((Math.random() * 0.6 + 0.1).toFixed(2)), retries: Math.floor(Math.random() * 5), errors5xx: Math.floor(Math.random() * 3), toolCalls: Math.floor(Math.random() * 10) + 1 };
  }

  private generateContextStats() {
    return { utilization: parseFloat((Math.random() * 0.8 + 0.1).toFixed(2)), promptLength: Math.floor(Math.random() * 3000) + 500, compressionLevel: Math.floor(Math.random() * 4), toolsInConversation: Math.floor(Math.random() * 5) + 1 };
  }

  private generateSafetyStats() {
    const flagged = Math.random() < 0.1;
    const labels = ['inappropriate_content', 'violence', 'hate_speech', 'spam'];
    return { flagged, lastLabel: flagged ? labels[Math.floor(Math.random() * labels.length)] : undefined, blocks: Math.floor(Math.random() * 3), rejections: Math.floor(Math.random() * 5) };
  }

  private weightedRandom<T>(items: T[], weights: number[]): T {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  private startSimulation() {
    const stateUpdateInterval = setInterval(() => this.updateAgentStates(), Math.random() * 3000 + 2000);
    const eventInterval = setInterval(() => this.generateRandomEvent(), Math.random() * 2000 + 1000);
    const metricsInterval = setInterval(() => this.updateMetrics(), Math.random() * 5000 + 5000);
    this.intervalIds.push(stateUpdateInterval, eventInterval, metricsInterval);
  }

  private updateAgentStates() {
    this.agents.forEach((agent, id) => {
      if (Math.random() < 0.1) {
        const newState = this.randomState();
        if (newState !== agent.state) {
          agent.state = newState;
          this.emitEvent({ ts: new Date().toISOString(), type: newState === 'error' ? 'error' : 'job_started', agentId: id, jobId: agent.currentJob?.id });
        }
      }
      if (agent.currentJob && Math.random() < 0.2) {
        const phases: JobPhase[] = ['planning', 'generation', 'tool_call', 'critique', 'waiting'];
        const currentIndex = phases.indexOf(agent.currentJob.phase);
        const nextIndex = (currentIndex + 1) % phases.length;
        agent.currentJob.phase = phases[nextIndex];
      }
      if (Math.random() < 0.3) agent.queue = Math.max(0, agent.queue + (Math.random() < 0.5 ? -1 : 1));
    });
  }

  private generateRandomEvent() {
    const agents = Array.from(this.agents.keys());
    const agentId = agents[Math.floor(Math.random() * agents.length)];
    const eventTypes: TelemetryEvent['type'][] = ['job_started', 'job_finished', 'tool_call', 'cache_hit', 'error', 'safety_block'];
    const weights = [0.2, 0.2, 0.3, 0.2, 0.05, 0.05];
    const eventType = this.weightedRandom(eventTypes, weights);
    this.emitEvent({ ts: new Date().toISOString(), type: eventType, agentId, jobId: this.agents.get(agentId)?.currentJob?.id, payload: this.generateEventPayload(eventType) });
  }

  private generateEventPayload(eventType: TelemetryEvent['type']): Record<string, unknown> {
    switch (eventType) {
      case 'tool_call':
        return { tool: ['search', 'calculator', 'memory', 'api_call'][Math.floor(Math.random() * 4)] };
      case 'cache_hit':
        return { saved_tokens: Math.floor(Math.random() * 500) + 50 };
      case 'error':
        return { error_code: ['RATE_LIMIT', 'TIMEOUT', 'INVALID_INPUT'][Math.floor(Math.random() * 3)] };
      case 'safety_block':
        return { reason: ['inappropriate_content', 'violence', 'hate_speech'][Math.floor(Math.random() * 3)] };
      default:
        return {};
    }
  }

  private updateMetrics() {
    this.agents.forEach((agent) => {
      const tokenDelta = Math.floor(Math.random() * 100) - 50;
      agent.tokens.total = Math.max(0, agent.tokens.total + tokenDelta);
      agent.tokens.input = Math.floor(agent.tokens.total * 0.6);
      agent.tokens.output = agent.tokens.total - agent.tokens.input;
      agent.tokens.cost_usd = agent.tokens.total * 0.000002;
      agent.performance.latencyMsP50 += Math.floor(Math.random() * 20) - 10;
      agent.performance.latencyMsP95 += Math.floor(Math.random() * 40) - 20;
      agent.performance.cacheHitRate = Math.max(0, Math.min(1, agent.performance.cacheHitRate + (Math.random() * 0.1 - 0.05)));
      agent.context.utilization = Math.max(0, Math.min(1, agent.context.utilization + (Math.random() * 0.1 - 0.05)));
    });
  }

  private emitEvent(event: TelemetryEvent) {
    this.eventListeners.forEach((listener) => listener(event));
  }

  public getAgents(): AgentStatus[] {
    return Array.from(this.agents.values());
  }

  public getAgent(id: string): AgentStatus | undefined {
    return this.agents.get(id);
  }

  public addEventListener(listener: (event: TelemetryEvent) => void) {
    this.eventListeners.push(listener);
  }

  public removeEventListener(listener: (event: TelemetryEvent) => void) {
    const index = this.eventListeners.indexOf(listener);
    if (index > -1) this.eventListeners.splice(index, 1);
  }

  public pauseAgent(id: string): boolean {
    const agent = this.agents.get(id);
    if (agent && agent.state !== 'paused') {
      agent.state = 'paused';
      this.emitEvent({ ts: new Date().toISOString(), type: 'job_finished', agentId: id, payload: { reason: 'paused' } });
      return true;
    }
    return false;
  }

  public resumeAgent(id: string): boolean {
    const agent = this.agents.get(id);
    if (agent && agent.state === 'paused') {
      agent.state = 'running';
      this.emitEvent({ ts: new Date().toISOString(), type: 'job_started', agentId: id, payload: { reason: 'resumed' } });
      return true;
    }
    return false;
  }

  public setAgentPreset(id: string, mode: string): boolean {
    const agent = this.agents.get(id);
    if (agent) {
      if (mode === 'eco') {
        agent.context.compressionLevel = Math.min(3, agent.context.compressionLevel + 1);
        agent.tokens.saved_vs_baseline += Math.floor(Math.random() * 200) + 50;
      }
      this.emitEvent({ ts: new Date().toISOString(), type: 'job_started', agentId: id, payload: { preset: mode } });
      return true;
    }
    return false;
  }

  public destroy() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];
    this.eventListeners = [];
  }
}

let simulatorInstance: AgentSimulator | null = null;
export function getAgentSimulator(): AgentSimulator {
  if (!simulatorInstance) simulatorInstance = new AgentSimulator();
  return simulatorInstance;
}


