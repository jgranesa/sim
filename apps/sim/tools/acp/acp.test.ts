import { describe, expect, it } from 'vitest'
import {
  connectAgentTool,
  disconnectTool,
  getStatusTool,
  sendMessageTool,
} from '@/tools/acp'

describe('ACP Tools', () => {
  describe('connectAgentTool', () => {
    it('should have correct configuration', () => {
      expect(connectAgentTool.id).toBe('acp_connect')
      expect(connectAgentTool.name).toBe('ACP Connect Agent')
      expect(connectAgentTool.version).toBe('1.0.0')
    })

    it('should have required parameters', () => {
      expect(connectAgentTool.params.apiKey.required).toBe(true)
      expect(connectAgentTool.params.endpoint.required).toBe(true)
      expect(connectAgentTool.params.agentId.required).toBe(false)
      expect(connectAgentTool.params.sessionId.required).toBe(false)
    })

    it('should configure correct request', () => {
      const params = {
        apiKey: 'test-key',
        endpoint: 'https://example.com',
        agentId: 'agent-1',
      }

      expect(connectAgentTool.request.method).toBe('POST')
      expect(connectAgentTool.request.url(params)).toBe('https://example.com/v1/sessions')

      const headers = connectAgentTool.request.headers(params)
      expect(headers['Content-Type']).toBe('application/json')
      expect(headers.Authorization).toBe('Bearer test-key')

      const body = connectAgentTool.request.body(params)
      expect(body).toEqual({ agentId: 'agent-1' })
    })
  })

  describe('sendMessageTool', () => {
    it('should have correct configuration', () => {
      expect(sendMessageTool.id).toBe('acp_send_message')
      expect(sendMessageTool.name).toBe('ACP Send Message')
      expect(sendMessageTool.version).toBe('1.0.0')
    })

    it('should have required parameters', () => {
      expect(sendMessageTool.params.apiKey.required).toBe(true)
      expect(sendMessageTool.params.endpoint.required).toBe(true)
      expect(sendMessageTool.params.sessionId.required).toBe(true)
      expect(sendMessageTool.params.message.required).toBe(true)
    })

    it('should configure correct request', () => {
      const params = {
        apiKey: 'test-key',
        endpoint: 'https://example.com',
        sessionId: 'session-123',
        message: 'Hello, agent!',
      }

      expect(sendMessageTool.request.method).toBe('POST')
      expect(sendMessageTool.request.url(params)).toBe(
        'https://example.com/v1/sessions/session-123/messages'
      )

      const body = sendMessageTool.request.body(params)
      expect(body).toEqual({ message: 'Hello, agent!' })
    })
  })

  describe('getStatusTool', () => {
    it('should have correct configuration', () => {
      expect(getStatusTool.id).toBe('acp_get_status')
      expect(getStatusTool.name).toBe('ACP Get Status')
      expect(getStatusTool.version).toBe('1.0.0')
    })

    it('should have required parameters', () => {
      expect(getStatusTool.params.apiKey.required).toBe(true)
      expect(getStatusTool.params.endpoint.required).toBe(true)
      expect(getStatusTool.params.sessionId.required).toBe(true)
    })

    it('should configure correct request', () => {
      const params = {
        apiKey: 'test-key',
        endpoint: 'https://example.com',
        sessionId: 'session-123',
      }

      expect(getStatusTool.request.method).toBe('GET')
      expect(getStatusTool.request.url(params)).toBe(
        'https://example.com/v1/sessions/session-123/status'
      )
    })
  })

  describe('disconnectTool', () => {
    it('should have correct configuration', () => {
      expect(disconnectTool.id).toBe('acp_disconnect')
      expect(disconnectTool.name).toBe('ACP Disconnect')
      expect(disconnectTool.version).toBe('1.0.0')
    })

    it('should have required parameters', () => {
      expect(disconnectTool.params.apiKey.required).toBe(true)
      expect(disconnectTool.params.endpoint.required).toBe(true)
      expect(disconnectTool.params.sessionId.required).toBe(true)
    })

    it('should configure correct request', () => {
      const params = {
        apiKey: 'test-key',
        endpoint: 'https://example.com',
        sessionId: 'session-123',
      }

      expect(disconnectTool.request.method).toBe('DELETE')
      expect(disconnectTool.request.url(params)).toBe(
        'https://example.com/v1/sessions/session-123'
      )
    })
  })
})
