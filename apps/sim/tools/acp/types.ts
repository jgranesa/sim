import type { ToolResponse } from '@/tools/types'

export interface AcpBaseParams {
  apiKey: string
  endpoint: string
}

export interface ConnectAgentParams extends AcpBaseParams {
  agentId?: string
  sessionId?: string
}

export interface ConnectAgentResponse extends ToolResponse {
  output: {
    content: string
    metadata: {
      sessionId: string
      agentId: string
      status: string
    }
  }
}

export interface SendMessageParams extends AcpBaseParams {
  sessionId: string
  message: string
}

export interface SendMessageResponse extends ToolResponse {
  output: {
    content: string
    metadata: {
      sessionId: string
      messageId: string
      response: string
    }
  }
}

export interface GetStatusParams extends AcpBaseParams {
  sessionId: string
}

export interface GetStatusResponse extends ToolResponse {
  output: {
    content: string
    metadata: {
      sessionId: string
      status: string
      agentId: string
      lastActivity?: string
    }
  }
}

export interface DisconnectParams extends AcpBaseParams {
  sessionId: string
}

export interface DisconnectResponse extends ToolResponse {
  output: {
    content: string
    metadata: {
      sessionId: string
      status: string
    }
  }
}

export type AcpResponse =
  | ConnectAgentResponse
  | SendMessageResponse
  | GetStatusResponse
  | DisconnectResponse
