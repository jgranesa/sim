import type { DisconnectParams, DisconnectResponse } from '@/tools/acp/types'
import type { ToolConfig } from '@/tools/types'

export const disconnectTool: ToolConfig<DisconnectParams, DisconnectResponse> = {
  id: 'acp_disconnect',
  name: 'ACP Disconnect',
  description: 'Disconnect from a remote agent session',
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
      description: 'Session ID to disconnect',
    },
  },

  request: {
    url: (params) => `${params.endpoint}/v1/sessions/${params.sessionId}`,
    method: 'DELETE',
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
        content: `Successfully disconnected from session ${data.sessionId}`,
        metadata: {
          sessionId: data.sessionId,
          status: 'disconnected',
        },
      },
    }
  },

  outputs: {
    content: { type: 'string', description: 'Disconnection confirmation' },
    metadata: {
      type: 'object',
      description: 'Disconnection metadata',
      properties: {
        sessionId: { type: 'string', description: 'Disconnected session ID' },
        status: { type: 'string', description: 'Disconnection status' },
      },
    },
  },
}
