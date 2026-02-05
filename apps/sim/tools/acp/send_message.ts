import type { SendMessageParams, SendMessageResponse } from '@/tools/acp/types'
import type { ToolConfig } from '@/tools/types'

export const sendMessageTool: ToolConfig<SendMessageParams, SendMessageResponse> = {
  id: 'acp_send_message',
  name: 'ACP Send Message',
  description: 'Send a message to a connected remote agent',
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
      description: 'Session ID from connection',
    },
    message: {
      type: 'string',
      required: true,
      visibility: 'user-or-llm',
      description: 'Message to send to the agent',
    },
  },

  request: {
    url: (params) => `${params.endpoint}/v1/sessions/${params.sessionId}/messages`,
    method: 'POST',
    headers: (params) => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.apiKey}`,
    }),
    body: (params) => ({
      message: params.message,
    }),
  },

  transformResponse: async (response) => {
    const data = await response.json()

    return {
      success: true,
      output: {
        content: `Message sent successfully. Response: ${data.response || 'No response'}`,
        metadata: {
          sessionId: data.sessionId,
          messageId: data.messageId || '',
          response: data.response || '',
        },
      },
    }
  },

  outputs: {
    content: { type: 'string', description: 'Message result and agent response' },
    metadata: {
      type: 'object',
      description: 'Message metadata',
      properties: {
        sessionId: { type: 'string', description: 'Session ID' },
        messageId: { type: 'string', description: 'Message ID' },
        response: { type: 'string', description: 'Agent response' },
      },
    },
  },
}
