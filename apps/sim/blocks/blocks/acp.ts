import { AcpIcon } from '@/components/icons'
import type { BlockConfig } from '@/blocks/types'
import { AuthMode } from '@/blocks/types'
import type { AcpResponse } from '@/tools/acp/types'

const SESSION_OPERATIONS = ['acp_send_message', 'acp_get_status', 'acp_disconnect'] as const

export const AcpBlock: BlockConfig<AcpResponse> = {
  type: 'acp',
  name: 'Agent Client Protocol',
  description: 'Connect to remote agents using the Agent Client Protocol',
  longDescription:
    'Interact with remote agents using the Agent Client Protocol (ACP). Connect to a remote agent server, send messages, check status, and manage agent sessions programmatically.',
  category: 'tools',
  bgColor: '#6B5FE8',
  icon: AcpIcon,
  authMode: AuthMode.ApiKey,
  subBlocks: [
    {
      id: 'operation',
      title: 'Operation',
      type: 'dropdown',
      options: [
        { label: 'Connect', id: 'acp_connect' },
        { label: 'Send Message', id: 'acp_send_message' },
        { label: 'Get Status', id: 'acp_get_status' },
        { label: 'Disconnect', id: 'acp_disconnect' },
      ],
      value: () => 'acp_connect',
    },
    {
      id: 'endpoint',
      title: 'Endpoint URL',
      type: 'short-input',
      placeholder: 'https://agent-server.example.com',
      required: true,
    },
    {
      id: 'apiKey',
      title: 'API Key',
      type: 'short-input',
      placeholder: 'Enter ACP API Key',
      password: true,
      required: true,
    },
    {
      id: 'agentId',
      title: 'Agent ID',
      type: 'short-input',
      placeholder: 'Optional agent ID to connect to',
      condition: { field: 'operation', value: 'acp_connect' },
    },
    {
      id: 'sessionId',
      title: 'Session ID',
      type: 'short-input',
      placeholder: 'Session ID from connection',
      condition: {
        field: 'operation',
        value: SESSION_OPERATIONS,
      },
      required: {
        field: 'operation',
        value: SESSION_OPERATIONS,
      },
    },
    {
      id: 'message',
      title: 'Message',
      type: 'long-input',
      placeholder: 'Message to send to the agent...',
      condition: { field: 'operation', value: 'acp_send_message' },
      required: true,
    },
  ],
  tools: {
    access: ['acp_connect', 'acp_send_message', 'acp_get_status', 'acp_disconnect'],
    config: {
      tool: (params) => params.operation || 'acp_connect',
    },
  },
  inputs: {
    operation: { type: 'string', description: 'Operation to perform' },
    endpoint: { type: 'string', description: 'ACP server endpoint URL' },
    apiKey: { type: 'string', description: 'API key for authentication' },
    agentId: { type: 'string', description: 'Specific agent ID to connect to (optional)' },
    sessionId: { type: 'string', description: 'Session ID for operations' },
    message: { type: 'string', description: 'Message to send to the agent' },
  },
  outputs: {
    content: { type: 'string', description: 'Human-readable response content' },
    metadata: { type: 'json', description: 'Response metadata' },
  },
}
