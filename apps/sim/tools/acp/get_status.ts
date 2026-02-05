import type { GetStatusParams, GetStatusResponse } from '@/tools/acp/types'
import type { ToolConfig } from '@/tools/types'

export const getStatusTool: ToolConfig<GetStatusParams, GetStatusResponse> = {
  id: 'acp_get_status',
  name: 'ACP Get Status',
  description: 'Get the status of a remote agent session',
  version: '1.0.0',

  params: {
    apiKey: {
      type: 'string',
      required: true,
      visibility: 'user-only',
      description: 'API key for authentication with the ACP server',
    },
    endpoint: {
      type: 'string',
      required: true,
      visibility: 'user-or-llm',
      description: 'ACP server endpoint URL',
    },
    sessionId: {
      type: 'string',
      required: true,
      visibility: 'user-or-llm',
      description: 'Session ID to check status',
    },
  },

  request: {
    url: (params) => `${params.endpoint}/v1/sessions/${params.sessionId}/status`,
    method: 'GET',
    headers: (params) => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.apiKey}`,
    }),
  },

  transformResponse: async (response) => {
    const data = await response.json()

    return {
      success: true,
      output: {
        content: `Session status: ${data.status}. Agent: ${data.agentId || 'unknown'}`,
        metadata: {
          sessionId: data.sessionId,
          status: data.status || 'unknown',
          agentId: data.agentId || '',
          lastActivity: data.lastActivity,
        },
      },
    }
  },

  outputs: {
    content: { type: 'string', description: 'Session status information' },
    metadata: {
      type: 'object',
      description: 'Status metadata',
      properties: {
        sessionId: { type: 'string', description: 'Session ID' },
        status: { type: 'string', description: 'Current session status' },
        agentId: { type: 'string', description: 'Agent ID' },
        lastActivity: { type: 'string', description: 'Last activity timestamp' },
      },
    },
  },
}
