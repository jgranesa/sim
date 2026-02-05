import type { ConnectAgentParams, ConnectAgentResponse } from '@/tools/acp/types'
import type { ToolConfig } from '@/tools/types'

export const connectAgentTool: ToolConfig<ConnectAgentParams, ConnectAgentResponse> = {
  id: 'acp_connect',
  name: 'ACP Connect Agent',
  description: 'Connect to a remote agent using Agent Client Protocol',
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
      description: 'ACP server endpoint URL (e.g., https://agent-server.example.com)',
    },
    agentId: {
      type: 'string',
      required: false,
      visibility: 'user-or-llm',
      description: 'Specific agent ID to connect to (optional)',
    },
    sessionId: {
      type: 'string',
      required: false,
      visibility: 'user-or-llm',
      description: 'Existing session ID to reconnect (optional)',
    },
  },

  request: {
    url: (params) => `${params.endpoint}/v1/sessions`,
    method: 'POST',
    headers: (params) => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.apiKey}`,
    }),
    body: (params) => {
      const body: Record<string, any> = {}

      if (params.agentId) {
        body.agentId = params.agentId
      }

      if (params.sessionId) {
        body.sessionId = params.sessionId
      }

      return body
    },
  },

  transformResponse: async (response) => {
    const data = await response.json()

    return {
      success: true,
      output: {
        content: `Successfully connected to agent! Session ID: ${data.sessionId}`,
        metadata: {
          sessionId: data.sessionId,
          agentId: data.agentId || 'default',
          status: data.status || 'connected',
        },
      },
    }
  },

  outputs: {
    content: { type: 'string', description: 'Connection success message' },
    metadata: {
      type: 'object',
      description: 'Connection metadata',
      properties: {
        sessionId: { type: 'string', description: 'Session ID for subsequent requests' },
        agentId: { type: 'string', description: 'Connected agent ID' },
        status: { type: 'string', description: 'Connection status' },
      },
    },
  },
}
