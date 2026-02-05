import { describe, expect, it } from 'vitest'
import { AcpBlock } from '@/blocks/blocks/acp'

describe('AcpBlock', () => {
  it('should have correct basic configuration', () => {
    expect(AcpBlock.type).toBe('acp')
    expect(AcpBlock.name).toBe('Agent Client Protocol')
    expect(AcpBlock.category).toBe('tools')
  })

  it('should have all required tools configured', () => {
    expect(AcpBlock.tools.access).toContain('acp_connect')
    expect(AcpBlock.tools.access).toContain('acp_send_message')
    expect(AcpBlock.tools.access).toContain('acp_get_status')
    expect(AcpBlock.tools.access).toContain('acp_disconnect')
    expect(AcpBlock.tools.access).toHaveLength(4)
  })

  it('should have operation dropdown with correct options', () => {
    const operationBlock = AcpBlock.subBlocks.find((block) => block.id === 'operation')
    expect(operationBlock).toBeDefined()
    expect(operationBlock?.type).toBe('dropdown')
    expect(operationBlock?.options).toHaveLength(4)
  })

  it('should have required fields configured', () => {
    const endpointBlock = AcpBlock.subBlocks.find((block) => block.id === 'endpoint')
    const apiKeyBlock = AcpBlock.subBlocks.find((block) => block.id === 'apiKey')

    expect(endpointBlock?.required).toBe(true)
    expect(apiKeyBlock?.required).toBe(true)
    expect(apiKeyBlock?.password).toBe(true)
  })

  it('should configure sessionId field with correct conditions', () => {
    const sessionIdBlock = AcpBlock.subBlocks.find((block) => block.id === 'sessionId')
    expect(sessionIdBlock).toBeDefined()
    expect(sessionIdBlock?.condition).toBeDefined()
    expect(sessionIdBlock?.required).toBeDefined()
  })

  it('should configure agentId field only for connect operation', () => {
    const agentIdBlock = AcpBlock.subBlocks.find((block) => block.id === 'agentId')
    expect(agentIdBlock).toBeDefined()
    expect(agentIdBlock?.condition).toEqual({ field: 'operation', value: 'acp_connect' })
  })

  it('should configure message field only for send_message operation', () => {
    const messageBlock = AcpBlock.subBlocks.find((block) => block.id === 'message')
    expect(messageBlock).toBeDefined()
    expect(messageBlock?.condition).toEqual({ field: 'operation', value: 'acp_send_message' })
    expect(messageBlock?.required).toBe(true)
  })

  it('should have tool config that returns the selected operation', () => {
    const toolConfig = AcpBlock.tools.config?.tool
    expect(toolConfig).toBeDefined()

    if (toolConfig) {
      expect(toolConfig({ operation: 'acp_connect' })).toBe('acp_connect')
      expect(toolConfig({ operation: 'acp_send_message' })).toBe('acp_send_message')
      expect(toolConfig({})).toBe('acp_connect') // Default
    }
  })

  it('should define correct inputs and outputs', () => {
    expect(AcpBlock.inputs.operation).toBeDefined()
    expect(AcpBlock.inputs.endpoint).toBeDefined()
    expect(AcpBlock.inputs.apiKey).toBeDefined()
    expect(AcpBlock.inputs.sessionId).toBeDefined()
    expect(AcpBlock.inputs.message).toBeDefined()

    expect(AcpBlock.outputs.content).toBeDefined()
    expect(AcpBlock.outputs.metadata).toBeDefined()
  })
})
