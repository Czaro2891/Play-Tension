import { NextResponse } from 'next/server';
import { getAgentSimulator } from '@/lib/agent-simulator';
import { AggregatedMetrics } from '@/types/telemetry';

export async function GET() {
  try {
    const simulator = getAgentSimulator();
    const agents = simulator.getAgents();
    
    // Calculate aggregated metrics
    const metrics: AggregatedMetrics = agents.reduce((acc, agent) => {
      return {
        tokens_total: acc.tokens_total + agent.tokens.total,
        tokens_input: acc.tokens_input + agent.tokens.input,
        tokens_output: acc.tokens_output + agent.tokens.output,
        tokens_saved: acc.tokens_saved + agent.tokens.saved_vs_baseline,
        cost_usd: acc.cost_usd + agent.tokens.cost_usd,
        latency_p50: acc.latency_p50 + agent.performance.latencyMsP50,
        latency_p95: acc.latency_p95 + agent.performance.latencyMsP95,
        cache_hit_rate: acc.cache_hit_rate + agent.performance.cacheHitRate,
        retries: acc.retries + agent.performance.retries,
        active_agents: acc.active_agents + (agent.state === 'running' ? 1 : 0),
        total_agents: acc.total_agents + 1,
      };
    }, {
      tokens_total: 0,
      tokens_input: 0,
      tokens_output: 0,
      tokens_saved: 0,
      cost_usd: 0,
      latency_p50: 0,
      latency_p95: 0,
      cache_hit_rate: 0,
      retries: 0,
      active_agents: 0,
      total_agents: 0,
    });

    // Calculate averages
    if (metrics.total_agents > 0) {
      metrics.latency_p50 = Math.round(metrics.latency_p50 / metrics.total_agents);
      metrics.latency_p95 = Math.round(metrics.latency_p95 / metrics.total_agents);
      metrics.cache_hit_rate = parseFloat((metrics.cache_hit_rate / metrics.total_agents).toFixed(2));
    }

    return NextResponse.json({
      agents,
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { action, agentIds } = await request.json();
    const simulator = getAgentSimulator();
    
    if (!agentIds || !Array.isArray(agentIds)) {
      return NextResponse.json(
        { error: 'agentIds array is required' },
        { status: 400 }
      );
    }

    const results = agentIds.map(agentId => {
      switch (action) {
        case 'pause':
          return { agentId, success: simulator.pauseAgent(agentId) };
        case 'resume':
          return { agentId, success: simulator.resumeAgent(agentId) };
        default:
          return { agentId, success: false, error: 'Unknown action' };
      }
    });

    return NextResponse.json({
      action,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing bulk action:', error);
    return NextResponse.json(
      { error: 'Failed to process bulk action' },
      { status: 500 }
    );
  }
}

