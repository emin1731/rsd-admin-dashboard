'use client'

import { defaultRouting, getEmployee, type Employee } from '@/lib/employees'
import type { AnalysisCategory } from '@/lib/records'

const KEY = 'rsd:teams-messaging'

export type SentMessage = {
  id: string
  documentIndex: number
  docNo: string
  recipientId: string
  category: AnalysisCategory
  detectedError: string
  note: string
  sentAt: number
  auto?: boolean
}

type PersistedState = {
  routing: Partial<Record<AnalysisCategory, string>>
  log: SentMessage[]
}

function read(): PersistedState {
  if (typeof window === 'undefined') return { routing: {}, log: [] }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { routing: {}, log: [] }
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      routing: parsed.routing ?? {},
      log: parsed.log ?? [],
    }
  } catch {
    return { routing: {}, log: [] }
  }
}

function write(state: PersistedState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function getRouting(): Record<AnalysisCategory, string> {
  const stored = read().routing
  return { ...defaultRouting, ...stored }
}

export function setRoutingFor(category: AnalysisCategory, employeeId: string) {
  const state = read()
  state.routing = { ...state.routing, [category]: employeeId }
  write(state)
}

export function resetRouting() {
  const state = read()
  state.routing = {}
  write(state)
}

export function resolveRecipient(category: AnalysisCategory): Employee | undefined {
  const routing = getRouting()
  return getEmployee(routing[category])
}

export function getMessageLog(): SentMessage[] {
  return read().log
}

export function getMessagesForDocument(index: number): SentMessage[] {
  return read().log.filter(m => m.documentIndex === index)
}

export function logMessage(entry: Omit<SentMessage, 'id' | 'sentAt'>): SentMessage {
  const state = read()
  const sentMessage: SentMessage = {
    ...entry,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    sentAt: Date.now(),
  }
  state.log = [sentMessage, ...state.log].slice(0, 200)
  write(state)
  return sentMessage
}
